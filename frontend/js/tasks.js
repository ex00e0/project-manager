var url_string = window.location.href; 
var url = new URL(url_string);
var project_id = url.searchParams.get("id");

function get_tasks () {
    $.ajax({
        url: "http://backend/get_tasks",
        method: "POST",
        data: {project_id : project_id, role: localStorage.getItem('role'), user_id : localStorage.getItem('user_id')},
        success: (response)=>{
  
       console.log(response.tasks);
        let tasks = response.tasks;
        let today = new Date();
        $.each(tasks, function(key, value){
             
              let div = document.createElement('div');
              div.classList.add('c3');
              div.classList.add('tr');
              div.setAttribute('id', `task_${value.id}`);
              let end_date = new Date(value.end);
              let last = end_date - today;
              last = Math.ceil(last/1000/60/60/24);
              html = 
              `
              <div>${value.name}</div>
        <div class="double">
            <img src="images/free-icon-wall-clock-1266978.png">
            <div>${last}</div>
        </div>
        <div class="double">
            <img src="images/people 4.svg">
            <div>${value.name_of_doer}</div>
        </div>
        <div class="double">`;
        if (value.priority == 'high') {
            html+= `
            <img src="images/Group 1.svg">
            <div>высокий</div>`;
          } else if (value.priority == 'middle') {
            html+= `<img src="images/Group 2.svg" class="midP">
            <div>средний</div>`;
          }
          else if (value.priority == 'low') {
            html+= `<img src="images/Vector 7.svg" class="lowP">
            <div>низкий</div>`;
          }
        html += `
            
        </div>
        <div>до ${value.end.substr(-2)}.${value.end.substr(-5, 2)}.${value.end.substr(0,4)}</div>
        <div class="double2">`;
         if (value.status == 'created') {
              html+= `
              <div class="circle_yellow js_c"></div>
            <div>создана</div>`;
            } else if (value.status == 'in_process') {
              html+= `<div class="circle_green js_c"></div>
            <div>в процессе</div>`;
            }
            else if (value.status == 'completed') {
              html+= `<div class="circle_gray js_c"></div>
            <div>завершена</div>`;
            }
            html += `
            
        </div>
        <div class="except">
            <img src="images/pen (1).svg" class="pen">
        </div>
        <div class="except">
            <img src="images/delete 3.svg" class="trash">
        </div>`;
                div.innerHTML = html;
             document.getElementById('main').append(div);
           });
       
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  }

  $("document").ready(get_tasks());