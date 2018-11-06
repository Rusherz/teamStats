const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SeasonSchema = new Schema({
  season: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});

module.exports = Season = mongoose.model("season", SeasonSchema);
