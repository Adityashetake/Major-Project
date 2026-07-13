const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/ExpressError");
const {listingSchema,reviewSchema} = require("../Schema.js");
const {isLoggedin,isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/").get( wrapAsync(listingController.index ))
.post( isLoggedin,upload.single('image'),
    validateListing,
    wrapAsync(listingController.createListing));


//New route
 router.get("/new",isLoggedin ,listingController.renderNewForm);

 router.get("/search", wrapAsync(listingController.searchListing));

 router.get(
    "/category/:category",
    wrapAsync(listingController.filterCategory)
);

router.route("/:id")
.get(  wrapAsync(listingController.ShowListing))
.put(
 isLoggedin, 
  isOwner,
validateListing,isLoggedin ,wrapAsync( listingController.updateListing)
)
.delete(isLoggedin,
   isOwner,
   wrapAsync(listingController.deleteListing));











//Edit route
router.get("/:id/edit",isLoggedin, isOwner,wrapAsync( listingController.renderEditForm));






module.exports = router; 