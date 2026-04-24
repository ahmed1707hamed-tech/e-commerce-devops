# ════════════════════════════════════════════════════════════════
#  Stage 1 — Build (Node 18 Alpine)
#  Only build artifacts are carried forward; Node is discarded.
# ════════════════════════════════════════════════════════════════
FROM node:18-alpine AS build

WORKDIR /app

# Layer-cache: only reinstall deps when lockfile changes
COPY package*.json ./
RUN npm ci --prefer-offline

# Copy source and compile
COPY . .
RUN npm run build

# ════════════════════════════════════════════════════════════════
#  Stage 2 — Serve (Nginx Alpine ~25 MB)
#  No Node runtime, no source code, no dev dependencies.
# ════════════════════════════════════════════════════════════════
FROM nginx:1.27-alpine AS production

# Drop default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled React app
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our production Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx runs as non-root (nginx user already exists in the image)
# Adjust permissions so the nginx user can read the static files
RUN chown -R nginx:nginx /usr/share/nginx/html \
 && chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Use exec form so PID 1 receives signals correctly
CMD ["nginx", "-g", "daemon off;"]