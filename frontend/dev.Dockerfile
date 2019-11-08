FROM node:11.1.0-alpine
ENV HOME=/home/node/app
RUN mkdir -p ${HOME}/node_modules && chown -R node:node ${HOME}
WORKDIR ${HOME}
ENV PATH ${HOME}/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
USER node
RUN yarn install
COPY --chown=node:node . .
CMD yarn run serve
