# Use the official Bun image for ARM64 architecture
FROM oven/bun:1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb (if you have one)
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Command to run the application
CMD ["bun", "run", "index.ts", "listen"]
