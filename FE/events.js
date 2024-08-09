document.addEventListener('DOMContentLoaded', function() {
    loadEvents()
    isSignedIn()
})

let eventsArray = []


let eventCallendar = []


function isSignedIn () {
    const createEventButton = document.querySelector('.btn-create-event')
    const userIDSignedIn = localStorage.getItem('userIDSignedIn');
    const userRoleSignedIn = localStorage.getItem('userRoleSignedIn');
    const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
    if (userIDSignedIn !== null && userTokenSignedIn !== null) {
        if (userRoleSignedIn === "internal") {
            createEventButton.style.display = "block";
        } else if (userRoleSignedIn === "external") {
            createEventButton.style.display = "none";
        }
    } else if (userIDSignedIn === null || userTokenSignedIn === null) {
        createEventButton.style.display = "none"

    }

}

function loadEvents() {
    const userIDSignedIn = localStorage.getItem('userIDSignedIn');

    const eventDisplay = document.querySelector('.card-container')
    const eventsLoading = document.querySelector('#events-loading')
    eventsLoading.style.display = "block"
    eventsLoading.innerHTML = "Loading Events..."
                fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/events/get`, {
                    method: 'GET',
                })
                .then(response => response.json())
                .then(response => {
                eventsLoading.style.display = "none"
                eventsLoading.innerHTML = ""
                response.events.forEach(aEvent => {
                    function getDateFromISOString(isoString) {
                        const date = new Date(isoString);
                        
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0'); 
                        const day = String(date.getDate()).padStart(2, '0');
                        
                        return `${year}-${month}-${day}`;
                    }
                    const startDate = getDateFromISOString(aEvent.eventStartDate);
                    const endDate = getDateFromISOString(aEvent.eventEndDate);


                    eventsArray.push(aEvent)
                    let aEventToDisplay = document.createElement('div')
                    aEventToDisplay.className = "card"
                    aEventToDisplay.id = `event-card-${aEvent._id}`
                    aEventToDisplay.innerHTML = `
                        <div class="card-body">
                        <img class="card-img-top" src="${aEvent.eventPicture}" alt="Event Picture">
                            <div class="card-title-icon-container">
                                <div class="card-title event-card-title">${aEvent.eventName}</div>
                            </div>
                        <ul>
                        <li class="card-text"><strong>Description: </strong>${aEvent.eventDescription}</li>
                        <li class="card-text"><strong>Start Date: </strong>${startDate}</li>
                        <li class="card-text"><strong>Start Time: </strong>${aEvent.eventStartTime}</li>
                        <li class="card-text"><strong>End Date: </strong>${endDate}</li>
                        <li class="card-text"><strong>End Time: </strong>${aEvent.eventEndTime}</li>
                        <li class="card-text"><strong>Location: </strong>${aEvent.eventBuildingNumber}, ${aEvent.eventStreetName}, ${aEvent.eventCity}, ${aEvent.eventCounty}, ${aEvent.eventCountry}, ${aEvent.eventPostCode}</li>
                        <li class="card-text"><strong>Pricing: </strong>${aEvent.eventPricing}</li>
                        <li class="card-text"><strong>Price: </strong>£${aEvent.eventTicketPrice}</li>
                        <li class="card-text"><strong>Tickets Left: </strong>${aEvent.eventTicketAmount}</li>
                        </ul>
                        
                        <button class="btn btn-primary" style="width: 100%" value="${aEvent}" id="view-event-button-${aEvent._id}" >View Event Details</button>
                        </div>
                        
                        </div>
                    `



                    eventDisplay.appendChild(aEventToDisplay) 

                    const viewEventDetail = document.querySelector(`#view-event-button-${aEvent._id}`)
                    viewEventDetail.addEventListener('click', function (event) {
                        event.preventDefault 

                        localStorage.setItem('eventIDDetail', aEvent._id);
                        const eventIDDetail = localStorage.getItem('eventIDDetail');
                        window.location.href = 'event.html'

                    })
                        
                        
                    



            })
        })
}
/*

google code:










  






/*
            eventsDisplay = []
            eventsArray.forEach(event => {
                /*
                let aEventToDisplay = document.createElement('div')
                aEventToDisplay.className = "card"
                aEventToDisplay.id = `event-card-${event.event_id}`
                aEventToDisplay.innerHTML = `
                    <img class="card-img-top" src="${event.event_picture}" alt="Event Picture">
                    <div class="card-body">
                        <div class="card-title-icon-container">
                            <h5 class="card-title">${event.event_name}</h5>
                        </div>
                    <p class="card-text">Description: ${event.eventDescription}</p>
                    <p class="card-text">Start Date: ${event.event_start_date}</p>
                    <p class="card-text">Event City: ${event.event_city}</p>
                    <p class="card-text">Price: ${event.event_ticket_price}</p>
                    <button type="button" value="${event.event_id}" id="btn-event-card-${event.event_id}" class="btn btn-primary btn-events-info">Event Info</button>
                    </div>
                `
                document.querySelector(`#btn-event-card-${event.event_id}`).addEventListener('click', function () {
                    eventIDToView = `${event.event_id}`
                    window.location.href = "/event.html"
                    
                })
                eventDisplay.appendChild(aEventToDisplay)
            
        
            })

    document.querySelector('#events-search-submit').addEventListener('click', function (event) {
        event.preventDefault()
        eventsDisplay = []
        const searchPhrase = document.querySelector('#events-search').value
        const searchPhraseLC = searchPhrase.toLowerCase()

        eventsArray.forEach(event => {
            const eventNameLC = event.event_name.toLowerCase()
            const eventdescriptionLC = event.event_description.toLowerCase()
            const eventOrganiserLC = event.event_organiser.toLowerCase()
            const eventStreetNameLC = event.event_street_name.toLowerCase()
            const eventCityLC = event.event_city.toLowerCase()
            const eventCountyLC = event.event_county.toLowerCase()
            const eventCountryLC = event.event_country.toLowerCase()
            
            let containsPhrase = false

            if (eventNameLC.includes(searchPhraseLC) || eventdescriptionLC.includes(searchPhraseLC) || eventOrganiserLC.includes(searchPhraseLC) || eventStreetNameLC.includes(searchPhraseLC) || eventCityLC.includes(searchPhraseLC) || eventCountyLC.includes(searchPhraseLC) || eventCountryLC.includes(searchPhraseLC)) {
                containsPhrase = true 
               // eventsDisplay.push(event)
            }

            const searchPhraseWords = searchPhraseLC.split(/\s+/)

            const eventNameWords = eventNameLC.split(/\s+/)
            const eventDescriptionWords = eventdescriptionLC.split(/\s+/)
            const eventOrganiserWords = eventOrganiserLC.split(/\s+/)
            const eventStreetNameWords = eventStreetNameLC.split(/\s+/)
            const eventCityWords = eventCityLC.split(/\s+/)
            const eventCountyWords = eventCountyLC.split(/\s+/)
            const eventCountryWords = eventCountryLC.split(/\s+/)

                for (let i = 0; i <= searchPhraseWords.length; i++) {
                    // Check if the current substring matches the phrase
                    searchPhraseWords[i]
                    eventNameWords.forEach(word => {
                        if (word === searchPhraseWords[i]) {
                            containsPhrase = true 
                        }
                    })
                    eventDescriptionWords.forEach(word => {
                        if (word === searchPhraseWords[i]) {
                            containsPhrase = true 
                        }
                    })
                    eventOrganiserWords.forEach(word => {
                        if (word === searchPhraseWords[i]) {
                            containsPhrase = true 
                        }
                    })
                    eventStreetNameWords.forEach(word => {
                        if (word === searchPhraseWords[i]) {
                            containsPhrase = true 
                        }
                    })
                    eventCityWords.forEach(word => {
                        if (word === searchPhraseWords[i]) {
                            containsPhrase = true 
                        }
                    })
                    eventCountyWords.forEach(word => {
                        if (word === searchPhraseWords[i]) {
                            containsPhrase = true 
                        }
                    })
                    eventCountryWords.forEach(word => {
                        if (word === searchPhraseWords[i]) {
                            containsPhrase = true 
                        }
                    })

                }
                if (containsPhrase === true) {
                    eventsDisplay.push(event)
                }
        })
    })
    document.querySelector('#sort-by-date').addEventListener('click', function () {
        sortEventsByStartDate(eventsArray)
        function sortEventsByStartDate(eventsArray) {
            // Sort the eventsArray based on event_start_date
            const sortedEvents = eventsArray.slice().sort((a, b) => new Date(a.event_start_date) - new Date(b.event_start_date));
            
            // Create an array to store the sorted event objects
            eventsDisplay = [];
        
            // Copy over the sorted event objects into eventsDisplay array
            sortedEvents.forEach(event => {
                eventsDisplay.push({
                    event_id: event.event_id,
                    event_organiser: event.event_organiser,
                    event_name: event.event_name,
                    event_description: event.event_description,
                    event_start_date: event.event_start_date,
                    event_start_time: event.event_start_time,
                    event_end_date: event.event_end_date,
                    event_end_time: event.event_end_time,
                    event_building_number: event.event_building_number,
                    event_street_name: event.event_street_name,
                    event_city: event.event_city,
                    event_county: event.event_county,
                    event_country: event.event_country,
                    event_post_code: event.event_post_code,
                    event_pricing: event.event_pricing,
                    event_ticket_price: event.event_ticket_price,
                    event_ticket_amount: event.event_ticket_amount,
                    event_picture: event.event_picture,
                    event_atendees: event.event_atendees
                });
            });
        
            return eventsDisplay;
        }
        
    })
    document.querySelector('#sort-by-price').addEventListener('click', function () {
        sortEventsByTicketPrice (eventsArray)
        function sortEventsByTicketPrice(eventsArray) {
            // Sort the eventsArray based on event_ticket_price
            const sortedEvents = eventsArray.slice().sort((a, b) => a.event_ticket_price - b.event_ticket_price);
            
            // Create an array to store the sorted event objects
            eventsDisplay = [];
        
            // Copy over the sorted event objects into eventsDisplay array
            sortedEvents.forEach(event => {
                eventsDisplay.push({
                    event_id: event.event_id,
                    event_organiser: event.event_organiser,
                    event_name: event.event_name,
                    event_description: event.event_description,
                    event_start_date: event.event_start_date,
                    event_start_time: event.event_start_time,
                    event_end_date: event.event_end_date,
                    event_end_time: event.event_end_time,
                    event_building_number: event.event_building_number,
                    event_street_name: event.event_street_name,
                    event_city: event.event_city,
                    event_county: event.event_county,
                    event_country: event.event_country,
                    event_post_code: event.event_post_code,
                    event_ticket_price: event.event_ticket_price,
                    event_ticket_amount: event.event_ticket_amount,
                    event_picture: event.event_picture,
                    event_atendees: event.event_atendees
                });
            });
        
            return eventsDisplay;
        }
    })
    */




