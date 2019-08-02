var grades = [
	new grade(gradeWeek3, []),
	new grade(gradeWeek2, []),
	new grade(gradeWeek1, [])
];

var printToranutLink = document.getElementById("toranutLink");
var toranutFileInput = document.getElementById("toranutFileInput");
var titleOmat = document.getElementById("titleOmat");
var titleElement = document.getElementById("title");

var Rashmash1 = [[], [], [], [], [], []];
var Rashmash2 = [[], [], [], [], [], []];
var Toranut = [[], [], [], [], [], []];

var createToranut = false;

var oldRashmashText, guardText, dutyText, grade1Text, grade2Text, grade3Text;
var oldRashmashFiles, guardFiles, dutyFiles, grade1Files, grade2Files, grade3Files;
var oldRashmashFile, guardFile, dutyFile, grade1File, grade2File, grade3File;

var hours = [];
var days = [];

var oldNightHours = [];
var wasConan = [];

var sortingToranut = false;

var disabledTimeslots = [];
var hanichCells1 = [];
var hanichCells2 = [];

var interval;
var copyArea = document.getElementById("copyArea");

var animateI = 0;

var rashmash1Table = document.getElementById("Rashmash1");
var rashmash2Table = document.getElementById("Rashmash2");
var toranutTable = document.getElementById("Toranut");
var copyAreaContainer = document.getElementById("copyAreaContainer");
var checkAcademy = document.getElementById("checkAcademy");



function Hanich(fullName, grade, department, arabist, kamat, hasKeptNight, hasBeenConan, hoursUnable, hoursAble, justicePointsR, justicePointsT, index)
{
	this.fullName = fullName;
	this.grade = grade;
	this.department = department;
	this.arabist = arabist;
	this.kamat = kamat;
	this.hasKept = false;
	this.hasServed = false;
	this.hasKeptNight = hasKeptNight;
	this.hasBeenConan = hasBeenConan;
	this.hoursUnable = hoursUnable;
	this.hoursAble = hoursAble;
	this.justicePointsR = justicePointsR;
	this.justicePointsT = justicePointsT;
	this.isKeepingOn = [];
	this.index = index;
}
Hanich.prototype.toString = function () {
	return ```Name: ${fullName}
Grade: ${grade}
Department: ${department}
Arabist: ${arabist}
Kamat: ${kamat}
Hours unavailable: ${hoursUnable}
Hours available: ${hoursAble}
Rashmash justice points: ${justicePointsR}
Toranut justice points: ${justicePointsT}```
}



function grade(week, hanichList)
{
	this.week = week;
	this.hanichList = hanichList;
	this.allKept = function()
	{
		for(let i = 0; i < this.hanichList.length; i++)
			if(!this.hanichList[i].hasKept)	return false;
		return true;
	}
	
	this.resetKeeping = function()
	{
		for(let i = 0; i < this.hanichList.length; i++)
			this.hanichList[i].hasKept = false;
	}
}

function toggleToranut() {
	createToranut = !createToranut;
	printToranutLink.innerHTML = createToranut ? "עבור לשיבוץ שמירות" : "עבור לשיבוץ תורנות";
	toranutFileInput.style.display = createToranut ? "" : "none";
	titleOmat.innerHTML = titleElement.innerHTML = createToranut ? "תורנותומט" : "רשמ\"שומט";
	if (!attemptCreation()) {
		clearInterval(interval);
		animateI = 0;
		rashmash1Table.style.display = rashmash2Table.style.display = toranutTable.style.display = copyAreaContainer.style.display = "none";
		rashmash1Table.style.top = toranutTable.style.top = "670px";
		rashmash2Table.style.top = "710px";
		copyAreaContainer.style.bottom = "500px";
	}
}

