const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
 url:String,
 filename:String,
  
},

  price: String,
  location: String,
  country: String,


  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Review",
    },
  ],



    category: {
        type: String,
        enum: [
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
            "Domes"
        ],
        default: "Trending"
    },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
