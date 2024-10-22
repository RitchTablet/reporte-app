# Etapa 1: Build de la aplicación Angular con Node.js v20.15.1
FROM node:20.15.1-slim AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el package.json y el package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalamos las dependencias de Node.js (esto incluye las dependencias de desarrollo)
RUN npm install --legacy-peer-deps

# Copiamos el código fuente de la aplicación Angular
COPY . .

# Generamos el build de producción (con Angular)
RUN npm run build --prod

# Etapa 2: Servidor Nginx para servir la aplicación
FROM nginx:alpine

# Copiamos el build de Angular a la carpeta que Nginx usa para servir el contenido
COPY --from=build /app/dist/angular-tailwind /usr/share/nginx/html

# Exponemos el puerto 80 (para que Nginx sirva la aplicación en este puerto)
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]
