
document.addEventListener('DOMContentLoaded', function() {
    isSignedInProfile()
    getProfile()
    signOutProfile()
    getEventsInvitedTo()
    getEventsPurchased()
    deleteProfile()
    getCartArray()
    proceedToCheckout()
})

function isSignedInProfile () {
    const userIDSignedIn = localStorage.getItem('userIDSignedIn');
    const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
    const profileDisplay = document.querySelector('.profile-container');
    const notSignedInMsg = document.querySelector('#not-signed-in-msg')
    if (userIDSignedIn === null && userTokenSignedIn === null) {
        profileDisplay.style.display = "none";
        notSignedInMsg.style.display = "block";
    } else if (userIDSignedIn !== null && userTokenSignedIn !== null) {
        profileDisplay.style.display = "block";
        notSignedInMsg.style.display = "none";
    }

}

function signOutProfile () {
    document.querySelector('#sign-out-profile').addEventListener('click', function () {
        localStorage.removeItem('userIDSignedIn');
        localStorage.removeItem('userTokenSignedIn');
        localStorage.removeItem('cartArray');
        localStorage.removeItem('userRoleSignedIn')
        document.getElementById("delete-signout-feedback").innerHTML = `Sign out successfull.`

                function returnTimed () {
                    window.location.href = 'signInForm.html';
                }
                setTimeout(returnTimed, 2000);
    })
}

function getProfile () {
    const userIDSignedIn = localStorage.getItem('userIDSignedIn');
    const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
    const profileDisplay = document.querySelector('#profile-info-container')
    const loadingProfileInfo = document.querySelector('#loading-profile-info')
    
    fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/profile/get/${userIDSignedIn}/aprofile`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userTokenSignedIn}`
            },
          })
          .then(response => response.json())
          .then(response => {
            loadingProfileInfo.style.display = "none"
            loadingProfileInfo.innerHTML = ""
            profileDisplay.innerHTML = `
            <div id="${response._Id}">
                <h1 class="card-title">Your Profile:</h1>
                <p class="card-text"><strong>First Name: </strong>${response.profile[0].profileFirstName}</p>
                <p class="card-text"><strong>Second Name: </strong>${response.profile[0].profileSecondName}</p>
                <p class="card-text"><strong>Date Of Birth: </strong>${response.profile[0].profileDOB}</p>
                <p class="card-text"><strong>Phone Number: </strong>${response.profile[0].profileTelephone}</p>
                <p class="card-text"><strong>House Number: </strong>${response.profile[0].profileHouseNumber}</p>
                <p class="card-text"><strong>Street Name: </strong>${response.profile[0].profileStreet}</p>
                <p class="card-text"><strong>City: </strong>${response.profile[0].profileCity}</p>
                <p class="card-text"><strong>County: </strong>${response.profile[0].profileCounty}</p>
                <p class="card-text"><strong>Country: </strong>${response.profile[0].profileCountry}</p>
                <p class="card-text"><strong>Post Code: </strong>${response.profile[0].profilePostCode}</p>
                <p class="card-text"><strong>Email: </strong>${response.profile[0].profileEmail}</p>
                <p class="card-text"><strong>Role: </strong>${response.profile[0].profileRole}</p>
            </div>
            `            
        })
        .catch(function(err) {
            console.log("Error: ", err)
        })
}


