const parent = document.createElement("div");
parent.className = "doc";
const container = document.createElement("div");
container.className = "container";
const textdiv = document.createElement("div");
textdiv.className = "textarea_wrapper";
const textarea = document.createElement("textarea");
textarea.className = "textarea";
textarea.placeholder = "Для переключения языка используйте Shift и Alt;Для ";
textarea.id = "textarea_value";
const keyboard = document.createElement("div");
keyboard.className = "keyboard";
const rows = document.getElementsByClassName("row");
document.body.appendChild(parent);
parent.appendChild(container);
container.appendChild(textdiv);
textdiv.appendChild(textarea);
container.appendChild(keyboard);
textarea.focus();

keyboard.innerHTML = "<div class='row'></div>".repeat(5);

rows[0].innerHTML = "<div class='key key1'></div>".repeat(14);
rows[1].innerHTML = "<div class='key key2'></div>".repeat(15);
rows[2].innerHTML = "<div class='key key3'></div>".repeat(13);
rows[3].innerHTML = "<div class='key key4'></div>".repeat(14);
rows[4].innerHTML = "<div class='key key5'></div>".repeat(9);

const keys = document.getElementsByClassName("key");
const eng = [["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"], ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "|", "DEL"], ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ENTER"], ["Shift", "|", "Z", "X", "C", "V", "B", "N", "M", ".", ",", "/", "▴", "Shift"], ["Ctrl", "Win", "Alt", "", "Alt", "Ctrl", "◂", "▾", "▸"]];
const rus = [["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"], ["Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "|", "DEL"], ["Caps Lock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "ENTER"], ["Shift", "|", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "/", "▴", "Shift"], ["Ctrl", "Win", "Alt", "", "Alt", "Ctrl", "◂", "▾", "▸"]];

let lang = localStorage.getItem("lang") || "eng";
function renderLang() {
  return lang = (lang === "eng") ? eng : rus;
}

function renderKey(arr) {
  textarea.focus();
  const key1 = document.getElementsByClassName("key1");
  for (let i = 0; i < key1.length; i++) {
    key1[i].id = arr[0][i];
    key1[i].innerHTML = arr[0][i];
  }
  const key2 = document.getElementsByClassName("key2");
  for (let i = 0; i < key2.length; i++) {
    key2[i].id = arr[1][i];
    key2[i].innerHTML = arr[1][i];
  }

  const key3 = document.getElementsByClassName("key3");
  for (let i = 0; i < key3.length; i++) {
    key3[i].id = arr[2][i];
    key3[i].innerHTML = arr[2][i];
  }

  const key4 = document.getElementsByClassName("key4");
  for (let i = 0; i < key4.length; i++) {
    key4[i].id = arr[3][i];
    key4[0].id = "shift_left";
    key4[13].id = "shift_right";
    key4[i].innerHTML = arr[3][i];
  }

  const key5 = document.getElementsByClassName("key5");
  for (let i = 0; i < key5.length; i++) {
    key5[i].id = arr[4][i];
    key5[3].id = "space";
    key5[0].id = "ctrl_left";
    key5[5].id = "ctrl_right";
    key5[2].id = "alt_left";
    key5[4].id = "alt_right";
    key5[i].innerHTML = arr[4][i];
  }

  const sup1 = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", ""];
  for (let i = 0; i < key1.length; i++) {
    const sup = document.createElement("sup");
    sup.className = "sup";
    sup.id = sup1[i];
    key1[i].appendChild(sup);
    sup.innerHTML = sup1[i];
  }
}
renderKey(renderLang());

function Fbackspace() {
  const textarea = document.getElementById("textarea_value");
  const selected = [textarea.selectionEnd, textarea.selectionStart];
  const isSelected = Boolean(selected[0] - selected[1]);
  if (isSelected) {
    textarea.focus();
    textarea.value = textarea.value.slice(0, selected[1]) + textarea.value.slice(selected[0]);
    return;
  }

  textarea.focus();
  const value_length = textarea.value.length;
  const value_start = 1;
  const value_new = value_length - value_start;
  textarea.value = textarea.value.slice(0, value_new);

  textarea.selectionStart = selected[1] - 1;
  textarea.selectionEnd = textarea.selectionStart;
}
const backspace = document.getElementById("Backspace");
backspace.addEventListener("click", Fbackspace);

