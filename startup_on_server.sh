IP=$(dig +short myip.opendns.com @resolver1.opendns.com)

sed -i "s/localhost/$IP/g" js/chat_client.js

sudo apt-get update
sudo apt-get install npm nodejs-legacy

npm install
sudo node server.js