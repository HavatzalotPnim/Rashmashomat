function Hanich(fullName, grade, department, arabist, kamat, hasKeptNight, hasBeenConan, hoursUnable, hoursAble, justicePointsR, justicePointsT)
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
	
	this.print = function() {
		returnValue = "Name: " + fullName + "\n";
		returnValue += "Grade: " + grade + "\n";
		returnValue += "Department: " + department + "\n";
		returnValue += "Arabist: " + arabist + "\n";
		returnValue += "Kamat: " + kamat + "\n";
		returnValue += "Hours unavailable: " + hoursUnable + "\n";
		returnValue += "Hours available: " + hoursAble + "\n";
		returnValue += "Justice points of Rashmash: " + justicePointsR;
		returnValue += "Justice points of Toranut: " + justicePointsT;
		
		return returnValue;
	}
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

var grades = [
	new grade(gradeWeek3, []),
	new grade(gradeWeek2, []),
	new grade(gradeWeek1, [])
];





var Rashmash = [[],[],[],[],[],[]];
var Toranut = [[],[],[],[],[],[]];

var createToranut = false;

var oldRashmashText;
var guardText;
var dutyText;
var grade1Text;
var grade2Text;
var grade3Text;

function readBlob(callback) {

	var oldRashmashFiles = document.getElementById("oldRashmash").files;
	var guardFiles = document.getElementById("guardSchedule").files;
	var dutyFiles = document.getElementById("dutySchedule").files;
	var grade1Files = document.getElementById("grade1Table").files;
	var grade2Files = document.getElementById("grade2Table").files;
	var grade3Files = document.getElementById("grade3Table").files;
	if (!(oldRashmashFiles.length && guardFiles.length && grade1Files.length && grade2Files.length && grade3Files.length))
	{
		alert("אנא הכנס את כל הקבצים");
		return;
	}
	
	var oldRashmashFile = oldRashmashFiles[0];
	var guardFile = guardFiles[0];
	var dutyFile;
	var grade1File = grade1Files[0];
	var grade2File = grade2Files[0];
	var grade3File = grade3Files[0];
	
	if(dutyFiles.length)
	{
		createToranut = true;
		dutyFile = dutyFiles[0];
	}
	
	
	var reader = new FileReader();
	
	
	var iLoaded = 0;

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
				if(createToranut) reader.readAsText(dutyFile);
				else callback(oldRashmashText, guardText, null, grade1Text, grade2Text, grade3Text);
				break;
			case 6:
				dutyText = evt.target.result;
				callback(oldRashmashText, guardText, dutyText, grade1Text, grade2Text, grade3Text);
			}
		}
	};

	reader.readAsText(oldRashmashFile);
}

document.getElementById("button").addEventListener('click', function(event) {
	if (event.target.tagName.toLowerCase() == 'button') {
		readBlob(analyze);
	}
}, false);

document.getElementById("RcopyArea").addEventListener("click", function() {
	this.select();
	document.execCommand("copy");
}, false);

document.getElementById("TcopyArea").addEventListener("click", function() {
	this.select();
	document.execCommand("copy");
}, false);


hours = [];
days = [];

oldNightHours = [];

function cells()
{
	this.cells = [];
}


sortingToranut = false;

var disabledTimeslots = [];

