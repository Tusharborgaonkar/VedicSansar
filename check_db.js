const mongoose = require('mongoose');

async function checkDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/VedicSansar');
        console.log("✅ Successfully connected to MongoDB: mongodb://localhost:27017/VedicSansar");
        
        const collections = await mongoose.connection.db.collections();
        console.log("\n📁 Collections and Document Counts:");
        console.log("--------------------------------");
        
        if (collections.length === 0) {
            console.log("The database is currently empty (no collections found).");
        } else {
            for (let collection of collections) {
                const count = await collection.countDocuments();
                console.log(`- ${collection.collectionName}: ${count} documents`);
            }
        }
        
        await mongoose.disconnect();
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
    }
}

checkDB();
