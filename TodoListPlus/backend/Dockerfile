FROM node:12-alpine3.12

COPY . /workspace
WORKDIR /workspace
RUN npm install

EXPOSE 3002

CMD PORT=3002 npm run start