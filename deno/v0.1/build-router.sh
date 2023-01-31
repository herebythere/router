#!/bin/bash

curr_dir=`dirname $0`

tsconfig=$curr_dir/tsconfig.json
router=$curr_dir/mod.ts
# router_test=$curr_dir/mod.test.ts

es_dir=$curr_dir/../../es/v0.1
es_router=$es_dir/router.js
# es_router_test=$es_dir/router.test.js

deno bundle --config $tsconfig $router $es_router
# deno bundle $timestep_test $es_timestep_test

# deno fmt $current_dir
# deno fmt $es_dir
