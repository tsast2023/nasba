const Review = require('../models/reviewModel');

exports.addReview = async (req, res) => {
    try {
        const { productId, userId, userName, stars, description, productTitle} = req.body;
        const newReview = new Review ({
            productId : productId,
            userId : userId,
            userName : userName,
            stars : stars,
            description : description,
            productTitle : productTitle,
        })
        await newReview.save();
        res.json(newReview)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Check if the review with the given ID exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ status: 'fail', message: 'Review not found' });
    }

    // Delete the review
    await Review.findByIdAndDelete(reviewId);

    res.status(204).json({ status: 'success'});
  } catch (err) {
    res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
  }
};

