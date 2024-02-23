const { MongoClient } = require('mongodb');
require('dotenv');

const mongoURI = "mongodb+srv://user:LQc6oPXUYafJvL5N@inconspicuousness-db.tv0mlhr.mongodb.net/retryWrites=true&w=majority";

async function removeAllCollections() {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('\x1b[42mConnected to MongoDB\x1b[0m');

        const database = client.db();
        const collections = await database.listCollections().toArray();

        for (const collection of collections) {
            await database.dropCollection(collection.name);
            console.log(`\x1b[43mCollection '${collection.name}' dropped\x1b[0m`);
        }
    } finally {
        await client.close();
        console.log('\x1b[41mDisconnected from MongoDB\x1b[0m');
    }
}

removeAllCollections();

