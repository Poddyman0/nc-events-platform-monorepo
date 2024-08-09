const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    profilePassword: {type: String, required: true},
    profileTelephone: {type: String, required: true},
    profileEmail: {type: String, required: true},
    profileFirstName: {type: String, required: true},
    profileSecondName: {type: String, required: true},
    profileDOB: {type: Date, required:true},
    profileRole: {type: String, required: true},
    profileCardHolderName: {type: String, required: true},
    profileBankName: {type: String, required: true},
    profileCardNumber: {type: Number, required: true},
    profileExpireyDate: {type: String, required: true},
    profileCVV: {type: Number, required: true},
    profilePostCode: {type: String, required: true},
    profileHouseNumber: {type: String, required: true},
    profileStreet: {type: String, required: true},
    profileCity: {type: String, required: true},
    profileCounty: {type: String, required: true},
    profileCountry: {type: String, required: true},
    profileSignedIn: {type: Boolean, required: true},
});

ProfileSchema.virtual("profileID").get(function () {
    return this._id
})

ProfileSchema.virtual("aProfileURL").get(function () {
    return `/catalog/profile/get/${this._id}/profile`
});

module.exports = mongoose.model("Profile", ProfileSchema);
