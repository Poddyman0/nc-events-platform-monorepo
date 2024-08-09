# nc-events-platform-be-V2

eventController:
Introduction
The Event Controller is responsible for handling HTTP requests related to events in the application. It includes functions for creating, deleting, updating, and retrieving events.

Dependencies
Event Model: This module requires the Event model, which presumably defines the schema for events.
Express Async Handler: This library is utilized for handling asynchronous operations within Express middleware.
Express Validator: This library is used for validating and sanitizing user input in Express routes.
Functions
event_create_post
Purpose: Handles the POST request to create a new event.
Steps:
Validates the format of the eventAtendees field in the request body.
Creates a new Event object with data provided in the request body.
Saves the newly created event to the database.
Parameters:
req: Request object containing event data.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
event_delete_post
Purpose: Handles the POST request to delete an event.
Steps:
Finds the event by its ID and deletes it from the database.
Parameters:
req: Request object containing the ID of the event to be deleted.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
events_get
Purpose: Handles the GET request to retrieve all events.
Steps:
Retrieves all events from the database.
Sends the list of events as a response.
Parameters:
req: Request object.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
event_get
Purpose: Handles the GET request to retrieve a specific event.
Steps:
Finds the event by its ID in the database.
Sends the event details as a response.
Parameters:
req: Request object containing the ID of the event to be retrieved.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
event_update_get
Purpose: Handles the GET request to retrieve a specific event for updating.
Steps:
Finds the event by its ID in the database.
Sends the event details as a response.
Parameters:
req: Request object containing the ID of the event to be updated.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
event_update_post_post
Purpose: Handles the POST request to update a specific event.
Steps:
Creates a new Event object with updated data provided in the request body.
Updates the event in the database with the new data.
Parameters:
req: Request object containing the updated event data.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.

profileController:
Introduction
The Profile Controller handles HTTP requests related to user profiles in the application. It includes functions for creating, updating, deleting, signing in, and signing out user profiles.

Dependencies
Profile Model: This module requires the Profile model, which presumably defines the schema for user profiles.
Express Async Handler: This library is utilized for handling asynchronous operations within Express middleware.
Express Validator: This library is used for validating and sanitizing user input in Express routes.
Axios: Axios is used for making HTTP requests to another server.
Functions
profile_create_post
Purpose: Handles the POST request to create a new user profile.
Steps:
Creates a new Profile object with data provided in the request body.
Saves the new profile to the database.
Makes a POST request to another server with the profile data.
Sends a success response if the profile is created successfully.
Parameters:
req: Request object containing profile data.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
profile_delete_post
Purpose: Handles the POST request to delete a user profile.
Steps:
Finds the profile by its ID and deletes it from the database.
Parameters:
req: Request object containing the ID of the profile to be deleted.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
profile_update_get
Purpose: Handles the GET request to retrieve a specific user profile for updating.
Steps:
Finds the profile by its ID in the database.
Sends the profile details as a response.
Parameters:
req: Request object containing the ID of the profile to be updated.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
profile_update_post
Purpose: Handles the POST request to update a user profile.
Steps:
Creates a new Profile object with updated data provided in the request body.
Updates the profile in the database with the new data.
Parameters:
req: Request object containing the updated profile data.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
profile_get
Purpose: Handles the GET request to retrieve a specific user profile.
Steps:
Finds the profile by its ID in the database.
Sends the profile details as a response.
Parameters:
req: Request object containing the ID of the profile to be retrieved.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
profile_sign_out_post
Purpose: Handles the POST request to sign out a user profile.
Steps:
Creates a new Profile object with the signed-in status set to false.
Updates the profile in the database to reflect the sign-out action.
Parameters:
req: Request object containing the ID of the profile to be signed out.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
profile_sign_in_get
Purpose: Handles the GET request to sign in to a user profile.
Steps:
Finds a profile with matching email and password in the database.
Sends the profile details as a response if found, else returns an error.
Parameters:
req: Request object containing the email and password for signing in.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.
profile_sign_in_post
Purpose: Handles the POST request to sign in to a user profile.
Steps:
Creates a new Profile object with the signed-in status set to true.
Updates the profile in the database to reflect the sign-in action.
Parameters:
req: Request object containing the ID of the profile to be signed in.
res: Response object to send back to the client.
next: Callback function to pass control to the next middleware.

event model:
ntroduction
The Event model schema is designed to represent various attributes and properties associated with events in the application. It defines the structure of event objects stored in the database.

Schema Overview
The Event schema consists of the following fields:

