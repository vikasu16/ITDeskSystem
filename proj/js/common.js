



function AddDevice(){
  let d=` <div class="col-xl-3 col-md-6 mb-4">
  <div class="card border-left-success shadow h-100 py-2">
    <div class="card-body">
      <div class="row no-gutters align-items-center">
        <div class="col mr-2">
          <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
            Arpit</div>
          <div class="h5 mb-0 font-weight-bold text-gray-800">30 Units</div>
        </div>
        <div class="col-auto">
          <i class="fas fa-mobile fa-2x text-gray-300"></i>
        </div>
      </div>
    </div>
  </div>
</div>`;
    
  document.getElementById('appendCard').innerHTML+=d;
}



function getFree(){
fetch('https://localhost:44327/api/deviceinfo/employeeEmail',{
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer'
  }
  )
  .then(res => res.json())
  .then(data => {
      let li = ` <tr>
      <th scope="col">Device Name</th>
      
      <th scope="col">IMEI </th>
      <th scope="col">Type</th>
    </tr>`;
              data.forEach(TempUser => {
                 // console.log(user);
              li += ` <tr>
              <td data-label="Account">${TempUser}}</td>
            
              <td data-label="Amount">$1,190</td>
              <td data-label="Period">03/01/2016 - 03/31/2016</td>
            </tr>`
      });

document.getElementById('Table').innerHTML=li;
});
document.getElementById("free").style.backgroundColor="black";
document.getElementById("free").style.color="white";
document.getElementById("allocated").style.backgroundColor="gray";
}
function getAllocated(){
fetch("https://localhost:44327/api/deviceinfo/employeeEmail", {
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " + window.localStorage.getItem("token").toString(),
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer",
})
  .then((res) => res.json())
  .then((data) => {
    let li = `
    <thead>
        <tr>
          <th scope="col">Device Name</th>
          <th scope="col">Allocated To</th>
          <th scope="col">IMEI </th>
          <th scope="col">Type</th>
        </tr>
      </thead>
    `;
    data.forEach((TempUser) => {
      // console.log(user);
      li += `  <tr>
      <td data-label="Account">${TempUser}}</td>
      <td data-label="Due Date">04/01/2016</td>
      <td data-label="Amount">$1,190</td>
      <td data-label="Period">03/01/2016 - 03/31/2016</td>
    </tr>`;
    });
    document.getElementById("Table").innerHTML = li;

    // do something with data
    console.log(data);
  })
  .catch(function (error) {
    console.log("Looks like there was a problem: \n", error);
  });
  document.getElementById("allocated").style.backgroundColor="black";
  document.getElementById("allocated").style.color="white";
  document.getElementById("free").style.backgroundColor="gray";
  }

  function searchFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("Table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  // function RequestDevice(){
  //   let d=`<div class="col-xl-3 col-md-6 mb-4">
  //   <div class="card border-left-success shadow h-100 py-2">
  //     <div class="card-body">
  //       <div class="row no-gutters align-items-center">
  //         <div class="col mr-2">
  //           <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
  //             Mobile Name</div>
  //           <div class="h6 mb-0 font-weight-bold text-gray-800">Iphone 11 Mini</div>
  //         </div>
  //         <div class="col-auto">
  //           <i class="fas fa-mobile fa-2x text-gray-300"></i>
  //         </div>
  //       </div>
  //     </div>
  //     <a href="#" class="btn btn-danger m-2" data-target="#myModals" data-toggle="modal">
         
  //       <span class="text">Report Issue</span>
  //     </a>
  //     <a href="#" class="btn btn-secondary m-2">
         
  //       <span class="text">Return Device</span>
  //     </a>
  //   </div>
  // </div>`;
      
  //   document.getElementById('appendCard').innerHTML+=d;
  // }

  function resetPassword() {
    clearVal();
    var currentpassword = document.getElementById("currentpassword").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
//     console.log(currentpassword,password1,password2);
// if(currentpassword=='' || password1=="" || password2=="")
// {
//   alert("Please enter your current password");
//   return;
// }
// if(password1 != password2)
// {
//   alert("Your passwords dont match");
//   return;
// }
// if (password1.length <= 6) {
//   alert("New password is too short");
//   return;
// }
if (currentpassword== ""){
  document.getElementById("valid1").innerHTML="This is required";
}
if (password1 == ""){
  document.getElementById("valid2").innerHTML="This is required";
}
if (password2== ""){
  document.getElementById("valid3").innerHTML="This is required";
}
if (currentpassword !="" && password1 !="" && password2 !=""){
  if (password1.length < 6){
    document.getElementById("valid2").innerHTML="Password should be atleast 6 characters long";
    return;
  }
else if (password1 != password2){
swal("Passwords didn't match");
return;
}
 

    
var loginInfo = {
  CurrentPassword: CryptoJS.MD5(currentpassword.toString()).toString(),
  NewPassword: CryptoJS.MD5(password1.toString()).toString(),
 
};

console.log(loginInfo);
var urlUpdate = "https://localhost:44327/api/Login/resetPassword/" + window.localStorage.getItem("id").toString();
console.log(urlUpdate);
fetch(urlUpdate, {
  method: "PUT",
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " + window.localStorage.getItem("token").toString(),
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer",
  body: JSON.stringify(loginInfo),
})
  //.then(response => response.json())
  .then((res) => res.json())
.then((data) => {
// console.log(data)
if (data == 1){
  swal({
    title: "Success",
    text: "Password Updated Successfully!",
    icon: "success",
  });

}
else {
  swal({
    title: "Oops",
    text: "You Entered Wrong Password!",
    icon: "error",
  });
}

  });
  document.getElementById("bt4").setAttribute("data-dismiss","modal");


} 
  }


function validation5() {

var m=document.getElementById("deviceCategory").value;
console.log(m + "I am m");
  if(m == "")
  {
    
    document.getElementById("valid7").innerHTML= "This Field Is Required";
  }
  else{
    addDeviceCatgoryModal();
    document.getElementById("bt6").setAttribute("data-dismiss","modal");
  }

}

function validation6() {

  var m=document.getElementById("employeeDropdown").value;
  console.log(m + "I am Divyanshu");
    if(m == "Select a Employee Email")
    {
      
      document.getElementById("valid8").innerHTML= "This Field Is Required";
    }
    else{
      allocateEmployee();
      document.getElementById("bt7").setAttribute("data-dismiss","modal");
    }
  
  }
  function validation7() {

    var m=document.getElementById("uniquecode").value;
    var p=document.getElementById("newDeviceName").value;
    var q=document.getElementById("categoryDropdown").value;
    console.log(m + "I am Divyanshu" + p + q);
      if(m == "")
      {
        document.getElementById("valid9").innerHTML= "This Field Is Required";
      }
      if(p == "")
      {
        document.getElementById("valid10").innerHTML= "This Field Is Required";
      }
      if(q== "Select a Device Category")
      {
        document.getElementById("valid11").innerHTML= "This Field Is Required";
      }
      if(m!="" && p!= "" && q!="Select a Device Category"){
        addDeviceModal();
        document.getElementById("bt8").setAttribute("data-dismiss","modal");
      }
    
    }

  

  /* Modal Cleaner Functions */


  function clearVal(){
    document.getElementById("valid1").innerHTML = "";
    document.getElementById("valid2").innerHTML = "";
    document.getElementById("valid3").innerHTML = "";
    document.getElementById("valid7").innerHTML = "";
    document.getElementById("valid8").innerHTML = "";
    document.getElementById("valid9").innerHTML = "";
    document.getElementById("valid10").innerHTML = "";
    document.getElementById("valid11").innerHTML = "";
    document.getElementById("uniquecode").value = "";
    document.getElementById("newDeviceName").value= "";
    

  }


  function clearpass(){
    document.getElementById("currentpassword").value="";
    document.getElementById("password1").value="";
    document.getElementById("password2").value="";
    

  }


  function clearCategory(){
    document.getElementById("deviceCategory").value="";
  }

  
  /*End Of Modal Cleaner Functions */



  function resetPasswordEmployee() {
    
    var currentpassword = document.getElementById("currentpassword").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
 
  if (currentpassword== ""){
  document.getElementById("valid1").innerHTML="This is required";
  }
  if (password1 == ""){
  document.getElementById("valid2").innerHTML="This is required";
  }
  if (password2== ""){
  document.getElementById("valid3").innerHTML="This is required";
  }
  if (currentpassword !="" && password1 !="" && password2 !=""){
  if (password1.length < 6){
    document.getElementById("valid2").innerHTML="Password should be atleast 6 characters long";
    return;
  }
  else if (password1 != password2){
  swal("Passwords didn't match");
  return;
  }
  
  
    
  var loginInfo = {
  CurrentPassword: CryptoJS.MD5(currentpassword.toString()).toString(),
  NewPassword: CryptoJS.MD5(password1.toString()).toString(),
  
  };
  
  console.log(loginInfo);
  var urlUpdate = "https://localhost:44327/api/Login/resetPassword/" + window.localStorage.getItem("id").toString();
  console.log(urlUpdate);
  fetch(urlUpdate, {
  method: "PUT",
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " + window.localStorage.getItem("token").toString(),
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer",
  body: JSON.stringify(loginInfo),
  })
  //.then(response => response.json())
  .then((res) => res.json())
  .then((data) => {
  // console.log(data)
  if (data == 1){
  swal({
    title: "Success",
    text: "Password Updated Successfully!",
    icon: "success",
  });
  
  }
  else {
  swal({
    title: "Oops",
    text: "You Entered Wrong Password!",
    icon: "error",
  });
  }
  
  });
  document.getElementById("bt4").setAttribute("data-dismiss","modal");
  } 
  }

  function clearValue2(){
    document.getElementById("valid1").innerHTML = "";
    document.getElementById("valid2").innerHTML = "";
    document.getElementById("valid3").innerHTML = "";
    document.getElementById("currentpassword").value = "";
    document.getElementById("password1").value = "";
    document.getElementById("password2").value = "";
  }
 