# ── Stage 1: build ──────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Install deps only (cache layer)
COPY package*.json ./
RUN npm ci --omit=dev=false

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: serve (nginx) ───────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# SPA routing: all 404s → index.html
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    # Cache static assets\n\
    location ~* \\.(?:js|css|woff2?|svg|png|jpg|ico|webp)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
    gzip on;\n\
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;\n\
}\n' > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]