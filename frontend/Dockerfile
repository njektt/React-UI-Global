FROM node:latest

WORKDIR /app

COPY package.json .
COPY . .
RUN npm install react-scripts
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
EXPOSE 3000