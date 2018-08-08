FROM node:9.6.1
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install
RUN npm install -g @angular/cli@1.7.1

CMD ng serve --host 0.0.0.0
