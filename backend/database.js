const mongoose = require("mongoose");
const mongoURI = 'mongodb://maheshkamath:maheshkamathtthecart@ac-doeinyd-shard-00-00.ydo6ksp.mongodb.net:27017,ac-doeinyd-shard-00-01.ydo6ksp.mongodb.net:27017,ac-doeinyd-shard-00-02.ydo6ksp.mongodb.net:27017/tthecartmern2?ssl=true&replicaSet=atlas-mrlb5f-shard-0&authSource=admin&retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    const chalk = (await import('chalk')).default;
    const customColor = chalk.black.bold; 
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Fetching data from "food_items" collection
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const data = await foodItemsCollection.find({}).toArray();

    // Fetching data from "food_category" collection
    const foodCategoryCollection = mongoose.connection.db.collection("food_category");
    const catData = await foodCategoryCollection.find({}).toArray();

    // Assigning data to global variables after both operations are completed
    global.food_items = data;
    global.food_category = catData;

    console.log(global.food_items);
    console.log(customColor(global.food_category));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
