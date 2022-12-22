$(document).ready(function(){
    var lists = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
      todolist: [],
      donelist: []
    };

    var removeSVG = '<svg id="remove" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" width="23px" height="23px"><g id="surface8482126"><rect x="0" y="0" width="20" height="20" style="fill:rgb(86.666667%,86.666667%,86.666667%);fill-opacity:0.03137;stroke:none;"/><path stroke="none" fill-rule="nonzero" fill="rgb(145, 144, 144)" fill-opacity="1" d="M 21 6.75 C 20.171875 6.75 19.5 7.421875 19.5 8.25 L 19.5 9 L 10.5 9 C 9.671875 9 9 9.671875 9 10.5 C 9 11.328125 9.671875 12 10.5 12 L 37.5 12 C 38.328125 12 39 11.328125 39 10.5 C 39 9.671875 38.328125 9 37.5 9 L 28.5 9 L 28.5 8.25 C 28.5 7.421875 27.828125 6.75 27 6.75 Z M 11.25 13.5 L 11.25 34.5 C 11.25 36.980469 13.269531 39 15.75 39 L 32.25 39 C 34.730469 39 36.75 36.980469 36.75 34.5 L 36.75 13.5 Z M 16.875 16.5 C 17.496094 16.5 18 17.003906 18 17.625 L 18 33.375 C 18 33.996094 17.496094 34.5 16.875 34.5 C 16.253906 34.5 15.75 33.996094 15.75 33.375 L 15.75 17.625 C 15.75 17.003906 16.253906 16.5 16.875 16.5 Z M 24 16.5 C 24.828125 16.5 25.5 17.171875 25.5 18 L 25.5 33 C 25.5 33.828125 24.828125 34.5 24 34.5 C 23.171875 34.5 22.5 33.828125 22.5 33 L 22.5 18 C 22.5 17.171875 23.171875 16.5 24 16.5 Z M 31.125 16.5 C 31.746094 16.5 32.25 17.003906 32.25 17.625 L 32.25 33.375 C 32.25 33.996094 31.746094 34.5 31.125 34.5 C 30.503906 34.5 30 33.996094 30 33.375 L 30 17.625 C 30 17.003906 30.503906 16.5 31.125 16.5 Z M 31.125 16.5 "/></g></svg>';
    var checkSVG = '<svg id="check" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><circle cx="11" cy="11" r="9" stroke="green" stroke-width="2" fill="white" /><path class="fill" fill="green" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
   
    var todo = document.getElementById('todo')
    var done = document.getElementById('done')
    var text = document.getElementById('text')
    var add = document.getElementById('add')

    loadlists()

    function loadlists(){
        if (!lists.todolist.length && !lists.donelist.length) return;

        for (var i=0; i<lists.todolist.length ; i++){
            var task= lists.todolist[i];
            addTasktodom(task,todo)
        }
        for (var j=0; j<lists.donelist.length ; j++){
            var task= lists.todolist[j];
            addTasktodom(task,done)
        }
    }

    add.addEventListener('click', function() {
    var value = text.value;
    if (value) {
        addTask(value,todo);
    }
    });

    text.addEventListener('keydown', function(e){
        var value = this.value;
        if (e.code ==='Enter' || e.code === 'NumpadEnter' && value){
            addTask(value,todo)
        }
    })

    function addTask(value,list){
        addTasktodom(value,list);
        document.getElementById("text").value="";
        lists.todolist.push(value)
        updatelistsdata()
    }
    function updatelistsdata(){
        localStorage.setItem('todoList', JSON.stringify(lists));
    }

    function addTasktodom(value,list){
        var item = document.createElement('li')
        item.innerText = value

        var buttons = document.createElement('div')
        buttons.classList.add('buttons')

        var remove = document.createElement('button')
        remove.classList.add('delete')
        remove.innerHTML = removeSVG
        remove.addEventListener('click',removeTask)

        var check = document.createElement('button')
        check.classList.add('check')
        check.innerHTML = checkSVG
        check.addEventListener('click', completeTask)

        buttons.appendChild(remove)
        buttons.appendChild(check)
        item.appendChild(buttons)
        list.appendChild(item)
    }

    function removeTask(){
        var task= this.parentNode.parentNode;
        var parentList = task.parentNode;
        var nodeid=parentList.id;
        var taskText= task.innerText;
        parentList.removeChild(task);
        if(nodeid === 'todo'){
            lists.todolist.splice(lists.todolist.indexOf(taskText),1);
        }else{
            lists.donelist.splice(lists.donelist.indexOf(taskText),1);
        }
        updatelistsdata()
    }
    function completeTask(){
        var item= this.parentNode.parentNode
        var parent = item.parentNode
        var nodeid=parent.id
        var taskText = item.innerText
        if (nodeid === 'todo'){
            parent.removeChild(item);
            addTasktodom(taskText, done);
            lists.todolist.splice(lists.todolist.indexOf(taskText),1);
            lists.donelist.push(taskText)
        }else{
            parent.removeChild(item);
            addTasktodom(taskText, todo);
            lists.donelist.splice(lists.donelist.indexOf(taskText),1);
            lists.todolist.push(taskText)
        }
        updatelistsdata()
    }
})
