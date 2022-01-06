#!/bin/bash

current_dir=`dirname $0`
bundled_pathname=$current_dir/../v0.1/bundled/urlbang.js 
scripts_dir=$current_dir/scripts/

mkdir -p $scripts_dir
cp $bundled_pathname $scripts_dir