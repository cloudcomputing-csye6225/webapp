#!/bin/sh

echo "******* Started executing script file *******"
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get clean

echo "******* Installing nodejs *******"
sudo apt-get install -y nodejs
node -v

echo "******* Installing npm *******"
sudo apt-get install -y npm
npm -v

echo "******* Installing unzip *******"
sudo apt install unzip
unzip -v

echo "******* Installing mariadb *******"
sudo apt install -y mariadb-server
mysql -V

# echo "******* Creating .env file *******"
# cat<<EOL > .env
# PORT=8080
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_USER=admin
# DB_PASSWORD=password
# DB_NAME=mydb
# DB_DIALECT=mysql
# EOL

# echo "****** Checking .env file content *******"
# cat .env

echo "GRANT ALL ON *.* TO 'admin'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;" | sudo mariadb
echo "FLUSH PRIVILEGES;" | sudo mariadb
echo "SHOW DATABASES;" | sudo mariadb
echo "CREATE database mydb;" |sudo mariadb
echo "SHOW DATABASES;" | sudo mariadb
echo "exit" | sudo mariadb
sudo systemctl status mariadb
sudo mysqladmin version

echo "******* unzip project *******"
unzip webapp.zip
echo "******* WebApp unzipped successfully *******"

pwd
ls -al
cd webapp/ || exit
pwd

echo "********* Installing Dependencies *******"
npm install


echo "******* Stopped executing script file *******"