function Fdelete() {
  const textarea = document.getElementById("textarea_value");
  const selected = [textarea.selectionEnd, textarea.selectionStart];
  const isSelected = Boolean(selected[0] - selected[1]);
  if (isSelected) {
    textarea.value = textarea.value.slice(0, selected[1] - 1) + textarea.value.slice(selected[1], selected[0]);
    textarea.selectionStart = selected[1];
    textarea.selectionEnd = textarea.selectionStart;
    return;
  }
  if (textarea.value) {
    textarea.value = textarea.value.slice(0, selected[1] - 1) + textarea.value.slice(selected[0], textarea.value.length);
  }

  textarea.selectionStart = selected[1] - 1;
  textarea.selectionEnd = textarea.selectionStart;
}
const del = document.getElementById("DEL");
del.addEventListener("click", Fdelete);

function Fspace() {
  const textarea = document.getElementById("textarea_value");
  const selected = [textarea.selectionEnd, textarea.selectionStart];
  textarea.focus();
  textarea.value = `${textarea.value.slice(0, selected[1])} ${textarea.value.slice(selected[0])}`;
  textarea.selectionStart = selected[1] + 1;
  textarea.selectionEnd = textarea.selectionStart;
}
const space = document.getElementById("space");
space.addEventListener("click", Fspace);

function Ftab() {
  const textarea = document.getElementById("textarea_value");
  const selected = [textarea.selectionEnd, textarea.selectionStart];
  textarea.focus();
  textarea.value = `${textarea.value.slice(0, selected[1])}\t${textarea.value.slice(selected[0])}`;
  textarea.selectionStart = selected[1] + 4;
  textarea.selectionEnd = textarea.selectionStart;
}
const tab = document.getElementById("Tab");
tab.addEventListener("click", Ftab);

function Fenter() {
  const textarea = document.getElementById("textarea_value");
  const selected = [textarea.selectionEnd, textarea.selectionStart];
  textarea.focus();
  textarea.value = `${textarea.value.slice(0, selected[1])}\n${textarea.value.slice(selected[0])}`;
}

const enter = document.getElementById("ENTER");
enter.addEventListener("click", Fenter);

const capslock = document.getElementById("Caps Lock");
capslock.addEventListener("click", () => {
  capslock.classList.toggle("active");
  capslock.classList.contains("active") ? capslock.style.backgroundColor = "brown" : capslock.style.backgroundColor = "black";
});

const shift_left = document.getElementById("shift_left");
shift_left.addEventListener("click", () => {
  shift_left.classList.toggle("active");
});
const shift_right = document.getElementById("shift_right");
shift_right.addEventListener("click", () => {
  shift_right.classList.toggle("active");
});

const ctrl_left = document.getElementById("ctrl_left");
ctrl_left.addEventListener("click", () => {
  ctrl_left.classList.toggle("active");
});
const ctrl_right = document.getElementById("ctrl_right");
ctrl_right.addEventListener("click", () => {
  ctrl_right.classList.toggle("active");
});

const alt_left = document.getElementById("alt_left");
alt_left.addEventListener("click", () => {
  alt_left.classList.toggle("active");
});
const alt_right = document.getElementById("alt_right");
alt_right.addEventListener("click", () => {
  alt_right.classList.toggle("active");
});

