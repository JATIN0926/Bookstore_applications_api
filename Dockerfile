# Use official Node base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project files
COPY . .

# Use env variable for port
ENV PORT=5000

# Expose the port the app will run on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
