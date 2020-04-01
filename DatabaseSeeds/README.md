

1) type cd "mongodb path" in the cmd 
you should type sth like this  cd "C:\Program Files\MongoDB\Server\4.2\bin"


2)for importing json files in your data base 
type mongoimport --jsonArray --db MusicApp --collection "name of the collection" --file "path for json file in you computer"


Note :path for your json file should end with the name of the json file it should be sth like this
D:\data\playlist.json 

Example if you will import the playlist.json file 

mongoimport --jsonArray --db MusicApp --collection playlists --file D:\data\playlist.json


by now you should see message in cmd that the documents are imported successfully in data base
and if you are already opening the mongodb then close it and open again to see the change in it
