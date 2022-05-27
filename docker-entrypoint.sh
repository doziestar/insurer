#!/bin/bash

dockerize -wait tcp://psql:3306 -timeout 20s

echo "Start Wait Postgres"
