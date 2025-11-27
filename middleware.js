const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require('./utils/ExpressError.js');

const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {

  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing");
    return res.redirect("/login");
  }
  next();
}


module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the owner of the listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
}



function normalizePayloadObject(obj) {
  if (obj && obj.listing && typeof obj.listing === 'object') return obj.listing;
  return obj || {};
}


module.exports.validationListing = (req, res, next) => {
  const incoming = normalizePayloadObject(req.body);


  const { error, value } = listingSchema.validate(incoming, {
    abortEarly: false,
    stripUnknown: true,
    convert: true
  });

  if (error) {
    console.error('Listing validation failed. Joi details:', JSON.stringify(error.details, null, 2));
    const msg = error.details.map(d => d.message).join(', ');
    return next(new ExpressError(400, msg));
  }


  req.body = { listing: value };
  next();
};

module.exports.validationReview = (req, res, next) => {
  const incoming = (req.body && typeof req.body.review === 'object') ? req.body.review : req.body;


  const { error, value } = reviewSchema.validate(incoming, {
    abortEarly: false,
    stripUnknown: true,
    convert: true
  });

  if (error) {
    console.error('Review validation failed. Joi details:', JSON.stringify(error.details, null, 2));
    const msg = error.details.map(d => d.message).join(', ');
    return next(new ExpressError(400, msg));
  }
  req.body = { ...req.body, review: value };
  next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the author of the review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}