#! /usr/bin/env node

console.log(
    'This script populates some test events and profiles into the database.'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Event = require("./models/event");
  const Profile = require("./models/profile");

  
  const events = [];
  const profiles = [];

  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createProfiles();
    await createEvents();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function profileCreate(index, profilePassword, profileTelephone, profileEmail, profileFirstName, profileSecondName, profileDOB, profileRole, profileCardHolderName, profileBankName, profileCardNumber, profileExpireyDate, profileCVV, profilePostCode, profileHouseNumber, profileStreet, profileCity, profileCounty, profileCountry, profileSignedIn) {
    const profile = new Profile({ 
        profilePassword: profilePassword, 
        profileTelephone: profileTelephone, 
        profileEmail: profileEmail, 
        profileFirstName: profileFirstName, 
        profileSecondName: profileSecondName, 
        profileDOB: profileDOB, 
        profileRole: profileRole, 
        profileCardHolderName: profileCardHolderName, 
        profileBankName: profileBankName, 
        profileCardNumber: profileCardNumber, 
        profileExpireyDate: profileExpireyDate, 
        profileCVV: profileCVV, 
        profilePostCode: profilePostCode, 
        profileHouseNumber: profileHouseNumber, 
        profileStreet: profileStreet, 
        profileCity: profileCity, 
        profileCounty: profileCounty, 
        profileCountry: profileCountry,
        profileSignedIn: profileSignedIn});
    await profile.save();
    profiles[index] = profile;
    console.log(`Added profile with email: ${profileEmail}`);
  }
  
  async function eventCreate(index, eventOrganiser, eventName, eventDescription, eventStartDate, eventStartTime, eventEndDate, eventEndTime, eventBuildingNumber, eventStreetName, eventCity, eventCounty, eventCountry, eventPostCode, eventPricing, eventTicketPrice, eventTicketAmount, eventPicture, eventAtendees) {
    const event = new Event ({ 
        eventOrganiser: eventOrganiser,
        eventName: eventName, 
        eventDescription: eventDescription,
        eventStartDate: eventStartDate, 
        eventStartTime: eventStartTime, 
        eventEndDate: eventEndDate, 
        eventEndTime: eventEndTime,
        eventBuildingNumber: eventBuildingNumber,
        eventStreetName: eventStreetName,
        eventCity: eventCity,
        eventCounty: eventCounty, 
        eventCountry: eventCountry, 
        eventPostCode: eventPostCode,
        eventPricing: eventPricing,
        eventTicketPrice: eventTicketPrice,
        eventTicketAmount: eventTicketAmount,
        eventPicture: eventPicture,
        eventAtendees: eventAtendees,
    })

    await event.save();
    events[index] = event;
    console.log(`Added Event with name: ${eventName}`);
  }
  //check if dates are right
  async function createProfiles() {
    console.log("Adding profiles");
    await Promise.all([
      profileCreate(0, "Qwer1234!", "07894561230", "tedd.tumble@gmail.com", "Tedd", "Tumble", "1980-07-23", "internal", "Mr Tedd Tumble", "Co-Op", 1147258369014725, "02/28", 123, "SW15EP", "1a", "Summer Street", "London", "Greater London", "England", false),
      profileCreate(1, "Asdf5678%", "07012345678", "adam.apple@outlook.com", "Adam", "Apple", "1985-08-19", "internal", "Mr Addam Apple", "HSBC", 36925801473692, "01/29", 456, "WD259JH", "2", "Amber Avenue", "Leeds", "West Yorkshire", "England", false),
      profileCreate(2, "Zxcv9012*", "07123456789", "sarah.sweany@yahoo.com", "Sarah", "Sweany", "1976-04-14", "internal", "Miss Sarah Sweany", "Barklays", 7894561230789456, "03/27",789, "LS65EQ", "3", "Cress Close", "Cardiff", "Glamorgan", "Wales", false),
      profileCreate(3, "Uiop1234!", "07456789324", "barry.barrow@hotmail.com", "Barry", "Barrow", "1965-02-20", "internal", "Mr Barry Barrow", "Lloyds", 1123456789012345, "04/26", 101, "NW17JP", "4", "Lexington Lane", "Belfast", "Antrim", "Northern Ireland", false),
      profileCreate(4, "Hjkl5678%", "07456123789", "chris.clarke@gmail.com", "Chris", "Clarke", "1948-11-01", "external", "Mr Chris Clarke", "TSB", 1159357147258369, "05/25", 121, "NE239SD", "5", "Ambrose Street", "Edinburgh", "Midlothian", "Scottland", false),
      profileCreate(5, "Vbnm9012*", "07014725836", "dorris.dior@outlook.com", "Dorris", "Dior", "1990-01-02", "external", "Miss Dorris Dior", "RBS", 3357159632587410, "06/30", 131, "SE7PHG", "6", "Bramble Avenue", "Glasgow", "Lanarkshire", "Scottland", false),
      profileCreate(6, "Tyui1234!", "07369258147", "eve.electra@yahoo.com", "Eve", "Electra", "1991-04-05", "external", "Miss Eve Electra", "RBS", 5531264859674236, "07/31", 141, "ES69PH", "7", "Lex Close", "Dublin", "County Dublin", "Ireland", false),
      profileCreate(7, "Ghjk5678%", "07159357142", "fiona.finch@hotmail.com", "Fiona", "Finch", "1993-03-06", "external", "Miss Fiona Finch", "Citadel", 6643815294475522, "08/32", 152, "EN35HP", "8", "Garry Lane", "Swansea", "County of Swansea", "Wales", false),
    ]);
  }
  
  async function createEvents() {
    console.log("Adding events");
    await Promise.all([
        eventCreate(0, profiles[0], "Afternoon Tea", "Enjoy a relaxing afternoon with delicious tea and pastries at our cozy venue.", "2024-05-15", "14:00", "2024-05-16", "16:00", "10", "Baker Street", "London", "Greater London", "United Kingdom", "W1U 6TU", "free", 0.00, 22, "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/afternoon_tea_sandwiches-f0e4120.jpg", [profiles[4], profiles[5]]),
        eventCreate(1, profiles[1], "Guided Tour", "Join us for an informative tour of the city's landmarks and hidden gems.", "2024-06-01", "10:00", "2024-06-01", "12:00", "20", "Westminster Abbey", "London", "Greater London", "United Kingdom", "SW1P 3PA", "paid", 11.99, 55, "https://www.telegraph.co.uk/content/dam/Travel/2019/May/tour-guide.jpg", [profiles[6], profiles[7]]),
        eventCreate(2, profiles[2], "Poetry Slam", "Express yourself at our Poetry Slam night. Share your verses or just enjoy the spoken word.", "2024-06-10", "19:00", "2024-06-11", "21:00", "7", "Shoreditch High Street", "London", "Greater London", "United Kingdom", "E1 6PQ", "pay as you feel", 0.00, 66, "https://assets.cdn.bbcmaestro.com/cf993396f255d7f2f79d92112ce1d765.jpg", [profiles[5], profiles[6]]),
        eventCreate(3, profiles[3], "Yoga", "Relax and rejuvenate with a yoga session led by experienced instructors.", "2024-07-05", "18:30", "2024-07-05", "20:30", "15", "Kensington High Street", "London", "Greater London", "United Kingdom", "W8 5NP", "paid", 21.50, 11, "https://cdn.riddle.com/embeds/v2/images/q_80,c_fill,w_960,h_540/f89/f897206d8694f2f181a63abb829592bd.jpg", [profiles[4], profiles[7]])

    ]);
  }