function attemptCreation() {
	oldRashmashFiles = document.getElementById("oldRashmash").files;
	guardFiles = document.getElementById("guardSchedule").files;
	dutyFiles = document.getElementById("dutySchedule").files;
	grade1Files = document.getElementById("grade1Table").files;
	grade2Files = document.getElementById("grade2Table").files;
	grade3Files = document.getElementById("grade3Table").files;
	if (!(oldRashmashFiles.length && guardFiles.length && (dutyFiles.length || !createToranut) && grade1Files.length && grade2Files.length && grade3Files.length))
		return false;
	
	oldRashmashFile = oldRashmashFiles[0];
	guardFile = guardFiles[0];
	grade1File = grade1Files[0];
	grade2File = grade2Files[0];
	grade3File = grade3Files[0];
	
	if (createToranut)
		dutyFile = dutyFiles[0];
	
	
	let reader = new FileReader();
	
	
	let iLoaded = 0;

	reader.onloadend = function(evt) {
		if (evt.target.readyState == FileReader.DONE) {
			iLoaded++;
			
			switch(iLoaded) {
				case 1:
					oldRashmashText = evt.target.result;
					reader.readAsText(guardFile);
					break;
				case 2:
					guardText = evt.target.result;
					reader.readAsText(grade1File);
					break;
				case 3:
					grade1Text = evt.target.result;
					reader.readAsText(grade2File);
					break;
				case 4:
					grade2Text = evt.target.result;
					reader.readAsText(grade3File);
					break;
				case 5:
					grade3Text = evt.target.result;
					if (createToranut)
						reader.readAsText(dutyFile);
					else
						analyze(oldRashmashText, guardText, null, grade1Text, grade2Text, grade3Text);
					break;
				case 6:
					dutyText = evt.target.result;
					analyze(oldRashmashText, guardText, dutyText, grade1Text, grade2Text, grade3Text);
			}
		}
	};

	reader.readAsText(oldRashmashFile);
	return true;
}

document.getElementById("copyArea").addEventListener("click", function() {
	this.select();
	document.execCommand("copy");
}, false);

function cells() {
	this.cells = [];
}

function storeHanich(hanichInfo, grade, index) {
	if (hanichInfo.length > 5) {
		let hanich = new Hanich(
			hanichInfo[0],
			grade,
			hanichInfo[1],
			hanichInfo[2] == 1,
			hanichInfo[3] == 1,
			oldNightHours.includes(hanichInfo[0]),
			wasConan.includes(hanichInfo[0]),
			hanichInfo[4].split(" "),
			hanichInfo[5].split(" "),
			parseFloat(hanichInfo[6]),
			parseFloat(hanichInfo[7]),
			index
		);
		grades[grade - 1].hanichList.push(hanich);
	}
}

function analyze(oldRashmashText, guardText, dutyText, grade1Text, grade2Text, grade3Text) {
	disabledTimeslots = [];
	// Guard table
	
	guardText = guardText.replace(/ג/g, "3").replace(/ב/g, "2").replace(/א/g, "1");
	days = [new cells(), new cells(), new cells(), new cells(), new cells(), new cells(), null, new cells(), new cells(), new cells(), new cells(), new cells(), new cells()];
	
	let lines = guardText.split("\n");
	for (let i = 0; i < 16; i++) {
		let line = lines[i + 2];
		hours[i] = new cells();
		hours[i].cells = line.split(",");
		hours[i].cells.splice(0, 4);	
		for (let j = 0; j < 13; j++)
			if (j == 6)
				continue;
			else
				days[j].cells[i] = hours[i].cells[j];
	}
	console.log(hours);
	console.log(days);
	
	
	// Old Rashmash
	lines = oldRashmashText.split("\n");
	oldNightHours = [];
	for(let i = 1; i <= 2; i++)
		oldNightHours = oldNightHours.concat(lines[i + 2].split(",").slice(4, 10));
	wasConan = lines[14].split(",").slice(4,9);


	// Duty table
	if(createToranut) {
		dutyText = dutyText.replace(/ג/g, "3").replace(/ב/g, "2").replace(/א/g, "1");
		dutyDays = [new cells(), new cells(), new cells(), new cells(), new cells(), new cells()];
		
		lines = dutyText.split("\n");
		for(let i = 0; i < 7; i++) {
			let line = lines[i + 7];
			hours[i] = new cells();
			hours[i].cells = line.split(",");
			hours[i].cells.splice(0, 4);	
			for(let j = 0; j < 6; j++)
				dutyDays[j].cells[i] = hours[i].cells[j];
		}
	}
	
	
	// Grade tables
	let hanichLineList = grade1Text.split("\n");
	for (let i = 0; i < hanichLineList.length; i++)
		storeHanich(hanichLineList[i].split(","), 1, i);
	
	hanichLineList = grade2Text.split("\n");
	for (let i = 0; i < hanichLineList.length; i++)
		storeHanich(hanichLineList[i].split(","), 2, i);
	
	hanichLineList = grade3Text.split("\n");
	for (let i = 0; i < hanichLineList.length; i++)
		storeHanich(hanichLineList[i].split(","), 3, i);


	startSorting();
}