function analyze(oldRashmashText, guardText, dutyText, grade1Text, grade2Text, grade3Text)
{
	disabledTimeslots = [];
	// Guard table
	
	guardText = guardText.replace(/ג/g, "3").replace(/ב/g, "2").replace(/א/g, "1");
	
	days = [new cells(), new cells(), new cells(), new cells(), new cells(), new cells()];
	
	let lines = guardText.split("\n");

	
	for(lineCounter = 0; lineCounter < 15; lineCounter++)
	{
		let line = lines[lineCounter + 2];
		hours[lineCounter] = new cells();
		hours[lineCounter].cells = line.split(",");
		hours[lineCounter].cells.splice(0, 4);	
		for(j = 0; j < 6; j++)
			days[j].cells[lineCounter] = hours[lineCounter].cells[j];
	}
	
	
	
	// Old Rashmash
	
	lines = oldRashmashText.split("\n");
	
	for(lineCounter = 1; lineCounter <= 2; lineCounter++)
		oldNightHours = oldNightHours.concat(lines[lineCounter + 2].split(",").slice(4, 10));
	let wasConan = lines[14].split(",").slice(4,9);
	
	
	
	if(createToranut)
	{
		// Duty table
		
		dutyText = dutyText.replace(/ג/g, "3").replace(/ב/g, "2").replace(/א/g, "1");
		
		dutyDays = [new cells(), new cells(), new cells(), new cells(), new cells(), new cells()];
		
		lines = dutyText.split("\n");

		
		for(lineCounter = 0; lineCounter < 7; lineCounter++)
		{
			let line = lines[lineCounter + 7];
			hours[lineCounter] = new cells();
			hours[lineCounter].cells = line.split(",");
			hours[lineCounter].cells.splice(0, 4);	
			for(j = 0; j < 6; j++)
				dutyDays[j].cells[lineCounter] = hours[lineCounter].cells[j];
		}
	}
	
	
	
	// Grade tables
	
	let grade1HanichList = [];
	hanichLineList = grade1Text.split("\n");
	for(i = 0; i < hanichLineList.length; i++)
	{
		hanichInfo = hanichLineList[i].split(",");
		if(hanichInfo.length > 5) {
			fullName = hanichInfo[0];
			department = hanichInfo[1];
			arabist = (hanichInfo[2] == 1);
			hasKeptNight = oldNightHours.includes(fullName);
			hasBeenConan = wasConan.includes(fullName);
			hoursUnable = hanichInfo[4].split(" ");
			hoursAble = hanichInfo[5].split(" ");
			justicePointsR = parseFloat(hanichInfo[6]);
			justicePointsT = parseFloat(hanichInfo[7]);
			
			grade1HanichList[i] = new Hanich(fullName, 1, department, arabist, false, hasKeptNight, hasBeenConan, hoursUnable, hoursAble, justicePointsR, justicePointsT);
		}
	}
	grades[0].hanichList = grade1HanichList;
	
	
	let grade2HanichList = [];
	hanichLineList = grade2Text.split("\n");
	for(i = 0; i < hanichLineList.length; i++)
	{
		hanichInfo = hanichLineList[i].split(",");
		if(hanichInfo.length > 5) {
			fullName = hanichInfo[0];
			department = hanichInfo[1];
			arabist = (hanichInfo[2] == 1);
			hasKeptNight = oldNightHours.includes(fullName);
			hasBeenConan = wasConan.includes(fullName);
			hoursUnable = hanichInfo[4].split(" ");
			hoursAble = hanichInfo[5].split(" ");
			justicePointsR = parseFloat(hanichInfo[6]);
			justicePointsT = parseFloat(hanichInfo[7]);
			
			grade2HanichList[i] = new Hanich(fullName, 2, department, arabist, false, hasKeptNight, hasBeenConan, hoursUnable, hoursAble, justicePointsR, justicePointsT);
		}
	}
	grades[1].hanichList = grade2HanichList;
	
	
	let grade3HanichList = [];
	hanichLineList = grade3Text.split("\n");
	hanichLineList.splice(3,1);
	for(i = 0; i < hanichLineList.length; i++)
	{
		hanichInfo = hanichLineList[i].split(",");
		if(hanichInfo.length > 5) {
			fullName = hanichInfo[0];
			department = hanichInfo[1];
			arabist = (hanichInfo[2] == 1);
			kamat = (hanichInfo[3] == 1);
			hasKeptNight = oldNightHours.includes(fullName);
			hasBeenConan = wasConan.includes(fullName);
			hoursUnable = hanichInfo[4].split(" ");
			hoursAble = hanichInfo[5].split(" ");
			justicePointsR = parseFloat(hanichInfo[6]);
			justicePointsT = parseFloat(hanichInfo[7]);
			
			grade3HanichList[i] = new Hanich(fullName, 3, department, arabist, kamat, hasKeptNight, hasBeenConan, hoursUnable, hoursAble, justicePointsR, justicePointsT);
		}
	}
	grades[2].hanichList = grade3HanichList;
	
	
	
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
	for(let i = 0; i < grades.length; i++)
		for(let j = 0; j < grades[i].hanichList.length; j++)
			resetHanich(grades[i].hanichList[j]);
	
	
	error = false;
	sortingToranut = false;
	sortHanichsR();
	if(createToranut)
	{
		sortingToranut = true;
		sortHanichsT();
	}
	
	if(!error) showResults();
}


hanichCells = [];

var interval;

