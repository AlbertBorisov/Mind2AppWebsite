#!/bin/bash

while true
do
  ./autopush.sh
  echo "Änderungen gepusht am $(date)"
  sleep 300
done
