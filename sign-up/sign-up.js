const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const reg = document.getElementById("reg");
const loginBtn = document.getElementById("login");

const regInputName = document.querySelector(".name");
const regInputEmail = document.querySelector(".email");
const regInputPassw = document.querySelector(".password");
const nonebtn = document.getElementById('nonebtn');
const auth = document.querySelector('.auth')

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
reg.addEventListener("click", createUser);
reg.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    createUser();
  }
});
function createUser(e) {
  e.preventDefault();
  axios
    .post("https://todo.s7b0t4-website-server.ru/user/create", {
      name: regInputName.value,
      email: regInputEmail.value,
      password: regInputPassw.value,
    })
    .then((response) => {
      window.location = `http://127.0.0.1:5500/home/home.html?id=${response.data.id}`;
    })
    .catch(function (error) {
      console.log(error);
    });
}
nonebtn.addEventListener('click', (e) => {
  e.preventDefault()
  container.classList.add('active')

})
auth.addEventListener('click', (e) => {
  e.preventDefault()
  container.classList.add('active')
})