//Riku Anttila

function check(checkDate, calculateAge, findSex, calculateCheckMark) {
	const errorlength = "Id code must have 11 characters";
	const errornumbers = "Id code must have 6 numbers at first";
	const errorcentury = "The century mark must be +, - or A";
	const errororder = "Order number must be a number";
	

	document.getElementById("error").innerHTML = "";
	document.getElementById("age").innerHTML = "";
	document.getElementById("sex").innerHTML = "";
	document.getElementById("result").innerHTML = "";

	const id = document.getElementById("idcode").value;
	let idNumber = id.substring(0, 6);
	let centuryMark = id.charAt(6);
	let orderNumber = parseInt(id.substring(9));
	let nnn = id.substring(7, 10);

	
	const message = checkDate(idNumber, centuryMark);
	
	if (id.length !== 11) {
		document.getElementById("error").innerHTML = errorlength;
	} else if (isNaN(idNumber)) {
		document.getElementById("error").innerHTML = errornumbers;
	} else if (centuryMark !== '+' && centuryMark !== '-' && centuryMark !== 'A' && centuryMark !== 'a') {
		document.getElementById("error").innerHTML = errorcentury;
	} else if (isNaN(orderNumber)) {
		document.getElementById("error").innerHTML = errororder;
	} else if (message !== "") {
		document.getElementById("error").innerHTML = message;
	} else {
		
		const age = calculateAge(idNumber, centuryMark);
		document.getElementById("age").innerHTML = age;
		const sex = findSex(id);
		document.getElementById("sex").innerHTML = sex;

		let controlChar = calculateCheckMark(idNumber, nnn);
		let lastChar = id.charAt(10);
		if (controlChar === lastChar) {
			document.getElementById("result").innerHTML = "Identification code is right.";
		} else {
			document.getElementById("result").innerHTML = "Identification code is not right. Calculated control character is " + controlChar;
		}
	}


/** 
 * Checks that the given date is right. Returns an error message or empty string which means that the date is right.
 * 
 * @param {string} value - the date as format ddmmyy.
 * @param {string} century - is + - or A.
 * @returns {string} - an error message or empty string.
 */
function checkDate(value, century) {
	const dayerror = "Day must be 1 ... 31";
	const montherror = "Month must be 1 ... 12";
	const yearerror = "Year is too big";

	const dayvalue = value.substring(0, 2);
	const monthvalue = value.substring(2, 4);
	let yearvalue = parseInt(value.substring(4, 6));

	if (dayvalue > 31) {
		return dayerror;
	} else if (monthvalue > 12) {
		return montherror;
	} else if (century === 'A' || century === "a") {
		yearvalue += 2000;
	}

	const currentYear = new Date().getFullYear();
	if (yearvalue > currentYear) {
		return yearerror;
	}

	return "";
}


/**
 * Calculates person's age based on a year.
 * 
 * @param {string} value    the date as format ddmmyy
 * @param {string} century  is + - or A
 * @returns {number}        the calculated age
 */

function calculateAge(value, century) {

	let day = parseInt(value.substring(0, 2));
	let month = parseInt(value.substring(2, 4));
	let year = parseInt(value.substring(4, 6));

	if (century === "A" || century === "a") {
		year += 2000;
	} else if (century === "-") {
		year += 1900;
	} else if (century === "+") {
		year += 1800;
	}
	let dob = new Date(year, month - 1, day);
	let ageDiffMs = Date.now() - dob.getTime();
	let ageDate = new Date(ageDiffMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}
/**
 * Finds out the sex of a person
 * @param {string} value    order number in the personal identification code
 * @returns {string}        female or male
 */

function findSex(value) {
	let orderNumber = parseInt(value.substring(7, 10));
	if (orderNumber % 2 === 0) {
		return "female";
	} else {
		return "male";
	}
}


/**
 * Calculates the control character of the personal identification code.
 * 
 * @param {string} value1 Ddmmyy part of the identification code
 * @param {string} value2 Order number part of the identification code
 * @returns {string}      Calculated control character
 */


function calculateCheckMark(value1, value2) {

	let checkMarks = "0123456789ABCDEFHJKLMNPRSTUVWXY";
	let ddnnyy = value1.toString(0, 6);
	let nnn = value2.toString(7, 9);
	let combined = ddnnyy + nnn;

	let remainder = parseInt(combined) % 31;
	let controlChar = checkMarks.charAt(remainder);
	return controlChar;


}
}