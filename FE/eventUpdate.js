document.addEventListener('DOMContentLoaded', function() {
    createEventForm()
})

let atendeeID = 0

let atendeeArray = []
let profileArray = []
let atendeeArrayOld = []

function createEventForm() {

    const userIDSignedIn = localStorage.getItem('userIDSignedIn');
    const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
    const userRoleSignedIn = localStorage.getItem('userRoleSignedIn');
    const eventIDDetail = localStorage.getItem('eventIDDetail');
    const eventUpdateLoading = document.getElementById('event-update-loading')

    eventUpdateLoading.style.display = "none"
    eventUpdateLoading.innerHTML = ""
 if (userRoleSignedIn === "internal") {
    const updateEventForm = document.querySelector('#middle-container-update-event')
    updateEventForm.innerHTML = `

<div class="form-group">
    <label for="update-event-name">Event Name:</label>
    <input type="text" class="form-control" id="update-event-name" placeholder="Enter event name" required>
    <div class="invalid-feedback update-event-name-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-description">Event Description:</label>
    <input type="text" class="form-control" id="update-event-description" placeholder="Enter event description" required>
    <div class="invalid-feedback update-event-description-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-start-date">Event Start Date:</label>
    <input type="date" class="form-control" id="update-event-start-date" placeholder="Enter event start date" required>
    <div class="invalid-feedback update-event-start-date-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-start-time">Event Start Time:</label>
    <input type="time" class="form-control" id="update-event-start-time" placeholder="Enter event start date" required>
    <div class="invalid-feedback update-event-start-time-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-end-date">Event End Date:</label>
    <input type="date" class="form-control" id="update-event-end-date" placeholder="Enter event end date" required>
    <div class="invalid-feedback update-event-end-date-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-end-time">Event End Time:</label>
    <input type="time" class="form-control" id="update-event-end-time" placeholder="Enter event end date" required>
    <div class="invalid-feedback update-event-end-time-feedback">
    </div>
  </div>
  <p>Event Location:</p>
  <div class="form-group">
    <label for="update-event-address-number">Building Number:</label>
    <input type="text" class="form-control" id="update-event-address-number" placeholder="Enter your house number" required>
    <div class="invalid-feedback update-event-address-number-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-street">Street Name:</label>
    <input type="text" class="form-control" id="update-event-street" placeholder="Enter your street name" required>
    <div class="invalid-feedback update-event-street-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-city">City:</label>
    <input type="text" class="form-control" id="update-event-city" placeholder="Enter your city" required>
    <div class="invalid-feedback update-event-city-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-county">County:</label>
    <input type="text" class="form-control" id="update-event-county" placeholder="Enter your county" required>
    <div class="invalid-feedback update-event-county-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-country">Country:</label>
    <input type="text" class="form-control" id="update-event-country" placeholder="Enter your country" required>
    <div class="invalid-feedback update-event-country-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-post-code">Post Code:</label>
    <input type="text" class="form-control" id="update-event-post-code" placeholder="Enter your post code" required>
    <div class="invalid-feedback update-event-post-code-feedback">
    </div>
  </div>
  <label for="radio-inline-container-id">Event Pricing:</label>
  <fieldset class="form-group radio-inline-container" id="radio-inline-container-id">
                <div class="custom-control custom-radio-inline">
                    <input class="custom-control-input" type="radio" name="pricingRadio" id="pricing-free-update" value="free">
                    <label class="custom-control-label" for="pricing-free-update">
                    Free
                    </label>
                </div>
                <div class="custom-control custom-radio-inline">
                    <input class="custom-control-input" type="radio" name="pricingRadio" id="pricing-paid-update" value="paid">
                    <label class="custom-control-label" for="pricing-paid-update">
                    Paid
                    </label>
                </div>
                <div class="custom-control custom-radio-inline">
                  <input class="custom-control-input" type="radio" name="pricingRadio" id="pricing-pay-as-you-feel-update" value="pay-as-you-feel">
                  <label class="custom-control-label" for="pricing-pay-as-you-feel-update">
                  Pay As You Feel
                  </label>
              </div>
            </fieldset>
            <div class="create-event-pricing-feedback-update">
            </div>

  <div class="form-group">
    <label for="update-event-ticket-price">Price Of Event Ticket:</label>
    <input type="number" class="form-control" id="update-event-ticket-price" placeholder="Enter price of event tickets" step="0.01" required>
    <div class="invalid-feedback update-event-ticket-price-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-ticket-amount">Amount Of Event Tickets:</label>
    <input type="number" class="form-control" id="update-event-ticket-amount" placeholder="Enter amount of event tickets." required>
    <div class="invalid-feedback update-event-ticket-amount-feedback">
    </div>
  </div>
  <div class="form-group">
    <label for="update-event-image">Event Picture:</label>
    <input type="string" class="form-control" id="update-event-image" placeholder="Enter link to hosted picture."  required>
    <div class="invalid-feedback update-event-image-feedback">
    </div>
  </div>
  <p>Invited:</p>
  <div id="atendee-radio-container">

  </div>
  
  <br>
  <div id="updated-event-feedback">
  </div>
  <br>
  <button id="submit" name="submit" type="submit" class="btn btn-primary btn-update-event">update Event</button>
  <br>
    `
    const eventOrganiser = document.querySelector('#update-event-organiser')
    const eventOrganiserFeedback = document.querySelector('.update-event-organiser-feedback')
    const eventName = document.querySelector('#update-event-name')
    const eventNameFeedback = document.querySelector('.update-event-name-feedback')
    const eventDescription = document.querySelector('#update-event-description')
    const eventDescriptionFeedback = document.querySelector('.update-event-description-feedback')
    const eventStartDate = document.querySelector('#update-event-start-date')
    const eventStartDateFeedback = document.querySelector('.update-event-start-date-feedback')
    const eventStartTime = document.querySelector('#update-event-start-time')
    const eventStartTimeFeedback = document.querySelector('.update-event-start-time-feedback')
    const eventEndDate = document.querySelector('#update-event-end-date')
    const eventEndDateFeedback = document.querySelector('.update-event-end-date-feedback')
    const eventEndTime = document.querySelector('#update-event-end-time')
    const eventEndTimeFeedback = document.querySelector('.update-event-end-time-feedback')
    const eventTicketPriceFeedback = document.querySelector('.update-event-ticket-price-feedback')
    const eventTicketAmount= document.querySelector('#update-event-ticket-amount')
    const eventTicketAmountFeedback = document.querySelector('.update-event-ticket-amount-feedback')
    const createdEventFeedback = document.querySelector('#updated-event-feedback')
    const postCode = document.querySelector('#update-event-post-code')
    const postCodeFeedback = document.querySelector('.update-event-post-code-feedback')
    const houseNumber = document.querySelector('#update-event-address-number')
    const houseNumberFeedback = document.querySelector('.update-event-address-number-feedback')
    const street = document.querySelector('#update-event-street')
    const streetFeedback = document.querySelector('.update-event-street-feedback')
    const city = document.querySelector('#update-event-city')
    const cityFeedback = document.querySelector('.update-event-city-feedback')
    const county = document.querySelector('#update-event-county')
    const countyFeedback = document.querySelector('.update-event-county-feedback')
    const country = document.querySelector('#update-event-country')
    const countryFeedback = document.querySelector('.update-event-country-feedback')
    const eventTicketPrice = document.querySelector('#update-event-ticket-price')
    const eventImage = document.querySelector('#update-event-image')
    const eventImageFeedback = document.querySelector('.update-event-image-feedback')
    const atendeeRadioContainer = document.getElementById('atendee-radio-container')

    const pricingFree = document.querySelector('#pricing-free-update')
    const pricingPaid = document.querySelector('#pricing-paid-update')
    const pricingPAYF = document.querySelector('#pricing-pay-as-you-feel-update')
    const pricingFeedback = document.querySelector('.create-event-pricing-feedback-update')
    let pricing = "";

    if (!pricingFree.checked && !pricingPaid.checked && !pricingPAYF.checked) {
        pricingFeedback.innerHTML = "Pricing must be either free, paid or pay as you feel."
        
    } else if (pricingFree.checked && pricingPaid.checked && pricingPAYF.checked) {
        pricingFeedback.innerHTML = "Pricing must be either free, paid or pay as you feel."

    } else if (pricingFree.checked) {
        pricing = "free"
        pricingFeedback.innerHtml = ""
    } else if (pricingPaid.checked) {
        pricing = "paid"
        pricingFeedback.innerHtml = ""
    } else if (pricingPAYF.checked) {
        pricing = "pay as you feel"
        pricingFeedback.innerHTML = ""
    }


    let atendeeArray = []
    let profileArray = []

    
    async function autoFillEventForm(atendeeArray, profileArray) {
        try {
            eventUpdateLoading.style.display = "block";
            eventUpdateLoading.innerHTML = "Loading event to update...";
    
            let response = await fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/event/get/${eventIDDetail}/aevent`, {
                method: 'GET',
            });
            let eventResponse = await response.json();

            if (eventResponse.msg === 'Event get successfull') {
                const dateStartFormat = eventResponse.event.eventStartDate.split('T')[0];
                const dateEndFormat = eventResponse.event.eventEndDate.split('T')[0];
                eventUpdateLoading.style.display = "none";
                eventUpdateLoading.innerHTML = "";
                eventName.value = eventResponse.event.eventName;
                eventDescription.value = eventResponse.event.eventDescription;
                eventStartDate.value = dateStartFormat;
                eventStartTime.value = eventResponse.event.eventStartTime;
                eventEndDate.value = dateEndFormat;
                eventEndTime.value = eventResponse.event.eventEndTime;
                eventTicketAmount.value = eventResponse.event.eventTicketAmount;
                eventTicketPrice.value = eventResponse.event.eventTicketPrice;
                postCode.value = eventResponse.event.eventPostCode;
                houseNumber.value = eventResponse.event.eventBuildingNumber;
                street.value = eventResponse.event.eventStreetName;
                city.value = eventResponse.event.eventCity;
                county.value = eventResponse.event.eventCounty;
                country.value = eventResponse.event.eventCountry;
                eventImage.src = eventResponse.event.eventPicture;
                atendeeArrayOld = eventResponse.event.eventAtendees,
                atendeeID += eventResponse.event.eventAtendees.length;
                isFreeOrPaidOrPAYF(eventResponse.event.eventPricing);

                eventResponse.event.eventInvited.forEach(atendee => {
                    atendeeArray.push(atendee);
                });
            }
    
            response = await fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/profiles/get`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userTokenSignedIn}`
                },
            });
            let profilesResponse = await response.json();
            if (profilesResponse.msg === "Profiles get successfull") {
                profilesResponse.profiles.forEach(profile => {
                    profileArray.push(profile);
                });
            }
                atendeeArray.forEach(atendee => {
                    let indexProfile = 0;
                    profileArray.forEach(profile => {
                        indexProfile += 1
                        if (atendee._id === profile._id) {
                            profileArray.splice(indexProfile-1, 1);

                        }
                    })

                    
            })
            atendeeArray.forEach(atendee => {
            const atendeeRadio = document.createElement('radio')

                    atendeeRadio.innerHTML = 
                    `<div class="form-check">
                    <input class="form-check-input atendeeCheckbox" type="checkbox" value="${atendee._id}" id="atendee-check-${atendee._id}" checked>
                    <label class="form-check-label" for="flexRadioDefault1">
                      ${atendee.profileFirstName} ${atendee.profileSecondName}
                    </label>
                    </div>`

                    atendeeRadioContainer.appendChild(atendeeRadio)
                    const atendeeIDclick = document.getElementById(`atendee-check-${atendee._id}`)
                    atendeeIDclick.addEventListener('click', function () {
                        if (atendeeIDclick.checked) {
                            atendeeArray.push(atendeeIDclick.value)
                            let profileIDIndex = 0;
                            profileArray.forEach(profile => {
                                profileIDIndex += 1
                                if (profile._id === atendeeIDclick.value) {
                                    profileArray.splice(profileIDIndex-1, 1);

                                }
                            })
                            


                            

                        } else if (!atendeeIDclick.checked) {
                            profileArray.push(atendeeIDclick.value)

                            let atendeeIDIndex = 0;
                            atendeeArray.forEach(atendee => {
                                atendeeIDIndex += 1
                                if (atendee._id === atendeeIDclick.value) {
                                    atendeeArray.splice(atendeeIDIndex-1, 1);

                                }
                            })



                        }
                    }) 
            })
            profileArray.forEach(atendee => {
                const atendeeRadio = document.createElement('radio')
    
                        atendeeRadio.innerHTML = 
                        `<div class="form-check">
                        <input class="form-check-input atendeeCheckbox" type="checkbox" value="${atendee._id}" id="atendee-check-${atendee._id}">
                        <label class="form-check-label" for="flexRadioDefault1">
                          ${atendee.profileFirstName} ${atendee.profileSecondName}
                        </label>
                        </div>`
    
                        atendeeRadioContainer.appendChild(atendeeRadio)
                        const atendeeIDclick = document.getElementById(`atendee-check-${atendee._id}`)
                        atendeeIDclick.addEventListener('click', function () {
                            if (atendeeIDclick.checked) {
                                atendeeArray.push(atendeeIDclick.value)
                                let profileIDIndex = 0;
                                profileArray.forEach(profile => {
                                    profileIDIndex += 1
                                    if (profile._id === atendeeIDclick.value) {
                                        profileArray.splice(profileIDIndex-1, 1);
    
                                    }
                                })

    
    
                                
    
                            } else if (!atendeeIDclick.checked) {
                                profileArray.push(atendeeIDclick.value)
    
                                let atendeeIDIndex = 0;
                                atendeeArray.forEach(atendee => {
                                    atendeeIDIndex += 1
                                    if (atendee._id === atendeeIDclick.value) {
                                        atendeeArray.splice(atendeeIDIndex-1, 1);
    
                                    }
                                })

    
                            }
                        }) 
                })

                const updatEventButtonExtra = document.querySelector('.btn-update-event')
                updatEventButtonExtra.addEventListener('click', function(event) {
                    
            
                    event.preventDefault()
            
            
                    //to create form validation for
                    const eventOrganiser = document.querySelector('#update-event-organiser')
                    const eventOrganiserFeedback = document.querySelector('.update-event-organiser-feedback')
                    const eventName = document.querySelector('#update-event-name')
                    const eventNameFeedback = document.querySelector('.update-event-name-feedback')
                    const eventDescription = document.querySelector('#update-event-description')
                    const eventDescriptionFeedback = document.querySelector('.update-event-description-feedback')
                    const eventStartDate = document.querySelector('#update-event-start-date')
                    const eventStartDateFeedback = document.querySelector('.update-event-start-date-feedback')
                    const eventStartTime = document.querySelector('#update-event-start-time')
                    const eventStartTimeFeedback = document.querySelector('.update-event-start-time-feedback')
                    const eventEndDate = document.querySelector('#update-event-end-date')
                    const eventEndDateFeedback = document.querySelector('.update-event-end-date-feedback')
                    const eventEndTime = document.querySelector('#update-event-end-time')
                    const eventEndTimeFeedback = document.querySelector('.update-event-end-time-feedback')
                    const eventTicketPriceFeedback = document.querySelector('.update-event-ticket-price-feedback')
                    const eventTicketAmount= document.querySelector('#update-event-ticket-amount')
                    const eventTicketAmountFeedback = document.querySelector('.update-event-ticket-amount-feedback')
                    const createdEventFeedback = document.querySelector('#updated-event-feedback')
                    const postCode = document.querySelector('#update-event-post-code')
                    const postCodeFeedback = document.querySelector('.update-event-post-code-feedback')
                    const houseNumber = document.querySelector('#update-event-address-number')
                    const houseNumberFeedback = document.querySelector('.update-event-address-number-feedback')
                    const street = document.querySelector('#update-event-street')
                    const streetFeedback = document.querySelector('.update-event-street-feedback')
                    const city = document.querySelector('#update-event-city')
                    const cityFeedback = document.querySelector('.update-event-city-feedback')
                    const county = document.querySelector('#update-event-county')
                    const countyFeedback = document.querySelector('.update-event-county-feedback')
                    const country = document.querySelector('#update-event-country')
                    const countryFeedback = document.querySelector('.update-event-country-feedback')
                    const eventTicketPrice = document.querySelector('#update-event-ticket-price')
                    const eventImage = document.querySelector('#update-event-image')
                    const eventImageFeedback = document.querySelector('.update-event-image-feedback')
                    
                    const pricingFree = document.querySelector('#pricing-free-update')
                    const pricingPaid = document.querySelector('#pricing-paid-update')
                    const pricingPAYF = document.querySelector('#pricing-pay-as-you-feel-update')
                    const pricingFeedback = document.querySelector('.create-event-pricing-feedback-update')
                    let pricing = "";
                
                    if (!pricingFree.checked && !pricingPaid.checked && !pricingPAYF.checked) {
                        pricingFeedback.innerHTML = "Pricing must be either free, paid or pay as you feel."
                        
                    } else if (pricingFree.checked && pricingPaid.checked && pricingPAYF.checked) {
                        pricingFeedback.innerHTML = "Pricing must be either free, paid or pay as you feel."
                
                    } else if (pricingFree.checked) {
                        pricing = "free"
                        pricingFeedback.innerHTML = ""
                    } else if (pricingPaid.checked) {
                        pricing = "paid"
                        pricingFeedback.innerHTML = ""
                    } else if (pricingPAYF.checked) {
                        pricing = "pay as you feel"
                        pricingFeedback.innerHTML = ""
                    }
                    
                    let hasImage = false
                    if (eventImage.value.length !== 0) {
                        eventImage.className  = "form-control"
                        eventImageFeedback.innerHTML = ""
                        hasImage = true
                    } else if (eventImage.value.length === 0) {
                        eventImage.className  = "form-control is-invalid"
                        eventImageFeedback.innerHTML = "Event image field must not be empty"
                        hasImage = false
                    }
            
                    
                    
            
            

            
                    let hasEventName
            
                    if (eventName.value.length !== 0) {
                        eventName.className = "form-control"
                        eventNameFeedback.innerHTML = ""
                        hasEventName = true
            
                    } else {
                        eventName.className = "form-control is-invalid"
                        eventNameFeedback.innerHTML = "Event name field must not be empty."
                        hasEventName = false
                    }
            
                    let hasEventDescription
            
                    if (eventDescription.value.length !== 0) {
                        eventDescription.className = "form-control"
                        eventDescriptionFeedback.innerHTML = ""
                        hasEventDescription = true
            
                    } else {
                        eventDescription.className = "form-control is-invalid"
                        eventDescriptionFeedback.innerHTML = "Event description field must not be empty."
                        hasEventDescription = false
            
                    }
            
                    let hasEventTicketAmount
            
                    if (eventTicketAmount.value.length !== 0) {
                        eventTicketAmount.className = "form-control"
                        eventTicketAmountFeedback.innerHTML = ""
                        hasEventTicketAmount = true
                    } else if (eventTicketAmount.value.length === 0) {
                        eventTicketAmount.className = "form-control is-invalid"
                        eventTicketAmountFeedback.innerHTML = "Amount must be a number greater than 0"
                        hasEventTicketAmount = false
                    }
            
                    let hasEventTicketPrice
            
                    if (eventTicketPrice.value.length !== 0) {
                        eventTicketPrice.className = "form-control"
                        eventTicketPriceFeedback.innerHTML = ""
                        let priceDecimal = parseFloat(eventTicketPrice.value)
                        let formattedPriceDecimal = priceDecimal.toFixed(2)
                        eventTicketPrice.value = formattedPriceDecimal
                        hasEventTicketPrice = true
                    } else if (eventTicketPrice.value.length === 0) {
                        eventTicketPrice.className = "form-control is-invalid"
                        eventTicketPriceFeedback.innerHTML = "Price field must not be empty and must be in Pounds.Pence format for example 1.34"
                        hasEventTicketPrice = false
                    }
            
            
            
                   const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                   const hasEventStartTime = timeRegex.test(eventStartTime.value)
                   const hasEventEndTime = timeRegex.test(eventStartTime.value)
                   
                   
                   if (hasEventStartTime) {
                        eventStartTime.className = "form-control"
                        eventStartTimeFeedback.innerHTML = ""
            
                   } else if (!hasEventStartTime) {
                        eventStartTime.className = "form-control is-invalid"
                        eventStartTimeFeedback.innerHTML = "Event start time must be s string, hours must be in range of 00 to 23, minutes must be in range 00 to 59, hours and minutes must be separated by a ':'"
                   }
                   if (hasEventEndTime) {
                        eventEndTime.className = "form-control"
                        eventEndTimeFeedback.innerHTML = ""
                   } else if (!hasEventEndTime) {
                        eventEndTime.className = "form-control is-invalid"
                        eventEndTimeFeedback.innerHTML = "Event end time must be s string, hours must be in range of 00 to 23, minutes must be in range 00 to 59, hours and minutes must be separated by a ':'"
            
                   }
            
                       
                   //
           

        

       function isStartTimeBeforeEndTime(startTime, endTime) {
        const startParts = startTime.split(":");
        const endParts = endTime.split(":");
    
        const startHours = parseInt(startParts[0], 10);
        const startMinutes = parseInt(startParts[1], 10);
        const endHours = parseInt(endParts[0], 10);
        const endMinutes = parseInt(endParts[1], 10);
    
        if (startHours < endHours || (startHours === endHours && startMinutes < endMinutes)) {
            return true; 
        } else {
            return false; 
        }
    }   
    function isValidDate(dateString) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateString)) {
            return false; 
        }

        const dateParts = dateString.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        const dateObject = new Date(year, month - 1, day);
        if (dateString === "") {
            return false;
        } else if (isNaN(dateObject.getTime())) {
            return false; 
        }
        return true;
    }
    const hasStartDate = isValidDate(eventStartDate.value);
    const hasEndDate = isValidDate(eventEndDate.value);

    function isEndDateAfterOrSameAsStartDate(startDate, endDate) {

    
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
    
        // Set the time to midnight to ignore the time component
        startDateObj.setHours(0, 0, 0, 0);
        endDateObj.setHours(0, 0, 0, 0);
    
        const hasStartDateCheck = isValidDate(startDate);
        const hasEndDateCheck = isValidDate(endDate);

        const timeSequenceBool = isStartTimeBeforeEndTime(eventStartTime.value, eventEndTime.value)
    
        if (hasStartDateCheck && hasEndDateCheck) {
            if (endDateObj > startDateObj) {
                return "date true"; 
            } else if (endDateObj < startDateObj) {    
                return "date false";
            } else if (endDateObj.getTime() === startDateObj.getTime()) {
                if (timeSequenceBool === true) {
                    return "date true time true"

                } else if (timeSequenceBool === false) {
                    return "date true time false"

                }
            }
        } else if (hasStartDateCheck && !hasEndDateCheck) {
            return "end date false";
        } else if (!hasStartDateCheck && hasEndDateCheck) {
            return "start date false";
        }  else if (!hasStartDateCheck && !hasEndDateCheck) {
            return "start date false end date false";
        }
    }

   const hasEndDateGreaterOrEqaulToStartDate = isEndDateAfterOrSameAsStartDate(eventStartDate.value, eventEndDate.value)
   console.log("date time", hasEndDateGreaterOrEqaulToStartDate)


   if (hasEndDateGreaterOrEqaulToStartDate === "date true") {
    eventStartDate.className = "form-control"
    eventEndDate.className = "form-control"
    eventStartDateFeedback.innerHTML = ""
    eventEndDateFeedback.innerHTML = ""
   } else if (hasEndDateGreaterOrEqaulToStartDate === "date false") {
    eventStartDate.className = "form-control is-invalid"
    eventEndDate.className = "form-control is-invalid"
    eventStartDateFeedback.innerHTML = "Event start date must be before event end date."
    eventEndDateFeedback.innerHTML = "Event end date must be before event end."      
   } else if (hasEndDateGreaterOrEqaulToStartDate === "end date false") {
    eventEndDate.className = "form-control is-invalid"
    eventEndDateFeedback.innerHTML = "Event end date must not be empty."  
   } else if (hasEndDateGreaterOrEqaulToStartDate === "start date false")  {
    eventStartDate.className = "form-control is-invalid"
    eventStartDateFeedback.innerHTML = "Event start date must be not be empty."
   }else if (hasEndDateGreaterOrEqaulToStartDate === "start date false end date false")  {
    eventEndDate.className = "form-control is-invalid"
    eventEndDateFeedback.innerHTML = "Event end date must not be empty."
    eventStartDate.className = "form-control is-invalid"
    eventStartDateFeedback.innerHTML = "Event start date must be not be empty."
   } else if (hasEndDateGreaterOrEqaulToStartDate === "date true time true") {
    eventStartDate.className = "form-control"
    eventEndDate.className = "form-control"
    eventStartDateFeedback.innerHTML = ""
    eventEndDateFeedback.innerHTML = ""
    eventStartTime.className = "form-control"
    eventEndTime.className = "form-control"
    eventStartTimeFeedback.innerHTML = ""
    eventEndTimeFeedback.innerHTML = ""
   } else if (hasEndDateGreaterOrEqaulToStartDate === "date true time false") {
    eventStartTime.className = "form-control is-invalid"
    eventEndTime.className = "form-control is-invalid"
    eventStartTimeFeedback.innerHTML = "Event start time must be before event end time if on the same day."
    eventEndTimeFeedback.innerHTML = "Event start time must be before event end time if on the same day."
    eventStartDate.className = "form-control"
    eventEndDate.className = "form-control"
    eventStartDateFeedback.innerHTML = ""
    eventEndDateFeedback.innerHTML = ""
   }

//            
            
            
                    const houseNumberRegex = /^[0-9]+[A-Za-z]?$/;
                    const containsLettersRegex = /[a-zA-Z\s]+/;
            
                    const hasHouseNumber = houseNumberRegex.test(houseNumber.value)
                    const hasStreet = containsLettersRegex.test(street.value)
                    const hasCity = containsLettersRegex.test(city.value)
                    const hasCounty = containsLettersRegex.test(county.value)
                    const hasCountry = containsLettersRegex.test(country.value)
            
                    if (hasHouseNumber) {
                        houseNumber.className = "form-control"
                        houseNumberFeedback.innerHTML = ""
                    } else if (!hasHouseNumber) {
                        houseNumber.className = "form-control is-invalid"
                        houseNumberFeedback.innerHTML = "House number must contain one or more numbers and may contain a letter."
                    }
                    if (hasStreet) {
                        street.className = "form-control"
                        streetFeedback.innerHTML = ""
                    } else if (!hasStreet) {
                        street.className = "form-control is-invalid"
                        streetFeedback.innerHTML = "Street must not be empty, contain only letters and may contain spaces."
                    }
                    if (hasCity) {
                        city.className = "form-control"
                        cityFeedback.innerHTML = ""
                    } else if (!hasCity) {
                        city.className = "form-control is-invalid"
                        cityFeedback.innerHTML = "City must not be empty, contain only letters and may contain spaces."
                    }
                    if (hasCounty) {
                        county.className = "form-control"
                        countyFeedback.innerHTML = ""
                    } else if (!hasCounty) {
                        county.className = "form-control is-invalid"
                        countyFeedback.innerHTML = "County must not be empty, contain only letters and may contain spaces."
                    }
                    if (hasCountry) {
                        country.className = "form-control"
                        countryFeedback.innerHTML = ""
                    } else if (!hasCountry) {
                        country.className = "form-control is-invalid"
                        countryFeedback.innerHTML = "Country must not be empty, contain only letters and may contain spaces."
                    }
                    const postcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}$/i;
                    const hasPostCode = postcodeRegex.test(postCode.value)
            
                    if (hasPostCode) {
                        postCode.className = "form-control"
                        postCodeFeedback.innerHTML = ""
            
                    } else if (!hasPostCode) {
                        postCode.className = "form-control is-invalid"
                        postCodeFeedback.innerHTML = "Postcode must contain one or more letters, one or more digits and a space."
            
                    }

                    function startDateTimeAndEndTimeValid ( ) {
                        if (hasEndDateGreaterOrEqaulToStartDate === "date true time true") {
                            return true
                        } else if (hasEndDateGreaterOrEqaulToStartDate === "date true") {
                            return true
                        } else return false
                    }
                    const startDateTimeAndEndTimeValidVar = startDateTimeAndEndTimeValid()
            
            
            
                    if (hasEventName && hasEventDescription && hasStartDate && hasEndDate && hasEventEndTime && hasEventStartTime && hasHouseNumber && hasStreet && hasCity && hasCountry && hasCounty && hasEventTicketPrice && hasEventTicketAmount && pricing !=="" && eventImage.value !== "" && startDateTimeAndEndTimeValidVar) {
                        updateEvent ()
            
                        function updateEvent () {
                            eventUpdateLoading.style.display = "block"
                            eventUpdateLoading.innerHTML = "Loading event update..."
                            const updateEventBE = {
                                eventOrganiser: userIDSignedIn,
                                eventName: eventName.value,
                                eventDescription: eventDescription.value,
                                eventStartDate: eventStartDate.value,
                                eventStartTime: eventStartTime.value,
                                eventEndDate: eventEndDate.value,
                                eventEndTime: eventEndTime.value,
                                eventBuildingNumber: houseNumber.value,
                                eventStreetName: street.value,
                                eventCity: city.value,
                                eventCounty: county.value,
                                eventCountry: country.value,
                                eventPostCode: postCode.value,
                                eventPricing: pricing,
                                eventTicketPrice: eventTicketPrice.value,
                                eventTicketAmount: eventTicketAmount.value,
                                eventPicture: eventImage.value,
                                eventAtendees: atendeeArrayOld,
                                eventInvited: atendeeArray,
                                _id: `${eventIDDetail}`
                            }
            


                    
                            fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform//event/put/${eventIDDetail}/eventupdate`, {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${userTokenSignedIn}`
                                },
                                body: JSON.stringify(updateEventBE)

                              })
                              .then(response => response.json())
                              .then(response => {
                                console.log(response)
                                eventUpdateLoading.style.display = "none";
                                eventUpdateLoading.innerHTML = "";
                                const updateFeedback = document.getElementById('submitEventUpdateFeedback')
                                if (response.msg === "errors") {

                                    response.errors.forEach(error => {
                                        let errorFeedback = document.createElement('li')
                                        errorFeedback.innerHTML = `${error.msg}`
                                        updateFeedback.appendChild(errorFeedback)
                                    })
                                } else if (response.msg === "Event Updated Successfully") {
                                    let errorFeedback = document.createElement('li')
                                    errorFeedback.innerHTML = `${response.msg}`
                                    updateFeedback.appendChild(errorFeedback)
                                    localStorage.setItem('eventIDDetail', response.event._id);

                                    function returnTimed () {
                                        window.location.href = 'event.html';
                                    }
                                    setTimeout(returnTimed, 2000);

                                }
                              })
                            .catch(function(err) {
                                console.log("Error: ", err)
                            })
                        }
                
                    } 
                })
    
        } catch (err) {
            console.log("Error: ", err);
        }
    }
    
    function isFreeOrPaidOrPAYF(eventPricing) {
        if (eventPricing === "paid") {
            pricingFree.checked = false;
            pricingPaid.checked = true;
            pricingPAYF.checked = false;
        } else if (eventPricing === "free") {
            pricingFree.checked = true;
            pricingPaid.checked = false;
            pricingPAYF.checked = false;
        } else if (eventPricing === "pay as you feel") {
            pricingFree.checked = false;
            pricingPaid.checked = false;
            pricingPAYF.checked = true;
        }
    }
    
    let completedFillingArrays = autoFillEventForm(atendeeArray, profileArray);

    if (completedFillingArrays.promiseState === "fulfilled") {
       
    }

    
    





}

}

