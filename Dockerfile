# # install dependencies
# FROM node:dubnium AS dependencies

# WORKDIR /app

# COPY package.json .
# RUN npm install

# # build project
# FROM node:dubnium AS build-project

# WORKDIR /app

# COPY . .
# COPY --from=dependencies /app/node_modules node_modules

# RUN npm run build

# # prepare to run
# FROM node:dubnium-slim

# WORKDIR /app
# COPY --from=build-project /app/node_modules node_modules
# COPY --from=build-project /app/.env .env
# COPY --from=build-project /app/dist .
# ENV NODE_PATH .

# EXPOSE 3000

# CMD ["node", "main.js"]



# Gautam

FROM node:10

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
