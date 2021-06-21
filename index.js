//day date and month array

days = ['Sun','Mon', 'Tues','Wed', 
'Thu','Fri','Sat']

months = ['Jan','Feb','Mar','Apr','May',
'Jun','Jul','Aug','Sep','Oct','Nov','Dec']

date_data = new Date()

current_day = date_data.getDay()
current_date = date_data.getDate()
current_month = date_data.getMonth()

document.getElementById('day_date_month').textContent = `${days[current_day]}, ${current_date} ${months[current_month]}`

//getting all the required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");



inputBox.onkeyup = ()=>{
    let userData = inputBox.value;//getting user given data
    if(userData.trim()!=0){ //if the data isn't only spaces
        addBtn.classList.add("active"); //active add button
    }
    else{
        addBtn.classList.remove("active");//deactive add button
    }
}
showTasks(); //function call


//If the addBtn is pressed do the following steps:
addBtn.onclick=()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
    
    if(getLocalStorage==null){ //if storage is empty
            listArr = [] //Create a blank array
    }
    else{
        listArr = JSON.parse(getLocalStorage);
        //transforming json storage to js object
    }
    listArr.push(userData); //pushing or adding user given data
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    //transforming js object storage to json
    showTasks(); //function call
    addBtn.classList.remove("active");//deactive add button
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage

    if(getLocalStorage==null){ //if storage is empty
        listArr = [];  //Create a blank array
    }
    else{
        listArr = JSON.parse(getLocalStorage);
        //transforming json storage to js object
    }
    const number = document.querySelector(".number");
    number.textContent = listArr.length; // gets the size of the array
    
    if(listArr.length >0){//if arr length>0
        deleteAllBtn.classList.add("active");//activate delete all button
    }
    else{
        deleteAllBtn.classList.remove("active");//de-activate delete all button
    }

    let newLiTag = '';
    listArr.forEach((element, index)=> {
        newLiTag += `<li> ${element}<span onclick = "deleteTask(${index})"; ><i class='bx bx-check'></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside the ul tags
    inputBox.value="";  //once task is added leave the input box field
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
    listArr = JSON.parse(getLocalStorage); 

    listArr.splice(index, 1); // delete or remove the particular indexed li
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    //after removing li, update the local storage
    //transforming js object storage to json
    showTasks(); //function call
}


//delete all button
deleteAllBtn.onclick=()=>{
    listArr = []; //empty array list
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    //after deleting all tasks, update the local storage
    //transforming js object storage to json
    showTasks(); //function call
}


