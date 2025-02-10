#!/bin/sh

npm install -g pm2
npm install -g ts-node
pm2 start lib/Cronjobs.ts --name cronjobs --interpreter ts-node
pm2 start lib/KafkaConsumer.ts --name kafka-consumer --interpreter ts-node
pm2 start index.js --name app --interpreter node
pm2 logs --raw | tee -a /app/pm2_logs.txt
