FROM node:16.17.1 AS builder

WORKDIR /project/

COPY ./ /project/

# Установка зависимостей
RUN yarn install
# Сборка проекта в папку /dist
RUN yarn build

FROM nginx:1.21.6-alpine

# Копируем статические файлы в папку с Nginx
COPY --from=builder /project/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]