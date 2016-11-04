FROM node
ADD /srv/package.json /
RUN npm install --production
ADD srv /
CMD npm start