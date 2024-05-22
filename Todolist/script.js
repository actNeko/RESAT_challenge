document.addEventListener("DOMContentLoaded", () => {
  const todoText = document.getElementById("todo-text");
  const prioritySelect = document.getElementById("priority-select");
  const addTodoButton = document.getElementById("add-todo-button");
  const todoList = document.getElementById("todo-list");
  const allFilter = document.getElementById("all-filter");
  const completedFilter = document.getElementById("completed-filter");
  const uncompletedFilter = document.getElementById("uncompleted-filter");
  const sortPriorityButton = document.getElementById("sort-priority");

  const editModal = document.getElementById("modal-bg");
  const editTodoText = document.getElementById("edit-todo-text");
  const editPrioritySelect = document.getElementById("edit-priority-select");
  const saveEditButton = document.getElementById("save-edit-button");
  const cancelEditButton = document.getElementById("cancel-edit-button");

  let todos = [];
  let currentEditId = null;

  //새로고침해도 안 없어지려면 로컬스토리지 이용
  function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      todos = JSON.parse(storedTodos);
      renderTodos();
    }
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // 할 일 추가하기
  function addTodo() {
    const text = todoText.value.trim(); //trim 추가시 공백제거 빈 문자 저장불가
    const priority = prioritySelect.value;
    if (text !== "") {
      const newTodo = {
        id: Date.now(),
        text: text,
        priority: priority,
        completed: false,
      };
      todos.push(newTodo);
      saveTodos();
      renderTodos();
      todoText.value = "";
    }
  }

  todoText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  addTodoButton.addEventListener("click", () => {
    addTodo();
  });

  // 할 일 목록 생성
  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = todo.completed ? "completed" : "";
      li.innerHTML = `
              <input type="checkbox" ${
                todo.completed ? "checked" : ""
              } data-id="${todo.id}">
              <div class="edit-priority ${todo.priority}">${priorityLabel(
        todo.priority
      )}</div>
              <span>${todo.text}</span>
              <div>
              <button class="edit-button" data-id="${todo.id}">수정</button>
              <button class="delete-button" data-id="${todo.id}">삭제</button>
              </div>
          `;
      todoList.appendChild(li);
    });
  }

  // 우선순위 라벨
  function priorityLabel(priority) {
    switch (priority) {
      case "low":
        return "낮 음";
      case "medium":
        return "보 통";
      case "high":
        return "높 음";
      case "very-high":
        return "아주 높음";
    }
  }

  // 할 일 완료/미완료 처리
  todoList.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const id = parseInt(e.target.dataset.id);
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = e.target.checked;
        saveTodos();
        renderTodos();
      }
    }
  });

  // 할 일 수정 및 삭제 처리
  todoList.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    const todo = todos.find((todo) => todo.id === id);

    if (e.target.className === "edit-button") {
      if (todo) {
        currentEditId = id;
        editTodoText.value = todo.text;
        editPrioritySelect.value = todo.priority;
        editModal.style.display = "block";
      }
    }

    if (e.target.className === "delete-button") {
      if (todo) {
        todos = todos.filter((todo) => todo.id !== id);
        saveTodos();
        renderTodos();
      }
    }
  });

  // 수정 모달 저장 버튼
  saveEditButton.addEventListener("click", () => {
    const todo = todos.find((todo) => todo.id === currentEditId);
    if (todo) {
      todo.text = editTodoText.value;
      todo.priority = editPrioritySelect.value;
      saveTodos();
      renderTodos();
      editModal.style.display = "none";
      currentEditId = null;
    }
  });

  // 수정 모달 취소 버튼
  cancelEditButton.addEventListener("click", () => {
    editModal.style.display = "none";
    currentEditId = null;
  });

  // 필터링
  allFilter.addEventListener("click", () => renderTodos());
  completedFilter.addEventListener("click", () => {
    todoList.innerHTML = "";
    todos
      .filter((todo) => todo.completed)
      .forEach((todo) => {
        const li = document.createElement("li");
        li.className = "completed";
        li.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""} data-id="${
          todo.id
        }">
        <div class="edit-priority ${todo.priority}">${priorityLabel(
          todo.priority
        )}</div>
        <span>${todo.text}</span>
        <div>
        <button class="edit-button" data-id="${todo.id}">수정</button>
        <button class="delete-button" data-id="${todo.id}">삭제</button>
        </div>
    `;
        todoList.appendChild(li);
      });
  });
  uncompletedFilter.addEventListener("click", () => {
    todoList.innerHTML = "";
    todos
      .filter((todo) => !todo.completed)
      .forEach((todo) => {
        const li = document.createElement("li");
        li.innerHTML = `
              <input type="checkbox" ${
                todo.completed ? "checked" : ""
              } data-id="${todo.id}">
              <div class="edit-priority ${todo.priority}">${priorityLabel(
          todo.priority
        )}</div>
              <span>${todo.text}</span>
              <div>
              <button class="edit-button" data-id="${todo.id}">수정</button>
              <button class="delete-button" data-id="${todo.id}">삭제</button>
              </div>
          `;
        todoList.appendChild(li);
      });
  });

  let isPrioritySortingEnabled = false;

  // 우선 순위 정렬 버튼
  sortPriorityButton.addEventListener("click", () => {
    isPrioritySortingEnabled = !isPrioritySortingEnabled;
    if (isPrioritySortingEnabled) {
      todos.sort(
        (a, b) => priorityValue(b.priority) - priorityValue(a.priority)
      );
      sortPriorityButton.classList.add("active");
    } else {
      todos.sort((a, b) => a.id - b.id);
      sortPriorityButton.classList.remove("active");
    }
    renderTodos();
  });

  // 우선순위 값
  function priorityValue(priority) {
    switch (priority) {
      case "low":
        return 1;
      case "medium":
        return 2;
      case "high":
        return 3;
      case "very-high":
        return 4;
    }
  }

  // 페이지 로드 시 할 일 목록 불러오기
  loadTodos();
});