function resetHanich(hanich)
{
	hanich.hasKept = false;
	hanich.hasServed = false;
	hanich.hasKeptNight = false;
	hanich.isKeepingOn = [];
}

function startSorting()
{
	for(let grade of grades)
		for(let hanichList of grade.hanichList)
			resetHanich(hanichList);
	
	
	error = false;
	sortingToranut = false;
	sortHanichsR();
	if(createToranut) {
		sortingToranut = true;
		sortHanichsT();
	}
	
	if(!error) showResults();
}


function showResults() {
	let needsReset = false;
	
	for (let cell of hanichCells1.concat(hanichCells2))
		cell.parentNode.removeChild(cell);
	hanichCells1 = [];
	hanichCells2 = [];
	
	let copyText = [];

	if (!createToranut) {
		// Create the Rashmashes
		for (let whichRashmash = 1; whichRashmash <= 2; whichRashmash++) {
			for (let y = 0; y < ((whichRashmash == 1) ? 16 : 12); y++) {
				if (!copyText[y])
					copyText[y] = "";
				if (whichRashmash == 2 && y >= 1 && y <= 3)
					continue;
				else
					for (let x = 0; x < 6; x++) {
						let cell = document.createElement("td");
						let hanich;
						if (whichRashmash == 1) {
							hanichCells1.push(cell);
							hanich = Rashmash1[x][y];
						}
						else {
							hanichCells2.push(cell);
							hanich = Rashmash2[x][y];
						}
						color = "#ffffff";
						if (hanich != null) {
							hanichName = document.createElement("span");
							hanichName.innerHTML = hanich.fullName;
							hanichName.className = "hanichText";
							hanichName.hanich = hanich;
							hanichName.day = x;
							hanichName.index = y;
							hanichName.toranut = false;
							hanichName.addEventListener("click", disableTimeslot);
							cell.appendChild(hanichName);

							switch (hanich.grade) {
								case 1:
									color = "#ea9999";
									break;
								case 2:
									color = "#674ea7";
									break;
								case 3:
									color = "#9fc5e8";
									break;
							}

							copyText[y] += hanich.fullName;
						}
						else {
							cell.innerHTML = "	";
							if (disabledTimeslots.length != 0)
								if (disabledTimeslots[disabledTimeslots.length - 1].day == x && disabledTimeslots[disabledTimeslots.length - 1].index == y)
									needsReset = true;
						}

						cell.style = "background-color: " + color;
						row = document.getElementById("R" + whichRashmash + "row" + (y + 1));
						row.appendChild(cell);

						if (x != 5)
							copyText[y] += "	";
					}
			}

			if (whichRashmash == 1)
				for (let y = 0; y < 16; y++)
					copyText[y] += "		";
		}
		document.getElementById("copyArea").innerHTML = copyText.join("&#13;&#10;");
	}
	else {
		// Create the Toranut
		for (y = 0; y < 7; y++) {
			if (!copyText[y])
				copyText[y] = "";
			for(x = 0; x < 6; x++) {
				cell = document.createElement("td");
				hanichCells1.push(cell);
				let hanichs = Toranut[x][y];
				color = "#ffffff";
				if(hanichs != null) {
					let firstHanich = document.createElement("span");
					firstHanich.innerHTML = hanichs[0].fullName;
					firstHanich.className = "hanichText";
					firstHanich.hanich = hanichs[0];
					firstHanich.day = x;
					firstHanich.index = y;
					firstHanich.toranut = true;
					firstHanich.addEventListener("click", disableTimeslot);
					cell.appendChild(firstHanich);
					if(hanichs.length != 1)
					{
						cell.appendChild(document.createTextNode(" ו"));
						let secondHanich = document.createElement("span");
						secondHanich.innerHTML = hanichs[1].fullName;
						secondHanich.className = "hanichText";
						secondHanich.hanich = hanichs[1];
						secondHanich.day = x;
						secondHanich.index = y;
						secondHanich.toranut = true;
						secondHanich.addEventListener("click", disableTimeslot);
						cell.appendChild(secondHanich);
					}
					
					switch(hanichs[0].grade)
					{
					case 1:
						color = "#ffff99";
						break;
					case 2:
						color = "#8eaadb";
						break;
					case 3:
						color = "#c55a11";
						break;
					}
					copyText[y] += (hanichs.length == 1) ? hanichs[0].fullName : hanichs[0].fullName + " ו" + hanichs[1].fullName;
				}
				else
					cell.innerHTML = "	";
				cell.style = "background-color: " + color;
				row = document.getElementById("Trow" + (y + 1));
				row.appendChild(cell);
				
				if(x != 5)	copyText[y] += "	";
			}
		}
		document.getElementById("copyArea").innerHTML = copyText.join("&#13;&#10;");
	}
	
	clearInterval(interval);
	// Play the rising animation
	copyAreaContainer.style.display = "";
	if (!createToranut) {
		rashmash1Table.style.display = "";
		rashmash2Table.style.display = "";
		toranutTable.style.display = "none";
	}
	else {
		rashmash1Table.style.display = "none";
		rashmash2Table.style.display = "none";
		toranutTable.style.display = "";
	}
	interval = setInterval(risingAnimation, 5);
	
	if(needsReset)
	{
		disabledTimeslots.splice(-1);
		startSorting();
		return 0;
	}
}


