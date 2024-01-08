const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const div = document.getElementById("results-div");

function checkPhoneNo() {
  var inputStr = input.value;
  console.log(inputStr);

  if (inputStr.trim() === "") {
    alert("Please provide a phone number");
    return;
  }

  const countryCode = '^(1\\s?)?';
  const areaCode = '(\\([0-9]{3}\\)|[0-9]{3})';
  const spacesDashes = '[\\s\\-]?';
  const phoneNo = '[0-9]{3}[\\s\\-]?[0-9]{4}$';
  const phoneRegex = new RegExp(`${countryCode}${areaCode}${spacesDashes}${phoneNo}`);

  if (phoneRegex.test(inputStr)) {
    div.textContent = "Valid US number: " + inputStr;
  } else {
    div.textContent = "Invalid US number: " + inputStr;
  }

  // const regex = /[^0-9]/g;
  // var phoneNo = inputStr.replace(regex, "");
  // console.log(phoneNo);
  //
  // const len = phoneNo.length;
  // if (len > 11 || len < 10 || isNaN(inputStr[0])) {
  //   div.textContent = "Invalid US number: " + inputStr;
  //   return;
  //
  // } else if (len == 11) {
  //   if (phoneNo[0] != "1") {
  //     div.textContent = "Invalid US number: " + inputStr;
  //     return;
  //   } else {
  //     div.textContent = "Valid US number: " + inputStr;
  //     return;
  //   }
  //
  // } else {
  //   div.textContent = "Valid US number: " + inputStr;
  //   return;
  // }
}
//edge cases: 555)-555-5555 55, 55-55-555-5, 555)5(55?)-5555
checkBtn.addEventListener("click", checkPhoneNo);
clearBtn.addEventListener("click", () => {
  div.textContent = "";
})
