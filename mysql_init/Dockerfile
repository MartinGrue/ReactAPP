FROM mysql:5.7
WORKDIR /app

# Copy the database schema to the /data directory
COPY init_db.sh ./

# init_db will create the default
# database from epcis_schema.sql, then
# stop mysqld, and finally copy the /var/lib/mysql directory
# to default_mysql_db.tar.gz
RUN /bin/bash /app/init_db.sh

# run_db starts mysqld, but first it checks
# to see if the /var/lib/mysql directory is empty, if
# it is it is seeded with default_mysql_db.tar.gz before
# the mysql is fired up

ENTRYPOINT "./run_db"