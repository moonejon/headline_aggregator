var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String,
    required: true,
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

//TODO: This needs to be changed to have a one to many relationship with Note, to allow for multiple comments

var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
