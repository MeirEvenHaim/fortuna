FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Configure non-root user
RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", "index.js"]
