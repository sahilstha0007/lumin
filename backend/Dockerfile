FROM docker.io/composer:latest AS composer
FROM php:8.4-fpm
# Dependencies

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    default-mysql-client


RUN docker-php-ext-install pdo pdo_mysql zip



COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

EXPOSE 8000

CMD php -S 0.0.0.0:8000 -t public
