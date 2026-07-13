const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review.js");
const {listingSchema} = require("../Schema.js");
const{validateReview,isLoggedin,isReviewAuthor,} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");





//reviews Route
router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview ));


//DELETE REVIEWS 
router.delete("/:reviewId",
  isLoggedin
,wrapAsync(reviewController.destory))

module.exports = router