
function clear(){
	localStorage.clear();
	load();
}

function postaction(){
	var name=document.getElementById("name").value;
	var description=document.getElementById("description").value;
	var url=document.getElementById("url").value;
	var deadline=document.getElementById("deadline").value;
	var done=document.getElementById("done").checked;
	if(name=="" and url!="")name=url;
	if(name=="")return;
	var data=loadData();
	var todo={"name":name,"description":description,"url":url,"deadline":deadline,"done":done};
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
			if(data[i].done){
				style="done";
				checked="checked='"+data[i].done+"' ";
			}

			contentString+="<span class='"+style+"'><a href='http://"+data[i].url+"'>"+data[i].name+"</a> => "+data[i].description+" "+data[i].deadline+
				" <input type='checkbox' name='done' value='done' "+checked+" onchange='update("+i+","+!data[i].done+")'/></span> "+
				"<a href='javascript:remove("+i+")'>remove</a> "+
				"<a href='https://www.google.com/search?q="+data[i].name+"'>google("+data[i].name+")</a>"+
				"<br/>";
/*			}
			else{
				contentString+="<span><a href='http://"+data[i].url+"'>"+data[i].name+"</a> => "+data[i].description+" "+data[i].deadline+
					" <input type='checkbox' name='done' value='done' onchange='update("+i+","+!data[i].done+")'/></span> "+
					"<a href='javascript:remove("+i+")'>remove</a> "+
					"<a href='https://www.google.com/search?q="+data[i].name+"'>google("+data[i].name+")</a>"+
					"<br/>";
			}*/
		};
		content.innerHTML=contentString;
	}
	else
		content.innerHTML="";
	document.getElementById("name").focus();
}

window.onload=load;

window.addEventListener("storage",load,false);
