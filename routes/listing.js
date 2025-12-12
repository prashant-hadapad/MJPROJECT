

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validationListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

// ---------------- MAIN LISTING ROUTES ----------------

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validationListing,
    wrapAsync(listingController.createListing)
  );

// NEW FORM
router.get("/new", isLoggedIn, listingController.renderNewform);

// SHOW, UPDATE, DELETE
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validationListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// EDIT FORM
 router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditform));


// -------------- SIMPLE SEARCH (NO AI) ------------------
router.get("/ai/search", wrapAsync(async (req, res) => {

  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.json([]);
  }

  const regex = new RegExp(query, "i");

  const mongoFilter = {
    $or: [
      { title: regex },
      { description: regex },
      { category: regex },
      { location: regex }
    ]
  };

  const results = await Listing.find(mongoFilter);
  res.json(results);
}));


module.exports = router;








