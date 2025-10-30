 const previous = document.getElementById("previous");
  const current = document.getElementById("current");
  const numButtons = document.querySelectorAll("[data-num]");
  const opButtons = document.querySelectorAll("[data-op]");
  const clearBtn = document.getElementById("clear");
  const equalsBtn = document.getElementById("equals");
  const signBtn = document.getElementById("sign");
  const percentBtn = document.getElementById("percent");

  let curr = "";
  let prev = "";
  let op = null;

  function updateDisplay() {
    current.textContent = curr || "0";
    previous.textContent = prev + (op || "");
  }

  numButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.dataset.num === "." && curr.includes(".")) return;
      curr += button.dataset.num;
      updateDisplay();
    });
  });

  opButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (curr === "") return;
      if (prev !== "") calculate();
      op = button.dataset.op;
      prev = curr;
      curr = "";
      updateDisplay();
    });
  });

  equalsBtn.addEventListener("click", () => {
    calculate();
    updateDisplay();
  });

  clearBtn.addEventListener("click", () => {
    curr = "";
    prev = "";
    op = null;
    updateDisplay();
  });

  signBtn.addEventListener("click", () => {
    if (curr === "") return;
    curr = (parseFloat(curr) * -1).toString();
    updateDisplay();
  });

 percentBtn.addEventListener("click", () => {
  if (curr === "") return;

  const currentValue = parseFloat(curr);
  let newValue;

  // If there's a previous number and an operation (like 100 - 10%)
  if (prev !== "" && op !== null) {
    newValue = (parseFloat(prev) * currentValue) / 100;
  } else {
    // If just pressing %, e.g. 50% => 0.5
    newValue = currentValue / 100;
  }

  curr = newValue.toString();
  updateDisplay();
});


  function calculate() {
    if (op === null || curr === "" || prev === "") return;
    let result;
    const a = parseFloat(prev);
    const b = parseFloat(curr);
    switch (op) {
      case "+": result = a + b; break;
      case "-": result = a - b; break;
      case "*": result = a * b; break;
      case "/": result = a / b; break;
      default: return;
    }
    curr = result.toString();
    prev = "";
    op = null;
  }

  updateDisplay();


  console.log("If you see this, Star this Repository <3");
  console.log("github --> dionsh");