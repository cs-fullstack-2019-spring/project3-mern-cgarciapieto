var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username:{type: String, required: true, max: 100},
        password:{type: String, required: true, max: 100},
        imageURL:{type: String, required},
        backgroundImageUrl:{type: String},

        tweets: [{
            messageField:{type: String, required},
            tweetImageUrl:{type: String },
            privateCheckBox:{type: Boolean, required},}]
    },

);

module.exports = mongoose.model('userModel', UserSchema);