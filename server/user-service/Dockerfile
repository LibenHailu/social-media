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

# Stage 2: Serve the application
FROM node:20-alpine

WORKDIR /usr/src/app

# Install production dependencies only
COPY package*.json ./
RUN npm install --only=production

# Copy built assets from builder stage
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose the port your app runs on
EXPOSE 4003

# Command to run the server
CMD ["npm", "run","start"]