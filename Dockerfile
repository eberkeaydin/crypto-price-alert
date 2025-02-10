FROM node:18-alpine

WORKDIR /app

# Paketleri yükle
COPY package*.json ./
RUN npm install --production

# Proje dosyalarını kopyala
COPY . .

# Next.js için Production Build Al
RUN npm run build

# Production ortamında başlat
CMD ["npm", "run", "start"]