function showResults()
{
	let needsReset = false;
	
	for(let i = 0; i < hanichCells.length; i++)
	{
		cell = hanichCells[i];
		cell.parentNode.removeChild(cell);
	}
	hanichCells = [];
	
	RcopyText = "";
	TcopyText = "";
	
	for(y = 0; y < 15; y++)
	{
		for(x = 0; x < 6; x++)
		{
			cell = document.createElement("td");
			hanichCells.push(cell);
			hanich = Rashmash[x][y];
			color = "#ffffff";
			if(hanich != null) {
				hanichName = document.createElement("span");
				hanichName.innerHTML = hanich.fullName;
				hanichName.className = "hanichText";
				hanichName.hanich = hanich;
				hanichName.day = x;
				hanichName.index = y;
				hanichName.toranut = false;
				hanichName.addEventListener("click", disableTimeslot);
				cell.appendChild(hanichName);
				
				switch(hanich.grade)
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
				RcopyText += hanich.fullName;
			}
			else
			{
				cell.innerHTML = "	";
				if(disabledTimeslots.length != 0)
					if(disabledTimeslots[disabledTimeslots.length - 1].day == x && disabledTimeslots[disabledTimeslots.length - 1].index == y)
						needsReset = true;
			}
			
			cell.style = "background-color: " + color;
			row = document.getElementById("Rrow" + (y + 1));
			row.appendChild(cell);
			
			if(x != 5)	RcopyText += "	";
		}
		if(y != 14)	RcopyText += "&#13;&#10;";
	}
	document.getElementById("RcopyArea").innerHTML = RcopyText;
	
	if(createToranut) {
		for(y = 0; y < 7; y++)
		{
			for(x = 0; x < 6; x++)
			{
				cell = document.createElement("td");
				hanichCells.push(cell);
				hanichs = Toranut[x][y];
				color = "#ffffff";
				if(hanichs != null) {
					firstHanich = document.createElement("span");
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
						secondHanich = document.createElement("span");
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
					TcopyText += (hanichs.length == 1) ? hanichs[0].fullName : hanichs[0].fullName + " ו" + hanichs[1].fullName;
				}
				else
					cell.innerHTML = "	";
				cell.style = "background-color: " + color;
				row = document.getElementById("Trow" + (y + 1));
				row.appendChild(cell);
				
				if(x != 5)	TcopyText += "	";
			}
			if(y != 14)	TcopyText += "&#13;&#10;";
		}
		document.getElementById("TcopyArea").innerHTML = TcopyText;
	}
	
	clearInterval(interval);
	interval = setInterval(rTableAnimation, 1);
	
	if(needsReset)
	{
		disabledTimeslots.splice(-1);
		startSorting();
		return 0;
	}
}

rAnimateI = 0;
tAnimateI = 0;

function rTableAnimation()
{
	rAnimateI++;
	rAnimateProg = rAnimateI / 150;
	if(rAnimateProg > 1) rAnimateProg = 1;
	rAnimate = (650 - (rAnimateProg * rAnimateProg * (3 - 2 * rAnimateProg)) * 650);
	
	document.getElementById("Rashmash").style = "top: " + (rAnimate + 20) + "px";
	rCopyAnimation();
	if(createToranut)	tTableAnimation();
}

function tTableAnimation()
{
	tAnimateI++;
	tAnimateProg = tAnimateI / 150;
	if(tAnimateProg > 1) tAnimateProg = 1;
	tAnimate = (650 - (tAnimateProg * tAnimateProg * (3 - 2 * tAnimateProg)) * 650);
	document.getElementById("Toranut").style = "top: " + (tAnimate - 355.36) + "px";
	tCopyAnimation();
}

function rCopyAnimation()
{
	rAnimateProg = rAnimateI / 100;
	if(rAnimateProg > 1) rAnimateProg = 1;
	rAnimate = (300 - (rAnimateProg * rAnimateProg * (3 - 2 * rAnimateProg)) * 300) + 50;
	
	document.getElementById("RcopyAreaContainer").style = "bottom: " + rAnimate + "px";
	if(createToranut)	document.getElementById("TcopyAreaContainer").style = "bottom: " + rAnimate + "px";
}

function tCopyAnimation()
{
	tAnimateProg = tAnimateI / 100;
	if(tAnimateProg > 1) tAnimateProg = 1;
	tAnimate = (300 - (tAnimateProg * tAnimateProg * (3 - 2 * tAnimateProg)) * 300) + 50;
	
	document.getElementById("TcopyAreaContainer").style = "bottom: " + tAnimate + "px";
}







