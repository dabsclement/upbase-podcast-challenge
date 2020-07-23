var mongoose = require("mongoose");

const PodcastSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true

  },
  description: {
    type: String,
    required: true,
    trim: true

  },
  tag: {
    type: String

  },
  file: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  }
},

{
  timestamps: true
}
);

module.exports = mongoose.model("podcast", PodcastSchema);
