FROM node:18-alpine

WORKDIR /app

# Paketleri yükle
COPY package*.json ./
RUN npm install

# Proje dosyalarını kopyala
COPY . .

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
