if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "69ed1bb574508a35243c1752",
    }));

    // Assign categories to each listing
    const categories = [
        "Trending",
        "Rooms",
        "Iconic Cities",
        "Mountain",
        "Castle",
        "Pools",
        "Farms",
        "Arctic",
        "Beach",
        "Yacht",
        "Domes",
    ];
    initData.data = initData.data.map((obj, index) => ({
        ...obj,
        category: categories[index % categories.length],
    }));

    await Listing.insertMany(initData.data);
    console.log("data was inserted");
};
initDB();
