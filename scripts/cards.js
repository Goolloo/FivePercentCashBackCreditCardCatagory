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
    currentQuarter[cardCashbackQuarterKey] = Math.floor(current.getMonth()/3) + 1;

    return currentQuarter;
}

/**
 * Page element building functions
 */
const containerId = "container";
const currentQuarterAlertId = "currentQuarter";
const cardPanelGroupId = "cards";

const cardNameKey = "Name";
const cardCashbackListKey = "CashBackList";
const cardCashbackYearKey = "Year";
const cardCashbackQuarterKey = "Quater";
const cardCashbackCatagoryKey = "Catagories";

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
    let currentCashBackInfo = [];
    let currentCashBack = findCurrentQuarterCatagory(cashBackList);
    if (currentCashBack == null || currentCashBack == undefined) {
        let emptyInfo = document.createElement('p');
        emptyInfo.innerText = "Cash back category of current quarter hasn't been updated yet.";
        currentCashBackInfo.push(emptyInfo);
    } else {
        currentCashBackInfo = buildCashBackCategoryElements(currentCashBack[cardCashbackCatagoryKey]);
    }

    let cardPanelBody = document.createElement("div");
    cardPanelBody.setAttribute("class", "panel-body");
    currentCashBackInfo.forEach(e => cardPanelBody.appendChild(e));

    return cardPanelBody;
}

function buildCashBackCategoryElements(currentCashBackCategories) {
    let elements = [];
	currentCashBackCategories.forEach(category =>
        elements.push(
            buildCashBackCategoryElement(category)));
	return elements;
}

function buildCashBackCategoryElement(category) {
    let headerContainer = document.createElement('h3');
    let element = document.createElement('span');
    element.setAttribute("class", "label label-primary");
    element.innerText = category;

    headerContainer.appendChild(element);
    return headerContainer;
}

/**
 * debug
 */
function print(str) {
    console.log(str);
}