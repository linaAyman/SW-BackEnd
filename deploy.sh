 
#!/usr/bin/env bash

set -xe

ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" -i testaws.pem ubuntu@ec2-3-137-69-49.us-east-2.compute.amazonaws.com << EOF

rm -rf SW-BackEnd
git clone https://github.com/linaAyman/SW-BackEnd.git
cd SW-BackEnd
npm install
npm install mongodb
npm install mongoose
npm install nodemon
npm install joi
npm install validator

sudo pm2 delete server
sudo pm2 start server.js

sudo npm install -g migrate-mongo
migrate-mongo
cd user-migrations
migrate-mongo up

exit

EOF
