
function clear(){
	localStorage.clear();
	load();
}

function postaction(){
	var name=document.getElementById("name");
	var description=document.getElementById("description");
	var url=document.getElementById("url");
	var deadline=document.getElementById("deadline");
	var done=document.getElementById("done");
	var data=loadData();
	var todo={"name":name.value,"description":description.value,"url":url.value,"deadline":deadline.value,"done":done.checked};
	data.push(todo);
	saveData(data);
	var form=document.getElementById("form");
	form.reset();
	load();
	console.log("add "+JSON.stringify(todo));
}

function loadData(){
	var collection=localStorage.getItem("stock");
	if(collection!=null){
		return JSON.parse(collection);
	}
	else return [];
}

function saveData(data){
	localStorage.setItem("stock",JSON.stringify(data));
}

function remove(i){
	var data=loadData();
	var todo=data.splice(i,1)[0];
	saveData(data);
	load();
	console.log("remove "+JSON.stringify(todo));
}

function update(i,status){
	var data=loadData();
	var todo=data.splice(i,1)[0];
	todo.done=status;
	data.splice(i,0,todo);
	saveData(data);
	load();
	console.log("status update to "+status+" "+JSON.stringify(todo));
}

function load(){
	var content=document.getElementById("content");
	var collection=localStorage.getItem("stock");
	if(collection!=null){
		var data=JSON.parse(collection);
		var contentString="";
		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].done){
				contentString+="<span class='done'><a href='http://"+data[i].url+"'>"+data[i].name+"</a> => "+data[i].description+" "+data[i].deadline+
					" <input type='checkbox' name='done' value='done' checked='"+data[i].done+"' onchange='update("+i+","+!data[i].done+")'/></span> "+
					"<a href='javascript:remove("+i+")'>remove</a> "+
					"<a href='https://www.google.com/search?q="+data[i].name+"'>google("+data[i].name+")</a>"+
					"<br/>";
			}
			else{
				contentString+="<span><a href='"+data[i].url+"'>"+data[i].name+"</a> => "+data[i].description+" "+data[i].deadline+
					" <input type='checkbox' name='done' value='done' onchange='update("+i+","+!data[i].done+")'/></span> "+
					"<a href='javascript:remove("+i+")'>remove</a> "+
					"<a href='https://www.google.com/search?q="+data[i].name+"'>google("+data[i].name+")</a>"+
					"<br/>";
			}
		};
		content.innerHTML=contentString;
	}
	else
		content.innerHTML="";
	document.getElementById("name").focus();
}

window.onload=load;

window.addEventListener("storage",load,false);
