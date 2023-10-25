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

echo "******* Moving zip file location to opt folder *******"
sudo cp /tmp/webapp.zip /opt/webapp.zip

cd /opt || exit
sudo mkdir webapp
sudo unzip webapp.zip -d webapp
sudo apt-get remove -y git

ls -al
cd webapp/ || exit

echo "********* Installing Dependencies *******"
sudo npm install

echo "******* Create group and user *******"
sudo groupadd csye6225_webapp
sudo useradd -s /bin/false -g csye6225_webapp -d /opt/csye6225_webapp -m csye6225_webapp

sudo systemctl daemon-reload
sudo systemctl enable bootup.service
sudo systemctl start bootup.service
sudo systemctl status bootup.service

sudo cp /tmp/bootup.service /lib/systemd/system/bootup.service

echo "******* Stopped executing script file *******"