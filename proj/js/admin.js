var category= 1;
var globalDeviceId= 0;
var id;
var adminEmail= "";
var adminName="";
var designation= "";

function onLoadAdmin(){
 // CheckLogin();
  fetchFree();
 id = window.localStorage.getItem("id").toString();
 fetchEmployeeInfo();
 fetchAdminInfo();
 
}


function CheckLogin(){
  if(localStorage.getItem("token")==null)
  {
    console.log("Hi Hello");
      window.open("www.google.com", "_blank");
    
  }
}

function fetchAdminInfo(){
  document.getElementById("spin2").style.display="block";
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
  document.getElementById("spin2").style.display="none";
  data.forEach((TempUser) => {
    adminEmail= TempUser.employeeEmail;
    adminName=TempUser.employeeName;
    designation= TempUser.designation;
    // console.log(adminEmail, adminName, designation);
    });
    document.getElementById("aName").innerHTML = adminName +`<br>`;
    // document.getElementById("edesignation").innerHTML= designation;   
    
});


}





function fetchFree(){
  fetchFreeCategory();
  document.getElementById("spin2").style.display="block";
	fetch(`https://localhost:44327/api/deviceinfo/data?isAssigned=false&&categoryId=${category}`,{
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
      document.getElementById("spin2").style.display="none";
        console.log(data);
        let li = ` <thead><tr>
        <th scope="col">Device Name</th>
        
        <th scope="col">Unique Code </th>
        <th scope="col">Action(s)</th>
      </tr> </thead>`;
                data.forEach(TempUser => {
                  var uq ="\'"+ TempUser.uniqueCode.toString() + "\'"; 
                   
console.log(uq);
                li += ` <tr>
                <td id= "dn${TempUser.deviceId}" data-label="Device Name">${TempUser.deviceName}</td>
              
                <td  id= "dc${TempUser.deviceId}" data-label="Unique Code">${TempUser.uniqueCode}</td>
                <td data-label="Action">
                <button href="#" class="btn btn-success btn-circle btn-sm" onclick="clearVal()">
                <i class="fas fa-user" data-toggle="modal" data-target="#allocateDeviceModal" onclick="fetchEmployeeEmail(${TempUser.deviceId}) ; fetchdetail(${TempUser.deviceId})"></i>
            </button>
            <button href="#" class="btn btn-warning btn-circle btn-sm" data-toggle="modal" data-target="#auditTrailModal" onclick="auditTrail(${uq})">
                <i class="fas fa-history"></i>
            </button>
            <button href="#" class="btn btn-danger btn-circle btn-sm" onclick="deleteDevice(${TempUser.deviceId})">
                <i class="fas fa-trash"></i>
            </button>
                </td>
                </td>
              </tr>`
				});

	document.getElementById('Table').innerHTML=li;
});
document.getElementById("free").style.backgroundColor="black";
document.getElementById("free").style.color="white";
document.getElementById("allocated").style.backgroundColor="gray";
}

