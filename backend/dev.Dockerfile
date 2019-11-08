FROM node:11.1.0-alpine
RUN apk update && \
  apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN yarn global add --silent node-gyp && \
  yarn cache clean
ENV HOME=/home/node/app
RUN mkdir -p ${HOME}/node_modules && chown -R node:node ${HOME}
WORKDIR ${HOME}
ENV PATH ${HOME}/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
USER node
RUN yarn install && yarn cache clean
COPY --chown=node:node . .
CMD yarn run dev
