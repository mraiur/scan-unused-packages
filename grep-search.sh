#!/bin/bash

grep -HniR --exclude=\*.map --exclude=vendors.js --exclude-dir={node_modules,__html/build} "from\ [\"\|']$2\|require([\"\|']$2" $1