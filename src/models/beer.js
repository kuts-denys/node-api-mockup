// Load required packages
const mongoose = require('mongoose');

// Define our beer schema
const BeerSchema = new mongoose.Schema(
  {
    name: String,




    type: String,
    quantity: Number,
            ownerId: String,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
      },
    },
  },
);

// Export the Mongoose model
module.exports = mongoose.model('Beer', BeerSchema);
