#! /bin/bash
# check for -d, --detached
DETACHED=false
for (( i=1; i <= "$#"; i++ )); do
  ARG="${!i}"
  case "$ARG" in
      -d|--detach )
      DETACHED=true
      ;;
  esac
done

DOCKER_BUILDKIT=1
COMPOSE_DOCKER_CLI_BUILD=0


if [[ $2 == "up" ]] && [[ $DETACHED == false ]]; then
    docker-compose -f $1 up --build; docker-compose -f $1 down
elif [[ $2 == "up" ]] && [[ $DETACHED == true ]]; then
    docker-compose -f $1 up --build -d;
fi