#!/bin/bash
# This command deploys truenorth-arithmetic-calculator-front

pipeline_directory=$1
# build-artifact.sh  deploy-artifact.sh  pipeline.sh  update-source.sh

deploy() {
	ls $pipeline_directory
	$pipeline_directory/update-source.sh $pipeline_directory && \
	bash $pipeline_directory/build-artifact.sh $pipeline_directory && \
	bash $pipeline_directory/deploy-artifact.sh $pipeline_directory
}

deploy
