const Event = require("../models/event");
const Profile = require("../models/profile");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

/// EVENT CONTROLLER ///
// POST request to create a event.
exports.event_create_post = [
    body("eventOrganiser", "eventOrganiser must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventOrganiser must have at least 1 character'),
    body("eventName", "eventName must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventName must have at least 1 character'),
    body("eventDescription", "eventDescription must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventDescription must have at least 1 character'),
    body("eventBuildingNumber", "eventBuildingNumber must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventBuildingNumber must have at least 1 character'),
    body("eventStreetName", "eventStreetName must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventStreetName must have at least 1 character'),
    body("eventCity", "eventCity must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventCity must have at least 1 character'),
    body("eventCounty", "eventCounty must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventCounty must have at least 1 character'),
    body("eventCountry", "eventCountry must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventCountry must have at least 1 character'),
    body("eventPostCode", "eventPostCode must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventPostCode must have at least 1 character'),
    body("eventPricing", "eventPricing must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventPricing must have at least 1 character'),
    body("eventTicketPrice", "eventTicketPrice must be numeric")
        .isNumeric()
        .withMessage('eventTicketPrice must be numeric'),
    body("eventTicketAmount", "eventTicketAmount must be numeric")
        .isNumeric()
        .withMessage('eventTicketAmount must be numeric'),
    body("eventPicture", "eventPicture must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventPicture must have at least 1 character'),
    body("eventStartDate", "eventStartDate must be a valid date")
        .isDate()
        .withMessage('eventStartDate must be a valid date')
        .escape(),
    body("eventEndDate", "eventEndDate must be a valid date")
        .isDate()
        .withMessage('eventEndDate must be a valid date')
        .escape(),
    body("eventStartTime", "eventStartTime must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventStartTime must have at least 1 character'),
    body("eventEndTime", "eventEndTime must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventEndTime must have at least 1 character'),
    body("eventAtendees", "eventAtendees must contain at least 1 characters")
        .isArray().withMessage('eventAtendees must have at least 1 character'),
    body("eventInvited", "eventInvited must contain at least 1 characters")
        .isArray().withMessage('eventInvited must have at least 1 character'),
    asyncHandler(async (req, res, next) => {
    const aEvent = new Event({
        eventOrganiser: req.body.eventOrganiser,
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventStartDate: req.body.eventStartDate,
        eventStartTime: req.body.eventStartTime,
        eventEndDate: req.body.eventEndDate,
        eventEndTime: req.body.eventEndTime,
        eventBuildingNumber: req.body.eventBuildingNumber,
        eventStreetName: req.body.eventStreetName,
        eventCity: req.body.eventCity,
        eventCounty: req.body.eventCounty,
        eventCountry: req.body.eventCountry,
        eventPostCode: req.body.eventPostCode,
        eventPricing: req.body.eventPricing,
        eventTicketPrice: req.body.eventTicketPrice,
        eventTicketAmount: req.body.eventTicketAmount,
        eventPicture: req.body.eventPicture,
        eventAtendees: req.body.eventAtendees,
        eventInvited: req.body.eventInvited
      });
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({
            event: aEvent,
            errors: errors.array(),
            msg: "errors",
        }) 
      } else {
        await aEvent.save();
        res.json({
            event: aEvent,
            msg: "Event Created Successfully",
        })
      }      
    })
]

// POST request to delete a event.
exports.event_delete_post = asyncHandler(async (req, res, next) => {
    const aEventExists = await Event.findById(req.params.id).exec();
    let errors = []
    let eventIDToDelete = req.params.id
    console.log("EE", aEventExists)
    if (eventIDToDelete === null) {
        errors.push("Event ID does not exist")
        res.json({
            event: aEventExists,
            errors: errors,
            msg: "Error"
        })
    } else {
        const aEvent = await Event.findByIdAndDelete(req.params.id).exec();
        res.json({
            event: aEvent,
            msg: "Event deleted successfully" 
        })
    }
})

// GET request to get all events
exports.events_get = asyncHandler(async (req, res, next) => {
    console.log("currUser", res.locals.currentUser)
    const allEvents = await Event.find({}).exec();
    const allProfiles = await Profile.find({}).exec();
    let allEventsCopy = []
    let aEventCopy = {}
    allEvents.forEach(event => {
        console.log("event", event)
        aEventCopy = {};
        aEventCopy._id = event._id
        aEventCopy.eventOrganiser = {}
        aEventCopy.eventName = event.eventName
        aEventCopy.eventDescription = event.eventDescription
        aEventCopy.eventStartDate = event.eventStartDate
        aEventCopy.eventStartTime = event.eventStartTime
        aEventCopy.eventEndDate = event.eventEndDate
        aEventCopy.eventEndTime = event.eventEndTime
        aEventCopy.eventBuildingNumber = event.eventBuildingNumber
        aEventCopy.eventStreetName = event.eventStreetName
        aEventCopy.eventCity = event.eventCity
        aEventCopy.eventCounty = event.eventCounty
        aEventCopy.eventCountry =event.eventCountry
        aEventCopy.eventPostCode = event.eventPostCode
        aEventCopy.eventPricing = event.eventPricing
        aEventCopy.eventTicketPrice = event.eventTicketPrice
        aEventCopy.eventTicketAmount = event.eventTicketAmount
        aEventCopy.eventPicture = event.eventPicture
        aEventCopy.eventAtendees = []
        aEventCopy.eventInvited = []

        allProfiles.forEach(user => {
            let profileID = `${user._id}`
            let eventOrganiserID = `${event.eventOrganiser}`
            if (eventOrganiserID === profileID) {
                aEventCopy.eventOrganiser.profileFirstName = user.profileFirstName
                aEventCopy.eventOrganiser.profileSecondName = user.profileSecondName
                aEventCopy.eventOrganiser.profileRole = user.profileRole
                aEventCopy.eventOrganiser._id = user._id

            }
        })
        if (event.eventAtendees.length > 0) {
            event.eventAtendees.forEach(EAID => {
                let eventAtendeeID = `${EAID}`
                allProfiles.forEach(user => {
                    let profileID = `${user._id}`
                    if (eventAtendeeID === profileID) {

                        let eventAtendee = {}
                        eventAtendee._id = user._id
                        eventAtendee.profileFirstName = user.profileFirstName
                        eventAtendee.profileSecondName = user.profileSecondName
                        eventAtendee.profileRole = user.profileRole

                        aEventCopy.eventAtendees.push(eventAtendee)

                    }
                    })
                })
        } 
        if (event.eventInvited.length > 0) {
            event.eventInvited.forEach(EAID => {
                let eventAtendeeID = `${EAID}`
                allProfiles.forEach(user => {
                    let profileID = `${user._id}`
                    if (eventAtendeeID === profileID) {

                        let eventAtendee = {}
                        eventAtendee._id = user._id
                        eventAtendee.profileFirstName = user.profileFirstName
                        eventAtendee.profileSecondName = user.profileSecondName
                        eventAtendee.profileRole = user.profileRole

                        aEventCopy.eventInvited.push(eventAtendee)

                    }
                })
            })
        }
        if (aEventCopy.eventAtendees.length === event.eventAtendees.length && aEventCopy.eventInvited.length === event.eventInvited.length) {
                
            allEventsCopy.push(aEventCopy)
        }
        
    })
    if (!allEvents) {
        res.json({
            events: allEventsCopy,
            msg: "Events get unsuccessfull as all events do not exist"
        })
    } else if (!allProfiles) {
        res.json({
            events: allEventsCopy,
            msg: "Events get unsuccessfull as all profiles do not exist"
        })
    } else {
        console.log("allEventsCopy", allEventsCopy)
        res.json({
            events: allEventsCopy,
            msg: "Events get successfull"
        })
    }
})

// GET request to get a event.
exports.event_get = asyncHandler(async (req, res, next) => {
    const aEvent = await Event.findById(req.params.id).exec();
    const allProfiles = await Profile.find({}).exec();
    let aEventCopy = {};
    aEventCopy._id = aEvent._id
    aEventCopy.eventOrganiser = {}
    aEventCopy.eventName = aEvent.eventName
    aEventCopy.eventDescription = aEvent.eventDescription
    aEventCopy.eventStartDate = aEvent.eventStartDate
    aEventCopy.eventStartTime = aEvent.eventStartTime
    aEventCopy.eventEndDate = aEvent.eventEndDate
    aEventCopy.eventEndTime = aEvent.eventEndTime
    aEventCopy.eventBuildingNumber = aEvent.eventBuildingNumber
    aEventCopy.eventStreetName = aEvent.eventStreetName
    aEventCopy.eventCity = aEvent.eventCity
    aEventCopy.eventCounty = aEvent.eventCounty
    aEventCopy.eventCountry =aEvent.eventCountry
    aEventCopy.eventPostCode = aEvent.eventPostCode
    aEventCopy.eventPricing = aEvent.eventPricing
    aEventCopy.eventTicketPrice = aEvent.eventTicketPrice
    aEventCopy.eventTicketAmount = aEvent.eventTicketAmount
    aEventCopy.eventPicture = aEvent.eventPicture
    aEventCopy.eventAtendees = []
    aEventCopy.eventInvited= []

    allProfiles.forEach(user => {
        let profileID = `${user._id}`
        let eventOrganiserID = `${aEvent.eventOrganiser}`
        if (eventOrganiserID === profileID) {
            aEventCopy.eventOrganiser.profileFirstName = user.profileFirstName
            aEventCopy.eventOrganiser.profileSecondName = user.profileSecondName
            aEventCopy.eventOrganiser.profileRole = user.profileRole
            aEventCopy.eventOrganiser._id = user._id
        }
    })
        aEvent.eventAtendees.forEach(EAID => {
            let eventAtendeeID = `${EAID}`
            allProfiles.forEach(user => {
                let profileID = `${user._id}`
                if (eventAtendeeID === profileID) {
                    let eventAtendee = {}
                    eventAtendee._id = user._id
                    eventAtendee.profileFirstName = user.profileFirstName
                    eventAtendee.profileSecondName = user.profileSecondName
                    eventAtendee.profileRole = user.profileRole
                    eventAtendee.profileEmail = user.profileEmail

                    eventAtendee._v = user._v
                    aEventCopy.eventAtendees.push(eventAtendee)
                }
            })
        }) 
        aEvent.eventInvited.forEach(EAID => {
            let eventAtendeeID = `${EAID}`
            allProfiles.forEach(user => {
                let profileID = `${user._id}`
                if (eventAtendeeID === profileID) {
                    let eventAtendee = {}
                    eventAtendee._id = user._id
                    eventAtendee.profileFirstName = user.profileFirstName
                    eventAtendee.profileSecondName = user.profileSecondName
                    eventAtendee.profileRole = user.profileRole
                    eventAtendee.profileEmail = user.profileEmail

                    eventAtendee._v = user._v
                    aEventCopy.eventInvited.push(eventAtendee)
                }
            })
        }) 
        console.log("a event copy", aEventCopy)
     if (!aEvent) {
        res.json({
            event: aEventCopy,
            msg: "Event get unsuccessfull as event does not exist"
        })
    } else if (!allProfiles) {
        res.json({
            event: aEventCopy,
            msg: "Events get unsuccessfull as all profiles do not exist"
        })
    } else {
        res.json({
            event: aEventCopy,
            msg: "Event get successfull"
        })
    }
})
// from here


// POST request to update a event.
exports.event_update_post = [
    body("eventOrganiser", "eventOrganiser must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventOrganiser must have at least 1 character'),
    body("eventName", "eventName must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventName must have at least 1 character'),
    body("eventDescription", "eventDescription must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventDescription must have at least 1 character'),
    body("eventBuildingNumber", "eventBuildingNumber must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventBuildingNumber must have at least 1 character'),
    body("eventStreetName", "eventStreetName must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventStreetName must have at least 1 character'),
    body("eventCity", "eventCity must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventCity must have at least 1 character'),
    body("eventCounty", "eventCounty must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventCounty must have at least 1 character'),
    body("eventCountry", "eventCountry must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventCountry must have at least 1 character'),
    body("eventPostCode", "eventPostCode must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventPostCode must have at least 1 character'),
    body("eventPricing", "eventPricing must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventPricing must have at least 1 character'),
    body("eventPricing", "eventPricing must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventPricing must have at least 1 character'),
    body("eventPicture", "eventPicture must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventPicture must have at least 1 character'),
    body("eventStartDate", "eventStartDate must be a valid date")
        .isDate()
        .withMessage('eventStartDate must be a valid date')
        .escape(),
    body("eventEndDate", "eventEndDate must be a valid date")
        .isDate()
        .withMessage('eventEndDate must be a valid date')
        .escape(),
    body("eventStartTime", "eventStartTime must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventStartTime must have at least 1 character'),
    body("eventEndTime", "eventEndTime must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventEndTime must have at least 1 character'),
    body("eventAtendees", "eventAtendees must contain at least 1 characters")
        .isArray().withMessage('eventAtendees must have at least 1 character'),
    body("eventInvited", "eventInvited must contain at least 1 characters")
        .isArray().withMessage('eventInvited must have at least 1 character'),
    asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const eventToUpdate = Event.findById(req.params.postID).exec();
    const aEvent = new Event({
        eventOrganiser: req.body.eventOrganiser,
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventStartDate: req.body.eventStartDate,
        eventStartTime: req.body.eventStartTime,
        eventEndDate: req.body.eventEndDate,
        eventEndTime: req.body.eventEndTime,
        eventBuildingNumber: req.body.eventBuildingNumber,
        eventStreetName: req.body.eventStreetName,
        eventCity: req.body.eventCity,
        eventCounty: req.body.eventCounty,
        eventCountry: req.body.eventCountry,
        eventPostCode: req.body.eventPostCode,
        eventPricing: req.body.eventPricing,
        eventTicketPrice: req.body.eventTicketPrice,
        eventTicketAmount: req.body.eventTicketAmount,
        eventPicture: req.body.eventPicture,
        eventAtendees: req.body.eventAtendees,
        eventInvited: req.body.eventInvited,
        _id: req.params.id, // This is required, or a new ID will be assigned!
      });
      if (!errors.isEmpty()) {
        res.json({
            event: eventToUpdate,
            errors: errors.array(),
            msg: "errors",
        }) 
      } else {
        await Event.findByIdAndUpdate(req.params.id, aEvent, {});
        res.json({
            event: aEvent,
            msg: "Event Updated Successfully",
        })
      }      
    })
]

exports.getAAtendeeForAEvent = asyncHandler(async (req, res, next) => {
    console.log("hi")
    const aEvent = await Event.findById(req.params.eventID).exec()
    const aAtendeeForAEvent = await Profile.findById(req.params.atendeeID).exec()
    const allProfiles = await Profile.find({}).exec()
    let aEventCopy = {};
    aEventCopy._id = aEvent._id
    aEventCopy.eventOrganiser = {}
    aEventCopy.eventName = aEvent.eventName
    aEventCopy.eventDescription = aEvent.eventDescription
    aEventCopy.eventStartDate = aEvent.eventStartDate
    aEventCopy.eventStartTime = aEvent.eventStartTime
    aEventCopy.eventEndDate = aEvent.eventEndDate
    aEventCopy.eventEndTime = aEvent.eventEndTime
    aEventCopy.eventBuildingNumber = aEvent.eventBuildingNumber
    aEventCopy.eventStreetName = aEvent.eventStreetName
    aEventCopy.eventCity = aEvent.eventCity
    aEventCopy.eventCounty = aEvent.eventCounty
    aEventCopy.eventCountry =aEvent.eventCountry
    aEventCopy.eventPostCode = aEvent.eventPostCode
    aEventCopy.eventPricing = aEvent.eventPricing
    aEventCopy.eventTicketPrice = aEvent.eventTicketPrice
    aEventCopy.eventTicketAmount = aEvent.eventTicketAmount
    aEventCopy.eventPicture = aEvent.eventPicture
    aEventCopy.eventAtendees = []
    allProfiles.forEach(user => {
        let profileID = `${user._id}`
        let eventOrganiserID = `${aEvent.eventOrganiser}`
        if (eventOrganiserID === profileID) {
            aEventCopy.eventOrganiser.profileFirstName = user.profileFirstName
            aEventCopy.eventOrganiser.profileSecondName = user.profileSecondName
            aEventCopy.eventOrganiser.profileRole = user.profileRole
            aEventCopy.eventOrganiser._id = user._id
        }
    })
    aEvent.eventAtendees.forEach(EAID => {
            let eventAtendeeID = `${EAID}`
            let profileID = `${aAtendeeForAEvent._id}`

            if (eventAtendeeID === profileID) {
                console.log("match")
                    let eventAtendee = {}
                    eventAtendee._id = aAtendeeForAEvent._id
                    eventAtendee.profileFirstName = aAtendeeForAEvent.profileFirstName
                    eventAtendee.profileSecondName = aAtendeeForAEvent.profileSecondName
                    eventAtendee.profileRole = aAtendeeForAEvent.profileRole
                    eventAtendee._v = aAtendeeForAEvent._v
                    aEventCopy.eventAtendees.push(eventAtendee)
            }
    })
     if (!aEvent) {
        res.json({
            event: aEventCopy,
            msg: "Event get unsuccessfull as event does not exist"
        })
    } else if (!allProfiles) {
        res.json({
            event: aEventCopy,
            msg: "Events get unsuccessfull as all profiles do not exist"
        })
    } else if (!aAtendeeForAEvent) {
        res.json({
            event: aEventCopy,
            msg: "Events get unsuccessfull as a profile does exist"
        })
    } else {
        res.json({
            event: aEventCopy,
            msg: "Event get successfull"
        })
    }
})

exports.createAAtendeeForAEvent = [
    body("eventID", "eventID must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventID must have at least 1 character'),
    body("eventTicketAmountBrought",  "eventTicketAmountBrought must be a number.")
        .isNumeric()
        .withMessage("eventTicketAmountBrought must be a number")
        .escape(),
    body("eventAtendee", "eventAtendee must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventAtendee must have at least 1 character'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        console.log("reqBodyEventTicketAmountBrought", req.body.eventTicketAmountBrought)
        console.log("reqParamsEventID", req.params.eventID)
        console.log("reqParamsAtendeeID", req.params.atendeeID)

        const eventToUpdate = await Event.findById(req.params.eventID).exec()
        console.log("eventToUpdate", eventToUpdate)
        //newEvent
        const atendeeIDString = `${req.params.atendeeID}`
        eventToUpdate.eventAtendees.push(atendeeIDString)
        const eventTicketAmountBrought = parseFloat(req.body.eventTicketAmountBrought)
        const totalTickets = eventToUpdate.eventTicketAmount - eventTicketAmountBrought
        eventToUpdate.eventTicketAmount = totalTickets
        console.log("updated ticket amount", eventToUpdate.eventTicketAmount)

        if (!errors.isEmpty()) {
            res.json({
                event: eventToUpdate,
                errors: errors.array(),
                msg: "errors",
            }) 
        } else {
            const atendeeSaved = await eventToUpdate.save()
            console.log(atendeeSaved)
            res.json({
                event: eventToUpdate, 
                msg: "Event Atendee Updated Successfully",
            })
        }
    })
]

exports.deleteAAtendeeForAEvent  = asyncHandler(async (req, res, next) => {
    const eventToDelete = await Event.findById(req.params.eventID).exec()
    let atendeeIDString = `${req.params.atendeeID}`
    const index = eventToDelete.eventAtendees.indexOf(atendeeIDString)
    if (index !== -1) {
        eventToDelete.eventAtendees.splice(index, 1);
    }
    let errors = []
    if (eventToDelete === null) {
        errors.push("Event ID does not exist")
        res.json({
            event: eventToDelete,
            errors: errors,
            msg: "Error"
        })
    } else {
        await eventToDelete.save()
        res.json({
            event: eventToDelete,
            msg: "Event atendee deleted successfully", 
        })
    }
})

exports.getAInviteeForAEvent = asyncHandler(async (req, res, next) => {
    console.log("hi")
    const aEvent = await Event.findById(req.params.eventID).exec()
    const aAtendeeForAEvent = await Profile.findById(req.params.atendeeID).exec()
    const allProfiles = await Profile.find({}).exec()
    let aEventCopy = {};
    aEventCopy._id = aEvent._id
    aEventCopy.eventOrganiser = {}
    aEventCopy.eventName = aEvent.eventName
    aEventCopy.eventDescription = aEvent.eventDescription
    aEventCopy.eventStartDate = aEvent.eventStartDate
    aEventCopy.eventStartTime = aEvent.eventStartTime
    aEventCopy.eventEndDate = aEvent.eventEndDate
    aEventCopy.eventEndTime = aEvent.eventEndTime
    aEventCopy.eventBuildingNumber = aEvent.eventBuildingNumber
    aEventCopy.eventStreetName = aEvent.eventStreetName
    aEventCopy.eventCity = aEvent.eventCity
    aEventCopy.eventCounty = aEvent.eventCounty
    aEventCopy.eventCountry =aEvent.eventCountry
    aEventCopy.eventPostCode = aEvent.eventPostCode
    aEventCopy.eventPricing = aEvent.eventPricing
    aEventCopy.eventTicketPrice = aEvent.eventTicketPrice
    aEventCopy.eventTicketAmount = aEvent.eventTicketAmount
    aEventCopy.eventPicture = aEvent.eventPicture
    aEventCopy.eventAtendees = []
    aEventCopy.eventInvited = []

    allProfiles.forEach(user => {
        let profileID = `${user._id}`
        let eventOrganiserID = `${aEvent.eventOrganiser}`
        if (eventOrganiserID === profileID) {
            aEventCopy.eventOrganiser.profileFirstName = user.profileFirstName
            aEventCopy.eventOrganiser.profileSecondName = user.profileSecondName
            aEventCopy.eventOrganiser.profileRole = user.profileRole
            aEventCopy.eventOrganiser._id = user._id
        }
    })
    aEvent.eventAtendees.forEach(EAID => {
            let eventAtendeeID = `${EAID}`
            let profileID = `${aAtendeeForAEvent._id}`

            if (eventAtendeeID === profileID) {
                console.log("match")
                    let eventAtendee = {}
                    eventAtendee._id = aAtendeeForAEvent._id
                    eventAtendee.profileFirstName = aAtendeeForAEvent.profileFirstName
                    eventAtendee.profileSecondName = aAtendeeForAEvent.profileSecondName
                    eventAtendee.profileRole = aAtendeeForAEvent.profileRole
                    eventAtendee._v = aAtendeeForAEvent._v
                    aEventCopy.eventAtendees.push(eventAtendee)
            }
    })
    aEvent.eventInvited.forEach(EAID => {
        let eventAtendeeID = `${EAID}`
        allProfiles.forEach(user => {
            let profileID = `${user._id}`
            if (eventAtendeeID === profileID) {
                let eventAtendee = {}
                eventAtendee._id = user._id
                eventAtendee.profileFirstName = user.profileFirstName
                eventAtendee.profileSecondName = user.profileSecondName
                eventAtendee.profileRole = user.profileRole
                eventAtendee.profileEmail = user.profileEmail

                eventAtendee._v = user._v
                aEventCopy.eventInvited.push(eventAtendee)
            }
        })
    }) 
     if (!aEvent) {
        res.json({
            event: aEventCopy,
            msg: "Event get unsuccessfull as event does not exist"
        })
    } else if (!allProfiles) {
        res.json({
            event: aEventCopy,
            msg: "Events get unsuccessfull as all profiles do not exist"
        })
    } else if (!aAtendeeForAEvent) {
        res.json({
            event: aEventCopy,
            msg: "Events get unsuccessfull as a profile does exist"
        })
    } else {
        res.json({
            event: aEventCopy,
            msg: "Event get successfull"
        })
    }
})

exports.createAInviteeForAEvent = [
    body("eventID", "eventID must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventID must have at least 1 character'),
    body("eventTicketAmountBrought",  "eventTicketAmountBrought must be a number.")
        .isNumeric()
        .withMessage("eventTicketAmountBrought must be a number")
        .escape(),
    body("eventInvitee", "eventInvitee must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('eventInvitee must have at least 1 character'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        console.log("reqBodyEventTicketAmountBrought", req.body.eventTicketAmountBrought)
        console.log("reqParamsEventID", req.params.eventID)
        console.log("reqParamsAtendeeID", req.params.InviteeID)

        const eventToUpdate = await Event.findById(req.params.eventID).exec()
        console.log("eventToUpdate", eventToUpdate)
        //newEvent
        const atendeeIDString = `${req.params.atendeeID}`
        eventToUpdate.eventAtendees.push(atendeeIDString)
        const eventTicketAmountBrought = parseFloat(req.body.eventTicketAmountBrought)
        const totalTickets = eventToUpdate.eventTicketAmount - eventTicketAmountBrought
        eventToUpdate.eventTicketAmount = totalTickets
        console.log("updated ticket amount", eventToUpdate.eventTicketAmount)

        if (!errors.isEmpty()) {
            res.json({
                event: eventToUpdate,
                errors: errors.array(),
                msg: "errors",
            }) 
        } else {
            const atendeeSaved = await eventToUpdate.save()
            console.log(atendeeSaved)
            res.json({
                event: eventToUpdate, 
                msg: "Event Atendee Updated Successfully",
            })
        }
    })
]

exports.deleteAInviteeForAEvent  = asyncHandler(async (req, res, next) => {
    const eventToDelete = await Event.findById(req.params.eventID).exec()
    let inviteeIDString = `${req.params.inviteeID}`
    console.log("inviteeIDString", inviteeIDString)

    const index = eventToDelete.eventInvited.indexOf(inviteeIDString)
    if (index !== -1) {
        eventToDelete.eventInvited.splice(index, 1);
    }
    let errors = []
    if (eventToDelete === null) {
        errors.push("Event ID does not exist")
        res.json({
            event: eventToDelete,
            errors: errors,
            msg: "Error"
        })
    } else {
        await eventToDelete.save()
        res.json({
            event: eventToDelete,
            msg: "Event invitee deleted successfully", 
        })
    }
})

