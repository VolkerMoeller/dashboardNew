let responseAsJSON;

const API_KEY = 'E2iC8Urvu8s2-o76kyCB';

let graphValues = [];
let graphLabels = [];
let graphValuesUser = [];
let graphLabelsUser = [];

let validInput = true;

let cardIds = ['card1', 'card2', 'card3', 'card5'];

async function init() {
    clearCanvas();
    await loadBitcoin();
    reverseData();
    showGraph();
}


async function initUser() {
    validInput = true;
    // showCurrentCardbyId('card5');
    // showAnyDivById('myChartPlace')
    clearCanvas();
    clearCanvasUser();
    clearDateValidationResponse();
    proofUserDates();
    if (validInput == false) {
        return;
    } else {
        await loadBitcoinUser();
        reverseDataUser();
        showGraphUser();
        init();
    }
}


async function loadBitcoin() {
    let start_date = getStartDate();
    let end_date = getEndDate();
    let url = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`
    let response = await fetch(url);
    responseAsJSON = await response.json();
    console.log('Response: ', responseAsJSON);
    showBitCoinToday();
    showBitCoinLastSixDays();
}


async function loadBitcoinUser() {
    let user_start_date = getUserStartDate();
    let user_end_date = getUserEndDate();
    let url = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${user_start_date}&end_date=${user_end_date}&api_key=${API_KEY}`
    let response = await fetch(url);
    responseAsJSON = await response.json();
    console.log('Response: ', responseAsJSON);
    getBitCoinUser();
}


function showBitCoinToday() {
    let bitCoinToday = responseAsJSON['dataset']['data'][0][1];
    let bitCoinFormatted = formatNumber(bitCoinToday.toFixed(2));
    let today = getEndDate();
    let todayFormatted = formatDate(today);
    document.getElementById('bitCoinToday').innerHTML = `${todayFormatted}: <b>${bitCoinFormatted}</b>`;
}


function showBitCoinLastSixDays() {
    document.getElementById('priceTable').innerHTML = ``;
    let prices = responseAsJSON['dataset']['data'];
    for (let i = 1; i < prices.length; i++) {
        let price = prices[i][1];
        let priceFormatted = formatNumber(price);
        graphValues.push(price);
        let date = prices[i][0];
        let dateFormatted = formatDate(date);
        graphLabels.push(dateFormatted);
        document.getElementById('priceTable').innerHTML += `<li>${dateFormatted}: <b>${priceFormatted}</b></li>`;
    }
};


function getBitCoinUser() {
    let prices = responseAsJSON['dataset']['data'];
    for (let i = 1; i < prices.length; i++) {
        let price = prices[i][1];
        graphValuesUser.push(price);
        let date = prices[i][0];
        let dateFormatted = formatDate(date);
        graphLabelsUser.push(dateFormatted);
    }
};


function getStartDate() {
    let start_date = getAnyDateBefore(6);
    return start_date;
}


function getEndDate() {
    let end_date = getAnyDateBefore(0);
    return end_date;

}


function getAnyDateBefore(daysBefore) {
    let today = new Date();
    today.setDate(today.getDate() - daysBefore);
    anyDate = today.toISOString().split('T')[0];
    return anyDate;
}



function reverseData() {
    graphValues.reverse();
    graphLabels.reverse();
    getCurrentData();
}


function reverseDataUser() {
    graphValuesUser.reverse();
    graphLabelsUser.reverse();
    getCurrentDataUser();
}


function getCurrentData() {
    let currentLabel = responseAsJSON['dataset']['data'][0][0];
    let currentLabelFormatted = formatDate(currentLabel);
    graphLabels.push(currentLabelFormatted);
    graphValues.push(responseAsJSON['dataset']['data'][0][1]);
}


function getCurrentDataUser() {
    let currentUserLabel = responseAsJSON['dataset']['data'][0][0];
    let currentUserLabelFormatted = formatDate(currentUserLabel);
    graphLabelsUser.push(currentUserLabelFormatted);
    graphValuesUser.push(responseAsJSON['dataset']['data'][0][1]);
}


function getUserDates() {
    getUserStartDate();
    getUserEndDate();
}


function getUserStartDate() {
    let userStartDate = document.getElementById('userStartDate').value;
    return userStartDate;
}


function getUserEndDate() {
    let userEndDate = document.getElementById('userEndDate').value;
    return userEndDate;
}


function proofUserDates() {
    validationFutureDate(getUserStartDate());
    validationFutureDate(getUserEndDate());
    validationOrderDate();
}


function convertDatetoJavaIso(date) {
    let dateJavaIso = new Date(date);
    return dateJavaIso;
}


function validationFutureDate(date) {
    let today = new Date();
    if (convertDatetoJavaIso(date) > today) {
        // hideAnyDivById('myChartPlace');
        let dateFormatted = formatDate(date);
        document.getElementById('card4').innerHTML += `<span class="dateValidationResponse"><b>Bitte Eingabe prüfen:</b><br> ${dateFormatted}: Dieses Datum liegt in der Zukunft!<br><span>`;
        validInput = false;
    };
}


function validationOrderDate() {
    if (convertDatetoJavaIso(getUserStartDate()) > convertDatetoJavaIso(getUserEndDate())) {
        // hideAnyDivById('myChartPlace');
        document.getElementById('card4').innerHTML += '<span class="dateValidationResponse"><b>Bitte Eingabe prüfen:</b><br> Das Startdatum liegt nach dem Enddatum.<span>';
        validInput = false;
    }
}


function clearDateValidationResponse() {
    document.getElementById('card4').innerHTML = '';
}


function clearCanvasUser() {
    document.getElementById('chartBoxUser').innerHTML = '';
    document.getElementById('chartBoxUser').innerHTML = '<canvas id="myChartUser"></canvas>';
    graphLabelsUser = [];
    graphValuesUser = [];
}


function clearCanvas() {
    document.getElementById('chartBox').innerHTML = '';
    document.getElementById('chartBox').innerHTML = '<canvas id="myChart"></canvas>';
    graphLabels = [];
    graphValues = [];
}


function formatNumber(anyNumber) {
    const numberFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' });
    let newNumber = numberFormat.format(anyNumber);
    return newNumber;
}


function formatDate(anyDate) {
    let isoDate = convertDatetoJavaIso(anyDate);
    const dateFormat = new Intl.DateTimeFormat('de-DE');
    let newDate = dateFormat.format(isoDate);
    return newDate;
}

function showOrHideAnyDivById(anyId) {
    let displayNone = document.getElementById(anyId).classList.contains('displayNone');
    if (displayNone == true) {
        document.getElementById(anyId).classList.remove('displayNone');
    } else {
        document.getElementById(anyId).classList.add('displayNone');
    }
}


function hideDivFstShowDivSnd(fstId, sndId) {
    document.getElementById(fstId).classList.add('displayNone');
    document.getElementById(sndId).classList.remove('displayNone');
}


function hideDivSndShowDivFst(fstId, sndId) {
    document.getElementById(fstId).classList.remove('displayNone');
    document.getElementById(sndId).classList.add('displayNone');
}


function hideAnyDivById(anyId) {
    document.getElementById(anyId).classList.add('displayNone');
}


function showAnyDivById(anyId) {
    document.getElementById(anyId).classList.remove('displayNone');
}


function showCurrentCardbyId(currentCardId) {
    init();
    for (let i = 0; i < cardIds.length; i++) {
        let cardId = cardIds[i];
        document.getElementById(cardId).classList.add('displayNone');
    }
    document.getElementById(currentCardId).classList.remove('displayNone');
}