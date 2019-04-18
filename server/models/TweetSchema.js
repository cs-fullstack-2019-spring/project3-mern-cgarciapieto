var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TweetSchema = new Schema(
    {
        messageField: String,
        tweetImageUrl: String,
        privateCheckBox: Boolean,

    }
);

module.exports = mongoose.model('tweet', TweetSchema);