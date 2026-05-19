const display = document.getElementById("display");

const buttons =
  document.querySelectorAll(".buttons button");

const historyList =
  document.getElementById("historyList");

const clearHistoryBtn =
  document.getElementById("clearHistory");

let currentInput = "";

/* Update Display */

function updateDisplay(){

  display.value = currentInput || "0";

}

/* Add History */

function addToHistory(expression, result){

  const li = document.createElement("li");

  li.classList.add("history-item");

  li.innerHTML = `
    <div class="history-expression">
      ${expression}
    </div>

    <div class="history-result">
      = ${result}
    </div>
  `;

  historyList.prepend(li);

  saveHistory();

}

/* Save History */

function saveHistory(){

  localStorage.setItem(
    "calculatorHistory",
    historyList.innerHTML
  );

}

/* Load History */

function loadHistory(){

  const savedHistory =
    localStorage.getItem("calculatorHistory");

  if(savedHistory){

    historyList.innerHTML = savedHistory;

  }

}

/* Calculate */

function calculate(){

  try{

    const expression = currentInput;

    let result = eval(
      currentInput.replace(/%/g,"/100")
    );

    if(result === Infinity || isNaN(result)){

      display.value = "Error";
      currentInput = "";
      return;

    }

    addToHistory(expression,result);

    currentInput = result.toString();

    updateDisplay();

  }

  catch(error){

    display.value = "Error";
    currentInput = "";

  }

}

/* Button Click Events */

buttons.forEach(button => {

  button.addEventListener("click", () => {

    const value = button.textContent;

    if(value === "C"){

      currentInput = "";
      updateDisplay();

    }

    else if(value === "DEL"){

      currentInput =
        currentInput.slice(0,-1);

      updateDisplay();

    }

    else if(value === "="){

      calculate();

    }

    else{

      currentInput += value;

      updateDisplay();

    }

  });

});

/* Keyboard Support */

document.addEventListener("keydown",(e)=>{

  const key = e.key;

  const allowedKeys = [
    "0","1","2","3","4",
    "5","6","7","8","9",
    "+","-","*","/",
    "%",".","(",")"
  ];

  if(allowedKeys.includes(key)){

    currentInput += key;

    updateDisplay();

  }

  else if(key === "Enter"){

    calculate();

  }

  else if(key === "Backspace"){

    currentInput =
      currentInput.slice(0,-1);

    updateDisplay();

  }

  else if(key === "Escape"){

    currentInput = "";

    updateDisplay();

  }

});

/* Clear History */

clearHistoryBtn.addEventListener("click",()=>{

  historyList.innerHTML = "";

  localStorage.removeItem(
    "calculatorHistory"
  );

});

/* Load History */

loadHistory();