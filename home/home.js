const submit = document.querySelector(".submit");
const inputField = document.querySelector(".input");
const container = document.getElementById("inputs-container");

const arr = [];
submit.addEventListener("click", handlerClick);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handlerClick();
  }
});

function handlerClick() {
  const inputValue = inputField.value.trim();
  if (inputValue) {
    arr.push(inputValue);
    addInput(inputValue);
    inputField.value = "";
  }

  function addInput(value) {
    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input-wrapper"); // Применяем класс для обертки

    const input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.classList.add("input"); // Используем тот же класс для стилей

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "✖️"; // Символ крестика
    deleteButton.classList.add("delete-button"); // Применяем класс для кнопки удаления
    deleteButton.addEventListener("click", () => {
      container.removeChild(inputWrapper); // Удаление элемента при нажатии на крестик
    });

    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.classList.add("save-button");
    saveButton.addEventListener("click", () => {
      console.log("Сохраненые значения: " + [arr]);
    });
    const completed = document.createElement("input");
    completed.type = "checkbox";
    completed.classList.add('checkbox');
    inputWrapper.appendChild(input);
    inputWrapper.appendChild(completed);
    inputWrapper.appendChild(saveButton); // Добавляем кнопку сохранения
    inputWrapper.appendChild(deleteButton);
    container.appendChild(inputWrapper);
  }
}