function timeslot(hanichName, day, index, toranut)
{
	this.hanichName = hanichName;
	this.day = day;
	this.index = index;
	this.toranut = toranut;
}


function disableTimeslot()
{
	disabledTimeslots.push(new timeslot(this.hanich.fullName, this.day, this.index, this.toranut));
	startSorting();
}





function sortHanichsR()
{
	earlyHours(1);
	earlyHours(2);
	allDay(0);
	earlyHours(0);
	earlyHours(3);
	
	for(day = 0; day < 6; day++)
		for(hour = 4; hour < 12; hour++)
			assignHanichR(day, hour);
	
	allDay(1);
	allDay(2);
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


function setKeeper(hanich, day, hour)
{
	Rashmash[day][hour] = hanich;
	if(hanich != null)
	{
		hanich.hasKept = true;
		hanich.isKeepingOn[day] = hour;
		
		if(grades[hanich.grade-1].allKept())
			grades[hanich.grade-1].resetKeeping();
	}
}

function setServers(hanichs, day, index)
{
	Toranut[day][index] = hanichs;
	if(hanichs != null)
		for(let i = 0; i < hanichs.length; i++)
			hanichs[i].hasServed = true;
}


function assignHanichR(day, hour)
{
	hanichList = getGradeHanichsR(day, hour);
	hanichList = removeUnable(hanichList, day, hour, false);
	hanichList = removeDisabled(hanichList, day, hour, false);
	hanichList = removeBusy(hanichList, day, hour);
	setKeeper(getMinimumJusticeR(hanichList), day, hour);
}

function assignHanichT(day, hour, index)
{
	hanichList = getGradeHanichsT(day, index);
	if(hour != -1) {
		hanichList = removeUnable(hanichList, day, hour, true);
		hanichList = removeDisabled(hanichList, day, hour, true);
		hanichList = removeBusy(hanichList, day, hour);
		if(index == 1)	hanichList = removeNotBusy(hanichList, day, hour + 1);
		newHanichList = [];
		for(i = 0; i < hanichList.length; i++)
		{
			hanich = hanichList[i];
			if((!hanich.hasKept || hanich.isKeepingOn[day] != hour) && !hanich.hasServed)	newHanichList.push(hanich);
		}
		hanichList = newHanichList;
	}
	setServers(getMinimumJusticeT(hanichList, (index <= 4) ? 2 : 1), day, index);
}



function earlyHours(hour)
{
	for(day = 1; day < 6; day++) {
		gradeHanichs = getGradeHanichsR(day, hour);
		gradeHanichs = removeDisabled(gradeHanichs, day, hour, false);
		newGradeHanichs = [];
		for(i = 0; i < gradeHanichs.length; i++)
		{
			hanich = gradeHanichs[i];
			if(!(hanich.hasKeptNight && (hour >= 1 && hour <= 2)) && !hanich.hasKept)
				newGradeHanichs.push(hanich);
		}
			
		selected = getMinimumJusticeR(newGradeHanichs);
		setKeeper(selected, day, hour);
	}
}


function allDay(type)
{
	newGradeHanichs = [];
	switch(type)
	{
	case 0:
		for(let day = 0; day < 5; day++)
		{
			let gradeHanichs = getGradeHanichsR(day, 12);
			gradeHanichs = removeDisabled(gradeHanichs, day, 12, false);
			gradeHanichs = removeBusy(gradeHanichs, day, 10);
			for(i = 0; i < gradeHanichs.length; i++)
			{
				hanich = gradeHanichs[i];
				if(!hanich.hasBeenConan)
					newGradeHanichs.push(hanich);
			}
			
			let selected = getMinimumJusticeR(newGradeHanichs);
			
			setKeeper(selected, day, 12);
		}
		break;
	
	default:
		for(let day = 0; day < 4; day++)
		{
			let gradeHanichs = getGradeHanichsR(day, 12+type);
			newGradeHanichs = removeDisabled(gradeHanichs, day, 12+type, false);
			
			let selected = getMinimumJusticeR(newGradeHanichs);
			
			setKeeper(selected, day, 12+type);
		}
		break;
	}
}



function getGradeHanichsR(day, hour)
{
	let gradeNumber = days[day].cells[hour];
	return (gradeNumber > 0) ? (grades[gradeNumber - 1].hanichList) : [];
}

function getGradeHanichsT(day, hour)
{
	let gradeNumber = dutyDays[day].cells[hour];
	return (gradeNumber > 0) ? (grades[gradeNumber - 1].hanichList) : [];
}


function getMinimumJusticeR(hanichs)
{
	if(hanichs.length == 0) return null;
	var minimum = hanichs[0].justicePointsR;
	var keeper = hanichs[0];

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


function getMinimumJusticeT(hanichs, number)
{
	if(hanichs.length == 0) return null;
	var minimum = hanichs[0].justicePointsT;
	var servers = [hanichs[0]];
	
	for(f = 0; f < number; f++)
	{
		for(i = 0; i < hanichs.length; i++)
		{
			minimum = hanichs[i].justicePointsT;
			servers[f] = hanichs[i];
			
			if(!hanichs[i].hasServed)
				break;
		}

		for(i = 0; i < hanichs.length; i++)
		{
			if(hanichs[i].justicePointsT < minimum && !hanichs[i].hasServed)
			{
				minimum = hanichs[i].justicePointsT;
				servers[f] = hanichs[i];
			}
		}
		
		servers[f].hasServed = true;
	}
	
	return servers;
}


function removeUnable(hanichs, day, hour, toranut)
{
	let hanichsLeft = [];
	for(i = 0; i < hanichs.length; i++)
	{
		let hanich = hanichs[i];
		let unables = hanich.hoursUnable;
		let remove = false;
		for(j = 0; j < unables.length; j++)
		{
			unable = unables[j];
			dayUnable = translateDay(unable.substring(0, 3));
			hourUnable = parseInt(unable.substring(3,5)) / 2;
			if(dayUnable == day && hourUnable == hour) { remove = true; break; }
		}
		
		if(!remove && !(!toranut && hanich.hasKept) && !(toranut && hanich.hasServed)) hanichsLeft.push(hanich);
	}
	return hanichsLeft;
}


function removeDisabled(hanichs, day, hour, toranut)
{
	let hanichsLeft = [];
	for(let i = 0; i < hanichs.length; i++)
	{
		let hanich = hanichs[i];
		let remove = false;
		
		for(let j = 0; j < disabledTimeslots.length; j++)
		{
			disabledTimeslot = disabledTimeslots[j];
			if(disabledTimeslot.day == day && disabledTimeslot.index == hour && disabledTimeslot.toranut == toranut && disabledTimeslot.hanichName == hanich.fullName) { remove = true; break; }
		}
		
		if(!remove) hanichsLeft.push(hanich);
	}
	return hanichsLeft;
}


function checkIfAble(hanich, day, hour)
{
	let ables = hanich.hoursAble;
	let isAble = false;
	for(let i = 0; i < ables.length; i++)
	{
		let able = ables[i];
		let dayAble = translateDay(unable.substring(0, 3));
		let hourAble = parseInt(unable.substring(3,5)) / 2;
		if(dayAble == day && hourAble == hour) { isAble = true; break; }
	}
	return isAble;
}


function removeBusy(hanichs, day, hour)
{
	var nonBusy = [];
	var hanichsLeft = [];
	
	if(day == 5 || hour > 9 || hour < 4 || hanichs.length == 0 || !document.getElementById("checkAcademy").checked)
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
	if(nonBusy.length == 0)	{ alert("Error: Incorrect grade on " + detranslateDay(day) + ", " + detranslateHour(hour) + ", for " + ((sortingToranut) ? "Toranut" : "Rashmash")); error = true; }
	
	for(k = 0; k < hanichs.length; k++)
	{
		hanich = hanichs[k];
		if(nonBusy.includes(hanich.department) || (hanich.arabist && nonBusy.includes("arab")) || (hanich.kamat && nonBusy.includes("kamat")) || checkIfAble(hanich, day, hour))
			hanichsLeft.push(hanich);
	}
	
	return hanichsLeft;
	
}


function removeNotBusy(hanichs, day, hour)
{
	var nonBusy = [];
	var hanichsLeft = [];
	
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
	
	for(k = 0; k < hanichs.length; k++)
	{
		hanich = hanichs[k];
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
	case 12:	return "כונן יום";
	case 13:	return "כונן לילה";
	case 14:	return "קצינת\"ו";
	}
}
