
# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build React app
RUN npm run build

# Set environment variables for Firebase config
ENV FIREBASE_API_KEY=your_api_key
ENV FIREBASE_AUTH_DOMAIN=your_auth_domain
ENV FIREBASE_PROJECT_ID=your_project_id
ENV FIREBASE_STORAGE_BUCKET=your_storage_bucket
ENV FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
ENV FIREBASE_APP_ID=your_app_id
ENV FIREBASE_MEASUREMENT_ID=your_measurement_id

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
