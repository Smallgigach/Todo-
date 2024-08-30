const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const reg = document.getElementById("reg");
const loginBtn = document.getElementById("login");
const SignInButton = document.querySelector(".SignInButton");
const logInputEmail = document.querySelector(".login_email");
const logInputPassword = document.querySelector(".login_password");

const regInputName = document.querySelector(".name");
const regInputEmail = document.querySelector(".email");
const regInputPassw = document.querySelector(".password");
const nonebtn = document.getElementById("nonebtn");
const auth = document.querySelector(".auth");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
SignInButton.addEventListener("click", SignInUser);
reg.addEventListener("click", SignUpUser);
function SignInUser(e) {
  e.preventDefault();
  axios
    .post("https://todo.s7b0t4-website-server.ru/auth/signIn", {
      email: logInputEmail.value,
      password: logInputPassword.value,
    })
    .then((response) => {
      window.location = `http://127.0.0.1:5500/home/home.html?id=${response.data.id}`;
    })
    .catch((err) => {
      console.log(err);
    });
}
reg.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    SignUpUser();
  }
});
function SignUpUser(e) {
  e.preventDefault();
  axios
    .post("https://todo.s7b0t4-website-server.ru/auth/signUp", {
      name: regInputName.value,
      email: regInputEmail.value,
      password: regInputPassw.value,
    })
    .then((response) => {
      console.log(response.data.id);
      if (response.data.userId) {
        window.location = `http://127.0.0.1:5500/home/home.html?id=${response.data.id}`;
      }
      console.error('Не верный аккаунт');
    })
    .catch(function (error) {
      console.log(error);
    });
}
nonebtn.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("active");
});
auth.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("active");
});
