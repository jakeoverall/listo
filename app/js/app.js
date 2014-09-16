// <<<<<<< HEAD
// $(document).on('ready', function() {
// 	$('#newTaskForm').hide();
	
// 	var newListArray = [];
// 	var inProgressArray = [];
// 	var finishedArray = [];
// 	var totalTasks = 0;

// 	var Task = function(task){
// 		this.task = task;
// 		this.id = totalTasks += 1;
// 		this.symbol = '&#10148;';
// 	};

// 	var newListMarkup = '<div class="">'+
// 						   		'<section class="col-md-4">'+
// 						   			'<div class="panel panel-danger ">'+
// 						   				'<div class="panel-heading">'+
// 						   					'<form class="form-group" id="newTaskForm" style="margin-top:">'+
// 						   						'<div class="input-group" style="margin-bottom:-40px;">'+
// 						   							'<div class="input-group-addon" id="saveNewItem">'+
// 						   								'<a href="">Save</a>'+
// 						   							'</div>'+
// 						   						'<div class="input-group-addon" id="cancel">'+
// 						   							'<a href="">Cancel</a>'+
// 						   						'</div>'+
// 						   						'<input class="form-control" type="text" id="newItemInput" placeholder="New Item">'+
// 						   						'</div>'+
// 						   					'</form>'+
// 						   					'<div class="new-item-header">'+
// 						   						'<span id="newHeading">New</span>'+
// 						   						'<a href="#newItem" class="pull-right pencil" id="newListItem" style="">&#9783;</a>'+
// 						   					'</div>'+
// 						   				'</div>'+
// 						   				'<div class="panel-body">'+
// 						   					'<ul class="list-group" id="newList">'+
// 						   					'</ul>'+
// 						   				'</div>'+
// 						   			'</div>'+
// 						   		'</section>'+
// 						   		'<section class="col-md-4">'+
// 						   			'<div class="panel panel-warning ">'+
// 						   				'<div class="panel-heading"> In Progress '+
// 						   				'</div>'+
// 					   					'<div class="panel-body" >'+
// 					   						'<ul class="list-group" id="currentList">'+
// 					   						'</ul>'+
// 					   					'</div>'+
// 						   			'</div>'+
// 						   		'</section>'+
// 						   		'<section class="col-md-4">'+
// 						   			'<div class="panel panel-success ">'+
// 						   				'<div class="panel-heading"> Archived'+
// 						   				'</div>'+
// 						   				'<div class="panel-body">'+
// 						   					'<ul class="list-group" id="archivedList">'+
// 						   					'</ul>'+
// 						   				'</div>'+
// 						   			'</div>'+
// 						   		'</section>'+
// 						   	'</div>'

// 	$('#newListItem').on('click',function() {
// 		$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
// 	});

// 	$('#cancel').on('click', function(e) {
// 		e.preventDefault();
// 		$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
// 	});

// 	var newObj = {};
// 	$('#saveNewItem').on('click', function(e) {
// 		e.preventDefault();
// 		var newItem = $('#newItemInput').val();
// 		newObj = new Task(newItem);
// 			 if(newItem) {
// 			newListArray.push(newObj);
// 		 	console.log(newListArray);
// 		 	$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">'+ newObj.task + '<span class="arrow pull-right">' +newObj.symbol+'</span></li></a>');
// 		 	$('#newItemInput').val('');
// 		 	$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');	
// 		}
// 	});


// $(document).on('click', '#item', function (e) {
// 		e.preventDefault();
// 		console.log(this);
// 		this.id = "finishTask";
// 		$('#currentList').append(this.outerHTML);

// 		this.remove();
// });

// $(document).on('click', '#finishTask', function (e) {
// debugger;	
// 		e.preventDefault();
// 		console.log(this);
// 		this.id = "archived";
// 		this.className = "archived"
// 		$('#archivedList').append(this.outerHTML);

// 		this.remove();
// })

// $(document).on('click', '#archived', function (e) {
// 		e.preventDefault();
// 		this.remove();
// })





// $('.container').bind('DOMSubtreeModified', function (e) {
//     if (e.target.innerHTML.length > 0) {
//     	$(".list-group-item").mouseenter(function(){
// 		$(this).find('.arrow').animate({ marginRight: '0px'}, 0)
// 			}).mouseleave(function(){
// 				$(this).find('.arrow').stop().css('marginRight', '100px')
// 			}).click(function(){
// 				$(this).find('.arrow').stop().css('marginRight', '100px');
// 			});
//     }
// });



// $('#createNewList').on('click', function() {
// 	$('.container').append(newListMarkup);
// });


// });	
// =======
$(document).on('ready', function () {
    
    $('#newTaskForm').hide();

    var listo = [];
    //var totalItems = listo.length;

    var Task = function (task) {
        this.task = task;
        this.id = 'new';
        this.symbol = '&#10148;';
        //this.objId = (totalItems += 1) + task;
    };

    var addTask = function (task) {
        listo.push(task);
        localStorage["listo"] = JSON.stringify(listo);
    };

    var save = function() {
        localStorage["listo"] = JSON.stringify(listo);
    };


    $('#newListItem').on('click', function () {
        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    });

    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    });

    
    $('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var newItem = $('#newItemInput').val();
        var task = {};
        if (newItem) {
            task = new Task(newItem);
            addTask(task);
            $('#newItemInput').val('');
            $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
            $('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right">' + task.symbol + '</span></li></a>');
        }
    });


    var populateLists = function () {
        var storedList = JSON.parse(localStorage.getItem("listo"));
        for (var i = 0; i < storedList.length; i++) {
            if (storedList[i].id === 'new') {
                $('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right">' + storedList[i].symbol + '</span></li></a>');
            } else if (storedList[i].id === 'inProgress') {
                $('#currentList').append('<a href="#finish" class="" id="inProgress"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right">' + storedList[i].symbol + '</span></li></a>');
            } else {
                $('#archivedList').append('<a href="#finish" class="" id="archived"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right">' + storedList[i].symbol + '</span></li></a>');
            }
        }
    };

    if (localStorage.getItem("listo")) {
        listo = JSON.parse(localStorage["listo"]);
        populateLists();
    }

    $(document).on('click', '#item', function (e) {
        e.preventDefault();
        debugger;
        var modified = this.innerText.slice(0, this.innerText.length - 2);
        
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task === modified) {
                listo[i].id = 'inProgress';
                save();
                break;
            }
        }
        this.id = "inProgress";
        $('#currentList').append(this.outerHTML);
        this.remove();
    });

    $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var modified = this.innerText.slice(0, this.innerText.length - 2);

        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task === modified) {
                listo[i].id = 'archived';
                save();
                break;
            }
        }
        this.id = "archived";
        $('#archivedList').append(this.outerHTML);
        this.remove();
    });

    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var modified = this.innerText.slice(0, this.innerText.length - 2);

        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task === modified) {
                listo.splice(i,1);
                save();
                break;
            }
        }
        this.remove();
    });

    $('.container').bind('DOMSubtreeModified', function (e) {
        if (e.target.innerHTML.length > 0) {
            $(".list-group-item").mouseenter(function () {
                $(this).find('.arrow').animate({ marginRight: '0px' }, 100)
            }).mouseleave(function () {
                $(this).find('.arrow').stop().css('marginRight', '100px')
            }).click(function () {
                $(this).find('.arrow').stop().css('marginRight', '100px');
            });
        }
    });

});
