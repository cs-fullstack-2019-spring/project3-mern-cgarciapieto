var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username:{type: String, required: true, max: 100},
        password:{type: String, required: true, max: 100},
        imageURL:{type: String},
        backgroundImageURL:{type: String},

        tweets: [{
            messageField:{type: String, required:true, max: 100},
            tweetImageUrl:{type: String },
            privateCheckBox:{type: Boolean, required:true},}]
    },

);

module.exports = mongoose.model('userModel', UserSchema);