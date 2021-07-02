// setting up variables
let theInput = document.querySelector('.todo__container__input input');
let addBtn = document.querySelector('.todo__container__input .plus');
let tasksContainer = document.querySelector('.tasks__content');
let tasksCount = document.querySelector('.tasks__count span');
let tasksComp = document.querySelector('.tasks__completed span');
let finish__all = document.querySelector('.finish__all');
let clear__all = document.querySelector('.clear__all');


// focus on input filed 

window.onload = function () {
    theInput.focus()
}

// add btn function 

addBtn.onclick = function () {
    if (theInput.value === "") {
        swal("Empty !", "You Should Add A Task!", "error");
    } else {
        let noTasksMessage = document.querySelector('.no__tasks__message');
        if (document.body.contains(document.querySelector('.no__tasks__message'))) {
            noTasksMessage.remove();
        }

        // Sweet Aleret
        swal("Good job!", "You Add A Task!", "success");

        // create elements
        let mainSpan = document.createElement('span');
        let imgDelete = document.createElement('img');
        let text = document.createTextNode(theInput.value);

        // add text to elements
        imgDelete.src = "images/icon-cross.svg";
        imgDelete.className = "delete";
        mainSpan.appendChild(imgDelete);
        mainSpan.appendChild(text);
        mainSpan.className = 'task__box';

        // add element to Main box
        tasksContainer.appendChild(mainSpan);

        // empty the input
        theInput.value = '';
        theInput.focus();

        // calc tasks
        calcTasks();

    }
}


document.addEventListener('click', function (e) {

    //remove task
    if (e.target.className == 'delete') {
        e.target.parentNode.remove();
    }

    if (tasksContainer.childElementCount == 0) {
        createNoTasks();
    }


    //add Finshed class on tasks

    if (e.target.classList.contains('task__box')) {

        e.target.classList.toggle('finished');
    }

    // calc tasks
    calcTasks();

    // check dark mode
    checkMode();

});


document.addEventListener('click', function (e) {
    //remove task
    if (e.target.className == 'clear__all') {
        document.querySelectorAll('.task__box').forEach(e => e.remove());
    }

});

finish__all.onclick = function () {
    document.querySelectorAll('.task__box').forEach(e => e.classList.toggle('finished'));
};


function createNoTasks() {
    let msgSpan = document.createElement('span');

    let msgText = document.createTextNode("No Tasks To Show");

    msgSpan.appendChild(msgText);

    msgSpan.className = "no__tasks__message";

    tasksContainer.appendChild(msgSpan);
}

// count tasks 
function calcTasks() {
    tasksCount.innerHTML = document.querySelectorAll('.tasks__content .task__box').length;
    tasksComp.innerHTML = document.querySelectorAll('.tasks__content .finished').length;
}

// Set Dark && Light Theme

let toggler = document.getElementById('toggler');

toggler.onclick = function () {
    document.querySelector('main').classList.toggle('light');
    document.querySelector('.tasks__content').classList.toggle('light');
    document.querySelector('.task__stats').classList.toggle('light');
    document.querySelector('.todo__container__input .input').classList.toggle('light');
    document.querySelectorAll('.task__box').forEach(e => e.classList.toggle('light'));
    addBtn.classList.add('light');

    // check dark or light mode
    checkMode();
}


function checkMode() {
    if ((document.querySelector('.tasks__content').classList.contains('light'))) {
        document.querySelectorAll('.task__box').forEach(e => e.classList.add('light'))
    }
}