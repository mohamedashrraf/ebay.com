function checkRememberMe() {
    var mail = document.getElementById("mail").value
    var pass = document.getElementById("pass").value
    localStorage.setItem("UserName", mail)
    localStorage.setItem("UserPassword", pass)
}

//check accounts in local storage

function signInUser() {
    const mail = document.getElementById('mail').value;
    const pass = document.getElementById('pass').value;
    for (i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const userData = JSON.parse(localStorage.getItem(key));

        if (userData.mail === mail && userData.pass === pass) {
            window.location.href = "./home.html";
            return;
        }
    }
    document.getElementById("invalid").innerHTML = 'Invalid email or password!';

}
