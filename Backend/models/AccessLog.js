const { Schema, model } = require("mongoose");

const AccessLogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    route: String,
    date: {
        type: Date,
        default: Date.now
    },
    success: Boolean,
    reason: String
});

module.exports = model("AccessLog", AccessLogSchema);