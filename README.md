Scan project for packages used in package.json that are not used.

## How it works
 - Open package.json and get dependencies + devDependencies.
 - Run grep search for each package
 - Output the package, number of uses in files and ouput of matches.

The node app uses grep-search.sh that basicaly runs this

```
grep -HniR --exclude=\*.map --exclude=vendors.js --exclude-dir={node_modules,__html/build} "from\ [\"\|']PACKAGE_NAME\|require([\"\|']PACKAGE_NAME" DIRECTORY
```

## Usage

```
npm run-script run DIRECTORY 
```
or 
```
node ./cli.js DIRECTORY
```