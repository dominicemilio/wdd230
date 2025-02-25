// ------ CHECK RE-ENTERED PASSWORD ------
const pw1 = document.querySelector("#password");
const pw2 = document.querySelector("#password2");
const message = document.querySelector("#match-msg");

// pw1.addEventListener("focusout", checkSame);
pw2.addEventListener("focusout", checkSame);
// pw2.addEventListener("input", checkSame);

function checkSame() {
	if (pw1.value !== pw2.value) {
		message.style.opacity = "1";
		pw2.style.backgroundColor = "#fff0f3";
		pw1.value = "";
		pw2.value = "";
		pw1.focus();
	} else {
		message.style.opacity = "0";
		pw2.style.backgroundColor = "#0000001a";
		pw2.style.color = "#555";
	}
}



// ------ DISPLAY RATING VALUE ------
const rangevalue = document.querySelector("#rangevalue");
const range = document.querySelector("#ratingRange");

// RANGE event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalue.innerHTML = range.value;
}