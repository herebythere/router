#!/bin/bash

current_dir=`dirname $0`
dom_demo_pathname=$current_dir/docs/deno/demo.ts
dom_bundled_pathname=$current_dir/docs/scripts/demo.js
dom_tsconfig=$current_dir/docs/deno/tsconfig.json

deno bundle --config $dom_tsconfig $dom_demo_pathname $dom_bundled_pathname