#!/bin/bash

curr_dir=`dirname $0`

tsconfig=$curr_dir/tsconfig.json
router=$curr_dir/mod.dom.ts
# router_test=$curr_dir/mod.test.ts

es_dir=$curr_dir/../../es/v0.1
es_router=$es_dir/router-dom.js
# es_router_test=$es_dir/router-dom.test.js

deno bundle --config $tsconfig $router $es_router
# deno bundle $router_test $es_router_test

deno fmt $current_dir
deno fmt $es_dir
