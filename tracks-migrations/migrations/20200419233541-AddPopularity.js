module.exports = {
  async up(db, client) {

    let number=Math.floor(Math.random() * 100)
    await db.collection('tracks').find().forEach(async function(doc){
      number=Math.floor(Math.random() * 100);
      await db.collection('tracks').updateOne({'_id':doc._id},{$set:{"popularity":number}})
    })
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
