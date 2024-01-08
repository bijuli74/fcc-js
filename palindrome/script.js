const button = document.getElementById("check-btn");

function checkPalindrome() {

  var inputStr = document.getElementById("text-input").value;

  if (inputStr.trim() === "") {
    alert("Please input a value");
    return;
  }

  const regex = /[^A-Za-z0-9]/g;
  var cleanStr = inputStr.replace(regex, "").toLowerCase();
  var isPalindrome = cleanStr === cleanStr.split("").reverse().join("");

  var outputEle = document.getElementById("result");
  if (isPalindrome) {
    outputEle.textContent = inputStr + " is a palindrome";
  } else {
    outputEle.textContent = inputStr + " is not a palindrome";
  }
}

button.addEventListener("click", checkPalindrome);

