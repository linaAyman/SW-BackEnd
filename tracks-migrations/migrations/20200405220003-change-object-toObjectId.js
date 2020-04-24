const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;


module.exports = {
  async up(db, client) {
    
  await db.collection('tracks').updateOne({"_id":ObjectId("5e85ce534676d8a0b48130c5")},{$set:{artists:ObjectId("6e85ce544676d8a0b48130b5")}})
  await db.collection('tracks').updateOne({"_id":ObjectId("5e85ce534676d8a0b48130c3")},{$set:{artists:ObjectId("6e85ce544676d8a0b48130b5")}})
  await db.collection('tracks').updateOne({"_id":ObjectId("5e85ce534676d8a0b48130c4")},{$set:{artists:ObjectId("6e85ce544676d8a0b48130b4")}})
  await db.collection('tracks').updateOne({"_id":ObjectId("5e85ce534676d8a0b48130c6")},{$set:{artists:ObjectId("6e85ce544676d8a0b48130b6")}})

  await db.collection('tracks').updateMany({"_id":{$in:[ObjectId("5e85ce544676d8a0b48130b0"),ObjectId("5e85ce544676d8a0b48130b1"),
                ObjectId("5e85ce544676d8a0b48130b2"),ObjectId("5e85ce544676d8a0b48130b3"),ObjectId("5e85ce544676d8a0b48130b4"),
                ObjectId("5e85ce544676d8a0b48130b5"),ObjectId("5e85ce544676d8a0b48130b6"),ObjectId("5e85ce544676d8a0b48130b8"),
                ObjectId("5e85ce544676d8a0b48130b9"),ObjectId("5e85ce544676d8a0b48130ba"),ObjectId("5e85ce544676d8a0b48130bb"),
                ObjectId("5e85ce544676d8a0b48130bc"),ObjectId("5e85ce544676d8a0b48130bd"),ObjectId("5e85ce544676d8a0b48130be"),
                ObjectId("5e85ce544676d8a0b48130bf"),ObjectId("5e85ce544676d8a0b48130b7")]}},{$set:{artists:ObjectId("6e85ce544676d8a0b48130b1")}})
  
  
  await db.collection('tracks').updateMany({"_id":{$in:[ObjectId("5e85ce544676d8a0b48130c0"),ObjectId("5e85ce544676d8a0b48130c1"),
      ObjectId("5e85ce544676d8a0b48130c2"),ObjectId("5e85ce544676d8a0b48130c5")]}},{$set:{artists:ObjectId("6e85ce544676d8a0b48130b1")}})
  },
  async up2(db,client){
    await db.collection('tracks').updateMany({"_id":{$in:[ObjectId("5e85ce544676d8a0b48130c0"),ObjectId("5e85ce544676d8a0b48130c1"),
    ObjectId("5e85ce544676d8a0b48130c2"),ObjectId("5e85ce544676d8a0b48130c5")]}},{$set:{artists:ObjectId("6e85ce544676d8a0b48130b1")}})
  
  },

  async down(db, client) {
   
  }
};
