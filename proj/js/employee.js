var id;
var adminName;
var adminEmail;
var designation;

function fetchDevicesData() {
    fetch(`https://localhost:44327/api/employee/devices/${id}`, {
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
         let d = "";
          data.forEach((TempUser) => {
            console.log("Testing Employee"+ TempUser);
             d +=`<div class="col-xl-3 col-md-6 mb-4 ">
          <div class="card border-left-success shadow h-100 py-2 ">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div id="deviceName${TempUser.deviceId}" class="text-xl font-weight-bolder text-success text-uppercase mb-1" >${TempUser.deviceName}</div>
                  <div id="uniqueCode${TempUser.deviceId}" class="h6 mb-0 font-weight-bold text-gray-800">${TempUser.uniqueCode}</div>
                </div>
                <img src="img/img.jpg" style="height:60%;width:60%; margin-left:auto;margin-right:auto;">
                <div class="col-auto">
                  
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-danger m-2" data-target="#myModals" data-toggle="modal" onclick="deviceDetail(${TempUser.deviceId}) ; clearRequest(); clearValue()">
               
              <span class="text">Report Issue</span>
            </a>
            <a href="#" class="btn btn-secondary m-2" data-target="#returnModal" data-toggle="modal" onclick="deviceDetail(${TempUser.deviceId}) ; clearRequest(); clearValue()">
               
              <span class="text">Return Device</span>
            </a>
          </div>
        </div>`});
            
          document.getElementById('appendCard').innerHTML+=d;
          // do something with data
          console.log(data);
        })
        .catch(function (error) {
          console.log("Looks like there was a problem: \n", error);
        });
    
}

function onLoadEmployee(){
  CheckLoginEmp();
    id = window.localStorage.getItem("id").toString();
    fetchDevicesData();
    fetchEmployeeInfo();
}
 
 
 function CheckLoginEmp(){
   if(localStorage.getItem("token")==null)
   {
     
       window.open("index.html", "_blank");
     
   }
 }

function fetchEmployeeInfo(){
  fetch(`https://localhost:44327/api/employee/profile/${id}`,{
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // Authorization:
      //     "Bearer " + window.localStorage.getItem("token").toString(),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer'
}
)
.then(res => res.json())
.then(data => {
  data.forEach((TempUser) => {
    adminEmail= TempUser.employeeEmail;
    adminName=TempUser.employeeName;
    designation= TempUser.designation;
    // console.log(adminEmail, adminName, designation);
    });
    document.getElementById("ename").innerHTML = adminName +  " -";
    document.getElementById("edesignation").innerHTML= designation;   
    
});


}

function fetchempemail(){
  document.getElementById("empemail").value= adminEmail;
}
 function deviceDetail(doubleid){
 var a =  document.getElementById("deviceName"+ doubleid.toString()).innerHTML;
 document.getElementById("dname").value= a;
 var b =  document.getElementById("uniqueCode"+ doubleid.toString()).innerHTML;
 document.getElementById("dcode").value= b;
 document.getElementById("demail").value= adminEmail;
 document.getElementById("remail").value= adminEmail;
 document.getElementById("rname").value= a;
 document.getElementById("rcode").value= b;
 }


 /// SMTP Request ///

 //Request Device
 function sendRequest(){
  
   document.getElementById("spin1").style.display="block";
  var email = $('#empemail').val();
  var details = $('#empdetails').val();
  var Body='<br>Email: '+email+'<br>Request for Device: '+details;


  Email.send({
    SecureToken:"91fccd48-e439-446b-ab0c-1f06552dfcb8",
    To: "cygrp.itdesk@gmail.com",
    From: email,
    Subject: "New request for device on contact from "+email,
    Body: Body
  }).then(
    message =>{
      document.getElementById("spin1").style.display="none";
      //console.log (message);
      if(message=='OK'){
        swal({
          title: "Success",
          text: "Device Request Sent Successfully!",
          icon: "success",
        });
      }
      else{
        swal({
          title: "Oops!",
          text: "Failed To Send Device Request!",
          icon: "error",
        });
        
      }
    
    }
    
  );
  
 }
  function clearRequest(){
    document.getElementById("empdetails").value="";
    document.getElementById("ddetails").value="";
    document.getElementById("rdetails").value="";
  }

 
 //Report Device
 function sendReport(){
  
  document.getElementById("spin1").style.display="block";
  var email = $('#demail').val();
  var devicename = $('#dname').val();
  var uniquecode = $('#dcode').val();
  var details = $('#ddetails').val();
  var Body='<br>Email: '+email+'<br>Report an issue for Device Name: '+devicename+'<br>Device unique code: '+uniquecode+'<br>Issue faced in Device: '+details;

  Email.send({
    SecureToken:"91fccd48-e439-446b-ab0c-1f06552dfcb8",
    To: "cygrp.itdesk@gmail.com",
    From: email,
    Subject: "Issue reported for device on contact from "+email,
    Body: Body
  }).then(
    message =>{
      document.getElementById("spin1").style.display="none";
      //console.log (message);
      if(message=='OK'){
        swal({
          title: "Success",
          text: "Issue Reported Successfully!",
          icon: "success",
        });
      }
      else{
        swal({
          title: "Oops!",
          text: "Failed To Report Issue!",
          icon: "error",
        });
        
      }

    }
  );
 }

 //Return Device

 function sendReturn(){
  
  document.getElementById("spin1").style.display="block";
  var email = $('#remail').val();
  var devicename = $('#rname').val();
  var uniquecode = $('#rcode').val();
  var details = $('#rdetails').val();
  var Body='<br>Email: '+email+'<br>Return request for Device Name: '+devicename+'<br>Device unique code: '+uniquecode+'<br>Reason for return request: '+details;

  Email.send({
    SecureToken:"91fccd48-e439-446b-ab0c-1f06552dfcb8",
    To: "cygrp.itdesk@gmail.com",
    From: email,
    Subject: "Return Request for device on contact from "+email,
    Body: Body
  }).then(
    message =>{
      document.getElementById("spin1").style.display="none";
      //console.log (message);
      if(message=='OK'){
        swal({
          title: "Success",
          text: "Return Request Successfully!",
          icon: "success",
        });
      }
      else{
        swal({
          title: "Oops!",
          text: "Failed To Return Device!",
          icon: "error",
        });
        
      }

    }
  );

 }

 function validation(){
   if(document.getElementById("empdetails").value.length == 0){
     document.getElementById("validate1").innerHTML = "This is required";
   }
   else{
     document.getElementById("bt1").setAttribute("data-dismiss", "modal");
     sendRequest();
   }
   if(document.getElementById("rdetails").value.length == 0){
    document.getElementById("validate2").innerHTML = "This is required";
  }
  else{
    document.getElementById("bt2").setAttribute("data-dismiss", "modal");
    sendReturn();
  }
  if(document.getElementById("ddetails").value.length == 0){
    document.getElementById("validate3").innerHTML = "This is required";
  }
  else{
    document.getElementById("bt3").setAttribute("data-dismiss", "modal");
    sendReport();
  }
 }

 function clearValue(){
   document.getElementById("validate1").innerHTML = "";
   document.getElementById("validate2").innerHTML = "";
   document.getElementById("validate3").innerHTML = "";
 }


 
