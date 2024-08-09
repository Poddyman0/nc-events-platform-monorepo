document.addEventListener('DOMContentLoaded', function() {
    isSignedIn()
    loadEvent()
    deleteEvent()
    updateEvent()
    addToCart()
})

function loadEvent () {
    const eventIDDetail = localStorage.getItem('eventIDDetail');
    const userIDSignedIn = localStorage.getItem('userIDSignedIn');
    const userRoleSignedIn = localStorage.getItem('userRoleSignedIn');

    const eventDisplay = document.querySelector('.an-event-container')
    const eventLoading = document.querySelector('#event-loading')
    eventLoading.style.display = "block"
    eventLoading.innerHTML = "Loading Event..."
    getEvent () 
    function getEvent () {
        fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/event/get/${eventIDDetail}/aevent`, {
                    method: 'GET',
                })
        .then(response => response.json())
        .then(response => {
            if (response.msg === "Event get successfull") {
                eventLoading.style.display = "none"
                eventLoading.innerHTML = ""
                    localStorage.setItem('ticketsLeft', response.event.eventTicketAmount);
        
                    if (userRoleSignedIn === "internal") {
                        function getDateFromISOString(isoString) {
                            const date = new Date(isoString);
                            
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0'); 
                            const day = String(date.getDate()).padStart(2, '0');
                            
                            return `${year}-${month}-${day}`;
                        }
                        const startDate = getDateFromISOString(response.event.eventStartDate);
                        const endDate = getDateFromISOString(response.event.eventEndDate);
        
                        let aEventToDisplay = document.createElement('div')
                        aEventToDisplay.className = "card aEventCard"
                        aEventToDisplay.id = `an-event-card-${response.event._id}`
                        aEventToDisplay.innerHTML = `
                            <img class="card-img-top" src="${response.event.eventPicture}" alt="Event Picture">
                            <div class="card-body">
                                <div class="card-title-icon-container">
                                    <h5 class="card-title">${response.event.eventName}</h5>
                                </div>
                                <p class="card-text" id="event-organiser"><strong>Organiser: </strong>${response.event.eventOrganiser.profileFirstName} ${response.event.eventOrganiser.profileSecondName}</p>
                                <p class="card-text" id="event-description"><strong>Description: </strong>${response.event.eventDescription}</p>
                                <p class="card-text" id="event-start-date"><strong>Start Date: </strong>${startDate}</p>
                                <p class="card-text" id="event-start-time"><strong>Start Time: </strong>${response.event.eventStartTime}</p>
                                <p class="card-text" id="event-end-date"><strong>End Date: </strong>${endDate}</p>
                                <p class="card-text" id="event-end-time""><strong>End Time: </strong>${response.event.eventEndTime}</p>
                                <p class="card-text" id="event-location"><strong>Location: </strong>${response.event.eventBuildingNumber}, ${response.event.eventStreetName}, ${response.event.eventCity}, ${response.event.eventCounty}, ${response.event.eventCountry}, ${response.event.eventPostCode}</p>
                                <p class="card-text" id="event-pricing"><strong>Pricing: </strong>${response.event.eventPricing}</p>
                                <p class="card-text" id="event-ticket-price"><strong>Ticket Price: </strong>${response.event.eventTicketPrice}</p>
                                <p class="card-text" id="event-tickets-left"><strong>Amount Of Tickets Left: </strong>${response.event.eventTicketAmount}</p>
                                <p class="card-text" id="event-atendees"><strong>Atendees:</strong></p>
                                <ul id="atendees-get"></ul>
                                <p class="card-text"><strong>Pending invites:</strong></p>
                                <ul id="invited-get"></ul>
                            </div>
                        `
                        eventDisplay.appendChild(aEventToDisplay);
                        const atendeesGet = document.getElementById('atendees-get')
        
                        response.event.eventAtendees.forEach(atendee => {
                            const anAtendeeDisplay = document.createElement('li')
                            anAtendeeDisplay.innerHTML = `${atendee.profileFirstName} ${atendee.profileSecondName}`
                            atendeesGet.appendChild(anAtendeeDisplay)
                        })
                        const invitedGet = document.getElementById('invited-get')
                        response.event.eventInvited.forEach(atendee => {
                            const anAtendeeDisplay = document.createElement('li')
                            anAtendeeDisplay.innerHTML = `${atendee.profileFirstName} ${atendee.profileSecondName}`
                            invitedGet.appendChild(anAtendeeDisplay)
                        })
                    } else if (userRoleSignedIn === "external" || userRoleSignedIn === null) {
                        function getDateFromISOString(isoString) {
                            const date = new Date(isoString);
                            
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0'); 
                            const day = String(date.getDate()).padStart(2, '0');
                            
                            return `${year}-${month}-${day}`;
                        }
                        const startDate = getDateFromISOString(response.event.eventStartDate);
                        const endDate = getDateFromISOString(response.event.eventEndDate);
                        let aEventToDisplay = document.createElement('div')
                        aEventToDisplay.className = "card"
                        aEventToDisplay.id = `an-event-card-${response.event._id}`
                        aEventToDisplay.innerHTML = `
                            <img class="card-img-top" src="${response.event.eventPicture}" alt="Event Picture">
                            <div class="card-body">
                                <div class="card-title-icon-container">
                                    <h5 class="card-title">${response.event.eventName}</h5>
                                </div>
                                <p class="card-text" id="event-organiser"><strong>Organiser: </strong>${response.event.eventOrganiser.profileFirstName} ${response.event.eventOrganiser.profileSecondName}</p>
                                <p class="card-text" id="event-description"><strong>Description: </strong>${response.event.eventDescription}</p>
                                <p class="card-text" id="event-start-date"><strong>Start Date: </strong>${startDate}</p>
                                <p class="card-text" id="event-start-time"><strong>Start Time: </strong>${response.event.eventStartTime}</p>
                                <p class="card-text" id="event-end-date"><strong>End Date: </strong>${endDate}</p>
                                <p class="card-text" id="event-end-time""><strong>End Time: </strong>${response.event.eventEndTime}</p>
                                <p class="card-text" id="event-location"><strong>Location: </strong>${response.event.eventBuildingNumber}, ${response.event.eventStreetName}, ${response.event.eventCity}, ${response.event.eventCounty}, ${response.event.eventCountry}, ${response.event.eventPostCode}</p>
                                <p class="card-text" id="event-pricing"><strong>Pricing: </strong>${response.event.eventPricing}</p>
                                <p class="card-text" id="event-ticket-price"><strong>Ticket Price: </strong>${response.event.eventTicketPrice}</p>
                                <p class="card-text" id="event-tickets-left"><strong>Amount Of Tickets Left: </strong>${response.event.eventTicketAmount}</p>
        
                            </div>
                        `
                        eventDisplay.appendChild(aEventToDisplay);
        
        
                    }                    
                }
        })
        .catch(function(err) {
            console.log("Error: ", err)
        })
    
    }
}

function deleteEvent () {
    const deleteEventButton = document.getElementById('delete-event-btn')
    deleteEventButton.addEventListener('click', function() {
        const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
        const eventIDDetail = localStorage.getItem('eventIDDetail');

        fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/event/delete/${eventIDDetail}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userTokenSignedIn}`
            },
        })
        .then(response => response.json())
        .then(response => {
            if (response.msg === "Event deleted successfully") {
                localStorage.removeItem('eventIDDetail');
        
                document.getElementById("delete-event-feedback").innerHTML = `${response.msg}`
        
                function returnTimed () {
                    window.location.href = 'events.html';
                }
                setTimeout(returnTimed, 2000);  
            }
            
        })
        .catch(function(err) {
            console.log("Error: ", err)
        })
    })
}