function risingAnimation()
{
	animateI++;
	let animateProg = Math.min(animateI / 150, 1);
	let tableHeight = (1 - (animateProg * animateProg * (3 - 2 * animateProg))) * 650;
	rashmash1Table.style.top = toranutTable.style.top = tableHeight + 20 + "px";
	rashmash2Table.style.top = tableHeight + 60 + "px";
	
	animateProg = Math.min(animateI / 100, 1);
	copyAreaContainer.style.bottom = (1 - (animateProg * animateProg * (3 - 2 * animateProg))) * 400 + 100 + "px";

	if (animateI >= 150)
		clearInterval(interval);
}




function timeslot(hanichName, day, index, toranut)
{
	this.hanichName = hanichName;
	this.day = day;
	this.index = index;
	this.toranut = toranut;
}


function disableTimeslot() {
	disabledTimeslots.push(new timeslot(this.hanich.fullName, this.day, this.index, this.toranut));
	startSorting();
}





function sortHanichsR() {
	nightKeep(); // 00:00-08:00 (only for the second Rashmash)
	earlyHours(1); // 02:00-04:00
	earlyHours(2); // 04:00-06:00
	earlyHours(0); // 00:00-02:00
	earlyHours(3); // 06:00-08:00
	allDay(0); // Assign daytime conans

	// Assign regular hours
	for (day = 0; day < 6; day++)
		for (hour = 4; hour < 12; hour++) {
			assignHanichR(day, hour, 1);
			assignHanichR(day, hour, 2);
		}

	allDay(1); // Assign nighttime conan
	allDay(2); // Assign ktsinto
}

function sortHanichsT()
{
	for(day = 0; day < 6; day++) {
		assignHanichT(day, 3, 0);
		
		assignHanichT(day, 5, 1)
		
		assignHanichT(day, 8, 2);
		assignHanichT(day, 11, 3);
		assignHanichT(day, 11, 4);
		assignHanichT(day, -1, 5);
		assignHanichT(day, 11, 6);
	}
}


function setKeeper(hanich, day, hour, whichRashmash)
{
	if(whichRashmash == 1)
		Rashmash1[day][hour] = hanich;
	else
		Rashmash2[day][hour] = hanich;
	if(hanich != null)
	{
		grades[hanich.grade - 1].hanichList[hanich.index].hasKept = true;
		grades[hanich.grade - 1].hanichList[hanich.index].isKeepingOn[day] = hour;
		
		if (grades[hanich.grade - 1].allKept()) {
			console.log("Warning: Too few hanichs, grade " + hanich.grade + "'s hanichs may have to be repeated.");
			grades[hanich.grade - 1].resetKeeping();
		}
	}
}

