 
#!/usr/bin/env bash

set -xe

ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" -i testaws.pem ubuntu@ec2-18-222-173-123.us-east-2.compute.amazonaws.com << EOF

rm -rf SW-BackEnd
git clone https://github.com/linaAyman/SW-BackEnd.git
cd SW-BackEnd
npm install
npm install mongodb
npm install mongoose
npm install nodemon
npm install joi
npm install validator

sudo pm2 delete app
sudo pm2 start app.js --watch
exit

EOF
