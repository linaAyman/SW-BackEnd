const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;
module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  await db.collection('albums').updateOne({"_id":ObjectId("5e88a3b0315b08151b8fae41")},{$set:{release_date:"2019-01-10T13:19:42.517+00:00"}})
  await db.collection('albums').updateOne({"_id":ObjectId("5e88a3b0315b08151b8fae42")},{$set:{release_date:"2019-03-10T13:19:42.517+00:00"}})
  
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
