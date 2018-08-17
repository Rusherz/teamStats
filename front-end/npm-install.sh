#!/bin/bash
[[ ! -z $1 ]] && ARGS=$* || ARGS="install"
DOCKER_RUN="docker run --rm -it -v $(pwd):/usr/src/app teamstats_web_frontend:latest npm $ARGS"
echo $DOCKER_RUN
if [[ $UID == 0 ]]; then
	$DOCKER_RUN
else
	echo "Didn't run as root. Escalating..."
	sudo $DOCKER_RUN
fi
