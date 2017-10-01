#!/usr/bin/env bash

# get root access
sudo su

sudo apt-add-repository ppa:ondrej/php
apt-get update && sudo apt-get upgrade

# install nginx
apt-get install -y nginx
service nginx start

# install node
apt-get install -y g++
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# install react create app
npm install -g create-react-app

# install php
apt-get install -y php7.0-cli php7.0-common php7.0-fpm

# install mariadb
apt-get install -y mariadb-server

# set up nginx server
rm /etc/nginx/sites-available/default
rm /etc/nginx/sites-enabled/default
cp /srv/.provision/nginx/nginx.conf /etc/nginx/sites-available/site.conf
chmod 644 /etc/nginx/sites-available/site.conf
ln -sf /etc/nginx/sites-available/site.conf /etc/nginx/sites-enabled/site.conf
sed -e "s/sendfile on;/sendfile off;/" /etc/nginx/nginx.conf > temp_file
mv -f temp_file /etc/nginx/nginx.conf
service nginx restart

# set locale
export LC_ALL=C

# add default ssh dir
echo "cd /srv" | tee -a /etc/bash.bashrc