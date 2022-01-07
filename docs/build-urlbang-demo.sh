#!/bin/bash

current_dir=`dirname $0`
bundled_pathname=$current_dir/../v0.1/bundled/urlbang.js
bundled_history_pathname=$current_dir/../v0.1/bundled/urlbang.history.js 
scripts_dir=$current_dir/scripts/

mkdir -p $scripts_dir
cp $bundled_pathname $scripts_dir
cp $bundled_history_pathname $scripts_dir