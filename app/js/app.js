$(document).on('ready', function () {
    
    //----------------- JavaScript Basics -------------------------

    //a normal js array that is used for temporary storage.
    //this array has to constantly be save to the local storage to have 
    //persisiting data
    var listo = [];
    
    //A constructor for making task objects
    var Task = function (task) {
        this.task = task;
        this.id = 'new';
    };

    var addTask = function (task) {
        if (task) {
            // Uses the Task Constructor function to make a task object
            task = new Task(task);
            // This adds the item to local storage by pushing it to the array
            listo.push(task);
            save();
            
            //----------- JQuery functions --------------

            //resets the form
            $('#newItemInput').val('');
            $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');

            //append the new task to the new list
            $('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
        }
    };
    
    //----------------- JQuery functions -------------------------
    //Hides form on page load
    $('#newTaskForm').hide();
    //Opens form
    $('#newListItem').on('click', function () {
        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    });
    //closes form
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    });

    //handles mouse click for adding items to the new list
    $('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });
    //handles pressing enter for adding items to the new list
    $('#newItemInput').on('keypress', function(e) {
        if (e.which === 13) {
    	    var task = $('#newItemInput').val().trim();
    	    addTask(task);
    	}
    });

    //moves tasks to the inProgress list
    $(document).on('click', '#item', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = "inProgress";
        $('#currentList').append(this.outerHTML);
    });

    //Moves tasks to the archived list
    $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
    });

    //Destroys tasks
    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
    });
    
    //--------------- Local Storage ----------------------

    /* Gets the array listo stored on local storage and
populates each list according to task id */
    var populateLists = function () {
        var storedList = JSON.parse(localStorage.getItem("listo"));
        for (var i = 0; i < storedList.length; i++) {
            if (storedList[i].id === 'new') {
                $('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
            } else if (storedList[i].id === 'inProgress') {
                $('#currentList').append('<a href="#finish" class="" id="inProgress"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
            } else {
                $('#archivedList').append('<a href="#finish" class="" id="archived"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-remove"></i></span></li></a>');
            }
        }
    };

    /* Checks local storage for the array "listo"
    on page load and will call populate lists if listo is found */
    if (localStorage.getItem("listo")) {
        listo = JSON.parse(localStorage["listo"]);
        populateLists();
    }

    //A function that identifies tasks and changes their id 
    var advanceTask = function (task) {
        var modified = task.innerText.trim();
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task === modified) {
                if (listo[i].id === 'new') {
                    listo[i].id = 'inProgress';
                } else if (listo[i].id === 'inProgress') {
                    listo[i].id = 'archived';
                } else {
                    listo.splice(i, 1);
                }
                save();
                break;
            }
        }
        task.remove();
    };

    //Saves the array listo to local storage;
    var save = function () {
        localStorage["listo"] = JSON.stringify(listo);
    };

    //JQuery watcher 
    $('.container').bind('DOMSubtreeModified', function (e) {
        if (e.target.innerHTML.length > 0) {
            $(".list-group-item").mouseenter(function () {
                $(this).find('.arrow').animate({ marginRight: '0px' }, 0);
            }).mouseleave(function () {
                $(this).find('.arrow').stop().css('marginRight', '20px');
            }).click(function () {
                $(this).find('.arrow').stop().css('marginRight', '20px');
            });
        }
    });

});
