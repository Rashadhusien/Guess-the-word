// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By <a href='mailto: rashadhusein440@gmail.com'>Rashad</a> from <a href="https://elzero.org" target="_blank">Elzero</a>`;

// Setting Game Options
let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 3;

let wordToGuess = "";
const words = [
  "mariem",
  "kaream",
  "yousif",
  "zeinab",
  "Husien",
  "Rashad",
  "Elzero",
  "jasmin",
  "seif",
  "arwa",
  "mohamed",
  "ehab",
  "shehab",
  "amr",
  "eslam",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGuess);

let messageArea = document.querySelector(".message");
// manage Hints
document.querySelector(`.hint span`).innerHTML = numberOfHints;

const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInputs() {
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    // Create Inputs
    for (let j = 1; j <= wordToGuess.length; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  // Focus On First Input In First Try Element
  inputsContainer.children[0].children[1].focus();

  // Disable All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    // Convert Inputs to UpperCase
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      // console.log(index);
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target); // Or this
      // console.log(currentIndex);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

// console.log(wordToGuess); ////////////////////////////////////////////

function handleGuesses() {
  let successGuess = true;
  // console.log(wordToGuess);
  for (let i = 1; i <= wordToGuess.length; i++) {
    const inputFeild = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    let letter = inputFeild.value.toLowerCase();
    const actuallLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === actuallLetter) {
      // Letter is correct and in place
      inputFeild.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      // letter is correct and Not in place
      inputFeild.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputFeild.classList.add("no");
      successGuess = false;
    }
  }

  // Check If User Win Or Lose
  if (successGuess) {
    messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;

    let btnPlayAgain = document.querySelector(".wincountainer .playagain");

    btnPlayAgain.classList.add("show");

    btnPlayAgain.addEventListener("click", () => {
      window.location.reload();
    });

    if (numberOfHints === 3) {
      messageArea.innerHTML = `<p>Congratzz You Win Without Using Hints</p>`;
    }
    // add disabled class on all try divs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    let input = document.querySelectorAll(`.try-${currentTry} > input`);
    input.forEach((el) => (el.disabled = true));

    // disable guess button
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInput = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInput.forEach((input) => (input.disabled = true));
    currentTry++;

    const nextTryInput = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInput.forEach((inputs) => (inputs.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }

  const enableInputs = document.querySelectorAll(`input:not([disabled])`);
  // console.log(enableInputs)
  const emptyEnableInputs = Array.from(enableInputs).filter(
    (input) => input.value === ""
  );
  // console.log(emptyEnableInputs);

  if (emptyEnableInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnableInputs.length);
    const randomInput = emptyEnableInputs[randomIndex];
    const indexToFill = Array.from(enableInputs).indexOf(randomInput);
    console.log(randomIndex);
    console.log(randomInput);
    console.log(indexToFill);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

function handleBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    // console.log(currentIndex);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}
document.addEventListener("keydown", handleBackSpace);

document.addEventListener("keypress", enter);
function enter(event) {
  if (event.key === "Enter") {
    handleGuesses();
  }
}

window.onload = function () {
  generateInputs();
};
