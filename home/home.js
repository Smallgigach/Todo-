
const submit = document.querySelector(".submit");
const inputField = document.querySelector(".input");
const container = document.getElementById("inputs-container");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

function getAllTask() {
  axios
    .post("https://todo.s7b0t4-website-server.ru/task/get", {
      userId: userId,
    })
    .then((response) => {
      renderAllTask(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
function addInput(text, id, bool) {
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.toggle("input-wrapper"); 
  inputWrapper.scrollIntoView()
  inputWrapper.key = id;
  const input = document.createElement("input");
  
  input.type = "text";
  input.value = text;
  input.classList.add("input"); 

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "✖️"; 
  deleteButton.classList.toggle("delete-button"); 
  deleteButton.addEventListener("click", () => {
    axios.post('https://todo.s7b0t4-website-server.ru/task/delete', {
      "userId": userId,
      "taskId": id
    }).then((response) => {
      console.log(response, 'Удалено');
      
    }).catch((err) => {
      console.log(err);
      
    })
    container.removeChild(inputWrapper); 
  });

  const saveButton = document.createElement("button");
  saveButton.innerHTML = "Save";
  saveButton.classList.add("save-button");
  saveButton.addEventListener("click", () => {
    axios
      .post("https://todo.s7b0t4-website-server.ru/task/change", {
        userId: userId,
        text: input.value,
        taskId: id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const completed = document.createElement("input");
  completed.type = "checkbox";
  completed.checked = bool;
  completed.classList.add("checkbox");
  completed.addEventListener("change", (e) => {
    axios
      .post("https://todo.s7b0t4-website-server.ru/task/switch", {
        taskId: id,
        userId: userId,
        switch: completed.checked,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  inputWrapper.appendChild(input);
  inputWrapper.appendChild(completed);
  inputWrapper.appendChild(saveButton); // Добавляем кнопку сохранения
  inputWrapper.appendChild(deleteButton);
  container.appendChild(inputWrapper);
}
getAllTask();
function renderAllTask(data) {
  data.sort((a, b) => {
    return a.id - b.id;
  });
  console.log(data);
  data.forEach((element) => {
    addInput(element.text, element.id, element.switch);
  });
}
console.log(`userId: ${userId}`);
submit.addEventListener("click", handlerClick);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handlerClick();
  }
});

function handlerClick() {
  const inputValue = inputField.value.trim();

  if (inputValue) {
    axios
      .post("https://todo.s7b0t4-website-server.ru/task/create", {
        text: inputValue,
        userId: userId,
      })
      .then((response) => {
        console.log(response);

        addInput(response.data.text, response.data.id, response.data.bool);
      })
      .catch((err) => {
        console.log(err);
      });

    inputField.value = "";
  }
}
