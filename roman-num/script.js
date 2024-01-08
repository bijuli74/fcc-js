const input = document.getElementById("number");
const button = document.getElementById("convert-btn");
const output = document.getElementById("output");

const mp = { 1: "I", 4: "IV", 5: "V", 9: "IX", 10: "X", 40: "XL", 50: "L", 90: "XC", 100: "C", 400: "CD", 500: "D", 900: "CM", 1000: "M" };

function romanNoConverter() {
  const inputStr = input.value;
  if (inputStr.trim() === "") {
    output.textContent = "Please enter a valid number";
    return;
  }

  var n = parseInt(inputStr);

  if (n < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    return;
  }

  if (n >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
    return;
  }

  var ans = "";
  for (let D = 1000; D > 0; D = Math.floor(D / 10)) {
    let Q = Math.floor(n / D);
    n = n % D;
    if (Q === 0) {
      continue;
    }
    if (Q < 4) {
      for (let i = 0; i < Q; i++) {
        ans += mp[D];
      }
    } else if (Q === 4) {
      ans += mp[Q * D];
    } else if (Q === 5) {
      ans += mp[Q * D];
    } else if (Q > 5 && Q < 9) {
      ans += mp[5 * D];
      for (let i = 0; i < Q - 5; i++) {
        ans += mp[D];
      }
    } else {
      ans += mp[Q * D];
    }
  }

  output.textContent = ans;
  return;

}

button.addEventListener("click", romanNoConverter);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    romanNoConverter();
  }
})