eventOrganiser:
Type: ObjectId
Required: Yes
Description: Represents the ID of the profile (user) who organizes the event. This field references the Profile model.
eventName:
Type: String
Required: Yes
Description: Represents the name or title of the event.
eventDescription:
Type: String
Required: Yes
Description: Provides a description or details about the event.
eventStartDate:
Type: Date
Required: Yes
Description: Represents the start date of the event.
eventStartTime:
Type: String
Required: Yes
Description: Represents the start time of the event.
eventEndDate:
Type: Date
Required: Yes
Description: Represents the end date of the event.
eventEndTime:
Type: String
Required: Yes
Description: Represents the end time of the event.
eventBuildingNumber:
Type: String
Required: Yes
Description: Represents the building number or address where the event takes place.
eventStreetName:
Type: String
Required: Yes
Description: Represents the street name where the event takes place.
eventCity:
Type: String
Required: Yes
Description: Represents the city where the event takes place.
eventCounty:
Type: String
Required: Yes
Description: Represents the county or region where the event takes place.
eventCountry:
Type: String
Required: Yes
Description: Represents the country where the event takes place.
eventPostCode:
Type: String
Required: Yes
Description: Represents the postal code or ZIP code of the event location.
eventPricing:
Type: String
Required: Yes
Description: Represents the pricing category or type of the event (e.g., Free, Paid).
eventTicketPrice:
Type: Number
Required: Yes
Description: Represents the price of a ticket for the event.
eventTicketAmount:
Type: Number
Required: Yes
Description: Represents the total number of tickets available for the event.
eventPicture:
Type: String
Required: Yes
Description: Represents the URL or path to the picture/image associated with the event.
eventAtendees:
Type: Array of ObjectId
Required: Yes
Description: Represents an array of profile IDs of attendees who are registered for the event. This field references the Profile model.
Virtual Properties
eventID:
Description: A virtual property that returns the ID of the event.
aEventURL:
Description: A virtual property that returns the URL for accessing detailed information about the event.

profile model:
Introduction
The Profile model schema defines the attributes and properties associated with user profiles in the system. It establishes a standardized format for storing and managing user-related information.

Schema Overview
The Profile schema comprises the following fields:

profilePassword:
Type: String
Required: Yes
Description: Stores the password associated with the user profile.
profileTelephone:
Type: String
Required: Yes
Description: Records the telephone number of the user.
profileEmail:
Type: String
Required: Yes
Description: Holds the email address of the user.
profileFirstName:
Type: String
Required: Yes
Description: Represents the first name of the user.
profileSecondName:
Type: String
Required: Yes
Description: Represents the last name or surname of the user.
profileDOB:
Type: Date
Required: Yes
Description: Indicates the date of birth of the user.
profileRole:
Type: String
Required: Yes
Description: Specifies the role or designation of the user within the system.
profileCardHolderName:
Type: String
Required: Yes
Description: Stores the name of the cardholder associated with the user's payment method.
profileBankName:
Type: String
Required: Yes
Description: Records the name of the bank associated with the user's payment method.
profileCardNumber:
Type: Number
Required: Yes
Description: Stores the card number of the user's payment method.
profileExpireyDate:
Type: String
Required: Yes
Description: Represents the expiration date of the user's payment card.
profileCVV:
Type: Number
Required: Yes
Description: Stores the CVV (Card Verification Value) associated with the user's payment card.
profilePostCode:
Type: String
Required: Yes
Description: Records the postal code or ZIP code of the user's address.
profileHouseNumber:
Type: String
Required: Yes
Description: Indicates the house number or building number of the user's address.
profileStreet:
Type: String
Required: Yes
Description: Represents the street name of the user's address.
profileCity:
Type: String
Required: Yes
Description: Records the city of the user's address.
profileCounty:
Type: String
Required: Yes
Description: Specifies the county or region of the user's address.
profileCountry:
Type: String
Required: Yes
Description: Indicates the country of the user's address.
profileSignedIn:
Type: Boolean
Required: Yes
Description: Indicates whether the user is currently signed in or not.
Virtual Properties
profileID:
Description: A virtual property that returns the ID of the user profile.
aProfileURL:
Description: A virtual property that returns the URL for accessing detailed information about the user profile.

index route:
Introduction
The router module is responsible for defining routes and directing incoming HTTP requests to the appropriate handlers or controllers within the application.

Dependencies
Express: This module requires the Express framework for routing and handling HTTP requests.
Routes
GET "/" (Home Page Redirect)
Purpose: Redirects users to the home page of the platform.
Handler: An anonymous function that redirects the request to the "/platform" route.
Parameters:
req: Request object containing information about the HTTP request.
res: Response object used to send a redirect response to the client.

platform route:
Introduction
The router module defines routes for handling CRUD (Create, Read, Update, Delete) operations on user profiles and events. Each route corresponds to a specific functionality within the application.

