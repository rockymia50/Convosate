#latest version of NODE
FROM node:10

#Create app directory
WORKDIR /users/src/app

# Install APP dependecies, use * 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node" , "server.js"]

