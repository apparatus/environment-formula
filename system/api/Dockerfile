FROM node
ADD ./package.json /
RUN npm install
ADD . /
ENV NODE_ENV production
CMD npm start