function Faddletter(e) {
  const textarea = document.getElementById("textarea_value");
  const id = e.target.getAttribute("id");
  const selected = [textarea.selectionEnd, textarea.selectionStart];
  textarea.focus();
  textarea.value = textarea.value.slice(0, selected[1]) + (capslock.classList.contains("active") || shift_right.classList.contains("active") || shift_left.classList.contains("active") ? ((id == "`" || id == "1" || id == "2" || id == "3" || id == "4" || id == "5" || id == "6" || id == "7" || id == "8" || id == "9" || id == "0" || id == "-" || id == "=") ? document.getElementById(id).querySelector("sup").getAttribute("id") : id.toUpperCase()) : id.toLowerCase()) + textarea.value.slice(selected[0]);
  shift_left.classList.remove("active");
  shift_right.classList.remove("active");
  textarea.selectionStart = selected[1] + 1;
  textarea.selectionEnd = textarea.selectionStart;
  (ctrl_left.classList.contains("active") || ctrl_right.classList.contains("active")) && id == "A" ? textarea.select() : null;
  ctrl_left.classList.remove("active");
  ctrl_right.classList.remove("active");
}
for (let i = 0; i < 65; i++) {
  keys[i].addEventListener("click", Faddletter);
  [keys[13], keys[14], keys[28], keys[29], keys[41], keys[42], keys[54], keys[55], keys[56], keys[57], keys[58], keys[59], keys[60], keys[61], keys[62], keys[63], keys[64]].map((item) => item.removeEventListener("click", Faddletter));
}

function ArrowLeft() {
  const textarea = document.getElementById("textarea_value");
  const selected = [textarea.selectionEnd, textarea.selectionStart];
  textarea.focus();
  textarea.selectionStart = selected[1] - 1;
  textarea.selectionEnd = textarea.selectionStart;
}
const arrowleft = document.getElementById("◂");
arrowleft.addEventListener("click", ArrowLeft);

function ArrowRigth() {
  const textarea = document.getElementById("textarea_value");
  const selected = [textarea.selectionEnd, textarea.selectionStart];
  textarea.focus();
  textarea.selectionStart = selected[1] + 1;
  textarea.selectionEnd = textarea.selectionStart;
}
const arrowrigth = document.getElementById("▸");
arrowrigth.addEventListener("click", ArrowRigth);

function FgetArrayStrings() {
  let value = textarea.value.split("\n");
  value = value.map((item) => item += " ");
  const result = [];
  for (let i = 0; i < value.length; i++) {
    if (value[i].length <= 142) {
      result.push(value[i]);
    } else {
      const string = value[i].slice(0, 148);
      const other = value[i].slice(148);
      result.push(string);
      value[i] = other;
      i--;
    }
  }
  return result;
}

function FgetInfoAboutCursor(textArray) {
  const CursorPositionInAllStrings = textarea.selectionStart + 1;
  let NumberStringWithCursor = 0;
  let sumElemInStrings = 0;
  let CountCursorInStringsPrevCurrent = 0;
  let AllCountsCursorInTextarea = 0;
  for (let i = 0; i < textArray.length; i++) {
    sumElemInStrings += textArray[i].length;
    if (sumElemInStrings >= CursorPositionInAllStrings) {
      NumberStringWithCursor = i + 1;
      break;
    }
  }

  if (CursorPositionInAllStrings > textArray[0].length) {
    for (let i = 0; i < NumberStringWithCursor - 1; i++) {
      CountCursorInStringsPrevCurrent += textArray[i].length;
    }
  } else {
    CountCursorInStringsPrevCurrent = "Start";
  }

  if (NumberStringWithCursor < textArray.length) {
    for (let i = 0; i < NumberStringWithCursor + 1; i++) {
      AllCountsCursorInTextarea += textArray[i].length;
    }
  } else {
    AllCountsCursorInTextarea = "End";
  }

  const posInCurrString = (CursorPositionInAllStrings > textArray[0].length) ? CursorPositionInAllStrings - CountCursorInStringsPrevCurrent : CursorPositionInAllStrings;
  return {
    position: CursorPositionInAllStrings,
    curentString: NumberStringWithCursor,
    symbolsInPreviousStrings: CountCursorInStringsPrevCurrent,
    symbolsInNextString: AllCountsCursorInTextarea,
    positionInCurrentString: posInCurrString,
  };
}

