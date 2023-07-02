 //index.js code for integrating Google Calendar

const express = require('express');
const { google } = require('googleapis');

const app = express();

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY="< AIzaSyAU8pWn2ryWy0_BSBjxjG2NBEHwZmD6Hcc>"
const GOOGLE_CLIENT_EMAIL = "<cpscchicanopark70@gmail.coml>"
const GOOGLE_PROJECT_NUMBER = "<google-calender-api>"
const GOOGLE_CALENDAR_ID = "<cpscchicanopark70@gmail.com>"


const jwtClient = new google.auth.JWT(
	GOOGLE_CLIENT_EMAIL,
	null,
	GOOGLE_PRIVATE_KEY,
	SCOPES
);

const calendar = google.calendar({
	version: 'v3',
	project: GOOGLE_PROJECT_NUMBER,
	auth: jwtClient
});

app.get('/', (req, res) => {

calendar.events.list({
	calendarId: GOOGLE_CALENDAR_ID,
	timeMin: (new Date()).toISOString(),
	maxResults: 10,
	singleEvents: true,
	orderBy: 'startTime',
}, (error, result) => {
	if (error) {
	res.send(JSON.stringify({ error: error }));
	} else {
	if (result.data.items.length) {
		res.send(JSON.stringify({ events: result.data.items }));
	} else {
		res.send(JSON.stringify({ message: 'No upcoming events found.' }));
	}
	}
});
});

app.listen(3000, () => console.log(`App listening on port 3000!`));


