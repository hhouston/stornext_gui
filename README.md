StorNext Web Service GUI: IMT
=============================


Installation

git clone https://github.com/hhouston/stornext_gui.git

cd stornext_gui && npm install

Run project node and client server locally

$>> npm start (react app)

$>> npm run serverlocal (node server)

Run project node and client server on production

$>> npm start

$>> npm run server

*IMPORTANT*
When running locally take out the PORT=80 in package.json line 17 &
change the url in App.js to be localhost vs 172.16.3.51


Tips
------------
1. run node server on file structure (172.16.3.51)
2. run client app on file linux build (172.16.3.11:80)
3. access app through load balancer builder (136.179.6.56:80)
