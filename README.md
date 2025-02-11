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

![Architecture](./readme_assets/crypto-alarm-system.drawio.png)

jwt Auth is used for authentication. To secure all of the requests a middleware implemented that checks the token.

Kafka consumer and cronjobs modules are listening continuously. When target alert criteria matches from the very start, notifications will be sended.

Cronjobs checks the untriggered alert periodically(60sec) and when the alert conditions met with the intended request, notifications will be sended.

To store updated crypto prices Redis is used. Redis store the updated crypto prices that came from Coingecko API for 60 seconds temporarily.

To demonstrate the notification messaging, Firebase Messaging services used.

## CI/CD

Service uses Google Cloud Platform's cloud services such as Kubernetes Cloud Engine(running pods), Cloud Build(CI/CD), Artifact Registry(repo) configured.

All of the artifacts can be deployed with a single deployment yaml file.

Continuous integration is handled via cloudbuild-ci.yaml file which checks integration and unit tests

Continuous deployment is handled via cloudbuild-cd.yaml file which sets the environment variables and cluster configuration

Once a commit pushed to the main as:

![commit](./readme_assets/commit-push.PNG)

Cloud Build detects the changes in repository and triggers the CD pipeline(for main):

![build](./readme_assets/cloud-build.PNG)

Then Kubernetes Engine create a new pod and terminate the previous one:

![kubernetes](./readme_assets/kubernetes-engine.PNG)

## API Collection

To reach out the API collection for the local environment -> https://documenter.getpostman.com/view/22585352/2sAYX9og16 

For the live environment -> https://documenter.getpostman.com/view/22585352/2sAYX9ofvo 

## Important

To test all the features please make .env, .env.test and firebase-key.json on your local environment

.env and .env.test file (same) 

```
# MongoDB Config
MONGODB_URI=mongodb://admin:password@localhost:27017/crypto_alerts?authSource=admin

# Redis Config
REDIS_URL=redis://localhost:6379

# Kafka Config
KAFKA_BROKER=localhost:9092
KAFKA_TOPIC=crypto-alerts

# Crypto API
CRYPTO_API_URL=https://api.coingecko.com/api/v3

# Firebase Credentials
FIREBASE_CREDENTIALS=./firebase-key.json

# JSON Web Token
JWT_SECRET=3af47cf9593e6d7c8401ae5d375258f83f61d599774400c22cf9d58e1b673f721e89e56a1ae399a4ef44072e64232fb4e12191c8e9012f0e9eda7e88c06a24ea
```

firebase-key.json

```
{
    "type": "service_account",
    "project_id": "crypto-fetcher-98110",
    "private_key_id": "3c7255c06273fe54f7a86fad9fbd1014591a17b3",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDxR3hKS9w6IF8b\n2XAn48Db+xsul6+SwZKJyAJ7YjY6tIyoTtnclJD6SB0V8yvf0jXrDStR6wiBFEK9\nph1HZbvvFITkpbvAlarqOZi51OHIrWw4U4FnkTtVcWLKrFKZsWmWcCL5T9pm/2UQ\n41aRKACoveyBEcIDCcPiqXmEaMDs5um1hP8aV3gYxC642om5Aax1tM+U15OwlsNm\nEYjl8h5fkG42+9zk7zFHhMrvON/mXfjLwMCM7/OGlVzYjmz4rdzAv55GEZXAbt5/\nlE9D/8iQe6H8LKubBZ+r47mpnyJALBnYRHgjBWjoMAnpdBKUE8eolKKJOTDxVmpD\nqvzRZM9vAgMBAAECggEAILQSPufHYu2OVqUDSbTaKDcB+S/AMYEhTqGYjIbEWPKt\n+gYuC3Lrr7DkmFwMf1rryf9P9tuHnI9VeIUyhMHqVj6OwLsiFrlyoCrMY6vSKrQu\n7feLm7EYvL0Qqe3viDt+11A9vVMwhDNrzH0z95rXdAfCLcBtbqH9NhTIjsTwGWvz\nsr9V22/8HzhAr4MVfEn8S4vJpCG7VxMaYtOf6dCqXg09/z/eplDHW7BaKrH26Hr3\nWMpJAd5F15czDuYDE8DepCQgwdztuWX1lOz36q2U7qfutpDSiNbmK9ZVmGbND9XO\n1hf/KeJPWKKcL6c7g2k3+jtGhQquo/6Vhxj8Qw6HEQKBgQD7dj567kif6gAduxYK\n9QDLdY40VJ31mpGShyo5gmXax2VQ1ZFSGq5W9q6vliHXjHeXTAKx8U4TOsyqvb33\neBmvIrKinbMUpHaJdoIRVvp8uZa+Vk2YaF7vW0igNyRdLSYwfINkTy1KTRrC+/XZ\nV8yowBRJARKmM7pHVrIbhSzEiQKBgQD1oi5+GQq8bIsQn5fpgDUVD7XyfRSK5eiP\nbZ2KbS+E2Vbye8ob8kytkzcO9FWq/kmjh9KGQqjjNfAZ/qfwpytLTP1AMJPGHx7V\nxg0PGuLlwV7BKns+JeaNMSZP3YCT8r/cn4qheg8g6bPuaqvPgiv9o1QIe8CllJ9o\nISYWPLhmNwKBgF/axRprNrfupTiwFkj69+CW4SxFjSkQUKmAaLIfaOAq3g4gOxMH\nJKn1wsUf/6qA2x2LVgOqrk5aPaZgScfJulCuc1XVs2wM/TqNOCuP8lAVFsdbcpzE\nPFwVeevI2U3DZilZbWSRYfxOxALLtP2yoEs7XQAvLoK4eSu0epRPAa+xAoGAXAo6\nW5usjzAo58C1XpRgz5SEe+lsgiNmAiBz0MPa82+xCcli0Rf4rW2lSuA5HYqNM06Y\njyB5QjIa1tK6QQ2SxnOBzcSmCq3skvPUPt23OZo8lCsD5SS0gCFzlqeMH2PtipDp\nlFo1QwLvHh4wZOAE9dR2j3s3k5PeK1mIePqlqf8CgYBjKo0kk3N3bJgmpleKLFk4\nOmPhLlFvoBTNkEhWApwM6h9n/zT8DE7Kk7/yZn03w/jY193R/2jMy79sOd940Ln4\n2nxYXJi+05v/cmCRfuV1T1ozVqCGFqZ+fewjOgrD3dhrk0XEdYvC6xyH99DJXCQ9\nsOXKQO+56al13N2464xw1Q==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@crypto-fetcher-98110.iam.gserviceaccount.com",
    "client_id": "100786542647412059401",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40crypto-fetcher-98110.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}
  
```