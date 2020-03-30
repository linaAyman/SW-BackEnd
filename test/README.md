
# VERY IMPORTANT NOTE when you create a file in test folder use this command "New-Item <file_name> -type file" instead of touch command mentioned in link below because it is for linux only .



# follow steps in the below link to make unit testing
https://buddy.works/guides/how-automate-nodejs-unit-tests-with-mocha-chai?utm_source=medium&utm_medium=post&utm_campaign=how-to-run-mocha-chai-unit-tests-on-node-js-apps&utm_content=link


# we will use request package in node.js to send requests to server so take a look for requests created in test-searchController.js file in test folder 


please follow the naming convention test-<controllername>.js  for example : test-userController.js

# to run the tests 
    *npm run watch
    *open new power shell by clicking "+" symbol in terminal
    *type in the new power shell  npm run test
