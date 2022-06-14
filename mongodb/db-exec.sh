#!/bin/sh
docker exec -it mongodb_mongo_1 mongosh -U gerard -p olakease -f $1