function ArrowUp() {
  textarea.focus();
  const textArray = FgetArrayStrings();
  const caretInfo = FgetInfoAboutCursor(textArray);
  if (caretInfo.symbolsInPreviousStrings === "Start") {
    return;
  }
  const symbolsInTargetString = textArray[caretInfo.curentString - 2].length;
  if (symbolsInTargetString < caretInfo.positionInCurrentString) {
    textarea.selectionStart = caretInfo.symbolsInPreviousStrings - 1;
  } else {
    textarea.selectionStart = caretInfo.symbolsInPreviousStrings - 1 - symbolsInTargetString + caretInfo.positionInCurrentString;
  }
  textarea.selectionEnd = textarea.selectionStart;
}
const arrowup = document.getElementById("▴");
arrowup.addEventListener("click", ArrowUp);

function ArrowDown() {
  textarea.focus();
  const textArray = FgetArrayStrings();
  const caretInfo = FgetInfoAboutCursor(textArray);
  if (caretInfo.symbolsInNextString === "End") {
    return;
  }
  const symbolsInTargetString = textArray[caretInfo.curentString].length;
  if (symbolsInTargetString < caretInfo.positionInCurrentString) {
    textarea.selectionStart = caretInfo.symbolsInNextString - 1;
  } else {
    textarea.selectionStart = caretInfo.symbolsInNextString - 1 - symbolsInTargetString + caretInfo.positionInCurrentString;
  }
  textarea.selectionEnd = textarea.selectionStart;
}
const arrowdown = document.getElementById("▾");
arrowdown.addEventListener("click", ArrowDown);

const letterKeys = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "Metaleft"];
const arrr = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "|", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Z", "X", "C", "V", "B", "N", "M", ".", ",", "/", "Win"];
const arrr2 = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "|", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "/", "Win"];


