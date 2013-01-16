function TodoListCtrl($scope){

	$scope.todo={ title: "", description: "", url: "", deadline: "", done: false }
	var urlparser=RegExp("^([a-z]*:?\/\/).*");

	$scope.add = function(){
		todo = this.todo;

		if(todo.title == "" && todo.url == "")return;
		
		console.log("add");
		
		if(todo.title == "")todo.title = todo.url;
		if(todo.url != "" && !urlparser.test(todo.url))todo.url="//"+todo.url;
		this.todos.push(todo);
		this.todo={ title: "", description: "", url: "", deadline: "", done: false }
		this.save();
		this.focus();
	}

	$scope.update = function(){
		console.log("update");
		//this.todos[index].done = !this.todos[index].done;
		//$scope.$apply();
		//saveData(todos);
		this.save();
	}

	$scope.remove = function(index){
		console.log("remove");
		this.todos.splice(index,1);
		//saveData(todos);
		this.save();
		//this.load();
		this.$apply();
		this.focus();
	}

	$scope.load = function(){
		console.log("load");
		this.todos=(JSON.parse(localStorage.getItem("stock"))||[]);
		this.focus();
	}

	$scope.save = function(){
		console.log("save");
		localStorage.setItem("stock",JSON.stringify(this.todos));
	}

	$scope.focus = function(){
		document.getElementById("title").focus();
	}

	window.remove = function(i){$scope.remove(i);}

	window.clear = function(){
		console.log("clear");
		$scope.todos=[];
		$scope.save();
		$scope.$apply();
		$scope.focus();
	}

	window.update=function(){$scope.update;}

	window.reload = function(){
		$scope.load();
		$scope.$apply();
	}

	/*window.onload = function(){
		$scope.load();
	}*/

	window.addEventListener("storage", reload,false);

	$scope.load();
}
