function showpwd() {
  let checkbox = document.getElementById("pw-checkbox");
  let pwd = document.getElementById("pwd-input");
  if (checkbox.checked == true) {
    pwd.style.display = "block";
  } else {
    pwd.style.display = "none";
  }
}
