FROM cypress/browsers:chrome69
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
