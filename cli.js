const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const async = require('async');

const dir = process.argv[2];


if( process.argv.length < 3 )
{
    console.log("Pass a directory with package.json");
}
else if( dir && fs.existsSync(dir) && fs.statSync(dir).isDirectory() )
{
    let packageJsonPath = path.join( dir, "package.json");

    if( fs.existsSync(packageJsonPath) )
    {
        let packageJson = require(packageJsonPath);
        let packages = {...packageJson.dependencies}
        if( packageJson.devDependencies)
        {
            packages = {...packages, ...packageJson.devDependencies};
        }

        let list = [];
        for( let package in packages )
        {
            list.push( function(next)
            {
                exec(`./grep-search.sh ${dir} ${this.package}`, (error, stdout, stderr) => {
                                        
                    if( stderr ) 
                    {
                        console.log(`stderr: ${stderr}`);
                    }
        
                    let numUses = stdout.split('\n').length;
                    if( numUses === 0)
                    {
                        console.log(this.package, numUses, "NOT FOUND ");
                    }
                    else
                    {
                        console.log(this.package, numUses);
                        console.log(stdout);
                    }

                    next();
                  });
                
            }.bind({package: package}))
        }

        async.series(list, function(err, res){
            console.log("COMPLETE", err);
        });
    }
    else
    {
        console.log("There is no package.json in the provided directory");
    }

}
else{
    console.log("Directory not found");
}