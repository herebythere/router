#!/bin/bash

# required dirs and paths

current_dir=`dirname $0`
bundled_pathname=$current_dir/../es/router.js 
target_pathname=$current_dir/mod.ts
tsconfig_pathname=$current_dir/tsconfig.json


# deno - build and format

deno bundle --config $tsconfig_pathname $target_pathname $bundled_pathname

deno fmt $current_dir
deno fmt $bundled_pathname