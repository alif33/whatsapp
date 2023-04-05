const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { 
      type: String
    },
    lastName: { 
      type: String
    },
    userName: {
      type: String
    },
    timezone: {
      type: String
    },
    email: { 
      type: String, 
      unique: true
    },
    image: {
      type: String
    },
    password: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
