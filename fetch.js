fetch("database/info.json").then(response=>{
	return response.json();
}).then(myJson=>{
	console.log(myJson);
	profile(myJson.profile);
})

// var body=document.querySelector("#body");

// var mainDiv=document.createElement("div");
// mainDiv.classList.add("parent");
// body.appendChild(mainDiv);


var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

if(!window.indexedDB){
	alert("sorry");
} else {
	console.log("success");
}



var openDB=indexedDB.open("myDatabase",3);



function profile(pro){

// DataBase Upgrading
openDB.onupgradeneeded = function() {
    var db = openDB.result;
    var store = db.createObjectStore("myStore", {keyPath: "id"});
    // var index = store.createIndex("NameIndex", ["data.name"]);
};

openDB.onsuccess=function(){
	var db=openDB.result;
	var tx=db.transaction("myStore", "readwrite");
	var store=tx.objectStore("myStore");

	for (var i = 0; i < pro.length; i++) {
	store.put({id:pro[i].id, name:pro[i].name,role:pro[i].role})
	pro[i]
}

function getAllprofiles(callback){
var trans=db.transaction("myStore", IDBTransaction.READ_ONLY);
var store=trans.objectStore("myStore");
var items=[];

trans.oncomplete = function(evt) {  
        callback(items);
    };
 
    var cursorRequest = store.openCursor();
 
    cursorRequest.onerror = function(error) {
        console.log(error);
    };
 
    cursorRequest.onsuccess = function(evt) {                    
        var cursor = evt.target.result;
        if (cursor) {
            items.push(cursor.value);
            cursor.continue();
        }
    };

}

var body=document.querySelector("#body");

getAllprofiles(function (items) {
    var len = items.length;
    console.log(len);
    var mainDiv=document.createElement("section");
    mainDiv.classList.add("mainDiv")
    body.appendChild(mainDiv);
    for (var i = 0; i < len; i += 1) {
    	var childDiv=document.createElement("div");
    	childDiv.classList.add("childDiv");
    	mainDiv.appendChild(childDiv);
    	var thumbnail=document.createElement("img");
    	thumbnail.src="images/boy.svg";
    	thumbnail.classList.add("profileImg");

    	var title=document.createElement("h3");
    	title.textContent=items[i].name;

    	var role=document.createElement("h3");
    	role.style.color="red";
    	role.textContent=items[i].role;

    	var button=document.createElement("a");
    	button.href="book.html?id="+items[i].id;
    	button.textContent="View Profile";
        button.classList.add("a");

    	childDiv.appendChild(thumbnail);
    	childDiv.appendChild(title);
    	childDiv.appendChild(role);
    	childDiv.appendChild(button);
        console.log(items[i]);
    }
});

tx.oncomplete = function() {
        db.close();
    };

}

}



