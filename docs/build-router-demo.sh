#!/bin/bash

# paths and dirs

current_dir=`dirname $0`
dom_demo_pathname=$current_dir/deno/demo.ts
dom_bundled_pathname=$current_dir/scripts/bundled.js
dom_tsconfig=$current_dir/deno/tsconfig.json


# bundle

deno bundle --config $dom_tsconfig $dom_demo_pathname $dom_bundled_pathname

# deno fmt $current_dir
