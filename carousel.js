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
        
    })
}