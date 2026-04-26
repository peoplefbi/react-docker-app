# ToDo App — React + Docker

Простое React-приложение со списком задач, упакованное в Docker-контейнер с помощью многоступенчатой сборки.

## Скриншот

![Приложение в браузере](screenshot.png)

## Стек

- **React 18** — фронтенд
- **nginx:alpine** — веб-сервер в контейнере
- **Docker** — многоступенчатая сборка (node:alpine → nginx:alpine)

---

## Запуск без Docker (локально)

```bash
npm install
npm start
```

Приложение откроется по адресу: http://localhost:3000

---

## Сборка Docker-образа

```bash
docker build -t react-todo-app .
```

## Запуск контейнера

```bash
docker run -d -p 8080:80 --name todo-app react-todo-app
```

Откройте в браузере: **http://localhost:8080**

## Остановка и удаление контейнера

```bash
docker stop todo-app && docker rm todo-app
```

## Просмотр запущенных контейнеров

```bash
docker ps
```

---

## Структура проекта

```
react-docker-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js        # Основной компонент (ToDo список)
│   ├── App.css       # Стили
│   └── index.js      # Точка входа
├── Dockerfile        # Многоступенчатая сборка
├── .dockerignore     # Исключения для Docker
├── package.json
└── README.md
```

## Как работает Dockerfile

1. **Этап build** (`node:18-alpine`) — устанавливает зависимости (`npm install`) и собирает статику (`npm run build`)
2. **Этап production** (`nginx:alpine`) — копирует готовую сборку из первого этапа в `/usr/share/nginx/html` и запускает nginx
