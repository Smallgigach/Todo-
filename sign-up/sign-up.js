const container = document.querySelector(".container");
const signUpTransitToSignUpToReg = document.querySelector(".sign-up_toggle_btn");
const SignUpButton = document.querySelector(".sign-up_button");

const SignInTransitToSignInToAuth = document.querySelector(".sign-in_toggle_btn");
const SignInButton = document.querySelector(".sign-in_button");
const SignInToEmail= document.querySelector(".sign-in_email");
const SignInToPassword = document.querySelector(".sign-in_password");

const SignUpToName = document.querySelector(".sign-up_name");
const SignUpToEmail = document.querySelector(".sign-up_email");
const SignUpToPassword = document.querySelector(".sign-up_password");
const SignUpToAdaptive = document.querySelector(".sign-up_remove");
const SignInToAdaptive = document.querySelector(".sing-in_remove");
const serverLink = 'https://todo.s7b0t4-website-server.ru/';
const pageLink = 'https://todo-smallgigached.netlify.app/';
signUpTransitToSignUpToReg.addEventListener("click", () => {
  container.classList.add("active");
});
SignInTransitToSignInToAuth.addEventListener("click", () => {
  container.classList.remove("active");
});

SignInButton.addEventListener("click", SignInUser);
SignUpButton.addEventListener("click", SignUpUser);

SignInButton.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    SignInUser();
  }
})
function SignInUser(e) {
  e.preventDefault();
  axios
    .post(serverLink + "auth/signIn", {
      email: SignInToEmail.value,
      password: SignInToPassword.value,
    })
    .then (async(response) => {
      await localStorage.clear()
      await localStorage.setItem('token', response.data.token)
      window.location = pageLink + 'home/home.html';
    })
    .catch((err) => {
      console.log(err);
    });
} 

SignUpButton.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    SignUpUser();
  }
});

function SignUpUser(e) {
  e.preventDefault();
  axios
    .post(serverLink + "auth/signUp", {
      name: SignUpToName.value,
      email: SignUpToEmail.value,
      password: SignUpToPassword.value,
    })
    .then(async(response) => {
      await localStorage.clear()
      await localStorage.setItem('token', response.data.token)
      if (response.data.id) {
        window.location = pageLink + `home/home.html`;
      }
      console.error('Не верный аккаунт');
    })
    .catch(function (error) {
      console.log(error);
    });
}

SignUpToAdaptive.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("active");
});

SignInToAdaptive.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("active");
});
