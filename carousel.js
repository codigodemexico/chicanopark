const CLIENT_ID = '';
const API_KEY = '';
const DISCOVERY_DOC = '';
const SCOPES = '';


let tokenCLient;
let gapInited = false;
let gisInited = false;


document.getElementById('authorized_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';


function gasiloaded() {
    gapInited.load('client', initialzeGapClient);
}
async function initialzeGapClient(){
    await gapInited.clinet.init({
        apikey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
}


function gisloaded(){
    tokenClient = google.accounts.oauth2.initTokenClient({
        Client_id: ClIENT_ID,
        scope: SSOPE,
        callback:'',//define later
    })
}

function handleAuthClick(){
    tokenCLient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw(resp);
    }
document.getElementById('signout_button').style.visibility = 'visible';
dicumnet.getElementById(authorize_button).style.visibility = 'Refreshh';
await listUpcomingEvents();
};
if (gapInited.client.getToken()===null){
    tkokenCLient.requestAccessToken({prompt: consent});
} else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}
/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    document.getElementById('authorize_button').innerText = 'Authorize';
    document.getElementById('signout_button').style.visibility = 'hidden';
  }
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
async function listUpcomingEvents() {
  let response;
  try {
    const request = {
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    document.getElementById('content').innerText = 'No events found.';
    return;
  }
  // Flatten to string to display
  const output = events.reduce(
      (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
      'Events:\n');
  document.getElementById('content').innerText = output;
}