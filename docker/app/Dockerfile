# Usa a imagem base do PHP
FROM php:8.3-fpm

# Instala extensões necessárias para Laravel + MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Ajusta permissões de storage e cache
RUN mkdir -p /var/www/storage /var/www/bootstrap/cache \
    && chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

WORKDIR /var/www
