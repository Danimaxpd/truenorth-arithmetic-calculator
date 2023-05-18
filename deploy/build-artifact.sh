#!/bin/bash
# Build artifact to deploy

pipeline_directory=$1;

cd $pipeline_directory/.. &&\
	npm install --force
