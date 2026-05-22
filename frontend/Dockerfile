# Use Node LTS as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install global dependencies
RUN npm install -g npm@latest
RUN npm install -g expo-cli @expo/ngrok@^4.1.0
RUN node --version && npm --version

# Copy package files
COPY package.json package-lock.json ./

# Install packages
RUN npm install

# Copy rest of the app
COPY . .

# Expo default ports
EXPOSE 8081 19000 19001 19002

# Start expo
CMD ["npx", "expo", "start", "--tunnel"]