#!/bin/bash

pipeline_directory=$1

cd $pipeline_directory/.. && \
	git reset --hard && \
	git clean -f && \
	git pull