function setServers(hanichs, day, index)
{
	Toranut[day][index] = hanichs;
	if(hanichs != null)
		for(let hanich of hanichs)
			grades[hanich.grade - 1].hanichList[hanich.index].hasServed = true;
}


function assignHanichR(day, hour, whichRashmash)
{
	let hanichList = getGradeHanichsR(day, hour, whichRashmash);
	hanichList = removeUnable(hanichList, day, hour, false);
	hanichList = removeDisabled(hanichList, day, hour, false);
	hanichList = removeBusy(hanichList, day, hour);
	setKeeper(getMinimumJusticeR(hanichList), day, hour, whichRashmash);
}

function assignHanichT(day, hour, index)
{
	let hanichList = getGradeHanichsT(day, index);
	if(hour != -1) {
		hanichList = removeUnable(hanichList, day, hour, true);
		hanichList = removeDisabled(hanichList, day, hour, true);
		hanichList = removeBusy(hanichList, day, hour);
		if (index == 1)
			hanichList = removeNotBusy(hanichList, day, hour + 1);
		let newHanichList = [];
		for(i = 0; i < hanichList.length; i++)
		{
			hanich = hanichList[i];
			if ((!hanich.hasKept || hanich.isKeepingOn[day] != hour) && !hanich.hasServed)
				newHanichList.push(hanich);
		}
		hanichList = newHanichList;
	}
	setServers(getMinimumJusticeT(hanichList, (index <= 4) ? 2 : 1), day, index);
}


// A function that makes the night-keeping (00:00-08:00) assignment.
function nightKeep() {
	for (day = 1; day < 6; day++) {
		let gradeHanichs = getGradeHanichsR(day, 0, 2);
		gradeHanichs = removeDisabled(gradeHanichs, day, 0, false);
		newGradeHanichs = [];
		for (i = 0; i < gradeHanichs.length; i++) {
			hanich = gradeHanichs[i];
			if (!hanich.hasKept)
				newGradeHanichs.push(hanich);
		}

		setKeeper(getMinimumJusticeR(newGradeHanichs), day, 0, 2);
	}
}

// A function that makes early-hour (00:00 to 08:00) assignments.
function earlyHours(hour) {
	for(day = 1; day < 6; day++) {
		let gradeHanichs = getGradeHanichsR(day, hour, 1);
		gradeHanichs = removeDisabled(gradeHanichs, day, hour, false);
		let newGradeHanichs = [];
		for(i = 0; i < gradeHanichs.length; i++)
		{
			hanich = gradeHanichs[i];
			if(!(hanich.hasKeptNight && (hour == 1 || hour == 2)) && !hanich.hasKept)
				newGradeHanichs.push(hanich);
		}
		
		setKeeper(getMinimumJusticeR(newGradeHanichs), day, hour, 1);
	}
}


// A function that assigns the 3 conans (כוננים) and the ktsinto (קצינת"ו). The 2 daytime
// conans are assigned first, after the early-hour assignments, and the nighttime conan &
// ktsinto are assigned after the rest of the assignments.
// The argument type controls which role(s) to assign.
// type 0: daytime conans #1 and #2
// type 1: nighttime conan
// type 2: ktsinto
function allDay(type) {
	switch(type) {
		case 0: // Daytime conans
			for (let j = 12; j <= 13; j++)
				for(let day = 0; day < 5; day++) {
					let gradeHanichs = getGradeHanichsR(day, j, 1);
					gradeHanichs = removeDisabled(gradeHanichs, day, j, false);
					gradeHanichs = removeBusy(gradeHanichs, day, 10);
					let newGradeHanichs = [];
					for(let i = 0; i < gradeHanichs.length; i++) {
						hanich = gradeHanichs[i];
						if(!hanich.hasBeenConan)
							newGradeHanichs.push(hanich);
					}
					setKeeper(getMinimumJusticeR(newGradeHanichs), day, j, 1);
				}
			break;

		default: // Nighttime conan or ktsinto
			for(let day = 0; day < 6 - type; day++) {
				let gradeHanichs = getGradeHanichsR(day, 13+type, 1);
				gradeHanichs = removeDisabled(gradeHanichs, day, 13 + type, false);
				setKeeper(getMinimumJusticeR(gradeHanichs), day, 13 + type, 1);
			}
			break;
	}
}



