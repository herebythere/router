#!/bin/bash

# required dirs and paths

current_dir=`dirname $0`
bundled_pathname=$current_dir/es/urlbang.js 
target_pathname=$current_dir/deno/urlbang.ts
tsconfig_pathname=$current_dir/tsconfig.json


# deno - build and format

deno bundle --config $tsconfig_pathname $target_pathname $bundled_pathname
# deno bundle --config $tsconfig_pathname $dom_target_pathname $dom_bundled_pathname

deno fmt $current_dir