document.onkeydown = function (e) {
  const selected = [textarea.selectionEnd, textarea.selectionStart];
  for (let i = 0; i < letterKeys.length; i++) {
    if (e.code === `${letterKeys[i]}`) {
      if (lang == eng) {
        document.getElementById(`${arrr[i]}`).style.backgroundColor = "brown";
        document.getElementById(`${arrr[i]}`).classList.remove("__web-inspector-hide-shortcut__");
      }
      if (lang == rus) {
        document.getElementById(`${arrr2[i]}`).style.backgroundColor = "brown";
      }
    }
  }
  for (let i = 0; i < 13; i++) {
    if ((shift_left.classList.contains("active") || shift_right.classList.contains("active")) && e.code === `${letterKeys[i]}`) {
      const supid = document.getElementById(`${arrr2[i]}`).querySelector("sup").getAttribute("id");
      textarea.value = textarea.value.slice(0, selected[1]) + supid + textarea.value.slice(selected[0]);
      textarea.selectionStart = selected[1] + 1;
      textarea.selectionEnd = textarea.selectionStart;
      // shift_left.classList.remove("active");
      // shift_right.classList.remove("active")
    }
  }
  // ctrl_left.classList.contains("active")?e.code=="KeyA"?textarea.select():null:null;

  if (e.code === "Space") {
    const space = document.getElementById("space");
    space.addEventListener("click", Fspace);
    space.style.backgroundColor = "brown";
  }
  if (e.code === "Backspace") {
    const backspace = document.getElementById("Backspace");
    backspace.addEventListener("click", Fbackspace);
    backspace.style.backgroundColor = "brown";
  }
  if (e.code === "Delete") {
    // const del = document.getElementById("DEL"),
    del.addEventListener("click", Fdelete);
    del.style.backgroundColor = "brown";
  }
  if (e.code === "CapsLock") {
    // capslock.addEventListener("click",function(){
    capslock.classList.toggle("active");
    capslock.classList.contains("active") ? capslock.style.backgroundColor = "brown" : capslock.style.backgroundColor = "black";
    for (let i = 0; i < letterKeys.length; i++) {
      if (lang == eng) {
        if (e.code === `${letterKeys[i]}`) {
          capslock.classList.contains("active") ? document.getElementById(`${arrr[i]}`).toUpperCase() : document.getElementById(`${arrr[i]}`).toLowerCase();
          document.getElementById(`${arrr[i]}`).classList.remove("__web-inspector-hide-shortcut__");
        }
      }
      if (!lang == eng) {
        if (e.code === `${letterKeys[i]}`) {
          capslock.classList.contains("active") ? document.getElementById(`${arrr2[i]}`).toUpperCase() : document.getElementById(`${arrr2[i]}`).toLowerCase();
        }
      }
    }
  }
  if (e.code === "ShiftLeft") {
    const shift_left = document.getElementById("shift_left");
    shift_left.classList.toggle("active");
    shift_left.classList.contains("active") ? shift_left.style.backgroundColor = "brown" : shift_left.style.backgroundColor = "black";
  }

  if (e.code === "ShiftRight") {
    const shift_right = document.getElementById("shift_right");
    shift_right.classList.toggle("active");
    shift_right.style.backgroundColor = "brown";
  }

  if (e.code === "Enter") {
    const enter = document.getElementById("ENTER");
    enter.addEventListener("click", Fenter);
    enter.style.backgroundColor = "brown";
  }
  if (e.code === "Tab") {
    const tab = document.getElementById("Tab");
    tab.addEventListener("click", Ftab);
    tab.style.backgroundColor = "brown";
  }
  if (e.code === "ArrowUp") {
    const arrowup = document.getElementById("▴");
    arrowup.addEventListener("click", ArrowUp);
    arrowup.style.backgroundColor = "brown";
  }
  if (e.code === "ArrowDown") {
    const arrowdown = document.getElementById("▾");
    arrowdown.addEventListener("click", ArrowDown);
    arrowdown.style.backgroundColor = "brown";
  }
  if (e.code === "ArrowLeft") {
    const arrowleft = document.getElementById("◂");
    arrowleft.addEventListener("click", ArrowLeft);
    arrowleft.style.backgroundColor = "brown";
  }
  if (e.code === "ArrowRight") {
    const arrowrigth = document.getElementById("▸");
    arrowrigth.addEventListener("click", ArrowRigth);
    arrowrigth.style.backgroundColor = "brown";
  }
  if (e.code === "ControlLeft") {
    const ctrl_left = document.getElementById("ctrl_left");
    ctrl_left.classList.toggle("active");
    ctrl_left.classList.contains("active") ? ctrl_left.style.backgroundColor = "brown" : ctrl_left.style.backgroundColor = "black";
  }
  if (e.code === "ControlRight") {
    const ctrl_right = document.getElementById("ctrl_right");
    ctrl_right.classList.toggle("active");
    ctrl_right.classList.contains("active") ? ctrl_right.style.backgroundColor = "brown" : ctrl_right.style.backgroundColor = "black";
  }
  if (e.code === "AltLeft") {
    const alt_left = document.getElementById("alt_left");
    alt_left.classList.toggle("active");
    alt_left.classList.contains("active") ? alt_left.style.backgroundColor = "brown" : alt_left.style.backgroundColor = "black";
  }
  if (e.code === "AltRight") {
    const alt_right = document.getElementById("alt_right");
    alt_right.classList.toggle("active");
    alt_right.classList.contains("active") ? alt_right.style.backgroundColor = "brown" : alt_right.style.backgroundColor = "black";
    ctrl_left.classList.remove("active");
    ctrl_right.classList.remove("active");
  }
  if ((e.code === "AltLeft" || e.code === "AltRight") && (shift_left.classList.contains("active") || shift_right.classList.contains("active"))) {
    shift_left.classList.remove("active");
    ctrl_left.classList.remove("active");
    ctrl_right.classList.remove("active");
    ctrl_left.style.backgroundColor = "black";
    ctrl_right.style.backgroundColor = "black";
    alt_left.classList.remove("active");
    shift_right.classList.remove("active");
    alt_right.classList.remove("active");
    shift_right.classList.contains("active") ? shift_right.style.backgroundColor = "brown" : shift_right.style.backgroundColor = "black";
    shift_left.classList.contains("active") ? shift_left.style.backgroundColor = "brown" : shift_left.style.backgroundColor = "black";
    lang = (lang === eng) ? rus : eng;
    renderKey(lang);
  }
  if (lang == rus) {
    console.log(e.code);
    for (let i = 0; i < letterKeys.length; i++) {
      console.log(e.key);
      if (e.code == letterKeys[i]) {
        const id = letterKeys[i].getElementById("id");
        const selected = [textarea.selectionEnd, textarea.selectionStart];
        textarea.focus();
        textarea.value = (capslock.classList.contains("active") || shift_left.classList.contains("active") || shift_right.classList.contains("active")) ? arrr2[i].toUpperCase() : arrr2[i].toLowerCase();
        // textarea.selectionStart = selected[1]+1;
        // textarea.selectionEnd = textarea.selectionStart;
      }
    }
  }
};
document.onkeyup = function (e) {
  console.log(textarea.value);
  textarea.focus();
  const selected = [textarea.selectionEnd, textarea.selectionStart];
  for (let i = 0; i < 13; i++) {
    (shift_right.classList.contains("active") || shift_left.classList.contains("active") && e.code == letterKeys[i]) ? textarea.value = textarea.value.slice(0, selected[1] - 1) + textarea.value.slice(selected[0], textarea.value.length) : null;
    if (shift_right.classList.contains("active") || shift_left.classList.contains("active") && !e.code == letterKeys[i]) {
      shift_right.classList.remove("active"); shift_left.classList.remove("active");
    }
  }
  enter.style.backgroundColor = "black";
  tab.style.backgroundColor = "black";
  space.style.backgroundColor = "black";
  del.style.backgroundColor = "black";
  backspace.style.backgroundColor = "black";
  arrowdown.style.backgroundColor = "black";
  arrowup.style.backgroundColor = "black";
  arrowrigth.style.backgroundColor = "black";
  arrowleft.style.backgroundColor = "black";
  alt_left.style.backgroundColor = "black";
  alt_right.style.backgroundColor = "black";
  // shift_left.style.backgroundColor="black";
  // shift_right.style.backgroundColor="black";
  // ctrl_left.style.backgroundColor="black";
  // ctrl_right.style.backgroundColor="black";
  for (let i = 0; i < letterKeys.length; i++) {
    if (e.code === `${letterKeys[i]}`) {
      if (lang == eng) {
        document.getElementById(`${arrr[i]}`).style.backgroundColor = "black";
      }
      if (lang == rus) {
        document.getElementById(`${arrr2[i]}`).style.backgroundColor = "black";
      }
    }
  }
};