// Returns the list of hanichs of the grade written at the given day and hour on the guard file.
// If no grade is found at the given day and hour, returns an empty list.
function getGradeHanichsR(day, hour, whichRashmash) {
	let gradeNumber = days[day + 7 * (whichRashmash - 1)].cells[hour];
	return (gradeNumber > 0) ? (grades[gradeNumber - 1].hanichList) : [];
}

// Same as above, but searches on the duty file.
function getGradeHanichsT(day, hour) {
	let gradeNumber = dutyDays[day].cells[hour];
	return (gradeNumber > 0) ? (grades[gradeNumber - 1].hanichList) : [];
}


// This function receives a list of hanichs and returns the hanich that has the least Rashmash justice points.
function getMinimumJusticeR(hanichs) {
	if (hanichs.length == 0)
		return null;
	let minimum = hanichs[0].justicePointsR;
	let keeper = hanichs[0];

	for(i = 0; i < hanichs.length; i++)
	{
		minimum = hanichs[i].justicePointsR;
		keeper = hanichs[i];
		
		if(!hanichs[i].hasKept)
			break;
	}

	for(i = 0; i < hanichs.length; i++)
	{
		if(hanichs[i].justicePointsR < minimum && !hanichs[i].hasKept)
		{
			minimum = hanichs[i].justicePointsR;
			keeper = hanichs[i];
		}
	}
	
	return keeper;
}

// Same as above, but uses Toranut justice points.
function getMinimumJusticeT(hanichs, number) {
	if (hanichs.length == 0)
		return null;
	let minimum = hanichs[0].justicePointsT;
	let servers = [hanichs[0]];
	
	for(f = 0; f < number; f++)
	{
		for(let hanich of hanichs) {
			minimum = hanich.justicePointsT;
			servers[f] = hanich;
			
			if(!hanich.hasServed)
				break;
		}
		
		for(let hanich of hanichs) {
			if(hanich.justicePointsT < minimum && !hanich.hasServed) {
				minimum = hanich.justicePointsT;
				servers[f] = hanich;
			}
		}
		
		servers[f].hasServed = true;
	}
	
	return servers;
}


// This function receives a list of hanichs and trims out the hanichs that are explicitly specified,
// in the 5th column of the hanich list file, as being unable at the given day and hour to be assigned,
// for one reason or another. The format in the hanich list file should be the first 3 letters of the
// English name of the day, followed by the hour they'll be unable to be assigned on. If there are
// multiple times every week, separate them by spaces.
// For example, if you're preoccupied every Tuesday at 3 PM and every Friday at 10 AM, you would write "tue15 fri10".
function removeUnable(hanichs, day, hour, toranut) {
	let hanichsLeft = [];
	for(let hanich of hanichs) {
		let unables = hanich.hoursUnable;
		let remove = false;
		for(let unable of unables) {
			dayUnable = translateDay(unable.substring(0, 3));
			hourUnable = Math.floor(parseInt(unable.substring(3,5)) / 2);
			if(dayUnable == day && hourUnable == hour) { remove = true; break; }
		}
		
		if(!remove && !(!toranut && hanich.hasKept) && !(toranut && hanich.hasServed)) hanichsLeft.push(hanich);
	}
	return hanichsLeft;
}

// This function receives a list of hanichs and trims out the hanichs that are disabled by the user
// on a given day and hour. Hanichs may be disabled by left-clicking their name in the printed table
// on the webpage.
function removeDisabled(hanichs, day, hour, toranut) {
	let hanichsLeft = [];
	for(let hanich of hanichs) {
		let remove = false;
		
		for(let disabledTimeslot of disabledTimeslots)
			if (disabledTimeslot.day == day && disabledTimeslot.index == hour && disabledTimeslot.toranut == toranut && disabledTimeslot.hanichName == hanich.fullName) {
				remove = true;
				break;
			}
		
		if(!remove) hanichsLeft.push(hanich);
	}
	return hanichsLeft;
}

