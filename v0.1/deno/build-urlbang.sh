#!/bin/bash

current_dir=`dirname $0`
bundled_pathname=$current_dir/../bundled/urlbang.js 
target_pathname=$current_dir/urlbang.ts
tsconfig_pathname=$current_dir/tsconfig.json

deno bundle --config $tsconfig_pathname $target_pathname $bundled_pathname