function fetchAllocated(){
  document.getElementById("spin2").style.display="block";
  fetchAllocatedCategory();
    fetch(`https://localhost:44327/api/deviceinfo/data?isAssigned=true&&categoryId=${category}`, {
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // Authorization:
        //   "Bearer " + window.localStorage.getItem("token").toString(),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
        let li = `
        <thead>
            <tr>
              <th scope="col">Device Name</th>
              <th scope="col">Unique Code</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Assigned Date</th>
              <th scope="col">Assigned By</th>
              <th scope="col">Action(s)</th>
            </tr>
          </thead>
        `;
        data.forEach((TempUser) => {
          // console.log(user);
          document.getElementById("spin2").style.display="none";
                  var uq ="\'"+ TempUser.uniqueCode.toString() + "\'"; 
                  var qr ="\'"+ TempUser.qrCode+ "\'"; 
console.log(qr);
          li += `  <tr>
          <td data-label="Device Name">${TempUser.deviceName}</td>
          <td data-label="Unique Code">${TempUser.uniqueCode}</td>
          <td data-label="Assigned To">${TempUser.employeeEmail}</td>
          <td data-label="Assigned Date">${TempUser.assignedDate.slice(0,10)}</td>
          <td data-label="Assigned By">${TempUser.assignedBy}</td>
          <td data-label="Action">
          <button href="#" class="btn btn-success btn-circle btn-sm" onclick="deallocate(${TempUser.deviceId})">
          <i class="fas fa-user-slash"></i>
      </button>
      <button href="#" class="btn btn-warning btn-circle btn-sm" data-toggle="modal" data-target="#auditTrailModal" onclick="auditTrail(${uq})">
          <i class="fas fa-history"></i>
      </button>
      <button href="#" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#myModalQR" onclick="showQR(${qr})">
          <i class="fas fa-qrcode"></i>
      </button>
          </td>
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


function addDeviceDashboard(){
  clearVal();
  document.getElementById("spin2").style.display="block";
    fetch(`https://localhost:44327/api/deviceinfo/categorylist`, {
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
        document.getElementById("spin2").style.display="none";
          console.log(data);
        let li = "<option selected disabled>Select a Device Category</option>";
        data.forEach((TempUser) => {
          // console.log(user);
          li += ` <option value="${TempUser.categoryId}">${TempUser.deviceType}</option>`;
        });
        document.getElementById("categoryDropdown").innerHTML = li;
  
        // do something with data
        console.log(data);
      })
      .catch(function (error) {
        console.log("Looks like there was a problem: \n", error);
      });
   
      fetchFree();
}


function addDeviceModal(){
    var unique = document.getElementById("uniquecode").value;
  var device = document.getElementById("newDeviceName").value;
  var type=document.getElementById("categoryDropdown").value;

  document.getElementById("spin2").style.display="block";
var newDeviceInfo = {
    uniqueCode: unique,
    deviceName: device,
    categoryId:type
}
console.log(newDeviceInfo);
  fetch("https://localhost:44327/api/deviceInfo/addDevice", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(newDeviceInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("spin2").style.display="none";
      console.log(data+ "deleted  data");
      if(data == 0)
      {
       swal("Oops! You cannot add this device!", {
         icon: "error",
         text: `This Unique Code "${unique}" already exist`,
       });
       
      }
      else{
        fetchFree();
       swal("Your device has been added successfully!", {
         icon: "success",
       });
      }
  
 })


    
    // .then((result) => {
      
    //   swal({
    //     title: "Success",
    //     text: "Device Added Successfully!",
    //     icon: "success",
    //   });
    // }).catch(err => {
    //   swal({
    //     title: "Oops!",
    //     text: "Failed To Add Device!",
    //     icon: "error",
    //   });
    // })
}


function fetchEmployeeEmail(deviceId) {
  console.log(deviceId + "My Device Id");
  document.getElementById("spin2").style.display="block";
  globalDeviceId= deviceId;
  fetch(`https://localhost:44327/api/employee/employeeEmail`, {
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // Authorization:
        //   "Bearer " + window.localStorage.getItem("token").toString(),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("spin2").style.display="none";
          console.log(data);
        let li = "<option selected disabled>Select a Employee Email</option>";
        data.forEach((TempUser) => {
          // console.log(user);
          li += ` <option value="${TempUser.employeeId}">${TempUser.employeeEmail}</option>`;
        });
        document.getElementById("employeeDropdown").innerHTML = li;
  
        // do something with data
        console.log(data);
      })
      .catch(function (error) {
        console.log("Looks like there was a problem: \n", error);
      });
    
}

function fetchEmployeeInfo(){
  document.getElementById("spin2").style.display="block";
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
  document.getElementById("spin2").style.display="none";
  data.forEach((TempUser) => {
    adminEmail= TempUser.employeeEmail;
    adminName=TempUser.employeeName;
    designation= TempUser.designation;
    console.log(adminEmail, adminName, designation);
    });
    
    
});
}


function allocateEmployee(){
  var date = new Date();
  var assignedDate = date.toISOString().slice(0, 10);
  var employeeId=document.getElementById("employeeDropdown").value;
  document.getElementById("spin2").style.display="block";

  var allocateInfo ={
    AssignedDate: assignedDate,
    EmployeeId: employeeId,
    AssignedBy: adminName, 
    IsAssigned: 1
  }
    // console.log(allocateInfo);
console.log(globalDeviceId);

  fetch(`https://localhost:44327/api/deviceInfo/allocate/${globalDeviceId}`, {
    method: "PUT",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", 
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // Authorization:
      //   "Bearer " + window.localStorage.getItem("token").toString(),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: JSON.stringify(allocateInfo),
  })
    //.then(response => response.json())
    .then((result) => {
      document.getElementById("spin2").style.display="none";
      swal({
        title: "Success",
        text: "Device Allocated Successfully!",
        icon: "success",
      });
    }).catch(err => {
      swal({
        title: "Oops!",
        text: "Failed To Allocate Device!",
        icon: "error",
      });
    })
   
    fetchAllocated();

}



