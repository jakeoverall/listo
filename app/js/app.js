$(document).on('ready', function() {
	$('#newTaskForm').hide();
	
	var newListArray = [];
	var inProgressArray = [];
	var finishedArray = [];
	var totalTasks = 0;

	var Task = function(task){
		this.task = task;
		this.id = totalTasks += 1;
	};

	Task.prototype.start = function(){
		debugger;
		for(var i = 0; i < newListArray.length; i++) {
			if(newListArray[i].id === this.id) {
				newListArray.splice(i, 1);
				inProgressArray.push(this);
				break;
			}
		}
	} 

	$('#newListItem').on('click',function() {
		$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
	});

	$('#cancel').on('click', function(e) {
		e.preventDefault();
		$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
	});

	var newObj = {};

	$('#saveNewItem').on('click', function(e) {
		e.preventDefault();
		var newItem = $('#newItemInput').val();
		newObj = new Task(newItem);
	

		if(newItem) {
			newListArray.push(newObj);
			console.log(newListArray);
			$('#newList').append('<li class="list-group-item" id="item">' + newObj.task + '<a href="#start" class="pull-right" id="startTask">Start &#x2192;</a></li>');
			$('#newItemInput').val('');
			$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');			
		}
	});







	 $(document).on('click', '#startTask', function() {
		$('#startTask').on('click', function(e) {
			 e.preventDefault();
			 debugger;
			 this.remove();
	});
		
});	

 	// $(document).on('click', '#startTask', function() {

// 		$('#startTask').on('click',function(){
// 			debugger;
// 			newObj.startTask();

// 			console.log(inProgressArray);
// 		});
// 	});
// });
	// $('#startTask').click(function(e){
	// 	debugger;
	// 	e.preventDefault();
	// 	inProgressArray.push(e)
 });
