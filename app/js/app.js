$(document).on('ready', function() {
	$('#newTaskForm').hide();
	
	var newListArray = [];
	var inProgressArray = [];
	var finishedArray = [];
	var totalTasks = 0;

	var Task = function(task){
		this.task = task;
		this.id = totalTasks += 1;
		this.symbol = '&#10148;';
	};


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
		 	$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">'+ newObj.task + '<span class="arrow pull-right">' +newObj.symbol+'</span></li></a>');
		 	$('#newItemInput').val('');
		 	$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');	
		}
	});


$(document).on('click', '#item', function (e) {
		e.preventDefault();
		console.log(this);
		this.id = "finishTask";
		$('#currentList').append(this.outerHTML);

		this.remove();
});

$(document).on('click', '#finishTask', function (e) {
debugger;	
		e.preventDefault();
		console.log(this);
		this.id = "archived";
		this.className = "archived"
		$('#archivedList').append(this.outerHTML);

		this.remove();
})

$(document).on('click', '#archived', function (e) {
		e.preventDefault();
		this.remove();
})





$('.container').bind('DOMSubtreeModified', function (e) {
    if (e.target.innerHTML.length > 0) {
    	$(".list-group-item").mouseenter(function(){
		$(this).find('.arrow').animate({ marginRight: '0px'}, 100)
			}).mouseleave(function(){
				$(this).find('.arrow').stop().css('marginRight', '100px')
			}).click(function(){
				$(this).find('.arrow').stop().css('marginRight', '100px');
			});
    }
});



});	