function deleteDevice(deviceDeleteId) {
  document.getElementById("spin2").style.display="block";
   
    var urlDelete = `https://localhost:44327/api/deviceInfo/${deviceDeleteId}`;
    console.log(deviceDeleteId);
    fetch(urlDelete, {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    })
      //.then(response => response.json())
      .then((result) => {
        document.getElementById("spin2").style.display="none";
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to reuse this!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your device has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Your Device is safe!");
          }
        });
      })
    
  
  fetchFree();
}

function auditTrail(uniqueCode) {
  document.getElementById("spin2").style.display="block";
  fetch(`https://localhost:44327/api/deviceInfo/auditTrail/${uniqueCode}`, {
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // Authorization:
        //   "Bearer " + window.localStorage.getItem("token").toString(),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Ok data Check"+ data.length);
        document.getElementById("spin2").style.display="none";
          console.log(data);
         
          if(data.length == 0)
          {
            document.getElementById("authorisePara").style.display = "block";
            document.getElementById("auditTrailTable").innerHTML = "";
          }
          else{
            document.getElementById("authorisePara").style.display = "none";
           let  li = `
            <thead>
                <tr>
                  <th scope="col">Employee Email</th>
                  <th scope="col">Hand-over Date</th>
                </tr>
              </thead>
            `;
            data.forEach((TempUser) => {
              console.log(TempUser);
              li += `  <tr>
              <td data-label="Device Name">${TempUser.employeeEmail}</td>
              <td data-label="hand Over">${TempUser.date.slice(0,10)}</td>
             
            </tr>`;
            });
            document.getElementById("auditTrailTable").innerHTML = li;
          }
       
        
  
        // do something with data
        console.log(data);
      })
      .catch(function (error) {
        console.log("Looks like there was a problem: \n", error);
      });
}

function deallocate(deviceDeallocateId){
  document.getElementById("spin2").style.display="block";
  fetch(`https://localhost:44327/api/deviceInfo/deallocate/${deviceDeallocateId}`, {
    method: "PUT",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", 
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // Authorization:
      //   "Bearer " + window.localStorage.getItem("token").toString(),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  })
    //.then(response => response.json())
    .then((result) => {
      document.getElementById("spin2").style.display="none";
      swal({
        title: "Are you sure?",
        text: "Once deallocate, existing user wont br able to use it!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! The device has been deallocated!", {
            icon: "success",
          });
        } else {
          swal("DeAllocation Aborted!");
        }
      });
    })
    fetchAllocated();

}


function fetchAllocatedCategory() {
  document.getElementById("spin2").style.display="block";
  fetch(`https://localhost:44327/api/deviceInfo/categoryList`, {
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // Authorization:
      //   "Bearer " + window.localStorage.getItem("token").toString(),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("spin2").style.display="none";
        console.log(data);
      let li = ` <div class="col-xl-3 col-md-6 mb-4 cp" id="addCategory" data-toggle="modal" data-target="#myModalAddDevice" onclick="clearCategory();clearVal();"> 
      <div class="card border-left-warning shadow h-100 py-2">
          <div class="card-body">
              <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-warning text-uppercase ">
                          Add Device Category</div>
                  </div>
                  <div class="col-auto">
                      <i class="fas fa-plus fa-2x text-gray-300"></i>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
      data.forEach((TempUser) => {
         console.log(TempUser +"THis si category");
        li += ` 
        <div class="col-xl-3 col-md-6 mb-4" onclick="selectCategory(${TempUser.categoryId})" style="cursor:pointer;">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top:-28px; margin-right: -12px;" onclick="deleteCategorySwal(${TempUser.categoryId})"><span aria-hidden="true">×</span></button>
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                  ${TempUser.deviceType}</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800"><span style="font-size: 3rem"><b>${TempUser.allocatedCount}</b></span>/${TempUser.totalCount}</div>
              </div>
              <img src="img/img.jpg" style="height:50%;width:50%">
              <div class="col-auto">
                <i class="fas fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      });
      document.getElementById("appendCard").innerHTML = li;

      // do something with data
      console.log(data);
    })
    .catch(function (error) {
      console.log("Looks like there was a problem: \n", error);
    });
}



function selectCategory(categoryId){
category= categoryId;
fetchFree();

}

