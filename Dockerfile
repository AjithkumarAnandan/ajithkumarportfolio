# Stage 1: Install dependencies
FROM node:20-alpine AS frontend-build
RUN apk add --no-cache postgresql-client
WORKDIR /app

# Copy package files and install
COPY package.json package-lock.json .env.docker ./
RUN npm install

# Copy all source files
COPY . .

EXPOSE 8080 5432
RUN npm run build
CMD [ "npm","run","start" ]