document.addEventListener('DOMContentLoaded', function() {
    eventsInsert()
})

function eventsInsert() {
    const userIDSignedIn = localStorage.getItem('userIDSignedIn');
    const userTokenSignedIn = localStorage.getItem('userTokenSignedIn');

    const loadingHomepage = document.querySelector('#homepage-loading')
    loadingHomepage.style.display = "block"
    loadingHomepage.innerHTML = "Loading event pictures..."
    const homeEventsContainer = document.querySelector('.container-two')
    fetch(`https://nc-events-platform-be-v2-production.up.railway.app/platform/events/get`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(response => {
        loadingHomepage.style.display = "none"
        loadingHomepage.innerHTML = ""
        response.events.forEach(aEvent => {
            let aEventToDisplay = document.createElement('div')
            aEventToDisplay.className = 'homepage-events-card'
            aEventToDisplay.innerHTML = `
                <img src="${aEvent.eventPicture}" alt="event immage" class="home-page-events-img">
                <figcaption class="home-page-events-figcaption">${aEvent.eventName}</figcaption>
            `
            homeEventsContainer.appendChild(aEventToDisplay) 
        })
    })
}








