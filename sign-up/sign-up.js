const container = document.querySelector(".container");
const signUpTransitToSignUpToReg = document.querySelector(
  ".sign-up_toggle_btn"
);
const SignUpButton = document.querySelector(".sign-up_button");

const SignInTransitToSignInToAuth = document.querySelector(
  ".sign-in_toggle_btn"
);
const SignInButton = document.querySelector(".sign-in_button");
const SignInToEmail = document.querySelector(".sign-in_email");
const SignInToPassword = document.querySelector(".sign-in_password");

const SignUpToName = document.querySelector(".sign-up_name");
const SignUpToEmail = document.querySelector(".sign-up_email");
const SignUpToPassword = document.querySelector(".sign-up_password");

const SignUpToRepeatToPassword = document.querySelector('.sign-up_repeat_password')
const SignUpToAdaptive = document.querySelector(".sign-up_remove");
const SignInToAdaptive = document.querySelector(".sing-in_remove");
const serverLink = "https://todo.s7b0t4-website-server.ru/";
const pageLink = "https://todo-smallgigached.netlify.app/";
const titleToSignUp = document.querySelector('.titleToSignUp')
const titleToSignIn =  document.querySelector('.title-to-sign-in')
const error = document.querySelector('.error');
const errortwo = document.querySelector('.errortwo')
signUpTransitToSignUpToReg.addEventListener("click", () => {
  container.classList.add("active");
});
SignInTransitToSignInToAuth.addEventListener("click", () => {
  container.classList.remove("active");
});

SignInButton.addEventListener("click", SignInUser);
SignUpButton.addEventListener("click", SignUpUser);

function SignInUser(e) {
  e.preventDefault();
  axios
    .post(serverLink + "auth/signIn", {
      email: SignInToEmail.value,
      password: SignInToPassword.value,
    })
    .then(async (response) => {
      await localStorage.clear();
      await localStorage.setItem("token", response.data.token);
      window.location = pageLink + "home/home.html";
    })
    .catch((err) => {
      console.log(err.response.data.message);   
      errortwo.style.display = 'flex'
      titleToSignIn.style.display = 'none'
      errortwo.textContent = err.response.data.message;
    });
}

function SignUpUser(e) {
  if(SignUpToName.value == '') {
    error.textContent = 'введите имя';
    titleToSignUp.style.display = 'none'
    controller.abort()
  }
  if(SignUpToPassword.value !== SignUpToRepeatToPassword.value) {
    SignUpToPassword.value = '';
    SignUpToRepeatToPassword.value = '';
    error.textContent = 'проверьте правильность пароля';
    titleToSignUp.style.display = 'none'
    controller.abort()
  }
  e.preventDefault();
  axios
    .post(serverLink + "auth/signUp", {
      name: SignUpToName.value,
      email: SignUpToEmail.value,
      password: SignUpToPassword.value,
    })
    .then(async (response) => {
      await localStorage.clear();
      await localStorage.setItem("token", response.data.token);
      if (response.data.id) {
        window.location = pageLink + `home/home.html`;
      }
    })
    .catch((err) => {
      console.log(err.response.data.message);   
      error.style.display = 'flex'
      titleToSignUp.style.display = 'none'
      error.textContent = err.response.data.message;
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