// This function checks if a given hanich is explicitly specified, in the 6th column of the hanich list file,
// as being available at the given day and hour, despite having some class at that time. This is used to bypass
// the removeBusy function.
function checkIfAble(hanich, day, hour) {
	let ables = hanich.hoursAble;
	let isAble = false;
	for(let able of ables) {
		let dayAble = translateDay(able.substring(0, 3));
		let hourAble = parseInt(able.substring(3,5)) / 2;
		if(dayAble == day && hourAble == hour) { isAble = true; break; }
	}
	return isAble;
}

// This function receives a list of hanichs and trims out the hanichs whose department is not listed
// in the schedule.js file as being available at the given day and hour.
function removeBusy(hanichs, day, hour) {
	let nonBusy = [];
	let hanichsLeft = [];

	// If the given day is Friday, or the given hour is before 8 AM or after 6 PM, or the
	// "התחשב בל"וז אקדמי" checkbox is empty, simply return all the given hanichs.
	if(day == 5 || hour > 9 || hour < 4 || hanichs.length == 0 || !checkAcademy.checked)
		return hanichs;
	else
	{
		switch(hanichs[0].grade)
		{
		case 1:
			nonBusy = gradeWeek1.schedules[day][hour - 4];
			break;
		case 2:
			nonBusy = gradeWeek2.schedules[day][hour - 4];
			break;
		case 3:
			nonBusy = gradeWeek3.schedules[day][hour - 4];
			break;
		}
	}
	// If no departments are listed at the given hour, display an error.
	if (nonBusy.length == 0) {
		alert("Error: Incorrect grade on " + detranslateDay(day) + ", " + detranslateHour(hour) + ", for " + ((sortingToranut) ? "Toranut" : "Rashmash"));
		error = true;
	}
	
	for(let hanich of hanichs) {
		if(nonBusy.includes(hanich.department) || (hanich.arabist && nonBusy.includes("arab")) || (hanich.kamat && nonBusy.includes("kamat")) || checkIfAble(hanich, day, hour))
			hanichsLeft.push(hanich);
	}
	
	return hanichsLeft;
	
}

// This function 
function removeNotBusy(hanichs, day, hour) {
	let nonBusy = [];
	let hanichsLeft = [];
	
	if(day == 5 || hour > 9 || hour < 4 || hanichs.length == 0)
		return hanichs;
	else
	{
		switch(hanichs[0].grade)
		{
		case 1:
			nonBusy = gradeWeek1.schedules[day][hour - 4];
			break;
		case 2:
			nonBusy = gradeWeek2.schedules[day][hour - 4];
			break;
		case 3:
			nonBusy = gradeWeek3.schedules[day][hour - 4];
			break;
		}
	}
	
	for(let hanich of hanichs) {
		if(!(nonBusy.includes(hanich.department) || (hanich.arabist && nonBusy.includes("arab")) || (hanich.kamat && nonBusy.includes("kamat")) || checkIfAble(hanich, day, hour)))
			hanichsLeft.push(hanich);
	}
	
	return hanichsLeft;
	
}



function translateDay(day)
{
	switch(day)
	{
	case "sun":	return 0;
	case "mon":	return 1;
	case "tue":	return 2;
	case "wed":	return 3;
	case "thu":	return 4;
	case "fri":	return 5;
	default:	return 0;
	}
}

function detranslateDay(day)
{
	switch(day)
	{
	case 0:		return "Sunday";
	case 1:		return "Monday";
	case 2:		return "Tuesday";
	case 3:		return "Wednesday";
	case 4:		return "Thursday";
	case 5:		return "Friday";
	default:	return "";
	}
}

function detranslateHour(hour)
{
	switch(hour)
	{
	case 0:		return "00:00-02:00";
	case 1:		return "02:00-04:00";
	case 2:		return "04:00-06:00";
	case 3:		return "06:00-08:00";
	case 4:		return "08:00-10:00";
	case 5:		return "10:00-12:00";
	case 6:		return "12:00-14:00";
	case 7:		return "14:00-16:00";
	case 8:		return "16:00-18:00";
	case 9:		return "18:00-20:00";
	case 10:	return "20:00-22:00";
	case 11:	return "22:00-00:00";
    case 12:    return "כונן יום 1";
    case 13:    return "כונן יום 2";
	case 14:	return "כונן לילה";
	case 15:	return "קצינת\"ו";
	}
}
