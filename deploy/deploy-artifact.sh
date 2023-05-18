#!/bin/bash
# Deploy artifact to S3
pipeline_directory=$1
cd $pipeline_directory/.. && \
	pm2 restart 2

