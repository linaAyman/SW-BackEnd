##### get access to initialize project for migrations
```bash
  run vscode as adminsitrator
  open terminal in vscode
  type command 'get-executionpolicy'
  if execution policy is restricted then we have to change it type command 'Set-ExecutionPolicy -Scope CurrentUser'
  then set the ExecutionPolicy to be RemoteSigned
```
//===================creating migration project
follow steps in that link
https://github.com/seppevs/migrate-mongo/blob/master/README.md

please Note : url for the database you can get from mongodb before connecting the port by default 27017
              and change database name in config file
