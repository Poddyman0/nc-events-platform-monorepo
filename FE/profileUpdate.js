
document.addEventListener('DOMContentLoaded', function() {
    updateProfile()
})

let profileIDSignedIn = "662b78f7227520c132110592"

function updateProfile() {
    const password = document.querySelector('#password-update-profile')
        const passwordConfirmation = document.querySelector('#password-confirm-update-profile')
        const passwordFeedback = document.querySelector('.update-profile-form-password-feedback')
        const passwordConfirmationFeedback = document.querySelector('.update-profile-form-password-confirm-feedback')
        const telephone = document.querySelector('#telephone-update-profile')
        const telephoneFeedback = document.querySelector('.update-profile-form-telephone-feedback')
        const email = document.querySelector('#email-update-profile')
        const emailFeedback = document.querySelector('.update-profile-form-email-feedback')
        const firstName = document.querySelector('#first-name-update-profile')
        const firstNameFeedback = document.querySelector('.update-profile-form-fist-name-feedback')
        const secondName = document.querySelector('#second-name-update-profile')
        const secondNameFeedback = document.querySelector('.update-profile-form-second-name-feedback')
        const DOB = document.querySelector('#dob-update-profile')
        const DOBFeedback = document.querySelector('.update-profile-form-DOB-feedback')
        const roleInternal = document.querySelector('#internal-update-profile')
        const roleExternal = document.querySelector('#external-update-profile')
        const roleFeedback = document.querySelector('.update-profile-form-role-feedback')
        const signedUpFeedback = document.querySelector('#update-profile-success')

        const cardHolderName = document.querySelector('#payment-name-update-profile');
        const cardHolderNameFeedback = document.querySelector('.payment-name-update-profile-feedback');
        const bankName = document.querySelector('#payment-bank-name-update-profile');
        const bankNameFeedback = document.querySelector('.payment-bank-name-update-profile-feedback');
        const cardNumber = document.querySelector('#payment-card-number-update-profile');
        const cardNumberFeedback = document.querySelector('.payment-card-number-update-profile-feedback');
        const expiryDate = document.querySelector('#payment-expire-update-profile');
        const expiryDateFeedback = document.querySelector('.payment-expire-update-profile-feedback');
        const cvv = document.querySelector('#payment-CVV-update-profile');
        const cvvFeedback = document.querySelector('.payment-CVV-update-profile-feedback');
        const postCode = document.querySelector('#address-post-code-update-profile')
        const postCodeFeedback = document.querySelector('.address-post-code-update-profile-feedback')
        const houseNumber = document.querySelector('#address-number-update-profile')
        const houseNumberFeedback = document.querySelector('.update-profile-address-number-feedback')
        const street = document.querySelector('#address-street-update-profile')
        const streetFeedback = document.querySelector('.update-profile-street-feedback')
        const city = document.querySelector('#address-city-update-profile')
        const cityFeedback = document.querySelector('.update-profile-city-feedback')
        const county = document.querySelector('#address-county-update-profile')
        const countyFeedback = document.querySelector('.update-profile-county-feedback')
        const country = document.querySelector('#address-country-update-profile')
        const countryFeedback = document.querySelector('.update-profile-country-feedback')
        let role;


    autoFillProfileForm ()
    function autoFillProfileForm () {
        const userIDSignedIn = localStorage.getItem('userIDSignedIn');
        const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
        const loadingProfileUpdate = document.querySelector('#loading-profile-update')
        loadingProfileUpdate.style.display = "block"
        loadingProfileUpdate.innerHTML = "Loading your profile..."

        fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/profile/get/${userIDSignedIn}/aprofile`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userTokenSignedIn}`
            },
          })
          .then(response => response.json())
          .then(response => {
            if (response.msg === "Profile get successfull") {


                    function decodeExpirey(str) {
                        const textArea = document.createElement('textarea');
                        textArea.innerHTML = str;
                        return textArea.value;
                    }

                    const decodedExpirevyVar = decodeExpirey(response.profile[0].profileExpireyDate)
                    console.log(decodedExpirevyVar)
                    
                    const dateStartFormat = response.profile[0].profileDOB.split('T')[0]

                    loadingProfileUpdate.style.display = "none"
                    loadingProfileUpdate.innerHTML = ""
                    //password.value = response.profile[0].profilePassword,
                    telephone.value = response.profile[0].profileTelephone,
                    email.value = response.profile[0].profileEmail,
                    firstName.value = response.profile[0].profileFirstName,
                    secondName.value = response.profile[0].profileSecondName,
                    DOB.value = dateStartFormat,
                    cardHolderName.value = response.profile[0].profileCardHolderName,
                    bankName.value = response.profile[0].profileBankName,
                    cardNumber.value = response.profile[0].profileCardNumber,
                    expiryDate.value = decodedExpirevyVar,
                    cvv.value = response.profile[0].profileCVV,
                    postCode.value = response.profile[0].profilePostCode,
                    houseNumber.value = response.profile[0].profileHouseNumber,
                    street.value = response.profile[0].profileStreet,
                    city.value = response.profile[0].profileCity,
                    county.value = response.profile[0].profileCounty,
                    country.value = response.profile[0].profileCountry,
                    isInerternalOrExternal ()
                    function isInerternalOrExternal () {
                        if (response.profile[0].profileRole === "internal") {
                            roleInternal.checked = true
                            roleExternal.checked = false
            
                        } else if (response.profile[0].profileRole === "external") {
                            roleInternal.checked = false
                            roleExternal.checked = true
                        }
                    }
                }

        })
        .catch(function(err) {
            console.log("Error: ", err)
        })
    }
    updateProfile()
    function updateProfile () {

    
    document.querySelector('#btn-update-profile').addEventListener('click', function(event) {
        event.preventDefault()
        const password = document.querySelector('#password-update-profile')
        const passwordFeedback = document.querySelector('.update-profile-form-password-feedback')
        const telephone = document.querySelector('#telephone-update-profile')
        const telephoneFeedback = document.querySelector('.update-profile-form-telephone-feedback')
        const email = document.querySelector('#email-update-profile')
        const emailFeedback = document.querySelector('.update-profile-form-email-feedback')
        const firstName = document.querySelector('#first-name-update-profile')
        const firstNameFeedback = document.querySelector('.update-profile-form-fist-name-feedback')
        const secondName = document.querySelector('#second-name-update-profile')
        const secondNameFeedback = document.querySelector('.update-profile-form-second-name-feedback')
        const DOB = document.querySelector('#dob-update-profile')
        const DOBFeedback = document.querySelector('.update-profile-form-DOB-feedback')
        const roleInternal = document.querySelector('#internal-update-profile')
        const roleExternal = document.querySelector('#external-update-profile')
        const roleFeedback = document.querySelector('.update-profile-form-role-feedback')
        const signedUpFeedback = document.querySelector('#update-profile-success')

        const cardHolderName = document.querySelector('#payment-name-update-profile');
        const cardHolderNameFeedback = document.querySelector('.payment-name-update-profile-feedback');
        const bankName = document.querySelector('#payment-bank-name-update-profile');
        const bankNameFeedback = document.querySelector('.payment-bank-name-update-profile-feedback');
        const cardNumber = document.querySelector('#payment-card-number-update-profile');
        const cardNumberFeedback = document.querySelector('.payment-card-number-update-profile-feedback');
        const expiryDate = document.querySelector('#payment-expire-update-profile');
        const expiryDateFeedback = document.querySelector('.payment-expire-update-profile-feedback');
        const cvv = document.querySelector('#payment-CVV-update-profile');
        const cvvFeedback = document.querySelector('.payment-CVV-update-profile-feedback');
        const postCode = document.querySelector('#address-post-code-update-profile')
        const postCodeFeedback = document.querySelector('.address-post-code-update-profile-feedback')
        const houseNumber = document.querySelector('#address-number-update-profile')
        const houseNumberFeedback = document.querySelector('.update-profile-address-number-feedback')
        const street = document.querySelector('#address-street-update-profile')
        const streetFeedback = document.querySelector('.update-profile-street-feedback')
        const city = document.querySelector('#address-city-update-profile')
        const cityFeedback = document.querySelector('.update-profile-city-feedback')
        const county = document.querySelector('#address-county-update-profile')
        const countyFeedback = document.querySelector('.update-profile-county-feedback')
        const country = document.querySelector('#address-country-update-profile')
        const countryFeedback = document.querySelector('.update-profile-country-feedback')

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

        const cardHolderNameRegex = /^[a-zA-Z\s]+$/;
        const bankNameRegex = /^[a-zA-Z\s]+$/;
        const cardNumberRegex = /^\d{16}$/;
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvRegex = /^\d{3}$/;

        const hasCardHolderName = cardHolderNameRegex.test(cardHolderName.value)
        const hasBankName = bankNameRegex.test(bankName.value)
        const hasCardNumber = cardNumberRegex.test(cardNumber.value)
        const hasExpiryDate = expiryDateRegex.test(expiryDate.value)
        const hasCVV = cvvRegex.test(cvv.value)

        if (!hasCardHolderName) {
            cardHolderName.className = "form-control is-invalid"
            cardHolderNameFeedback.innerHTML = "Card holder's name must contain only letters and spaces."
        } else if (hasCardHolderName) {
            cardHolderName.className = "form-control"
            cardHolderNameFeedback.innerHTML = ""
        }
        if (!hasBankName) {
            bankName.className = "form-control is-invalid"
            bankNameFeedback.innerHTML = "Bank name must contain only letters and spaces."
        } else if (hasBankName) {
            bankName.className = "form-control"
            bankNameFeedback.innerHTML = ""
        }
        if (!hasCardNumber) {
            cardNumber.className = "form-control is-invalid"
            cardNumberFeedback.innerHTML = "Card number must contain only numbers and be 16 digits long."
        } else if (hasCardNumber) {
            cardNumber.className = "form-control"
            cardNumberFeedback.innerHTML = ""
        }
        if (!hasExpiryDate) {
            expiryDate.className = "form-control is-invalid"
            expiryDateFeedback.innerHTML = "Expirey date must be in MM/YY format, Months (MM) must be a number between the range 1-12 and be two digit long. Year (YY) must be a number of with a length of two digits"
        } else if (hasExpiryDate) {
            expiryDate.className = "form-control"
            expiryDateFeedback.innerHTML = ""
        }
        if (!hasCVV) {
            cvv.className = "form-control is-invalid"
            cvvFeedback.innerHTML = "CVV must be a number with a length of 3 digits."
        } else if (hasCVV) {
            cvv.className = "form-control"
            cvvFeedback.innerHTML = ""
        }


        
        if (!roleInternal.checked && !roleExternal.checked) {
            roleFeedback.innerHtml = "Your role must be either internal or external."

        } else if (roleInternal.checked && roleExternal.checked) {
            roleFeedback.innerHtml = "Your role must be either internal or external."

        } else if (roleInternal.checked || roleExternal.checked) {
            roleFeedback.innerHtml = ""
        }
        
        const ukPhoneNumberRegex = /^(?:0|\+44)[1-9]\d{8,9}$/;
        const hasUkPhoneNumber = ukPhoneNumberRegex.test(telephone.value)
        if (hasUkPhoneNumber) {
            telephone.className = "form-control"
            telephoneFeedback.innerHTML = ""
        } else if (!hasUkPhoneNumber) {
            telephone.className = "form-control is-invalid"
            telephoneFeedback.innerHTML = "Telephone number must start with an area code of 0 or +44 and 8 or 9 have additional subscriber digits after the area code"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const hasEmail = emailRegex.test(email.value)

        if (hasEmail) {
            email.className = "form-control"
            emailFeedback.innerHTML = ""

        } else if (!hasEmail) {
            email.className = "form-control is-invalid"
            emailFeedback.innerHTML = "Email address must consist of one or more characters before and after the '@' symbol, separated by a '.'"
        }
        const nameRegex = /^[A-Za-z\s\-']+$/;
        const hasFirstName = nameRegex.test(firstName.value);
        const hasSecondName = nameRegex.test(secondName.value);

        if (hasFirstName) {
            firstName.className = "form-control"
            firstNameFeedback.innerHTML = ""
        } else if (!hasFirstName) {
            firstName.className = "form-control is-invalid"
            firstNameFeedback.innerHTML = "First name must contain letters, can contain '-' or ''' and must not contain numbers"
        }
        if (hasSecondName) {
            secondName.className = "form-control"
            secondNameFeedback.innerHTML = ""
        } else if (!hasSecondName) {
            secondName.className = "form-control is-invalid"
            secondNameFeedback.innerHTML = "Second name must contain letters, can contain '-' or ''' and must not contain numbers"
        }

        function isValidDateOfBirth(dateString) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(dateString)) {
                return false; 
            }
        
            const dateParts = dateString.split('-');
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]);
            const day = parseInt(dateParts[2]);
            const dateObject = new Date(year, month - 1, day);
            if (isNaN(dateObject.getTime())) {
                return false; 
            }
        
            const currentDate = new Date();
            if (dateObject.getTime() > currentDate.getTime()) {
                return false;
            }
        
            return true;
        }
        const hasDOB = isValidDateOfBirth(DOB.value)
        if (hasDOB) {
            DOB.className = "form-control"
            DOBFeedback.innerHTML = ""

        } else if (!hasDOB) {
            DOB.className = "form-control is-invalid"
            DOBFeedback.innerHTML = "Date of birth must by in YYY-MM-DD format, be a valid date and not be in the future"
        }
        const lengthRegex = /.{8,}/;  
        const upperCaseRegex = /[A-Z]/;  
        const lowerCaseRegex = /[a-z]/;  
        const numberRegex = /[0-9]/;  
        const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;  
    
        const isLengthValid = lengthRegex.test(password.value);
        const hasUpperCase = upperCaseRegex.test(password.value);
        const hasLowerCase = lowerCaseRegex.test(password.value);
        const hasNumber = numberRegex.test(password.value);
        const hasSpecialChar = specialCharRegex.test(password.value);


            if (!isLengthValid || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
                password.className = "form-control is-invalid"
                passwordFeedback.innerHTML = "Passwords must container eight characters, a lowercase letter, a upper case number, a number and one special character"
            } else {
                password.className = "form-control"
                passwordFeedback.innerHTML = ""

            }
            if (hasUkPhoneNumber && hasEmail && hasFirstName && hasSecondName && hasDOB && isLengthValid && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasCardHolderName && hasBankName && hasCardNumber && hasExpiryDate && hasCVV && hasHouseNumber && hasStreet && hasCity && hasCountry && hasCounty && hasPostCode) {
                const loadingProfileUpdate = document.querySelector('#loading-profile-update')
                loadingProfileUpdate.style.display = "block"
                loadingProfileUpdate.innerHTML = "Loading your profile update..."
                
                updateProfile ()
                function updateProfile () {
                    const userIDSignedIn = localStorage.getItem('userIDSignedIn');
                    const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');
                    let roleString = ""
                    if (roleInternal.checked) {
                        roleString = "internal"
                    } else if (roleExternal.checked) {
                        roleString = "external"

                    }


                    const createProfileBE = {
                        profileID: profileIDSignedIn,
                        profilePassword: password.value,
                        profileTelephone: telephone.value,
                        profileEmail: email.value,
                        profileFirstName: firstName.value,
                        profileSecondName: secondName.value,
                        profileDOB: DOB.value,
                        profileRole: roleString,
                        profileCardHolderName: cardHolderName.value,
                        profileBankName: bankName.value,
                        profileCardNumber: cardNumber.value,
                        profileExpireyDate: expiryDate.value,
                        profileCVV: cvv.value,
                        profilePostCode: postCode.value,
                        profileHouseNumber: houseNumber.value,
                        profileStreet: street.value,
                        profileCity: city.value,
                        profileCounty: county.value,
                        profileCountry: country.value, 
                        profileSignedIn: true,
                        _id: `${userIDSignedIn}`,
    
                    }

                    fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/profile/put/${userIDSignedIn}/profileupdate`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${userTokenSignedIn}`
                        },
                        body: JSON.stringify(createProfileBE)
                      })
                      .then(response => response.json())
                      .then(response => {
                            console.log(response)
                            loadingProfileUpdate.style.display = "none"
                            loadingProfileUpdate.innerHTML = ""
                            const formsubmitFeedback = document.getElementById('formsubmitFeedback')
                            if (response.msg === "Profile Updated Successfully") {
                                const submitMSG = document.createElement('li')
                                submitMSG.innerHTML = `${response.msg}`
                                formsubmitFeedback.appendChild(submitMSG)
                                function returnTimed () {
                                    window.location.href = 'profile.html';
                                }
                                setTimeout(returnTimed, 2000);

                            } else if (response.msg === "errors") {
                                response.errors.forEach(error => {
                                    const submitMSG = document.createElement('li')
                                    submitMSG.innerHTML = `${error.msg}`
                                    formsubmitFeedback.appendChild(submitMSG)                                })
                            }
                        
                        })
                        .catch(error => {
                        console.error('Error:', error);
                        });
                }  
            } 
        
    })
    }

}

