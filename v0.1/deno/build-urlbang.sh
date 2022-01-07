#!/bin/bash

current_dir=`dirname $0`
bundled_pathname=$current_dir/../bundled/urlbang.js 
target_pathname=$current_dir/urlbang.ts
history_target_pathname=$current_dir/urlbang.history.ts
history_bundled_pathname=$current_dir/../bundled/urlbang.history.js 
tsconfig_pathname=$current_dir/tsconfig.json


deno bundle --config $tsconfig_pathname $target_pathname $bundled_pathname
deno bundle --config $tsconfig_pathname $history_target_pathname $history_bundled_pathname
deno fmt $current_dir