
function clear(){
	localStorage.clear();
	load();
}

function postaction(){
	var name=document.getElementById("title").value;
	var description=document.getElementById("description").value;
	var url=document.getElementById("url").value;
	var deadline=document.getElementById("deadline").value;
	var done=document.getElementById("done").checked;
	if(name == "" && url != "") name = url;
	if(name == "")return;
	var data=loadData();
	var todo={"title":name,"description":description,"url":url,"deadline":deadline,"done":done};
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
			var style="";
			var checked="";
			var name="";
			var date="";
			var arrow = "";
			if(data[i].done){
				style="done";
				checked="checked='"+data[i].done+"' ";
			}

			if(data[i].url == "") name = data[i].title;
			else name = "<a href='//"+data[i].url+"'>"+data[i].title+"</a>";

			if(data[i].deadline != "") date=" ("+data[i].deadline+") ";

			if(data[i].deadline != "" || data[i].description != "") arrow = " => ";

			contentString+="<span class='"+style+"'>"+name+arrow+data[i].description+date+
				" <input type='checkbox' name='done' value='done' "+checked+" onchange='update("+i+","+!data[i].done+")'/></span> "+
				"<a href='javascript:remove("+i+")'>remove</a> "+
				"<a href='https://www.google.com/search?q="+data[i].title+"'>google("+data[i].title+")</a>"+
				"<br/>";
		};
		content.innerHTML=contentString;
	}
	else
		content.innerHTML="";
	document.getElementById("title").focus();
}

window.onload=load;

window.addEventListener("storage",load,false);
