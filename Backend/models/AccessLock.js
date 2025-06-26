const { Schema, model } = require("mongoose");

const AccessLockSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  blockedUntil: {
    type: Date,
    default: null,
  },
});

module.exports = model("AccessLock", AccessLockSchema);
