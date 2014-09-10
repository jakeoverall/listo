$(document).ready(function() {
	$('#newTaskForm').hide();
	
	var newListArray = [];
	var inProgressArray = [];
	var finishedArray = [];

	$('#newListItem').click(function() {
		$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
	});

	$('#cancel').click(function(e) {
		e.preventDefault();
		$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
	});

	$('#saveNewItem').click(function(e) {
		e.preventDefault();
		var newItem = $('#newItemInput').val();
		var newObj = {
			body: newItem,
			id: newListArray.length,
			startTask: function(){				
				newListArray.splice(this.id, 1)
			}
		};
		if(newItem) {
			newListArray.push(newObj);
			console.log(newListArray);
			$('#newList').append('<li class="list-group-item" id="item">' + newObj.body + '<a href="#start" class="pull-right" id="startTask">Start &#x2192;</a></li>')
			$('#newItemInput').val('');
		}
	});

	$('#startTask').click(function(task){

	});

	// $('#newTaskForm').keypress(function(e) {
	// 	e.preventDefault();
	// 	var newItem = $('#newItemInput').val();		

		
	// });	

	$('#startTask').click(function(e){
		debugger;
		e.preventDefault();


	});


});