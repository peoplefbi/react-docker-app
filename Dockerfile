# ── Этап 1: сборка ────────────────────────────────────────────────────
FROM node:18-alpine AS build

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json ./
RUN npm install

# Копируем исходный код и собираем production-сборку
COPY . .
RUN npm run build

# ── Этап 2: production (nginx) ─────────────────────────────────────────
FROM nginx:alpine AS production

# Копируем собранные файлы из первого этапа
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем nginx в foreground-режиме
CMD ["nginx", "-g", "daemon off;"]
