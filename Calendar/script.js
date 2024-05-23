// script.js
const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const modal = document.getElementById("modal");
const memoTextarea = document.getElementById("memo");
const saveMemoButton = document.getElementById("saveMemo");
const closeModalButton = document.getElementById("close");

let currentDate = new Date();
let currentMemoDate = null;
let memos = {};

function loadMemos() {
  const storedMemos = localStorage.getItem("memos");
  if (storedMemos) {
    memos = JSON.parse(storedMemos);
  }
}

function saveMemoToLocal() {
  localStorage.setItem("memos", JSON.stringify(memos));
}

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  monthYear.textContent = `${year}년 ${month + 1}월`;

  daysContainer.innerHTML = "";
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDayElement = document.createElement("div");
    daysContainer.appendChild(emptyDayElement);
  }

  for (let i = 1; i <= lastDate; i++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = i;
    const dayOfWeek = new Date(year, month, i).getDay();

    // 토요일과 일요일에 클래스 추가
    if (dayOfWeek === 6) {
      dayElement.classList.add("sat");
    } else if (dayOfWeek === 0) {
      dayElement.classList.add("sun");
    }

    if (memos[`${year}-${month + 1}-${i}`]) {
      const memoIndicator = document.createElement("img");
      memoIndicator.src = "img/memo.png";
      memoIndicator.alt = "Memo Indicator";
      dayElement.appendChild(memoIndicator);
      dayElement.classList.add("memo-indicator");
    }
    dayElement.addEventListener("click", () => openMemo(year, month + 1, i));
    daysContainer.appendChild(dayElement);
  }

  // 마지막 주에 남은 빈 칸 추가
  const lastDay = new Date(year, month, lastDate).getDay();
  for (let i = lastDay + 1; i < 7; i++) {
    const emptyDayElement = document.createElement("div");
    daysContainer.appendChild(emptyDayElement);
  }
}

function openMemo(year, month, day) {
  currentMemoDate = `${year}-${month}-${day}`;
  memoTextarea.value = memos[currentMemoDate] || "";
  modal.style.display = "flex";
}

function saveMemo() {
  if (currentMemoDate) {
    memos[currentMemoDate] = memoTextarea.value;
    saveMemoToLocal();
    renderCalendar(currentDate);
    closeModal();
  }
}

function closeModal() {
  modal.style.display = "none";
  memoTextarea.value = "";
}

//달력 이동 버튼
prevButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

saveMemoButton.addEventListener("click", saveMemo);
closeModalButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

loadMemos();
renderCalendar(currentDate);
