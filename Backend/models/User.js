const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: false,
        required: true
    },
    password: String,
    roles: {
        type: [String],
        default: []
    },
    failedAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = model("User", UserSchema);


