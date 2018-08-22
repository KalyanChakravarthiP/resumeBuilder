var request

var storeDB

function getData(){
	var career=document.getElementById("career").value;
	console.log(career);
	var name=document.getElementById("name").value;
	console.log(name);
	var role=document.getElementById("role").value;
	var mobile=document.getElementById("mobile").value;
	var email=document.getElementById("email").value;

	var program=document.getElementById("program").value;
	var web=document.getElementById("web").value;
	var db=document.getElementById("db").value;
	var os=document.getElementById("os").value;

	var degree=document.getElementById("degree").value;
	var degreecourse=document.getElementById("degreecourse").value;
	var gcollege=document.getElementById("gcollege").value;
	var gyear=document.getElementById("gyear").value;
	var gscore=document.getElementById("gscore").value;


	var inter=document.getElementById("inter").value;
	var intercourse=document.getElementById("intercourse").value;
	var icollege=document.getElementById("icollege").value;
	var iyear=document.getElementById("iyear").value;
	var iscore=document.getElementById("iscore").value;


	var school=document.getElementById("school").value;
	var syear=document.getElementById("syear").value;
	var sscore=document.getElementById("sscore").value;

	var ass1=document.getElementById("ass1").value;
	var ass2=document.getElementById("ass2").value;
	var ass3=document.getElementById("ass3").value;

	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
    READ_WRITE: "readwrite"
  }; // This line should only be needed if it is needed to support the object's constants for older browsers
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }

  var db;
request = indexedDB.open("myDatabase", 1);

  request.onupgradeneeded = function(e) {
    var dbHandler = e.target.result;
    storeDB = dbHandler.createObjectStore("myStore", {keyPath: "id"});


    console.log("upgraded");


  }



  request.onerror = function(event) {
    // Do something with request.errorCode!
    console.log("error " + event);
    alert("Why didn't you allow my web app to use IndexedDB?!");
  };



  request.onsuccess = function(event) {
    var dbHandler = event.target.result;
    transaction = dbHandler.transaction(["myStore"], 'readwrite'),
      storeDB = transaction.objectStore('myStore');

    storeDB.get(4).onsuccess = function(e) {
      console.log(e.target.result);
    };
storeDB.put({
      	id:5,
      	name:name,
      	role:role,
      	email:email

      });
    console.log("Success" + event);
  };

  var frm = document.getElementsByName('empForm')[0];
  console.log(frm);
  //    frm.submit(); // Submit the form
  frm.reset(); // Reset all form data
  return false;
}