///
function getEventsInvitedTo() {
    const userIDSignedIn = localStorage.getItem('userIDSignedIn');

    const eventsInvitedToContainer = document.querySelector('.events-invited-to');
    const loadingEventsInvitedTo = document.querySelector('#loading-profile-invites');
    loadingEventsInvitedTo.style.display = "block";
    loadingEventsInvitedTo.innerHTML = "Loading events you're invited to...";
            fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/events/get`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(response => {
                if (response.msg === "Events get successfull") {
                    loadingEventsInvitedTo.style.display = "none";
                    loadingEventsInvitedTo.innerHTML = "";
            
                    response.events.forEach(event => {
                        event.eventInvited.forEach(atendeeID => {
                            if (atendeeID._id === userIDSignedIn) {
                                document.getElementById('invites-empty-msg').innerHTML = ""
                                
                                function getDateFromISOString(isoString) {
                                    const date = new Date(isoString);
                                    
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0'); 
                                    const day = String(date.getDate()).padStart(2, '0');
                                    
                                    return `${year}-${month}-${day}`;
                                }
                                const startDate = getDateFromISOString(event.eventStartDate);
                                const endDate = getDateFromISOString(event.eventEndDate);
                                
                                let aEventToDisplay = document.createElement('div');
                                aEventToDisplay.className = "col-sm-6 cartCol";
                                aEventToDisplay.id = `an-event-card-${event._id}`;
                                aEventToDisplay.innerHTML = `
                                    <div class="card invitesCardStyle">
                                        <img class="card-img-top" src="${event.eventPicture}" alt="Event Picture">
                                        <div class="card-body">
                                            <div class="card-title-icon-container">
                                                <h5 class="card-title">${event.eventName}</h5>
                                            </div>
                                            <p class="card-text"><strong>Organiser: </strong>${event.eventOrganiser.profileFirstName} ${event.eventOrganiser.profileSecondName}</p>
                                            <p class="card-text"><strong>Description: </strong>${event.eventDescription}</p>
                                            <p class="card-text"><strong>Start Date: </strong>${startDate}</p>
                                            <p class="card-text"><strong>Start Time: </strong>${event.eventStartTime}</p>
                                            <p class="card-text"><strong>End Date: </strong>${endDate}</p>
                                            <p class="card-text"><strong>End Time: </strong>${event.eventEndTime}</p>
                                            <p class="card-text"><strong>Location: </strong>${event.eventBuildingNumber}, ${event.eventStreetName}, ${event.eventCity}, ${event.eventCounty}, ${event.eventCountry}, ${event.eventPostCode}</p>
                                            <p class="card-text"><strong>Ticket Price: </strong>${event.eventTicketPrice}</p>
                                            <p class="card-text"><strong>Amount Of Tickets Left: </strong>${event.eventTicketAmount}</p>
                                            <div class="card invitesControllsStyle">
                                                <form class="card-text">
                                                    <label for="add-to-cart-amount"><strong>Amount of tickets you want to purchase: </strong></label>
                                                    <input type="number" class="form-control" id="add-to-cart-amount" placeholder="Enter amount of tickets you would like to buy." required>
                                                    <div class="invalid-feedback" id="add-to-cart-amount-feedback"></div>
                                                </form>
                                                <br>
                                                <div class="invitesButtonsStyle">
                                                    <button class="btn btn-primary invitesButton" id="add-to-cart-button-${event._id}" value="${event._id}">Add To Cart</button>
                                                    <button class="btn btn-danger invitesButton" id="delete-event-${event._id}" value="${event._id}">Refuse Invite</button>
                                                </div>
                                                <ul id="added-to-cart-feedback"></ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                `;
                                
                                eventsInvitedToContainer.appendChild(aEventToDisplay);
                                const ticketAmountPurchase = document.querySelector(`#add-to-cart-amount`);
                                const addToCartAmountFeedback = document.querySelector(`#add-to-cart-amount-feedback`);
                                const addedToCartFeedback = document.querySelector('#added-to-cart-feedback');
                                const ticketsLeft = event.eventTicketAmount;
                                const eventIDDetail = event._id;
                                const userIDSignedIn = localStorage.getItem('userIDSignedIn');
                                const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
            
                                const addToCartButton = document.getElementById(`add-to-cart-button-${event._id}`)
                                addToCartButton.addEventListener('click', function (event) {
                                    event.preventDefault()
            
                                    
                                    if (ticketAmountPurchase.value.length === 0 || ticketAmountPurchase.value > ticketsLeft) {
                                        ticketAmountPurchase.className = "form-control is-invalid";
                                        addToCartAmountFeedback.innerHTML = "Amount of tickets purchased field must not be empty or be greater than the amount of tickets available";
                                    } else {
                                        ticketAmountPurchase.className = "form-control";
                                        addToCartAmountFeedback.innerHTML = "";
                                        
                                        
                                        let arrayStringBefore = localStorage.getItem('cartArray');
                                        let cartArrayToEdit = JSON.parse(arrayStringBefore);
                                        let eventInCart = {
                                            eventID: eventIDDetail,
                                            eventTicketAmountBrought: ticketAmountPurchase.value,
                                            eventAtendee: userIDSignedIn
                                        };
                                        cartArrayToEdit.push(eventInCart);
                                        let arrayStringAfter = JSON.stringify(cartArrayToEdit);
                                        localStorage.setItem('cartArray', arrayStringAfter);
            
                                        fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/event/delete/${eventIDDetail}/invitee/${userIDSignedIn}`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${userTokenSignedIn}`
                                            },
                                        })
                                        .then(response => response.json())
                                        .then(response => {
                                            if (response.msg === "Event invitee deleted successfully") {
                                                let updatedInviteeFeedback = document.createElement('li');
                                                updatedInviteeFeedback.innerHTML = "Event added to cart";
                                                addedToCartFeedback.appendChild(updatedInviteeFeedback);
                                                function returnTimed() {
                                                    window.location.href = 'profile.html';
                                                }
                                                setTimeout(returnTimed, 2000);
                                            } else {
                                                response.errors.forEach(error => {
                                                    const updatedInviteeFeedback = document.createElement('li');
                                                    updatedInviteeFeedback.innerHTML = `${error.msg}`;
                                                    addedToCartFeedback.appendChild(updatedInviteeFeedback);
                                                });
                                            }                                        })
                                        .catch(function(err) {
                                            console.log("Error: ", err);
                                        });                                        
                                    }
                                })
                                const deleteInviteButton = document.getElementById(`delete-event-${event._id}`)
                                deleteInviteButton.addEventListener('click', function (event) {
            
                                    event.preventDefault()
                                    fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/event/delete/${eventIDDetail}/invitee/${userIDSignedIn}`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${userTokenSignedIn}`
                                        },
                                    })
                                    .then(response => response.json())
                                    .then(response => {
                                        if (response.msg === "Event invitee deleted successfully") {
                                            let updatedInviteeFeedback = document.createElement('li');
                                            updatedInviteeFeedback.innerHTML = "Invitation refused successfully";
                                            addedToCartFeedback.appendChild(updatedInviteeFeedback);
                                            function returnTimed() {
                                                window.location.href = 'profile.html';
                                            }
                                            setTimeout(returnTimed, 2000);
                                        } else {
                                            response.errors.forEach(error => {
                                                const updatedInviteeFeedback = document.createElement('li');
                                                updatedInviteeFeedback.innerHTML = `${error.msg}`;
                                                addedToCartFeedback.appendChild(updatedInviteeFeedback);
                                            });
                                        }                                    })
                                    .catch(function(err) {
                                        console.log("Error: ", err);
                                    });
                                            
                                
                                })
                                
                            }
                        });
                    });
                }
            })
            .catch(function(err) {
                console.log("Error: ", err);
            });    
}
//



