


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const DEFAULT_IMAGE = "https://th.bing.com/th/id/OIP.vaxi6WHpxfCDiLAqFY_57QHaEK?w=321&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  
  image: {
    url:String,
    filename:String
  },
  price: {
    type: Number,
    min: 0
  },
  location: {
    type: String
  },
  country: {
    type: String
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },

  geometry:{
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }

});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
