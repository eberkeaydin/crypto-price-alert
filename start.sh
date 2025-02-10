#!/bin/sh

npm install -g pm2
npm install -g ts-node

pm2 start lib/Cronjobs.ts --name cronjobs --interpreter node --node-args="--loader ts-node/esm"
pm2 start lib/KafkaConsumer.ts --name kafka-consumer --interpreter node --node-args="--loader ts-node/esm"
pm2 start index.js --name app
pm2 logs --raw | tee -a /app/pm2_logs.txt
