#!/bin/bash

while true
do
    bash /c/Users/boris/PycharmProjects/Mind2App/autopush.sh
    echo "Änderungen gepusht am $(date)"
    sleep 30  # 30 Sekunden = 0,5 Minuten
done
