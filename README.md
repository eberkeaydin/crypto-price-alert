## Bilira.com Backend Developer Candidate Case Study - Crypto Alert Service 

### For Docker-based installation

Following command is needed for install Mongo, Redis and Kafka containers on your local environment

```bash
docker-compose up -d
```

Look out for project dependencies' versions as:

```
  "dependencies": {
    "@grpc/grpc-js": "^1.12.6",
    "axios": "^1.7.9",
    "bcryptjs": "^2.4.3",
    "firebase-admin": "^13.0.2",
    "ioredis": "^5.4.2",
    "jsonwebtoken": "^9.0.2",
    "kafka-node": "^5.0.0",
    "mongoose": "^8.9.7",
    "next": "15.1.6",
    "next-auth": "^4.24.11",
    "node-cron": "^3.0.3",
    "node-mocks-http": "^1.16.2",
    "pytest": "^1.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "redis": "^4.7.0"
  }
```

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
ts-node lib/KafkaConsumer.ts
ts-node lib/Cronjobs.ts
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

![Architecture](/crypto-alarm-system.drawio.png)

jwt Auth is used for authentication. To secure all of the requests a middleware implemented that checks the token.

Kafka consumer and cronjobs modules are listening continuously. When target alert criteria matches from the very start, notifications will be sended.

Cronjobs checks the untriggered alert periodically(60sec) and when the alert conditions met with the intended request, notifications will be sended.

To store updated crypto prices Redis is used. Redis store the updated crypto prices that came from Coingecko API for 60 seconds temporarily.

To demonstrate the notification messaging, Firebase Messaging services used.

## CI/CD

Service uses Google Cloud Platform's cloud services such as Kubernetes Cloud Engine(running pods), Cloud Build(CI/CD), Artifact Registry(repo) configured.

All of the artifacts can be deployed with a single deployment yaml file.  

Continuous integration is handled via cloudbuild-ci.yaml file which checks integration and uniy tests

Continuous deployment is handled via cloudbuild-cd.yaml file which sets the environment variables and cluster configuration

## API Collection

To reach out the API collection for the local environment -> https://documenter.getpostman.com/view/22585352/2sAYX9og16 

For the live environment -> https://documenter.getpostman.com/view/22585352/2sAYX9ofvo 