//


//

///
function getEventsPurchased ( ) {
    const userIDSignedIn = localStorage.getItem('userIDSignedIn');

    const eventsInvitedToContainer = document.querySelector('.events-attending-to')
    const loadingEventsInvitedTo = document.querySelector('#loading-profile-attending')
    loadingEventsInvitedTo.style.display = "block"
    loadingEventsInvitedTo.innerHTML = "Loading events you're attending..."
    updateEventsInvitedTo()
    function updateEventsInvitedTo() {
        getEvents ()
        let eventsInvitedToArray = []
        function getEvents () {
            fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/events/get`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(response => {
                if (response.msg === "Events get successfull") {
                    loadingEventsInvitedTo.style.display = "none"
                    loadingEventsInvitedTo.innerHTML = ""
                        

                        
                       response.events.forEach(aEvent => {
                            aEvent.eventAtendees.forEach(atendeeID => {

                                
                                if (atendeeID._id === userIDSignedIn) {
                                    document.getElementById('attending-empty-msg').innerHTML = ""
                                    function getDateFromISOString(isoString) {
                                        const date = new Date(isoString);
                                        
                                        const year = date.getFullYear();
                                        const month = String(date.getMonth() + 1).padStart(2, '0'); 
                                        const day = String(date.getDate()).padStart(2, '0');
                                        
                                        return `${year}-${month}-${day}`;
                                    }
                                    const startDate = getDateFromISOString(aEvent.eventStartDate);
                                    const endDate = getDateFromISOString(aEvent.eventEndDate);
            
                                    eventsInvitedToArray.push(aEvent)
                                    let aEventToDisplay = document.createElement('div')
                                    aEventToDisplay.className = "col-sm-6 cartCol"
                                    aEventToDisplay.id = `an-event-card-${aEvent._id}`
                                    aEventToDisplay.innerHTML = `
                                        <div class="card attendingCardStyle">
                                            <img class="card-img-top" src="${aEvent.eventPicture}" alt="Event Picture">
                                            <div class="card-body">
                                                <div class="card-title-icon-container">
                                                    <h5 class="card-title">${aEvent.eventName}</h5>
                                                </div>
                                                <p class="card-text"><strong>Organiser: </strong>${aEvent.eventOrganiser.profileFirstName} ${aEvent.eventOrganiser.profileSecondName}</p>
                                                <p class="card-text"><strong>Description: </strong>${aEvent.eventDescription}</p>
                                                <p class="card-text"><strong>Start Date: </strong>${startDate}</p>
                                                <p class="card-text"><strong>Start Time: </strong>${aEvent.eventStartTime}</p>
                                                <p class="card-text"><strong>End Date: </strong>${endDate}</p>
                                                <p class="card-text"><strong>End Time: </strong>${aEvent.eventEndTime}</p>
                                                <p class="card-text"><strong>Location: </strong>${aEvent.eventBuildingNumber}, ${aEvent.eventStreetName}, ${aEvent.eventCity}, ${aEvent.eventCounty}, ${aEvent.eventCountry}, ${aEvent.eventPostCode}</p>
                                                <p class="card-text"><strong>Ticket Price: </strong>${aEvent.eventTicketPrice}</p>
                                                <button class="btn btn-primary" style="width: 100%" value="${aEvent}" id="authorize_button-${aEvent._id}" >Add Event To Google Callendar</button>
                                                <p style="font-size: 10px;">Sign into google above before adding to callendar</p>
                                                <a class="btn btn-primary" style="width: 100%" id="content-${aEvent._id}">Link To Event Created On Google Callendar</a>


                                            </div>
                                        </div>
                                        
                                    `
                                    eventsInvitedToContainer.appendChild(aEventToDisplay)
                                                        //
                    const authorizeButton = document.querySelector(`#authorize_button-${aEvent._id}`)
                    const eventLinkButton = document.querySelector(`#content-${aEvent._id}`)
                    eventLinkButton.style.visibility = 'hidden';


                    /**
                     * Enables user interaction after all libraries are loaded.
                     */
                        if (gapiInited && gisInited) {
                        }
                  
                    authorizeButton.addEventListener('click', function() {
                        tokenClient.callback = async (resp) => {
                        if (resp.error !== undefined) {
                            throw (resp);
                        }
                        eventLinkButton.style.visibility = 'visible';
                        await createEventGoogleCallendar(aEvent)
                        async function createEventGoogleCallendar (aEvent) {
                            const dateStartFormat = aEvent.eventStartDate.split('T')[0]
                            const dateEndFormat = aEvent.eventEndDate.split('T')[0]
                            const ISODateTimeStart = `${dateStartFormat}T${aEvent.eventStartTime}:00.000Z`
                            const ISODateTimeEnd = `${dateEndFormat}T${aEvent.eventEndTime}:00.000Z`
                            const event = {
                                'summary': `${aEvent.eventName}`,
                                'location': `${aEvent.eventBuildingNumber}, ${aEvent.eventStreetName}, ${aEvent.eventCity}, ${aEvent.eventCounty}, ${aEvent.eventCountry}, ${aEvent.eventPostCode}`,
                                'description': `${aEvent.eventDescription}`,
                                'start': {
                                  'dateTime': `${ISODateTimeStart}`,
                                  'timeZone': 'Europe/London'
                                },
                                'end': {
                                  'dateTime': `${ISODateTimeEnd}`,
                                  'timeZone': 'Europe/London'
                                }
                              };
                              
                              const request = gapi.client.calendar.events.insert({
                                'calendarId': 'primary',
                                'resource': event
                              });
                              
                              request.execute(function(event) {
                                eventLinkButton.setAttribute('href', event.htmlLink)
                              });
                        }
                        };

                        if (gapi.client.getToken() === null) {
                        // Prompt the user to select a Google Account and ask for consent to share their data
                        // when establishing a new session.
                        tokenClient.requestAccessToken({prompt: 'consent'});
                        } else {
                        // Skip display of account chooser and consent dialog for an existing session.
                        tokenClient.requestAccessToken({prompt: ''});
                        }
                    })
                    //function handleAuthClick(eventToAddToCallendar) {}

                    /**
                     *  Sign out the user upon button click.
                     */

                      /*
                        * Print the summary and start datetime/date of the next ten events in
                        * the authorized user's calendar. If no events are found an
                        * appropriate message is printed.
                        */
                                    return eventsInvitedToArray 
                                }
                            })
                       })
                    }
                    })
                    .catch(function(err) {
                        console.log("Error: ", err)
                    });
        }
    }
}

