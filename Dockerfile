FROM node:22-alpine AS build
WORKDIR /app

# Vite envs must be present at build time. Default to prod; CI overrides
# per-branch via --build-arg VITE_APP_URL=https://app-dev.agentiko.io.
ARG VITE_APP_URL=https://app.agentiko.io
ENV VITE_APP_URL=$VITE_APP_URL

# package*.json + .npmrc + the Paraglide inputs all need to be present
# before `npm install` because the postinstall hook compiles messages
# (needs project.inlang/settings.json + messages/*.json) so src/paraglide/
# exists by the time tsc resolves imports.
COPY package*.json .npmrc ./
COPY project.inlang ./project.inlang
COPY messages ./messages
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
