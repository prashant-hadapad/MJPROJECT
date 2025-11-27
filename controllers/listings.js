// const Listing = require("../models/listing");

// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mongoose = require("mongoose");
// const ExpressError = require("../utils/ExpressError");

// const mapToken = process.env.MAP_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// module.exports.index = async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render('listings/index', { allListings });
// };

// module.exports.renderNewform = (req, res) => {
//   res.render("listings/new.ejs");
// };

// module.exports.showListing = async (req, res, next) => {
//   const { id } = req.params;

//   if (!mongoose.isValidObjectId(id)) {
//     req.flash('error', 'Invalid listing ID');
//     return res.redirect('/listings');
//   }

//   const listing = await Listing.findById(id).populate({ path: 'reviews', populate: { path: "author" } }).populate("owner");

//   if (!listing) {
//     req.flash('error', 'Listing you requested does not exist');
//     return res.redirect('/listings');

//   }
//   console.log(listing);
//   return res.render('listings/show', { listing });
// };


// // module.exports.createListing = async (req, res) => {

// //   let response = await geocodingClient.forwardGeocode({

// //     query: req.body.listing.location,
// //     limit: 1,
// //   })
// //     .send();

// //   let url = req.file.path;
// //   let filename = req.file.filename;

// //   const newListing = new Listing(req.body.listing);

// //   newListing.owner = req.user._id;
// //   newListing.image = { url, filename };

// //   newListing.geometry = response.body.features[0].geometry;

// //   let savedListing = await newListing.save();
// //   console.log(savedListing);
// //   req.flash("success", "New listing is created");
// //   res.redirect('/listings');
// // }

// module.exports.createListing = async (req, res) => {

//   let response = await geocodingClient.forwardGeocode({
//     query: req.body.listing.location,
//     limit: 1,
//   }).send();

//   // If no image uploaded
//   let url;
//   let filename;

//   if (req.file) {
//     url = req.file.path;
//     filename = req.file.filename;
//   } else {
//     // default placeholder image
//     url = "https://via.placeholder.com/600";
//     filename = "placeholder";
//   }

//   const newListing = new Listing(req.body.listing);

//   newListing.owner = req.user._id;
//   newListing.image = { url, filename };

//   newListing.geometry = response.body.features[0].geometry;

//   await newListing.save();

//   req.flash("success", "New listing is created");
//   res.redirect('/listings');
// };


// module.exports.renderEditform = async (req, res, next) => {
//   const { id } = req.params;


//   if (!mongoose.isValidObjectId(id)) {
//     req.flash('error', 'Invalid listing ID');
//     return res.redirect('/listings');
//   }

//   const listing = await Listing.findById(id);

//   if (!listing) {
//     req.flash('error', 'Listing you requested does not exist');
//     return res.redirect('/listings');

//   }


//   let originalImageUrl = listing.image.url;
//   originalImageUrl = originalImageUrl.replace("/uploads", "uploads/w_250");
//   res.render('listings/edit', { listing, originalImageUrl });
// }


// module.exports.updateListing = async (req, res) => {
//   let { id } = req.params;
//   let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });


//   if (typeof req.file !== "undefined") {
//     let url = req.file.path;
//     let filename = req.file.filename;
//     listing.image = { url, filename };
//     await listing.save();
//   }

//   req.flash("success", "Listing Updated");
//   res.redirect(`/listings/${id}`);
// }

// module.exports.destroyListing = async (req, res, next) => {
//   const deleted = await Listing.findByIdAndDelete(req.params.id);
//   if (!deleted) return next(new ExpressError(404, 'Listing not found'));
//   req.flash("success", "Listing is deleted");
//   res.redirect('/listings');
// }



const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");  // ✅ FIXED (missing import)

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// INDEX – show all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index', { allListings });
};



// NEW FORM
module.exports.renderNewform = (req, res) => {
  res.render("listings/new.ejs");
};



// SHOW LISTING
module.exports.showListing = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    req.flash('error', 'Invalid listing ID');
    return res.redirect('/listings');
  }

  const listing = await Listing.findById(id)
    .populate({ path: 'reviews', populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash('error', 'Listing you requested does not exist');
    res.redirect('/listings');
  }

  return res.render('listings/show', { listing });
};



// CREATE LISTING – FIXED VERSION
module.exports.createListing = async (req, res) => {

  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  }).send();

  // Handle image safely
  let url;
  let filename;

  if (req.file) {
    url = req.file.path;
    filename = req.file.filename;
  } else {
    // fallback image
    url = "https://via.placeholder.com/600";
    filename = "placeholder";
  }

  const newListing = new Listing(req.body.listing);

  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();

  req.flash("success", "New listing is created");
  return res.redirect('/listings');
};



// EDIT FORM
module.exports.renderEditform = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    req.flash('error', 'Invalid listing ID');
    return res.redirect('/listings');
  }

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash('error', 'Listing you requested does not exist');
    res.redirect('/listings');
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/uploads", "uploads/w_250");

  return res.render('listings/edit', { listing, originalImageUrl });
};



// UPDATE LISTING
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  // Only update image if new image uploaded
  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  return res.redirect(`/listings/${id}`);
};



// DELETE LISTING
module.exports.destroyListing = async (req, res, next) => {
  const deleted = await Listing.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return next(new ExpressError('Listing not found', 404));  // ✅ FIXED
  }

  req.flash("success", "Listing is deleted");
  return res.redirect('/listings');
};
