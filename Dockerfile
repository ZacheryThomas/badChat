FROM ubuntu
EXPOSE 80

RUN mkdir /var/lib/badChat
VOLUME ./ /var/lib/badChat

RUN sudo apt-get update
RUN sudo apt-get install npm nodejs-legacy

RUN npm install

ENTRYPOINT "IP=$(dig +short myip.opendns.com @resolver1.opendns.com) && sed -i 's/localhost/$IP/g' js/chat_client.js && node server.js"