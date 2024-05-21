let timer;
let totalTime;

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

// clearPlaceholder로 기본값 삭제, restorePlaceholder로 복구
document.getElementById("hours").addEventListener("focus", clearPlaceholder);
document.getElementById("minutes").addEventListener("focus", clearPlaceholder);
document.getElementById("seconds").addEventListener("focus", clearPlaceholder);
document.getElementById("hours").addEventListener("blur", restorePlaceholder);
document.getElementById("minutes").addEventListener("blur", restorePlaceholder);
document.getElementById("seconds").addEventListener("blur", restorePlaceholder);

document.getElementById("minutes").addEventListener("input", limitTimes);
document.getElementById("seconds").addEventListener("input", limitTimes);

function clearPlaceholder(event) {
  if (event.target.value === "00") {
    event.target.value = "";
  }
}

function restorePlaceholder(event) {
  if (event.target.value === "") {
    event.target.value = "00";
  }
}

function limitTimes(event) {
  const value = parseInt(event.target.value);
  if (value > 59) {
    event.target.value = "59";
  }
}

//스탑워치 입력 활성화 비활성화
function disableInputs() {
  document.getElementById("hours").disabled = true;
  document.getElementById("minutes").disabled = true;
  document.getElementById("seconds").disabled = true;
}

function enableInputs() {
  document.getElementById("hours").disabled = false;
  document.getElementById("minutes").disabled = false;
  document.getElementById("seconds").disabled = false;
}

function startTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

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

    document.getElementById("hours").value = hours;
    document.getElementById("minutes").value = minutes;
    document.getElementById("seconds").value = seconds;
  }
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  enableInputs(); // 리셋 시 입력 필드를 활성화합니다.
  document.getElementById("hours").value = "00";
  document.getElementById("minutes").value = "00";
  document.getElementById("seconds").value = "00";
}
