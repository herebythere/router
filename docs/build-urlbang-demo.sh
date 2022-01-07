#!/bin/bash

current_dir=`dirname $0`
bundled_pathname=$current_dir/../v0.1/bundled/urlbang.js
bundled_dom_pathname=$current_dir/../v0.1/bundled/urlbang.dom.js 
scripts_dir=$current_dir/scripts/

mkdir -p $scripts_dir
cp $bundled_pathname $scripts_dir
cp $bundled_dom_pathname $scripts_dir