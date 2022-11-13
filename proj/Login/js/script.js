function CheckLogin() {
  if (localStorage.getItem("token") == null) {
    location.replace("./index.html");
  }
}

function onLoad() {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
}

function login() {
  var username = document.getElementById("user_login").value;
  var pass = document.getElementById("password_login").value;

  if (username === "") {
    document.getElementById("vi").innerHTML = "Enter Valid Email";
    document.getElementById("vi").style.color = "Red";
  } else {
    if (username.indexOf("@") > -1) {
      document.getElementById("vi").innerHTML = "";
    } else {
      document.getElementById("vi").innerHTML =
        "Enter The Correct Email Address";
      document.getElementById("vi").style.color = "Red";
    }
  }
  if (pass.length <= 0) {
    document.getElementById("vi2").innerHTML = "Enter The Password";
  } else {
    if (pass.length <= 6) {
      document.getElementById("vi2").innerHTML = "Password Is Wrong";
      document.getElementById("vi2").style.color = "Red";
    } else {
      document.getElementById("vi2").innerHTML = "";
    }
  }

  var loginInfo = {
    EmployeeEmail: username,
    Password: CryptoJS.MD5(pass).toString(),
  };

  console.log(loginInfo);
  fetch("https://localhost:44327/api/login", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(loginInfo),
  })
    .then((response) => response.text())
    .then((response) => {
      console.log("Bearer " + response);
      var obj = JSON.parse(response);

      window.localStorage.setItem("token", obj.tokenString);
      window.localStorage.setItem("id", obj.employeeId);
      if (obj.tokenString.length != 0) {
        if (obj.role == true) {
          openAdmin();
        } else {
          openEmployee();
        }
      } else {
        if (obj.tokenString == null) {
          document.getElementById("vi2").innerHTML = "";
        } else if (pass.length == 0) {
          document.getElementById("vi2").innerHTML = "Password Required";
        } else {
          document.getElementById("vi2").innerHTML =
            "Wrong Credentials Email/Password ";
        }
      }
    });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  location.replace("../index.html");
  
}
function openAdmin() {
  location.replace("../Admin.html");
}
function openEmployee() {
  location.replace("../Employee.html");
}
