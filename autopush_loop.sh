#!/bin/bash

while true
do
    bash /c/Users/boris/PycharmProjects/Mind2App/autopush.sh
    echo "Änderungen gepusht am $(date)"
    sleep 300  # 300 Sekunden = 5 Minuten
done
