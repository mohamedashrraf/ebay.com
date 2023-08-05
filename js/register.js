

//register inputs in local storage
function registerUser() {
  const fname = document.getElementById("regFname").value;
  const lname = document.getElementById("regLname").value;
  const mail = document.getElementById("regMail").value;
  const pass = document.getElementById("regPass").value;


  const userData = {
    fname: fname,
    lname: lname,
    mail: mail,
    pass: pass
  }

  var nameRegex = /^[A-Za-z]{2,}/im;
  // var emailRegex = "[a-z]{2,}[0-9]*@[a-z]{2,}(.com||.eg||.net)";
  var emailRegex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  if (!fname.match(nameRegex) || !lname.match(nameRegex)) {
    alert("Please enter valid first and last names.");
    return false;
  }

  if (!mail.match(emailRegex)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (!pass.match(passwordRegex)) {
    alert("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be 6-20 characters long.");
    return false;
  }

  alert("Registration successful!");
  window.open("home.html");

  let count = parseInt(localStorage.getItem('count')) || 0;
  const key = "user_" + (count + 1);
  count++;
  localStorage.setItem('count', count.toString());
  localStorage.setItem(key, JSON.stringify(userData));
  return true;

}