FROM node:22-alpine AS build
WORKDIR /app

# Vite envs must be present at build time. Default to prod; CI overrides
# per-branch via --build-arg VITE_APP_URL=https://app-dev.agentiko.io.
ARG VITE_APP_URL=https://app.agentiko.io
ENV VITE_APP_URL=$VITE_APP_URL

COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
