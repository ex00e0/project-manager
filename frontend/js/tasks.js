

function get_tasks () {
    $.ajax({
        url: "http://backend/get_tasks",
        method: "POST",
        data: {project_id : project_id, role: localStorage.getItem('role'), user_id : localStorage.getItem('user_id')},
        success: (response)=>{
        if (project_id == null) {
          let headline = document.createElement('div');
          headline.classList.add('c3');
          headline.classList.add('headline');
        html_headline = `
       <h2>Все задачи</h2>
        `;
        headline.innerHTML = html_headline;
        document.getElementById('main').append(headline);
        }
        else {
          let headline = document.createElement('div');
          headline.classList.add('c3');
          headline.classList.add('headline');
        html_headline = `
       <h2>Задачи проекта ${project_id}</h2>
        `;
        headline.innerHTML = html_headline;
        document.getElementById('main').append(headline);
        }
       if (response.tasks.length !=0) {
        let div_th = document.createElement('div');
        div_th.classList.add('c3');
        div_th.classList.add('th');
        div_th.setAttribute('id', `th`);
        html_th = `
        <div>Название задачи</div>
        <div>Осталось дней</div>
        <div>Исполнитель</div>
        <div>Приоритет</div>
        <div>Срок</div>
        <div>Статус</div>
        <div></div>
        <div></div>
        `;
        div_th.innerHTML = html_th;
        document.getElementById('main').append(div_th);
       }
       else {
        let div_th = document.createElement('div');
        div_th.classList.add('no_task');
        div_th.classList.add('c3');
        html_th = `
        <div>Задач нет..</div>
        `;
        div_th.innerHTML = html_th;
        document.getElementById('main').append(div_th);
       }
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
              if (last < 0) {
                last = 'Просрочено';
              }
              html = 
              `
              <div title='${value.description}'>${value.name}</div>
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
            <div>назначена</div>`;
            } else if (value.status == 'in_process') {
              html+= `<div class="circle_green js_c"></div>
            <div>выполняется</div>`;
            }
            else if (value.status == 'completed') {
              html+= `<div class="circle_gray js_c"></div>
            <div>завершена</div>`;
            }
            html += `
            
        </div>`;
       
       if (localStorage.getItem('role') == 'boss') {
        html += `
      <div class="except">
          <img src="images/pen (1).svg" class="pen"   onclick="show_edit_task(${value.id})">
      </div>
      <div class="except">
          <img src="images/delete 3.svg" class="trash" onclick="delete_task(${value.id})">
      </div>`;
      } 
      else if (localStorage.getItem('role') == 'admin') {
        html += `
      <div class="except">
         
      </div>
      <div class="except">
          
      </div>`;
      }
      else if (localStorage.getItem('role') == 'doer') {
        html += `
      <div class="except">`;
       if (value.status == 'created') {html += `
          <img src="images/Group 5 (2).svg" class="status" onclick="edit_status(${value.id},'${value.status}')">
        `;} else if (value.status == 'in_process') {
          html += `
          <img src="images/Group 4.svg" class="status" onclick="edit_status(${value.id},'${value.status}')">
        `;
        } else if (value.status == 'completed') {
          html += `
          <img src="images/Group 6 (1).svg" class="pen" onclick="edit_status(${value.id},'${value.status}')">
        `;
        }
      html+= `</div>
      <div class="except">
           <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id})">
      </div>`;
      }
                div.innerHTML = html;
             document.getElementById('main').append(div);
           });
       
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  }

  function get_tasks_with_remove () {
    $.ajax({
      url: "http://backend/get_tasks",
      method: "POST",
      data: {project_id : project_id, role: localStorage.getItem('role'), user_id : localStorage.getItem('user_id')},
      success: (response)=>{
     
      let tasks = response.tasks;
      let today = new Date();
      $.each(tasks, function(key, value){
        document.getElementById(`task_${value.id}`).remove();
            let div = document.createElement('div');
            div.classList.add('c3');
            div.classList.add('tr');
            div.setAttribute('id', `task_${value.id}`);
            let end_date = new Date(value.end);
            let last = end_date - today;
            last = Math.ceil(last/1000/60/60/24);
            if (last < 0) {
              last = 'Просрочено';
            }
            html = 
            `
            <div title='${value.description}'>${value.name}</div>
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
          <div>назначена</div>`;
          } else if (value.status == 'in_process') {
            html+= `<div class="circle_green js_c"></div>
          <div>выполняется</div>`;
          }
          else if (value.status == 'completed') {
            html+= `<div class="circle_gray js_c"></div>
          <div>завершена</div>`;
          }
          html += `
          
      </div>`;
     
     if (localStorage.getItem('role') == 'boss') {
      html += `
    <div class="except">
        <img src="images/pen (1).svg" class="pen"   onclick="show_edit_task(${value.id})">
    </div>
    <div class="except">
        <img src="images/delete 3.svg" class="trash" onclick="delete_task(${value.id})">
    </div>`;
    } 
    else if (localStorage.getItem('role') == 'admin') {
      html += `
    <div class="except">
       
    </div>
    <div class="except">
        
    </div>`;
    }
    else if (localStorage.getItem('role') == 'doer') {
      html += `
      <div class="except">`;
       if (value.status == 'created') {html += `
          <img src="images/Group 5 (2).svg" class="status" onclick="edit_status(${value.id},'${value.status}')">
        `;} else if (value.status == 'in_process') {
          html += `
          <img src="images/Group 4.svg" class="status" onclick="edit_status(${value.id},'${value.status}')">
        `;
        } else if (value.status == 'completed') {
          html += `
          <img src="images/Group 6 (1).svg" class="pen" onclick="edit_status(${value.id},'${value.status}')">
        `;
        }
      html+= `</div>
      <div class="except">
          
      </div>`;
    }
              div.innerHTML = html;
           document.getElementById('main').append(div);
         });
     
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
  };

  $("document").ready(get_tasks());

  function open_create () {
    document.getElementById("shadow_edit").style.display="block";
    document.getElementById("modal_create_task").style.display="grid";
  }
  function close_create () {
    document.getElementById("modal_create_task").style.display="none";
    document.getElementById("shadow_edit").style.display="none";
  }
  function close_edit () {
    document.getElementById("modal_edit_task").style.display="none";
    document.getElementById("shadow_edit").style.display="none";
  }
  function close_comment () {
    document.getElementById("modal_comment").style.display="none";
    document.getElementById("shadow_edit").style.display="none";
  }
  function prepend_task (id) {
    $.ajax({
      url: "http://backend/one_task_for_create",
      method: "POST",
      data: {task_id : id},
      success: (response)=>{
      console.log(response);
      let count = response.count;
      if (count == 1) {
        let div_th = document.createElement('div');
          div_th.classList.add('c3');
          div_th.classList.add('th');
          div_th.setAttribute('id', `th`);
          html_th = `
          <div>Название задачи</div>
          <div>Осталось дней</div>
          <div>Исполнитель</div>
          <div>Приоритет</div>
          <div>Срок</div>
          <div>Статус</div>
          <div></div>
          <div></div>
          `;
          div_th.innerHTML = html_th;
          document.getElementById('main').append(div_th);
          document.getElementsByClassName('no_task')[0].remove();
      }

      let tasks = response.task;
      let today = new Date();
      $.each(tasks, function(key, value){
           
            let div = document.createElement('div');
            div.classList.add('c3');
            div.classList.add('tr');
            div.setAttribute('id', `task_${value.id}`);
            let end_date = new Date(value.end);
            let last = end_date - today;
            last = Math.ceil(last/1000/60/60/24);
            if (last < 0) {
              last = 'Просрочено';
            }
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
          
      </div>`;
       
       if (localStorage.getItem('role') == 'boss') {
        html += `
      <div class="except">
          <img src="images/pen (1).svg" class="pen"  onclick="show_edit_task(${value.id})">
      </div>
      <div class="except">
          <img src="images/delete 3.svg" class="trash" onclick="delete_task(${value.id})">
      </div>`;
      }
      else if (localStorage.getItem('role') == 'admin') {
        html += `
      <div class="except">
         
      </div>
      <div class="except">
          
      </div>`;
      }
      else if (localStorage.getItem('role') == 'doer') {
        html += `
      <div class="except">
         
      </div>
      <div class="except">
          
      </div>`;
      }
        div.innerHTML = html;
              if (count == 1) {
                document.getElementById('main').append(div);
            }
            else {
              document.getElementById('th').after(div);
            }
         });
     
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
  }

  function delete_task (id) {
    $.ajax({
      url: "http://backend/delete_task",
      method: "POST",
      data: {task_id: id},
      success: (response)=>{
      alert(response.message);
      document.getElementById(`task_${id}`).remove();
     
        if (response.count == 0) { 
          document.getElementById(`th`).remove();
          let div_th = document.createElement('div');
          div_th.classList.add('no_task');
          div_th.classList.add('c3');
          html_th = `
          <div>Задач нет..</div>
          `;
          div_th.innerHTML = html_th;
          document.getElementById('main').append(div_th);
      }
      
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
  }
  
  function show_edit_task (id) {
    $.ajax({
      url: "http://backend/one_task",
      method: "POST",
      data: {task_id : id},
      success: (response)=>{
      // console.log(response[0]);
      document.getElementById("task_end_edit").setAttribute("min", response[0].start);
      document.getElementById("task_start_edit").value = response[0].start;
      document.getElementById("task_end_edit").value = response[0].end;
      document.getElementById("task_id_edit").value = response[0].id;
      document.getElementById("task_name_edit").value = response[0].name;
      document.getElementById("task_priority_edit").value = response[0].priority;
      document.getElementById("task_description_edit").value = response[0].description;
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
    document.getElementById("shadow_edit").style.display="block";
    document.getElementById("modal_edit_task").style.display="grid";
  }

  function edit_status (id, status) {
    $.ajax({
      url: "http://backend/edit_status",
      method: "POST",
      data: {task_id : id, status: status},
      success: (response)=>{
        alert(response);
        get_tasks_with_remove();
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
  }

  function show_comment (id) {
    $.ajax({
      url: "http://backend/get_comments",
      method: "POST",
      data: {task_id : id},
      success: (response)=>{
        console.log(response);
          for (val in response) {
            console.log(val);
            console.log(response[val]);
            // if (getComputedStyle(document.getElementById(`doer_t_${value[val]}`)).backgroundColor == 'rgb(255, 255, 255)') {
            // document.getElementById(`doer_t_${value[val]}`).click();
            // }
            // console.log(team_array);
         }   
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
    document.getElementById("shadow_edit").style.display="block";
    document.getElementById("modal_comment").style.display="grid";
  }
