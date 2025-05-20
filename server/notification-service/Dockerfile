FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (including devDependencies for building)
RUN npm install

# Copy all source files
COPY . .

# Build the application (adjust this to match your build script)
RUN npm run build

# Expose the port your app runs on
EXPOSE 4001

# Command to run the server
CMD ["node", "./build/src/app.js"]