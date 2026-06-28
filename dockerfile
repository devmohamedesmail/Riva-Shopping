# =========================================
# Stage 1: Frontend Build
# =========================================
FROM node:22-alpine AS frontend

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# =========================================
# Stage 2: Laravel + FrankenPHP
# =========================================
FROM dunglas/frankenphp

WORKDIR /app

# Install system packages
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip

# PHP extensions
RUN install-php-extensions \
    pdo_mysql \
    mbstring \
    bcmath \
    exif \
    intl \
    gd \
    pcntl \
    zip

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy composer files first
COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

# Copy app
COPY . .

# Copy frontend build
COPY --from=frontend /app/public/build ./public/build

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Laravel optimization
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

EXPOSE 8080

CMD php artisan octane:start \
    --server=frankenphp \
    --host=0.0.0.0 \
    --port=8080