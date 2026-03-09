FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Dependencies stage
FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS development
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# Using nodemon for development
CMD ["pnpm", "dev"]

# Production build stage (if there's a build step, usually for TS, but we are using ES modules directly)
# For this app we just need production dependencies
FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Production stage
FROM base AS production
WORKDIR /app

# Copy production dependencies
COPY --from=build /app/node_modules ./node_modules
# Copy application code
COPY . .

# Ensure the app runs as a non-root user (security best practice for K8s/AWS)
USER node

# Expose standard port (can be overridden by environment variable)
EXPOSE 3000

# Start command
CMD ["pnpm", "start"]