function fetchFreeCategory() {
  document.getElementById("spin2").style.display="block";
  fetch(`https://localhost:44327/api/deviceInfo/categoryList`, {
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // Authorization:
      //   "Bearer " + window.localStorage.getItem("token").toString(),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("spin2").style.display="none";
        console.log(data);
      let li = `
      <div class="col-xl-3 col-md-6 mb-4 cp" id="addCategory" data-toggle="modal" data-target="#myModalAddDevice" onclick="clearCategory();clearVal()"> 
      <div class="card border-left-warning shadow h-100 py-2">
          <div class="card-body">
          
              <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-warning text-uppercase ">
                      
                          Add Device Category</div>
                  </div>
                  <div class="col-auto">
                      <i class="fas fa-plus fa-2x text-gray-300"></i>
                  </div>
              </div>
          </div>
      </div>
  </div>
      `;
      data.forEach((TempUser) => {
         console.log(TempUser +"THis si category");
        li += ` 
        <div class="col-xl-3 col-md-6 mb-4" onclick="selectCategory(${TempUser.categoryId})" style="cursor:pointer;">
        <div class="card border-left-success shadow h-100 py-2">
        
          <div class="card-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top:-28px; margin-right: -12px;" onclick="deleteCategorySwal(${TempUser.categoryId})"><span aria-hidden="true">×</span></button>
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                  ${TempUser.deviceType}</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800"><span style="font-size: 3rem"><b>${TempUser.freeCount}</b></span>/${TempUser.totalCount}</div>
              </div>
              <img src="img/img.jpg" style="height:50%;width:50%">
              <div class="col-auto">
                <i class="fas fa-2x text-gray-300">
               
                </i>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      });
      document.getElementById("appendCard").innerHTML = li;

      // do something with data
      console.log(data);
    })
    .catch(function (error) {
      console.log("Looks like there was a problem: \n", error);
    });
}

function addDeviceCatgoryModal() {
  document.getElementById("spin2").style.display="block";
  var deviceCategory= document.getElementById("deviceCategory").value;

  var devCategory= {
    DeviceType: deviceCategory.toString()
  }
  fetch("https://localhost:44327/api/deviceInfo/category", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(devCategory),
  })
    .then((response) => response.text())
    .then((response) => {
      console.log("Bearer " + response);
      var obj = JSON.parse(response);

    })

    .then((result) => {
      document.getElementById("spin2").style.display="none";
      swal({
        title: "Success",
        text: "Device Category Added Successfully!",
        icon: "success",
      });
      fetchFree();
    }).catch(err => {
      swal({
        title: "Oops!",
        text: "Failed To Add Device category!",
        icon: "error",
      });
    })
    
}

function deleteCategory(deleteId){
  var urlDelete = `https://localhost:44327/api/deviceInfo/deleteCategory/${deleteId}`;
  document.getElementById("spin2").style.display="block";
    fetch(urlDelete, {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    })
      //.then(response => response.json())
      .then((res) => res.json())
         .then((data) => {
           console.log(data+ "log data");
           document.getElementById("spin2").style.display="none";
           if(data == 0)
           {
            swal("Oops! You cannot delete this device category!", {
              icon: "error",
              text: "Delete all devices allocated to this category to continue.",
            });
            
           }
           else{
             fetchFree();
            swal("Poof! Your device category has been deleted!", {
              icon: "success",
            });
           }
       
      })

    
  
  
}
function deleteCategorySwal(deleteId) {

  swal({
    title: "Are you sure you want to delete this category?",
    text: "Once deleted, you will not be able to reuse this!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      deleteCategory(deleteId);
    } else {
      swal("Your Device category is safe!");
    }
  });
}

function showQR(deviceQR) {
  document.getElementById("myQRimg").src = deviceQR;
}
function fetchdetail(i){
  var a = document.getElementById("dn" + i.toString()).innerHTML;
  document.getElementById("dnn").innerHTML = a;

  var b = document.getElementById("dc" + i.toString()).innerHTML;
  document.getElementById("dcc").innerHTML = b;

}

function allocatemail(){

  document.getElementById("spin2").style.display="block";
   var email = $('#employeeDropdown :selected').text();
   var devicename = document.getElementById("dnn").innerHTML;
   var uniquecode = document.getElementById("dcc").innerHTML;
   var Body='<br>Confirmation of Device Allotment to: '+email+'<br>Device Name: '+devicename+'<br>Unique Code: '+uniquecode;
 
    console.log(email, devicename, uniquecode);
   Email.send({
     SecureToken:"91fccd48-e439-446b-ab0c-1f06552dfcb8",
     To: email,
     From:"cygrp.itdesk@gmail.com",
     Subject: "Confirmation of Device Allotment for "+email,
     Body: Body
   }).then(
     message =>{
       document.getElementById("spin2").style.display="none";
      //  console.log (message);
       if(message=='OK'){
         swal({
           title: "Success",
           text: "Device Has Been Successfully Alotted!",
           icon: "success",
         });
       }
       else{
         swal({
           title: "Oops!",
           text: "Device Allotment Failed !",
           icon: "error",
         });
         
       }
     
     }
     
   );
}