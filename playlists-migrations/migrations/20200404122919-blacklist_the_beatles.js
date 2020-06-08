const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('playlists').updateOne({"_id":ObjectId("6e85ce544676d8a0b48130b2")},{$push:{tracks:ObjectId("5e85ce534676d8a0b48130c4")}})
    await db.collection('playlists').updateOne({"_id":ObjectId("6e85ce544676d8a0b48130b2")},{$push:{tracks:ObjectId("5e85ce534676d8a0b48130c5")}})
   },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
