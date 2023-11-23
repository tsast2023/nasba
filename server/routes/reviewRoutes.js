// routes/reviewRoutes.js
const express = require('express');
const reviewController = require('../controller/reviewController');

const router = express.Router();

router.get('/reviews', reviewController.getAllReviews);
router.delete('/delete/:reviewId', reviewController.deleteReview);
router.post("/add" , reviewController.addReview);


module.exports = router;