function deleteProfile () {
    document.querySelector('#delete-profile').addEventListener('click', function() {
        const loadingProfileCart = document.querySelector('#loading-profile-cart')

        loadingProfileCart.style.display = "block"
        loadingProfileCart.innerHtml = "Loading deleted profile..."
        const userIDSignedIn = localStorage.getItem('userIDSignedIn');
        const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');

        fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/profile/delete/${userIDSignedIn}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userTokenSignedIn}`
            },
        })
        .then(response => response.json())
        .then(response => {
            if (response.msg === "Profile deleted successfully") {
                localStorage.removeItem('userIDSignedIn');
                localStorage.removeItem('userTokenSignedIn');
                const userIDSignedIn = localStorage.getItem('userIDSignedIn');
                const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');

                document.getElementById("delete-signout-feedback").innerHTML = `${response.msg}`

                function returnTimed () {
                    window.location.href = 'signInForm.html';
                }
                setTimeout(returnTimed, 2000);  
            }
        })
        .catch(function(err) {
            console.log("Error: ", err)
        })

})
}

function getCartArray () {
    let arrayStringAfter = localStorage.getItem('cartArray');
    let cartArrayToEdit = JSON.parse(arrayStringAfter);

    console.log(cartArrayToEdit)
    if (cartArrayToEdit.length === 0) {
        console.log("hi")
        document.getElementById('cart-empty-msg').innerHTML = "Cart Empty"
    }
    const cartCardContainer = document.getElementById('cart-container')
    // Parse the string back into an array
    fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/events/get`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(response => {
        let cartTotal = 0
        cartArrayToEdit.forEach(eventCart => {
            response.events.forEach(eventBE => {
                if (eventBE._id === eventCart.eventID) {
                    
                    let total = eventBE.eventTicketPrice * eventCart.eventTicketAmountBrought;
                    cartTotal += total
                    let aEventToDisplay = document.createElement('div')
                                    aEventToDisplay.className = "col-sm-6 cartCol"
                                    aEventToDisplay.id = `an-event-card-${eventBE._id}`
                                    //aEventToDisplay.style = "width: 40%;"
                                    aEventToDisplay.innerHTML = `
                                        <div class="card cartCardStyle">
                                            <img class="card-img-top" src="${eventBE.eventPicture}" alt="Event Picture">
                                            <div class="card-body">
                                                <div class="card-title-icon-container">
                                                    <h5 class="card-title">${eventBE.eventName}</h5>
                                                </div>
                                                <p class="card-text"><strong>Ticket Price: </strong>£${eventBE.eventTicketPrice}</p>
                                                <p class="card-text"><strong>Amount Of Tickets Left: </strong>${eventBE.eventTicketAmount}</p>
                                                <p class="card-text"><strong>Amout of Tickets To Purchase: </strong>${eventCart.eventTicketAmountBrought}</p>
                                                <p class="card-text"><strong>Total: </strong>£${total}</p>
                                                <button class="btn btn-danger" id="remove-from-cart-btn" value=${eventBE._id}>Remove From Cart</button>
                                            </div>
                                        </div>
                                    `
                                    cartCardContainer.appendChild(aEventToDisplay)
                                    const removeFromCartBtn = document.getElementById('remove-from-cart-btn')
                                    removeFromCartBtn.addEventListener('click', function() {
                                        let arrayStringBefore = localStorage.getItem('cartArray');
                                        let cartArrayToEdit = JSON.parse(arrayStringBefore);
                                        let CartItemIndex = 0
                                        cartArrayToEdit.forEach(cartItem => {
                                            CartItemIndex += 1

                                            if (cartItem.eventID === removeFromCartBtn.value) {
                                                cartArrayToEdit.splice(CartItemIndex - 1, 1); 
                                                window.location.href = 'profile.html'
                                            }

                                        })

                                        let arrayStringAfter = JSON.stringify(cartArrayToEdit);
                                        localStorage.setItem('cartArray', arrayStringAfter);
                            
                            
                                                    
                                    })


                }
            })

        })
        document.querySelector('#cart-total').innerHTML = `£${cartTotal}`

        
        
    })
    .catch(function(err) {
        console.log("Error: ", err)
    })


}

function proceedToCheckout () {
    document.getElementById('cart-checkout').addEventListener('click', function () {
        let arrayStringAfter = localStorage.getItem('cartArray');
        let cartArrayToEdit = JSON.parse(arrayStringAfter);
        let cartLength = cartArrayToEdit.length
        let cartItemsBackend = 0
        cartArrayToEdit.forEach(eventCart => {
            const userIDSignedIn = localStorage.getItem('userIDSignedIn');
            const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
            fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/event/create/${eventCart.eventID}/atendee/${userIDSignedIn}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userTokenSignedIn}`
                },
                body: JSON.stringify(eventCart)
                })
                .then(response => response.json())
                .then(response => {
                    cartItemsBackend += 1
                    const checkoutFeedback = document.getElementById('proceed-to-checkout-feedback')
                    if (response.msg === "Event Atendee Updated Successfully") {
                        const feedbackMessage = document.createElement('li')
                        feedbackMessage.innerHTML = `${response.msg}`
                        checkoutFeedback.appendChild(feedbackMessage)
                        if (cartItemsBackend === cartLength) {
                            let cartArray = [];
                            let arrayString = JSON.stringify(cartArray);
                            localStorage.setItem('cartArray', arrayString);
                            const cartArrayLS = localStorage.getItem('cartArray');
                            window.location.href = "profile.html"

                        }
                    } else if (response.msg === "errors") {
                        response.errors.forEach(error => {
                            const feedbackMessage = document.createElement('li')
                            feedbackMessage.innerHTML = `${error}`
                            checkoutFeedback.appendChild(feedbackMessage)
                        })

                    }
                })
                .catch(function(err) {
                    console.log("Error: ", err)
                })
        })
    })
}


