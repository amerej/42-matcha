FROM mdillon/postgis

COPY ./z_matcha.sql /docker-entrypoint-initdb.d/
COPY ./z_seed.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
