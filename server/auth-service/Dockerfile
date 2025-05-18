# FROM node:21-alpine3.18 as builder

# WORKDIR /app
# COPY package.json ./
# COPY tsconfig.json ./
# COPY src ./src
# COPY tools ./tools
# RUN npm install -g npm@latest
# RUN npm run ci && npm install -g nodemon 


# FROM node:21-alpine3.18

# WORKDIR /app
# RUN apk add --no-cache curl 
# COPY package.json ./
# COPY tsconfig.json ./
# COPY src ./src
# RUN npm install -g pm2 npm@latest
# RUN npm ci --production
# COPY --from=builder /app/build ./build

# EXPOSE 4002

# CMD ["npm", "run", "dev"]
# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies (including devDependencies for building)
RUN npm install

# Copy all source files
COPY . .

# Build the application (adjust this to match your build script)
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine

WORKDIR /usr/src/app

# Install production dependencies only
COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/build ./build
# Copy built assets from builder stage
# COPY --from=builder /usr/src/app/build ./build
# COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy other necessary files (like config, public folder, etc.)
# COPY --from=builder /usr/src/app/public ./public
# COPY --from=builder /usr/src/app/server.js ./

# Expose the port your app runs on
EXPOSE 4000

# Command to run the server
CMD ["npm", "run","start"]