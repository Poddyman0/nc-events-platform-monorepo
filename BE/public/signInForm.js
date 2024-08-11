document.addEventListener('DOMContentLoaded', function() {
    signInForm()
})

function signInForm() {
    profileSignIn ()
    function profileSignIn () {
        
        document.querySelector('.btn-sign-in').addEventListener('click', function(event) {
            event.preventDefault()
            const emailSignIn = document.querySelector('#email-sign-in')
            const emailSignInFeedback = document.querySelector('.sign-in-email-feedback')
            const passwordSignIn = document.querySelector('#password-sign-in')
            const passwordSignInFeedback = document.querySelector('.sign-in-password-feedback')
            const loadingProfileSignIn = document.querySelector('#loading-profile-sign-in')
            loadingProfileSignIn.style.display = "block"
            loadingProfileSignIn.innerHTML = "Loading profile sign in..."
            const loginProfile = {
              profileEmail: emailSignIn.value,
              profilePassword: passwordSignIn.value
            }
            fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/profile/put/signin`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginProfile),
            })
            .then(response => response.json())
            .then(response => {

              
              loadingProfileSignIn.style.display = "none"
              loadingProfileSignIn.innerHTML = "" 
              if (response.message === "JWT Auth Creation Passed") {

                emailSignIn.className = "form-control"
                passwordSignIn.className = "form-control"
                emailSignInFeedback.innerHTML = ""
                passwordSignInFeedback.innerHTML = ""
                document.getElementById("signInSuccessFeedback").innerHTML = "Sign in successfull."
                localStorage.setItem('userIDSignedIn', response.userIDSignInCreated);
                localStorage.setItem('userRoleSignedIn', response.userIsAuthor);
                localStorage.setItem('userTokenSignedIn', response.token); 
                const userIDSignedIn = localStorage.getItem('userIDSignedIn');
                const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');

                function returnTimed () {
                      window.location.href = 'index.html';
              }
              setTimeout(returnTimed, 2000);              
              } else if (response.message === "Incorrect password") {
                passwordSignIn.className = "form-control is-invalid"
                passwordSignInFeedback.innerHTML = `${response.message}`
              } else if (response.message === "Incorrect email") {
                emailSignIn.className = "form-control is-invalid"
                emailSignInFeedback.innerHTML = `${response.message}`
              }          
                    
            })
            .catch(error => {
              console.log('Error:', error)
            })
        })
    }
}

let cartArray = [];

function saveArrayToLocalStorage() {
    let arrayString = JSON.stringify(cartArray);

    let arrayStringBefore = localStorage.getItem('cartArray');
    if (arrayStringBefore === null) {
        localStorage.setItem('cartArray', arrayString);
    }
    let arrayStringAfter = localStorage.getItem('cartArray');

    let cartArrayToEdit = JSON.parse(arrayStringAfter);


}

window.onload = saveArrayToLocalStorage;
