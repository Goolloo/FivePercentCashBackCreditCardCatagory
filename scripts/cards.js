/**
 * Page loading function
 */
function onload() {
    displayCurrentQuarter();

    jsonItemLoader.loadFromJSON("./data/cards.json", function(JSONObj) {
        displayCard(JSONObj);
    });
}

/**
 * Find quarter logic
 */
function findCurrentQuarterCatagory(cashBackList) {
    var currentQuarter = getCurrentQuarter();
    for (var i = 0; i < cashBackList.length; i++) {
        var cashback = cashBackList[i];
        if (cashback[cardCashbackYearKey] == currentQuarter[cardCashbackYearKey] &&
            cashback[cardCashbackQuarterKey] == currentQuarter[cardCashbackQuarterKey]) {
            return cashback;
        }
    }
}

function getCurrentQuarter() {
    var currentQuarter = {};
    var current = new Date();
    currentQuarter[cardCashbackYearKey] = current.getFullYear();
    currentQuarter[cardCashbackQuarterKey] = current.getMonth() / 3 + 1;

    return currentQuarter;
}

/**
 * Page element building functions
 */
var containerId = "container";
var currentQuarterAlertId = "currentQuarter";
var cardPanelGroupId = "cards";

var cardNameKey = "Name";
var cardCashbackListKey = "CashBackList";
var cardCashbackYearKey = "Year";
var cardCashbackQuarterKey = "Quater";
var cardCashbackCatagoryKey = "Catagories";

function displayCurrentQuarter() {
    var currentQuarter = getCurrentQuarter();

    var currentQuarterAlert = document.createElement("div");
    currentQuarterAlert.setAttribute("class", "alert alert-success");
    currentQuarterAlert.setAttribute("id", currentQuarterAlertId);
    currentQuarterAlert.innerHTML = currentQuarter[cardCashbackYearKey] + ' Q' + currentQuarter[cardCashbackQuarterKey];

    var container = document.getElementById(containerId);
    container.insertAdjacentElement("afterbegin", currentQuarterAlert);
}

function displayCard(card) {
    var cardPanelGroup = document.getElementById(cardPanelGroupId);
    cardPanelGroup.appendChild(buildCardPanel(card));
}

function buildCardPanel(card) {
    // Panel Heading
    var cardPanelHeading = buildCardPanelHeading(card[cardNameKey]);
    // Panel Body
    var cardPanelBody = buildCardPanelBody(card[cardCashbackListKey]);
    // Panel
    var cardPanel = document.createElement("div");
    cardPanel.setAttribute("class", "panel panel-info");
    cardPanel.appendChild(cardPanelHeading);
    cardPanel.appendChild(cardPanelBody);

    return cardPanel;
}

function buildCardPanelHeading(cardName) {
    var cardPanelHeading = document.createElement("div");
    cardPanelHeading.setAttribute("class", "panel-heading");
    cardPanelHeading.innerHTML = cardName;

    return cardPanelHeading;
}

function buildCardPanelBody(cashBackList) {
    var currentCashBackInfo;
    var currentCashBack = findCurrentQuarterCatagory(cashBackList);
    if (currentCashBack == null || currentCashBack == undefined) {
        currentCashBackInfo = "Cashback catagory of current quarter hasn't been updated yet."
    } else {
        currentCashBackInfo = currentCashBack[cardCashbackCatagoryKey].join();
    }

    var cardPanelBody = document.createElement("div");
    cardPanelBody.setAttribute("class", "panel-body");
    cardPanelBody.innerHTML = currentCashBackInfo;

    return cardPanelBody;
}

/**
 * debug
 */
function print(str) {
    console.log(str);
}