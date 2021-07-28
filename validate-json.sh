#!/bin/bash

for f in json/*.json;
do
    if ! (jsonlint-php -q "$f" > /dev/null 2>&1);
    then
	echo "$f is not valid";
    fi;
done