Dependencies
Express: This module relies on the Express framework for routing and handling HTTP requests.
Profile Routes
POST "/profile/post"
Purpose: Creates a new user profile.
Handler: Calls the profile_create_post function from the profile controller.
Parameters: None
POST "/profile/delete/:id"
Purpose: Deletes a user profile by ID.
Handler: Calls the profile_delete_post function from the profile controller.
Parameters: id - ID of the profile to be deleted.
GET "/profile/get/:id/profileupdate"
Purpose: Retrieves a user profile for updating.
Handler: Calls the profile_update_get function from the profile controller.
Parameters: id - ID of the profile to be updated.
POST "/profile/put/:id/profileupdate"
Purpose: Updates a user profile.
Handler: Calls the profile_update_post function from the profile controller.
Parameters: id - ID of the profile to be updated.
GET "/profile/get/:id/profile"
Purpose: Retrieves a user profile.
Handler: Calls the profile_get function from the profile controller.
Parameters: id - ID of the profile to be retrieved.
POST "/profile/put/:id/signout"
Purpose: Signs out a user profile.
Handler: Calls the profile_sign_out_post function from the profile controller.
Parameters: id - ID of the profile to be signed out.
GET "/profile/get/:email/:password/signin"
Purpose: Signs in a user profile.
Handler: Calls the profile_sign_in_get function from the profile controller.
Parameters: email - Email address of the profile, password - Password of the profile.
POST "/profile/put/:id/signin"
Purpose: Updates and signs in a user profile.
Handler: Calls the profile_sign_in_post function from the profile controller.
Parameters: id - ID of the profile to be signed in.
Event Routes
POST "/event/post"
Purpose: Creates a new event.
Handler: Calls the event_create_post function from the event controller.
Parameters: None
POST "/event/delete/:id"
Purpose: Deletes an event by ID.
Handler: Calls the event_delete_post function from the event controller.
Parameters: id - ID of the event to be deleted.
GET "/events/get"
Purpose: Retrieves all events.
Handler: Calls the events_get function from the event controller.
Parameters: None
GET "/event/get/:id/aevent"
Purpose: Retrieves a specific event.
Handler: Calls the event_get function from the event controller.
Parameters: id - ID of the event to be retrieved.
GET "/event/get/:id/eventupdate"
Purpose: Retrieves an event for updating.
Handler: Calls the event_update_get function from the event controller.
Parameters: id - ID of the event to be updated.
POST "/event/put/:id/eventupdate"
Purpose: Updates an event.
Handler: Calls the event_update_post_post function from the event controller.
Parameters: id - ID of the event to be updated.

app:
Introduction
The Express application is the core of the backend server, responsible for handling incoming HTTP requests, processing data, and sending responses back to clients. This setup ensures proper routing, security, and error handling within the application.

Dependencies
express: The main framework for building web applications in Node.js.
http-errors: A utility for creating HTTP errors.
path: A module for handling file paths.
cookie-parser: Middleware for parsing cookies.
morgan: Middleware for logging HTTP requests.
helmet: Middleware for setting HTTP headers to enhance security.
express-rate-limit: Middleware for rate limiting requests.
mongoose: A MongoDB object modeling tool designed to work in an asynchronous environment.
dotenv: A module for loading environment variables from a .env file into process.env.
Middleware
logger: Logs HTTP requests to the console in development mode.
express.json(): Parses incoming request bodies in JSON format.
express.urlencoded(): Parses incoming request bodies in URL-encoded format.
cookieParser: Parses cookies attached to the request object.
express.static(): Serves static files such as images, CSS, and JavaScript.
helmet.contentSecurityPolicy(): Sets Content Security Policy (CSP) directives to protect against common security vulnerabilities.
RateLimit: Applies rate limiting to all requests to prevent abuse and enhance security.
Routing
indexRouter: Handles routes for the home page and other general routes.
platformRouter: Handles routes related to the platform functionality.
Error Handling
404 Handler: Catches 404 errors (Not Found) and forwards them to the error handler.
Error Handler: Handles all other errors by rendering an error page or sending an error response with the appropriate status code.
Database Connection
Establishes a connection to a MongoDB database using the Mongoose library.
CORS Configuration
Sets headers to allow cross-origin resource sharing (CORS) for all requests.
Environment Variables
Loads environment variables from a .env file using the dotenv module.

populateddb:
Introduction
The test data population script is designed to insert sample events and profiles into the database. These data entries serve as mock data for development and testing purposes.

Script Execution
The script is executed from the command line using Node.js. It accepts a MongoDB URI as a command-line argument to establish a connection to the database.

Usage:
php
Copy code
node populateTestData.js <mongoDB_URI>
Dependencies
mongoose: An object modeling tool for MongoDB used to interact with the database.
http-errors: Utility for creating HTTP errors.
models/event: Schema and model for the Event collection in the database.
models/profile: Schema and model for the Profile collection in the database.
Main Function
The main function is an asynchronous function that serves as the entry point of the script. It connects to the MongoDB database using the provided URI, creates profiles, creates events, and then closes the database connection.

Profile Creation
The profileCreate function creates a new profile entry in the database. It accepts various profile attributes such as password, email, telephone number, etc., and saves the profile to the database.

Event Creation
The eventCreate function creates a new event entry in the database. It accepts attributes such as event name, description, start date, end date, location, pricing, etc., and saves the event to the database.

Data Creation
The createProfiles function populates the database with sample profiles using the profileCreate function.
The createEvents function populates the database with sample events using the eventCreate function.

