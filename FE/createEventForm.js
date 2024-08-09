
document.addEventListener('DOMContentLoaded', function() {
    createEventForm()
})

function createEventForm() {
    let atendeeID = 0
    let atendeeArray = []
    atendeeArrayFunction(atendeeArray)
    function atendeeArrayFunction (atendeeArray) {

    
    const userIDSignedIn = localStorage.getItem('userIDSignedIn');
    const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
    const userRoleSignedIn = localStorage.getItem('userRoleSignedIn');
    const atendeeRadioContainer = document.getElementById('atendee-radio-container')
    fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/profiles/get`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userTokenSignedIn}`
            },
          })
          .then(response => response.json())
          .then(response => {
            response.profiles.forEach(profile => {
                const atendeeRadio = document.createElement('radio')
                atendeeRadio.innerHTML = 
                `<div class="form-check">
                <input class="form-check-input atendeeCheckbox" type="checkbox" value="${profile._id}" id="atendee-check-${profile._id}">
                <label class="form-check-label" for="flexRadioDefault1">
                  ${profile.profileFirstName} ${profile.profileSecondName}
                </label>
                </div>`
                atendeeRadioContainer.appendChild(atendeeRadio)
                const atendeeIDclick = document.getElementById(`atendee-check-${profile._id}`)
                atendeeIDclick.addEventListener('click', function () {
                    if (atendeeIDclick.checked) {
                        atendeeArray.push(atendeeIDclick.value)
                    } else if (!atendeeIDclick.checked) {
                        const index = atendeeArray.indexOf(atendeeIDclick.value);
                        if (index !== -1) {
                            atendeeArray.splice(index, 1);
                        }


                    }
                })
            })
            
          })
          .catch(function(err) {
            console.log("Error: ", err)
        })
        
    if (userRoleSignedIn === "internal") {
        const createEventContainer = document.getElementById('middle-container-create-event')
        createEventContainer.className = 'internal-see-form';
        
    } else if (userRoleSignedIn === "internal") {
        const createEventContainer = document.getElementById('middle-container-create-event')
        createEventContainer.className = 'external-block-form';
    }


     

    document.querySelector('.btn-create-event').addEventListener('click', function(event) {
        event.preventDefault()
        if (userRoleSignedIn === "internal") {


        //to create form validation for
        
        const eventName = document.querySelector('#create-event-name')
        const eventNameFeedback = document.querySelector('.create-event-name-feedback')
        const eventDescription = document.querySelector('#create-event-description')
        const eventDescriptionFeedback = document.querySelector('.create-event-description-feedback')
        const eventStartDate = document.querySelector('#create-event-start-date')
        const eventStartDateFeedback = document.querySelector('.create-event-start-date-feedback')
        const eventStartTime = document.querySelector('#create-event-start-time')
        const eventStartTimeFeedback = document.querySelector('.create-event-start-time-feedback')
        const eventEndDate = document.querySelector('#create-event-end-date')
        const eventEndDateFeedback = document.querySelector('.create-event-end-date-feedback')
        const eventEndTime = document.querySelector('#create-event-end-time')
        const eventEndTimeFeedback = document.querySelector('.create-event-end-time-feedback')
        const eventTicketAmount= document.querySelector('#create-event-ticket-amount')
        const eventTicketAmountFeedback = document.querySelector('.create-event-ticket-amount-feedback')
        const createdEventFeedback = document.querySelector('#created-event-feedback')
        const postCode = document.querySelector('#create-event-post-code')
        const postCodeFeedback = document.querySelector('.create-event-post-code-feedback')
        const houseNumber = document.querySelector('#create-event-address-number')
        const houseNumberFeedback = document.querySelector('.create-event-address-number-feedback')
        const street = document.querySelector('#create-event-street')
        const streetFeedback = document.querySelector('.create-event-street-feedback')
        const city = document.querySelector('#create-event-city')
        const cityFeedback = document.querySelector('.create-event-city-feedback')
        const county = document.querySelector('#create-event-county')
        const countyFeedback = document.querySelector('.create-event-county-feedback')
        const country = document.querySelector('#create-event-country')
        const countryFeedback = document.querySelector('.create-event-country-feedback')
        const eventTicketPrice = document.querySelector('#create-event-ticket-price')
        const eventTicketPriceFeedback = document.querySelector('.create-event-ticket-price-feedback')
        const eventImage = document.querySelector('#create-event-image')
        const eventImageFeedback = document.querySelector('.create-event-image-feedback')

        const pricingFree = document.querySelector('#pricing-free')
        const pricingPaid = document.querySelector('#pricing-paid')
        const pricingPAYF = document.querySelector('#pricing-pay-as-you-feel')
        const pricingFeedback = document.querySelector('.create-event-pricing-feedback')
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

        if (eventTicketAmount.value.length !== 0 && eventTicketAmount.value > 0) {
            eventTicketAmount.className = "form-control"
            eventTicketAmountFeedback.innerHTML = ""
            hasEventTicketAmount = true
        } else if (eventTicketAmount.value.length === 0 && eventTicketAmount.value <= 0) {
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
        eventStartDate.className = "form-control"
        eventEndDate.className = "form-control"
        eventStartDateFeedback.innerHTML = ""
        eventEndDateFeedback.innerHTML = ""
        eventStartTime.className = "form-control is-invalid"
        eventEndTime.className = "form-control is-invalid"
        eventStartTimeFeedback.innerHTML = "Event start time must be before event end time if on the same day."
        eventEndTimeFeedback.innerHTML = "Event start time must be before event end time if on the same day."
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
        console.log("hasEventName", hasEventName)
        console.log("hasEventDescription", hasEventDescription)
        console.log("hasStartDate", hasStartDate)
        console.log("hasEndDate", hasEndDate)
        console.log("hasEventEndTime", hasEventEndTime)
        console.log("hasEventStartTime", hasEventStartTime)
        console.log("hasHouseNumber", hasHouseNumber)
        console.log("hasStreet", hasStreet)
        console.log("hasCity", hasCity)
        console.log("hasCountry", hasCountry)
        console.log("hasCounty", hasCounty)
        console.log("hasEventTicketPrice", hasEventTicketPrice)
        console.log("hasEventTicketAmount", hasEventTicketAmount)
        console.log("hasEndDateGreaterOrEqaulToStartDate", hasEndDateGreaterOrEqaulToStartDate === "date true time true")
        console.log("hasImage", hasImage)
        console.log("pricing", pricing !== "")


        function startDateTimeAndEndTimeValid ( ) {
            if (hasEndDateGreaterOrEqaulToStartDate === "date true time true") {
                return true
            } else if (hasEndDateGreaterOrEqaulToStartDate === "date true") {
                return true
            } else return false
        }
        const startDateTimeAndEndTimeValidVar = startDateTimeAndEndTimeValid()


        if (hasEventName && hasEventDescription && hasStartDate && hasEndDate && hasEventEndTime && hasEventStartTime && hasHouseNumber && hasStreet && hasCity && hasCountry && hasCounty && hasEventTicketPrice && hasEventTicketAmount && startDateTimeAndEndTimeValidVar && hasImage && pricing !== "") {
            console.log("in request")
            createEvent ()
            createdEventFeedback.style.display = "block"
            createdEventFeedback.innerHTML = "Sending data to server..."
            function createEvent () {

                const createEventBE = {
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
                    eventAtendees: [],
                    eventInvited: atendeeArray

                }
                console.log("createEventBE", createEventBE)
                const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
                console.log("userTokenSignedIn", userTokenSignedIn)

                fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/event/post`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userTokenSignedIn}`
                        },
                        body: JSON.stringify(createEventBE)

                    })
                    .then(response => response.json())
                    .then(response => {
                        console.log("response", response)
                        createdEventFeedback.style.display = "block"
                        createdEventFeedback.innerHTML = "Event successfully created"
                        localStorage.setItem('eventIDDetail', response.event._id);
                        function returnTimed () {
                            window.location.href = 'event.html';
                        }
                        setTimeout(returnTimed, 2000);
                    })
                    .catch(function(err) {
                        console.log("Error: ", err)
                    })

            }

            atendeeID = 0
    
        } else {
            createdEventFeedback.style.display = "none"
            createdEventFeedback.innerHTML = ""
        }
    }
    })
    }
}

