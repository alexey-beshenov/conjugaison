//------------------------------------------------------------
// Basic confuguration

const subj = [ "je/j'", "tu", "il", "nous", "vous", "ils" ];

// Tenses to be displayed:
const tenses = [
    [ "present", "présent" ],
    [ "imparfait", "imparfait" ],
    [ "passeCompose", "passé composé" ],
    [ "futurSimple", "futur simple" ],
    [ "subjonctifPresent", "subjonctif" ],
    [ "conditionnelPresent", "conditionnel" ],
    [ "imperatif", "impératif" ]
];

// Basic fields to be displayed:
const basicFields = [
    ["participePresent", "participe présent"],
    ["participePasse", "participe passé"]
];

//------------------------------------------------------------

function findGetParameter(parameterName) {
    var result = null, tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
	tmp = items[index].split("=");
	if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

//------------------------------------------------------------
// Make a verb list from verbs.json

function makeVerbListFromJSON(data) {
    const div = document.getElementById("verb-list");

    for (let i=0; i < data.length; i++) {
	const ul = document.createElement("ul");

	for (let j=0; j < data[i].length; j++) {
	    const li = document.createElement("li");
	    const a = document.createElement("a");
	    a.textContent = data[i][j];
	    a.setAttribute("href", "#" /* +data[i][j] */);
	    a.setAttribute("onclick", "setVerb(\""+data[i][j]+"\")");
	    li.appendChild(a);
	    ul.appendChild(li);
	}
	div.appendChild(ul);
    }
}

function makeVerbList() {
    const requestURL = './verbs.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
	makeVerbListFromJSON(request.response);
    }
}

//------------------------------------------------------------
// Update basic info about the verb

function updateBasicInfo() {
    const basicDiv = document.getElementById("verb-basics");
    basicDiv.textContent = '';

    const h2 = document.createElement("h2");
    h2.textContent = data['infinitif'];

    basicDiv.appendChild(h2);

    const table = document.createElement("table");
    for (let i=0; i < basicFields.length; i++) {
	const tr = document.createElement("tr");

	const th = document.createElement("th");
	th.textContent = basicFields[i][1] + ":";

	const td = document.createElement("td");
	td.textContent = data[basicFields[i][0]];

	tr.appendChild(th);
	tr.appendChild(td);
	table.appendChild(tr);
    }

    basicDiv.appendChild(table);
}

//------------------------------------------------------------

function addTenseList () {
    const ul = document.getElementById("tense-list");
    for (let i=0; i < tenses.length; i++) {
	const li = document.createElement("li");
	li.setAttribute("id", tenses[i][0]);
	const a = document.createElement("a");
	a.textContent = tenses[i][1];
	a.setAttribute("href", "javascript:setTense('"+tenses[i][0]+"')");
	li.appendChild(a);
	ul.appendChild(li);
    }
}

function setActiveTense(tense) {
    const oldLi = document.getElementById(currentTense);
    oldLi.setAttribute("class", "");

    const newLi = document.getElementById(tense);
    newLi.setAttribute("class", "active");
}

function setTense(tense) {
    if (tense !== currentTense) {
	setActiveTense(tense);
	currentTense = tense;
	updateConjugation();
    }
}

//------------------------------------------------------------

function setVerb(verb) {
    currentVerb = verb;
    updateConjugation();
}

//------------------------------------------------------------

function updateConjugationFromJSON(data) {
    const conjDiv = document.getElementById("conj");
    conjDiv.textContent = '';

    const table = document.createElement("table");

    for (let i=0; i < subj.length; i++) {
	const tr = document.createElement("tr");
	const th = document.createElement("th");
	const td = document.createElement("td");

	th.textContent = subj[i];
	td.textContent = data[currentTense][i];

	tr.appendChild(th);
	tr.appendChild(td);
	table.appendChild(tr);
    }
    conjDiv.appendChild(table);
}

function updateConjugation() {
    const requestURL = './json/' + currentVerb + '.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
	data = request.response;
	updateConjugationFromJSON(data);
	updateBasicInfo();
    }
}

//------------------------------------------------------------
// Global variables

var currentVerb;
var currentTense;
var data;

// Initialize global variables:
var currentVerb = findGetParameter("v");
if (currentVerb === null) {
    currentVerb = "être";
}

var currentTense = "present";

addTenseList();
setActiveTense(currentTense);

updateConjugation();
makeVerbList();
