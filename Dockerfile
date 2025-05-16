FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies (optional)
RUN apk add --no-cache openssl

# Copy only package files first — for layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Compile TypeScript (if using TS)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "src/index.js"]