document.onclick = function (e) {
  textarea.focus();
  const keyid = e.target.getAttribute("id");
  shift_left.classList.contains("active") ? shift_left.style.backgroundColor = "brown" : shift_left.style.backgroundColor = "black";
  shift_right.classList.contains("active") ? shift_right.style.backgroundColor = "brown" : shift_right.style.backgroundColor = "black";
  alt_left.classList.contains("active") ? alt_left.style.backgroundColor = "brown" : alt_left.style.backgroundColor = "black";
  alt_right.classList.contains("active") ? alt_right.style.backgroundColor = "brown" : alt_right.style.backgroundColor = "black";
  (alt_right.classList.contains("active") && shift_right.classList.contains("active")) ? ctrl_left.classList.remove("active") : null;
  if ((shift_left.classList.contains("active") || shift_right.classList.contains("active")) && keyid === "alt_left" || keyid === "alt_right") {
    lang = (lang === eng) ? rus : eng;
    renderKey(lang);
    shift_left.style.background = "black";
    shift_right.style.background = "black";
    alt_left.style.background = "black";
    alt_right.style.background = "black";
    alt_left.classList.remove("active");
    alt_right.classList.remove("active");
    shift_left.classList.remove("active");
    shift_right.classList.remove("active");
  }
};
document.onmousedown = function (e) {
  const keyall = e.target.getAttribute("id");

  e.target.style.backgroundColor = "brown";
  if (keyall == null || keyall == "textarea_value") {
    e.target.style.backgroundColor = "transparent";
  }
};
document.onmouseup = function (e) {
  const keyall = e.target.getAttribute("id");
  e.target.style.backgroundColor = "black";
  if (keyall == null || keyall == "textarea_value") {
    e.target.style.backgroundColor = "transparent";
  }
};
