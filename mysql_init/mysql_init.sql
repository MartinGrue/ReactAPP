CREATE USER 'appuser'@'%' IDENTIFIED WITH mysql_native_password BY 'SPA2019DB';
GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'%' WITH GRANT OPTION;