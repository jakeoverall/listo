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