# Step 1: base image
FROM php

# Step 2: install dependencies for Laravel + PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    git \
    unzip \
    zip \
    curl \
    && docker-php-ext-install pdo pdo_pgsql

# Step 3: install composer (package manager for PHP)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Step 4: set working directory
WORKDIR /app

# Step 5: copy all files to container
COPY . .

# Step 6: install PHP dependencies
RUN composer install

# Step 7: expose port 8000 (Laravel server)
EXPOSE 8000

# Step 8: run Laravel server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]