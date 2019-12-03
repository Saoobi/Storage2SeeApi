const mongoose = require("mongoose");

const storageLinkSchema = new mongoose.Schema({
  categorie: {
    type: String,
    required: true
  },
  urlToStore: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("StorageLink", storageLinkSchema);
