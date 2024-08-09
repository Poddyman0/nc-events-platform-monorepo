const express = require('express');
const router = express.Router();
const jwtAuth = require('../jwtAuth')
const event_controller = require("../controllers/eventController");
const profile_controller = require("../controllers/profileController");

/// PROFILE ROUTES ///
// FE AND BE DONE
router.get("/profiles/get", jwtAuth, 
profile_controller.profiles_get
)

// FE AND BE DONE
// POST request for creating profile
router.post("/profile/post", 
profile_controller.profile_create_post
)
//FE AND BE DONE
// GET request to get a Profile.
router.get("/profile/get/:id/aprofile", jwtAuth, 
profile_controller.profile_get
)
//FE AND BE DONE
// POST request to update Profile.
router.post("/profile/put/:id/profileupdate", jwtAuth,
profile_controller.profile_update_post
);
// FE AND BE DONE
// POST request to delete a profile
router.post("/profile/delete/:id", jwtAuth,
profile_controller.profile_delete_post
)
// FE AND BE DONE
// POST request to login user and return token
router.post("/profile/put/signin", 
profile_controller.profile_sign_in_post
);
//  FE AND BE DONE
// POST request to update and sign out of  a Profile.
router.get("/profile/put/signout",
profile_controller.profile_sign_out_post
)

/// EVENT ROUTES ///
// POST request to create a event.
router.post("/event/post", jwtAuth, event_controller.event_create_post
)

// FE AND BE DONE
// POST request to delete a event.
router.post("/event/delete/:id", jwtAuth, 
event_controller.event_delete_post
)

// FE AND BE DONE
// GET request to get all events
router.get("/events/get",
event_controller.events_get
)
// FE AND BE DONE
// GET request to get a event.
router.get("/event/get/:id/aevent",
event_controller.event_get
)
//// FE AND BE DONE
// POST request to update a event.
router.post("/event/put/:id/eventupdate", jwtAuth,
event_controller.event_update_post
)

//test below.
//
// GET a atendee for a event.
router.get("/event/get/:eventID/atendee/:atendeeID", jwtAuth, event_controller.getAAtendeeForAEvent)
//
// POST create a atendee for a event.
router.post("/event/create/:eventID/atendee/:atendeeID", jwtAuth, event_controller.createAAtendeeForAEvent
)
//
// POST delete a atendee for a event.
router.post("/event/delete/:eventID/atendee/:atendeeID", jwtAuth, 
event_controller.deleteAAtendeeForAEvent
)

//
// GET a invitee for a event.
router.get("/event/get/:eventID/invitee/:atendeeID", jwtAuth, event_controller.getAInviteeForAEvent)
//
// POST create a invitee for a event.
router.post("/event/create/:eventID/invitee/:atendeeID", jwtAuth, event_controller.createAInviteeForAEvent
)
//
// POST delete a invitee for a event.
router.post("/event/delete/:eventID/invitee/:inviteeID", jwtAuth, 
event_controller.deleteAInviteeForAEvent
)


module.exports = router;
