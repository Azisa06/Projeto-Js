const app = document.getElementById("app");

// Container da calculadora
const calc = document.createElement("div");
calc.style.backgroundColor = "black";
calc.style.padding = "20px";
calc.style.borderRadius = "30px";
calc.style.display = "flex";
calc.style.flexDirection = "column";
calc.style.alignItems = "center";
calc.style.boxShadow = "0 0 20px rgba(0,0,0,0.3)";
app.appendChild(calc);

// Display
const display = document.createElement("div");
display.innerText = "0";
display.style.color = "white";
display.style.fontSize = "64px";
display.style.width = "100%";
display.style.textAlign = "right";
display.style.marginBottom = "20px";
display.style.padding = "10px";
display.style.boxSizing = "border-box";
calc.appendChild(display);

// Grid de botões
const buttons = document.createElement("div");
buttons.style.display = "grid";
buttons.style.gridTemplateColumns = "repeat(4, 60px)";
buttons.style.gridGap = "10px";
buttons.style.justifyContent = "center";
calc.appendChild(buttons);

// Botões
const buttonLabels = [
  "AC", "+/-", "%", "÷",
  "7", "8", "9", "×",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ",", "="
];

let current = "";
let operator = null;
let previous = "";

function updateDisplay() {
  display.innerText = current || "0";
}

function calculate() {
  const a = parseFloat(previous);
  const b = parseFloat(current);
  if (isNaN(a) || isNaN(b)) return;

  switch (operator) {
    case "+": current = (a + b).toString(); break;
    case "-": current = (a - b).toString(); break;
    case "×": current = (a * b).toString(); break;
    case "÷": current = (b !== 0) ? (a / b).toString() : "Erro"; break;
  }

  operator = null;
  previous = "";
}

// Criar botões
buttonLabels.forEach((text) => {
  const btn = document.createElement("button");
  btn.innerText = text;
  btn.style.height = "60px";
  btn.style.border = "none";
  btn.style.borderRadius = "50%";
  btn.style.fontSize = "24px";
  btn.style.fontWeight = "normal";
  btn.style.fontFamily = "Arial, sans-serif";
  btn.style.display = "flex";
  btn.style.alignItems = "center";
  btn.style.justifyContent = "center";
  btn.style.cursor = "pointer";
  btn.style.transition = "all 0.15s ease";
  btn.style.color = "white";

  if (["AC", "+/-", "%"].includes(text)) {
    btn.style.backgroundColor = "#a5a5a5";
    btn.style.color = "black";
  } else if (["÷", "×", "-", "+", "="].includes(text)) {
    btn.style.backgroundColor = "#ff9500";
  } else {
    btn.style.backgroundColor = "#333333";
  }

  // Botão "0" ocupa duas colunas
  if (text === "0") {
    btn.style.gridColumn = "span 2";
    btn.style.borderRadius = "30px"; // para manter o visual arredondado horizontal
    btn.style.justifyContent = "flex-start";
    btn.style.paddingLeft = "20px";
    btn.style.width = "100%";
  } else {
    btn.style.width = "60px";
  }

  // Animação de clique
  btn.addEventListener("mousedown", () => {
    btn.style.transform = "scale(0.95)";
    btn.style.boxShadow = "inset 0 0 8px rgba(0,0,0,0.4)";
  });
  btn.addEventListener("mouseup", () => {
    btn.style.transform = "scale(1)";
    btn.style.boxShadow = "none";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
    btn.style.boxShadow = "none";
  });

  // Ações dos botões
  btn.addEventListener("click", () => {
    if (!isNaN(text)) {
      current += text;
    } else if (text === "AC") {
      current = "";
      previous = "";
      operator = null;
    } else if (text === "+/-") {
      current = current ? (parseFloat(current) * -1).toString() : "";
    } else if (text === "%") {
      current = current ? (parseFloat(current) / 100).toString() : "";
    } else if (text === ",") {
      if (!current.includes(".")) {
        current += current ? "." : "0.";
      }
    } else if (text === "=") {
      calculate();
    } else if (["÷", "×", "-", "+"].includes(text)) {
      if (current) {
        if (previous) calculate();
        previous = current;
        current = "";
      }
      operator = text;
    }

    updateDisplay();
  });

  buttons.appendChild(btn);
});

updateDisplay();
