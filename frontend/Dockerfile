# Use Node as base
FROM node:22-alpine

# Set working directory (must match sync target in docker-compose.yml)
WORKDIR /app

# Install global dependencies
RUN npm install -g npm@latest
# RUN npm install -g expo-cli @expo/ngrok@^4.1.0
RUN npm install -g @expo/ngrok@^4.1.0
RUN node --version && npm --version

# Copy package files and install packages
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expo default ports
EXPOSE 8081 19000 19001 19002

# Start Docker container without starting expo (start it manually!)
CMD ["sleep", "infinity"]

# # Start expo
# CMD ["npx", "expo", "start", "--tunnel"]