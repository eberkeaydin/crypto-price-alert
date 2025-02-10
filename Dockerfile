FROM node:18-alpine

WORKDIR /app

ARG JWT_SECRET
ENV JWT_SECRET ${JWT_SECRET}
ARG KAFKA_BROKER
ENV KAFKA_BROKER ${KAFKA_BROKER}
ARG KAFKA_TOPIC
ENV KAFKA_TOPIC ${KAFKA_TOPIC}
ARG MONGODB_URI
ENV MONGODB_URI ${MONGODB_URI}
ARG REDIS_URL
ENV REDIS_URL ${REDIS_URL}
ARG FIREBASE_CREDENTIALS
ENV FIREBASE_CREDENTIALS ${FIREBASE_CREDENTIALS}
ARG CRYPTO_API_URL
ENV CRYPTO_API_URL ${CRYPTO_API_URL}

# Paketleri yükle
COPY package*.json ./
RUN npm install --production

# Proje dosyalarını kopyala
COPY . .

# Next.js için Production Build Al
RUN npm run build

# Production ortamında başlat
CMD ["npm", "run", "start"]
