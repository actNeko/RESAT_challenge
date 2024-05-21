const inputIds = ["hours", "minutes", "seconds"];

let timer;
let totalTime;

// 이벤트 리스너 등록 및 초기화 설정
function setupEventListeners() {
  document.getElementById("start").addEventListener("click", startTimer);
  document.getElementById("stop").addEventListener("click", stopTimer);
  document.getElementById("reset").addEventListener("click", resetTimer);

  inputIds.forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener("focus", clearPlaceholder);
    input.addEventListener("blur", restorePlaceholder);
    input.addEventListener("input", limitTimes);
  });
}

// 입력 필드를 비활성화
function disableInputs() {
  inputIds.forEach((id) => {
    document.getElementById(id).disabled = true;
  });
}

// 입력 필드를 활성화
function enableInputs() {
  inputIds.forEach((id) => {
    document.getElementById(id).disabled = false;
  });
}

function clearPlaceholder(event) {
  if (event.target.value === "00" || event.target.dataset.changed === "true") {
    event.target.value = "";
  }
  event.target.dataset.changed = "true"; // Input 필드가 수정되었음을 표시
}

function restorePlaceholder(event) {
  if (event.target.value === "") {
    event.target.value = "00";
    event.target.dataset.changed = "false"; // Input 필드가 원래 상태로 돌아왔음을 표시
  }
}

function limitTimes(event) {
  const value = parseInt(event.target.value);
  if (event.target != hours) {
    if (value > 59) {
      event.target.value = "59";
    }
  } else {
    if (value > 99) {
      event.target.value = "99";
    }
  }
}

function startTimer() {
  const { hours, minutes, seconds } = getInputValues();

  totalTime = hours * 3600 + minutes * 60 + seconds;

  if (totalTime > 0) {
    disableInputs(); // 입력 필드를 비활성화합니다.
    timer = setInterval(countDown, 1000);
  }
}

function countDown() {
  if (totalTime <= 0) {
    clearInterval(timer);
    alert("TIME'S UP!");
    enableInputs(); // 타이머가 끝나면 입력 필드를 활성화합니다.
  } else {
    totalTime--;
    const hours = String(Math.floor(totalTime / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalTime % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalTime % 60).padStart(2, "0");

    inputIds.forEach((id) => {
      document.getElementById(id).value = eval(id);
    });
  }
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  enableInputs(); // 리셋 시 입력 필드를 활성화합니다.
  inputIds.forEach((id) => {
    document.getElementById(id).value = "00";
  });
}

// Input 값을 객체로 반환하는 함수
function getInputValues() {
  return {
    hours: parseInt(document.getElementById("hours").value) || 0,
    minutes: parseInt(document.getElementById("minutes").value) || 0,
    seconds: parseInt(document.getElementById("seconds").value) || 0,
  };
}

// 이벤트 리스너 및 초기화 설정 호출
setupEventListeners();
