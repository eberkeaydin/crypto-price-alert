#!/bin/sh
pm2 start lib/Cronjobs.ts --name cronjobs
pm2 start lib/KafkaConsumer.ts --name kafka-consumer
pm2 start index.js --name app
pm2 logs
