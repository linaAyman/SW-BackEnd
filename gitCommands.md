##### for deleting a remote branch
```bash 
git push origin --delete <branch_name>
```

##### for getting into master branch and exit another branch
```bash
git checkout -b master
```

##### for changing end of file LF -> CRLF or visaverca
```bash
git config --global core.autocrlf input
```
##### for setting the origin repo 
```bash
git remote add origin <link_of_our_repo>
```

##### for creating a branch
```bash
git branch <branch_name>
dont forget to make push command after creating the branch so you can see the new branch here
```

##### for pushing on a branch 
```bash
git push -u origin <branch_name>
```

##### for viewing all existing branches
```bash
git branch -a
```
