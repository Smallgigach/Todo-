
const submit = document.querySelector(".submit");
const inputField = document.querySelector(".input");
const container = document.querySelector(".inputs-container");
const token = localStorage.getItem("token");

console.log(token);
const serverLink = 'https://todo.s7b0t4-website-server.ru/';

function getAllTask() {
  axios
    .post(serverLink + "task/get", {
      token: token,
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
  inputWrapper.key = id;
  const input = document.createElement("input");
  
  input.type = "text";
  input.value = text;
  input.classList.add("inputAdd"); 
  input.style.backgroundColor = '#d3d3d3';
  
 

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>"; 
  deleteButton.classList.toggle("delete-button"); 
  deleteButton.addEventListener("click", () => {
    axios.post(serverLink + 'task/delete', {
      "token": token,
      "taskId": id
    }).then((response) => {
      console.log(response, 'Удалено');
      
    }).catch((err) => {
      console.log(err);
      
    })
    container.removeChild(inputWrapper); 
  });
  const saveButton = document.createElement("button");
  saveButton.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
  saveButton.classList.add("save-button");
  saveButton.addEventListener("click", () => {
    axios
      .post(serverLink +  "task/change", {
        token: token,
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
      .post(serverLink + "task/switch", {
        taskId: id,
        token: token,
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
  inputWrapper.appendChild(deleteButton);
  inputWrapper.appendChild(saveButton); // Добавляем кнопку сохранения
  inputWrapper.appendChild(completed);
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
      .post(serverLink + "task/create", {
        text: inputValue,
        token: token,
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