function isSignedIn () {
    const userIDSignedIn = localStorage.getItem('userIDSignedIn');
    const userRoleSignedIn = localStorage.getItem('userRoleSignedIn');
    const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
    const addToCartContainer = document.getElementById('add-to-cart-container')
    const addToCartBtn = document.getElementById('add-to-cart-button')
    const notSignedInCartMSG = document.getElementById('not-signed-in-cart-msg')
    const updateEventBTN = document.getElementById('update-event-btn')
    const deleteEventBTN = document.getElementById('delete-event-btn')

    if (userIDSignedIn === null || userTokenSignedIn === null) {
        addToCartContainer.style.display = "none";
        addToCartBtn.style.display = "none";
        notSignedInCartMSG.style.display= "block";
    } else if (userIDSignedIn !== null || userTokenSignedIn !== null) {
        addToCartContainer.style.display = "block";
        addToCartBtn.style.display = "block";
        notSignedInCartMSG.style.display= "none";
    }
    if (userRoleSignedIn !== null) {
        if (userRoleSignedIn === "internal") {
            updateEventBTN.style.display = "block";
            deleteEventBTN.style.display = "block";
        } else if (userRoleSignedIn === "external") {
            updateEventBTN.style.display = "none";
            deleteEventBTN.style.display = "none";
    
        }
    } else if (userRoleSignedIn === null) {
        updateEventBTN.style.display = "none";
        deleteEventBTN.style.display = "none";
    }

}

//add url to below.

function updateEvent () {
    const updateEventButton = document.getElementById('update-event-btn')
    updateEventButton.addEventListener('click', function() {
        window.location.href = "eventUpdate.html"
    
    })
}





function addToCart () {
    let addToCartBtn = document.querySelector(`#add-to-cart-button`)
    addToCartBtn.addEventListener('click', function (event) {
        event.preventDefault 
        const ticketAmountPurchase = document.querySelector(`#add-to-cart-amount`)
        const addToCartAmountFeedback = document.querySelector(`#add-to-cart-amount-feedback`)
        const addedToCartFeedback = document.querySelector('#added-to-cart-feedback')
        const ticketsLeft = parseInt(localStorage.getItem('ticketsLeft'), 10);
        const eventIDDetail = localStorage.getItem('eventIDDetail');
        const userIDSignedIn = localStorage.getItem('userIDSignedIn');

        addedToCartFeedback.innerHTML = ""
        ticketsLeft.typeof
        if (ticketAmountPurchase.value > ticketsLeft) {
            ticketAmountPurchase.className = "form-control is-invalid"
            addToCartAmountFeedback.innerHTML = "Amount of tickets purchased field must not be empty or be greater than the amount of tickets available"
        } else if (ticketAmountPurchase.value.length === 0) {
            ticketAmountPurchase.className = "form-control is-invalid"
            addToCartAmountFeedback.innerHTML = "Amount of tickets purchased field must not be empty or be greater than the amount of tickets available"
        } else if (ticketAmountPurchase.value <= ticketsLeft) {
            ticketAmountPurchase.className = "form-control"
            addToCartAmountFeedback.innerHTML = ""
            addedToCartFeedback.innerHTML = "Event successfully added to cart"
            let arrayStringBefore = localStorage.getItem('cartArray');

            let cartArrayToEdit = JSON.parse(arrayStringBefore);
            let eventInCart = {
                eventID: eventIDDetail,
                eventTicketAmountBrought: ticketAmountPurchase.value,
                eventAtendee: userIDSignedIn
            }
            cartArrayToEdit.push(eventInCart)
            let arrayStringAfter = JSON.stringify(cartArrayToEdit);
            localStorage.setItem('cartArray', arrayStringAfter);

        }

    })
}