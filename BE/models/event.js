const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    eventOrganiser: {type: Schema.Types.ObjectId, ref: "Profile", required: true},
    eventName: {type: String, required: true},
    eventDescription: {type: String, required: true},
    eventStartDate: {type: Date, required:true},
    eventStartTime: {type: String, required:true},
    eventEndDate: {type: Date, required:true},
    eventEndTime: {type: String, required:true},
    eventBuildingNumber: {type: String, required: true},
    eventStreetName: {type: String, required: true},
    eventCity: {type: String, required: true},
    eventCounty: {type: String, required: true},
    eventCountry: {type: String, required: true},
    eventPostCode: {type: String, required: true},
    eventPricing: {type: String, required: true},
    eventTicketPrice: {type: Number, required: true},
    eventTicketAmount: {type: Number, required: true},
    eventPicture: {type: String, required: true},
    eventAtendees: [{type: Schema.Types.ObjectId, ref: "Profile", required: true}],
    eventInvited: [{type: Schema.Types.ObjectId, ref: "Profile", required: true}],

});

EventSchema.virtual("eventID").get(function () {
    return this._id
});

EventSchema.virtual("aEventURL").get(function () {
    return `/catalog/event/get/${this._id}/aevent`
});

module.exports = mongoose.model("Event", EventSchema);