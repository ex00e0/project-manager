

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
       if (response.tasks != undefined && response.tasks != null && response.tasks.length !=0) {
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
       
        `;
        if (localStorage.getItem('role') == 'boss') {
          html_th += ` <div></div> <div></div>`;
        }
        else if (localStorage.getItem('role') == 'doer') {
          html_th += ` <div></div>
          `;
        }
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
              // if (key )
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
        // document.getElementsByClassName('th')[0].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
        // let arr_tr =  document.getElementsByClassName('tr');
        // $.each(arr_tr, function(key2, value2){
        //   document.getElementsByClassName('tr')[key2].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
        // });
        html += `
      <div class="except">
          <img src="images/pen (1).svg" class="pen"   onclick="show_edit_task(${value.id})">
      </div>
      <div class="except">
          <img src="images/delete 3.svg" class="trash" onclick="delete_task(${value.id})">
      </div>
       <div class="except">
           <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
      </div>
      `;
      
      } 
      else if (localStorage.getItem('role') == 'admin') {
        html += `
      <div class="except">
           <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
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
           <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
      </div>`;
      }
                div.innerHTML = html;
             document.getElementById('main').append(div);
             if (localStorage.getItem('role') == 'boss') {
              document.getElementsByClassName('th')[0].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
              let arr_tr =  document.getElementsByClassName('tr');
              $.each(arr_tr, function(key2, value2){
                document.getElementsByClassName('tr')[key2].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
              });
            }
            if (localStorage.getItem('role') == 'admin') {
              document.getElementsByClassName('th')[0].style.gridTemplateColumns = "40% repeat(5, 11.35%) 1fr";
              let arr_tr2 =  document.getElementsByClassName('tr');
              $.each(arr_tr2, function(key22, value2){
                document.getElementsByClassName('tr')[key22].style.gridTemplateColumns = "40% repeat(5, 11.35%) 1fr";
              });
            }
           });
         get_pages();
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  }

  function get_tasks_with_remove (filter) {
    $.ajax({
      url: "http://backend/get_tasks",
      method: "POST",
      data: {project_id : project_id, role: localStorage.getItem('role'), user_id : localStorage.getItem('user_id')},
      success: (response)=>{
      document.getElementById('main').innerHTML = '';
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
     
      `;
      if (localStorage.getItem('role') == 'doer') {
        html_th += ` <div></div>`;
      }
      else if (localStorage.getItem('role') == 'boss') {
        html_th += ` <div></div>
        <div></div>`;
      }
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
        if (filter != null && value.priority == filter) {
        // document.getElementById(`task_${value.id}`).remove();
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
        // document.getElementsByClassName('th')[0].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
        // let arr_tr =  document.getElementsByClassName('tr');
        // $.each(arr_tr, function(key2, value2){
        //   document.getElementsByClassName('tr')[key2].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
        // });
        html += `
      <div class="except">
          <img src="images/pen (1).svg" class="pen"   onclick="show_edit_task(${value.id})">
      </div>
      <div class="except">
          <img src="images/delete 3.svg" class="trash" onclick="delete_task(${value.id})">
      </div>
       <div class="except">
           <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
      </div>
      `;
      
      } 
      else if (localStorage.getItem('role') == 'admin') {
        html += `
      <div class="except">
           <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
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
           <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
      </div>`;
      }
                div.innerHTML = html;
             document.getElementById('main').append(div);
             if (localStorage.getItem('role') == 'boss') {
              document.getElementsByClassName('th')[0].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
              let arr_tr =  document.getElementsByClassName('tr');
              $.each(arr_tr, function(key2, value2){
                document.getElementsByClassName('tr')[key2].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
              });
            }
            if (localStorage.getItem('role') == 'admin') {
              document.getElementsByClassName('th')[0].style.gridTemplateColumns = "40% repeat(5, 11.35%) 1fr";
              let arr_tr2 =  document.getElementsByClassName('tr');
              $.each(arr_tr2, function(key22, value2){
                document.getElementsByClassName('tr')[key22].style.gridTemplateColumns = "40% repeat(5, 11.35%) 1fr";
              });
            }
        }  else if (filter == '' || filter == null) {
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
        // document.getElementsByClassName('th')[0].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
        // let arr_tr =  document.getElementsByClassName('tr');
        // $.each(arr_tr, function(key2, value2){
        //   document.getElementsByClassName('tr')[key2].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
        // });
        html += `
      <div class="except">
          <img src="images/pen (1).svg" class="pen"   onclick="show_edit_task(${value.id})">
      </div>
      <div class="except">
          <img src="images/delete 3.svg" class="trash" onclick="delete_task(${value.id})">
      </div>
       <div class="except">
           <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
      </div>
      `;
      
      } 
      else if (localStorage.getItem('role') == 'admin') {
        html += `
      <div class="except">
           <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
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
           <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
      </div>`;
      }
                div.innerHTML = html;
             document.getElementById('main').append(div);
             if (localStorage.getItem('role') == 'boss') {
              document.getElementsByClassName('th')[0].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
              let arr_tr =  document.getElementsByClassName('tr');
              $.each(arr_tr, function(key2, value2){
                document.getElementsByClassName('tr')[key2].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
              });
            }
            if (localStorage.getItem('role') == 'admin') {
              document.getElementsByClassName('th')[0].style.gridTemplateColumns = "40% repeat(5, 11.35%) 1fr";
              let arr_tr2 =  document.getElementsByClassName('tr');
              $.each(arr_tr2, function(key22, value2){
                document.getElementsByClassName('tr')[key22].style.gridTemplateColumns = "40% repeat(5, 11.35%) 1fr";
              });
            }
          }
         });
      if (document.getElementsByClassName('tr').length == 0) {
          document.getElementById('th').remove();
          let div_th = document.createElement('div');
          div_th.classList.add('no_task');
          div_th.classList.add('c3');
          html_th = `
          <div>Задач нет..</div>
          `;
          div_th.innerHTML = html_th;
          document.getElementById('main').append(div_th);
      }
      paginate(localStorage.getItem('active_page'));
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
  };

  $("document").ready(get_tasks());

  function open_create () {
    if (project_end != null) {
      document.getElementById("project_start_create").setAttribute("max", project_end);
      document.getElementById("project_end_create").setAttribute("max", project_end);
    }
    if (project_start != null) {
      let date_start = new Date (project_start);
      let today_x = new Date();

      console.log();
      if (date_start - today_x <= 0) {
        document.getElementById("project_end_create").setAttribute("min", today_x.getFullYear()+'-'+(today_x.getMonth()+1)+'-'+today_x.getDate());
        document.getElementById("project_start_create").setAttribute("min", today_x.getFullYear()+'-'+(today_x.getMonth()+1)+'-'+today_x.getDate());
      }
      else {
        document.getElementById("project_end_create").setAttribute("min", project_start);
        document.getElementById("project_start_create").setAttribute("min", project_start);
      }
      
    }
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
      // console.log(response);
      filter = document.getElementById("filter").value;
      if (filter != null && filter != '') {
          if (response.task[0].priority == filter) {
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
          if (localStorage.getItem('role') == 'boss') {
            html_th += ` <div></div>`;
          }
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
    // document.getElementsByClassName('th')[0].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
    // let arr_tr =  document.getElementsByClassName('tr');
    // $.each(arr_tr, function(key2, value2){
    //   document.getElementsByClassName('tr')[key2].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
    // });
    html += `
  <div class="except">
      <img src="images/pen (1).svg" class="pen"   onclick="show_edit_task(${value.id})">
  </div>
  <div class="except">
      <img src="images/delete 3.svg" class="trash" onclick="delete_task(${value.id})">
  </div>
   <div class="except">
       <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
  </div>
  `;
  
  } 
  else if (localStorage.getItem('role') == 'admin') {
    html += `
  <div class="except">
       <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
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
       <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
  </div>`;
  }
            div.innerHTML = html;
              if (count == 1) {
                document.getElementById('main').append(div);
            }
            else {
              if (document.getElementsByClassName('tr').length == 0) {
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
          if (localStorage.getItem('role') == 'boss') {
            html_th += ` <div></div>`;
          }
          div_th.innerHTML = html_th;
          document.getElementById('main').append(div_th);
          document.getElementsByClassName('no_task')[0].remove();
              }
              document.getElementById('th').after(div);
            }
         });
         if (localStorage.getItem('role') == 'boss') {
          document.getElementsByClassName('th')[0].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
          let arr_tr =  document.getElementsByClassName('tr');
          $.each(arr_tr, function(key2, value2){
            document.getElementsByClassName('tr')[key2].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
          });
        }
        if (localStorage.getItem('role') == 'admin') {
          document.getElementsByClassName('th')[0].style.gridTemplateColumns = "40% repeat(5, 11.35%) 1fr";
          let arr_tr2 =  document.getElementsByClassName('tr');
          $.each(arr_tr2, function(key22, value2){
            document.getElementsByClassName('tr')[key22].style.gridTemplateColumns = "40% repeat(5, 11.35%) 1fr";
          });
        }
      } } else {
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
          if (localStorage.getItem('role') == 'boss') {
            html_th += ` <div></div>`;
          }
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
    // document.getElementsByClassName('th')[0].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
    // let arr_tr =  document.getElementsByClassName('tr');
    // $.each(arr_tr, function(key2, value2){
    //   document.getElementsByClassName('tr')[key2].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
    // });
    html += `
  <div class="except">
      <img src="images/pen (1).svg" class="pen"   onclick="show_edit_task(${value.id})">
  </div>
  <div class="except">
      <img src="images/delete 3.svg" class="trash" onclick="delete_task(${value.id})">
  </div>
   <div class="except">
       <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
  </div>
  `;
  
  } 
  else if (localStorage.getItem('role') == 'admin') {
    html += `
  <div class="except">
       <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
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
       <img src="images/comment-bubble 1.svg" class="pen" onclick="show_comment(${value.id}, '${value.name_of_doer}')">
  </div>`;
  }
            div.innerHTML = html;
              if (count == 1) {
                document.getElementById('main').append(div);
            }
            else {
              if (document.getElementsByClassName('tr').length == 0) {
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
          if (localStorage.getItem('role') == 'boss') {
            html_th += ` <div></div>`;
          }
          div_th.innerHTML = html_th;
          document.getElementById('main').append(div_th);
          document.getElementsByClassName('no_task')[0].remove();
              }
              document.getElementById('th').after(div);
            }
         });
         if (localStorage.getItem('role') == 'boss') {
          document.getElementsByClassName('th')[0].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
          let arr_tr =  document.getElementsByClassName('tr');
          $.each(arr_tr, function(key2, value2){
            document.getElementsByClassName('tr')[key2].style.gridTemplateColumns = "34% repeat(5, 11.35%) 1fr 1fr 1fr";
          });
        }
        if (localStorage.getItem('role') == 'admin') {
          document.getElementsByClassName('th')[0].style.gridTemplateColumns = "40% repeat(5, 11.35%) 1fr";
          let arr_tr2 =  document.getElementsByClassName('tr');
          $.each(arr_tr2, function(key22, value2){
            document.getElementsByClassName('tr')[key22].style.gridTemplateColumns = "40% repeat(5, 11.35%) 1fr";
          });
        }
      }
      paginate(localStorage.getItem('active_page'));
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
     
        if (response.count == 0 || document.getElementsByClassName('tr').length == 0) { 
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
      paginate(localStorage.getItem('active_page'));
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
      // if (project_id != null) {
        if (project_end != null) {
          document.getElementById("task_start_edit").setAttribute("max", project_end);
          document.getElementById("task_end_edit").setAttribute("max", project_end);
        }
        if (project_start != null) {
          // let date_start = new Date (project_start);
          // let today_x = new Date();
    
          // console.log();
          // if (date_start - today_x <= 0) {
          //   document.getElementById("task_end_edit").setAttribute("min", today_x.getFullYear()+'-'+(today_x.getMonth()+1)+'-'+today_x.getDate());
          //   document.getElementById("task_start_edit").setAttribute("min", today_x.getFullYear()+'-'+(today_x.getMonth()+1)+'-'+today_x.getDate());
          // }
          // else {
            document.getElementById("task_end_edit").setAttribute("min", project_start);
            document.getElementById("task_start_edit").setAttribute("min", project_start);
          // }
          
        // }
      }
      else {
      document.getElementById("task_end_edit").setAttribute("min", response[0].start);
      document.getElementById("task_start_edit").setAttribute("min", response[0].start);
      document.getElementById("task_end_edit").setAttribute("max", response[0].end);
      document.getElementById("task_start_edit").setAttribute("max", response[0].end);
      }
      
     
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
        filter = document.getElementById('filter').value;
        get_tasks_with_remove(filter);
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
  }

  function show_comment (id, name_of_doer) {
    $.ajax({
      url: "http://backend/get_comments",
      method: "POST",
      data: {task_id : id},
      success: (response)=>{
        document.getElementById('scroll_comment').innerHTML = '';
        document.getElementById('comment_task_id').value = id;
        document.getElementById('comment_doer').value = name_of_doer;
        if (Object.keys(response).length == 0) {
          let div = document.createElement('div');
          div.classList.add('c2');
          div.setAttribute('id',  `no_comments`);
          div.setAttribute('style',  `justify-self:center;`);
          html = `
          Комментариев нет..
          `;
          div.innerHTML = html;
          document.getElementById('scroll_comment').append(div);
        } else {
          for (val in response) {
            let div = document.createElement('div');
            div.classList.add('c2');
            div.classList.add('comment');
            // div.setAttribute('id', `task_${value.id}`);
            html = `
                    <div class="c2 r1 comment_date">${val}</div>
                    <div class="c2 r1 comment_doer">
                        <img src="images/people 4.svg">
                        <div class="c3">${name_of_doer}</div>
                    </div>
                    <div class="c2 r2 comment_text">${response[val]}</div>
               
            `;
            div.innerHTML = html;
            document.getElementById('scroll_comment').append(div);
            let div2 = document.createElement('div');
            div2.classList.add('c2');
            div2.classList.add('comment_void');
            document.getElementById('scroll_comment').append(div2);
         }   
        }
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
    document.getElementById("shadow_edit").style.display="block";
    document.getElementById("modal_comment").style.display="grid";
  }

  function send_comment () {
    today = new Date();
    date = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} ${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}`
    $.ajax({
      url: "http://backend/send_comment",
      method: "POST",
      data: {task_id: document.getElementById('comment_task_id').value, text: document.getElementById('input_comment').value, date: date},
      success: (response)=>{
        console.log(response);
        if (typeof(response) == 'object') {
          for (key in response) {
            alert(response[key][0]);
          }
        }
        else {
        // console.log(document.getElementById('input_comment').value);
        // document.getElementById('scroll_comment').innerHTML = '';
        // document.getElementById('comment_task_id').value = id;
        //   for (val in response) {
          if (response == 0) {
            document.getElementById('no_comments').remove();
          }
            let div = document.createElement('div');
            div.classList.add('c2');
            div.classList.add('comment');
            // div.setAttribute('id', `task_${value.id}`);
            html = `
                    <div class="c2 r1 comment_date">${date}</div>
                    <div class="c2 r1 comment_doer">
                        <img src="images/people 4.svg">
                        <div class="c3">${document.getElementById('comment_doer').value}</div>
                    </div>
                    <div class="c2 r2 comment_text">${document.getElementById('input_comment').value}</div>
               
            `;
            div.innerHTML = html;
            document.getElementById('scroll_comment').append(div);
            let div2 = document.createElement('div');
            div2.classList.add('c2');
            div2.classList.add('comment_void');
            document.getElementById('scroll_comment').append(div2);
            document.getElementById('input_comment').value = '';
        }
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
  }


  function paginate (active_page) {
    document.getElementById('pages_block').innerHTML = '';
    // console.log(document.getElementsByClassName('tr').length);
    if (document.getElementsByClassName('tr').length > 18) {
      // console.log(document.getElementsByClassName('tr').length);    //16
      let count_pages =  Math.ceil(document.getElementsByClassName('tr').length/18);
      let page_div = '';
     
      // console.log(count_pages);       //2
      let remember_last_id = 0;
      for (let i=1;i<=count_pages;i++) {
          page_div = document.createElement('div');
          if (i == active_page) {
                page_div.classList.add('active_page');
          }
          page_div.classList.add('r1');
          page_div.setAttribute('onclick', `paginate(${i})`);
          page_div.innerHTML = i;
          document.getElementById('pages_block').append(page_div);
        // console.log('page' + i);
        for (let j=1;j<=18;j++) {
          if ((j + (remember_last_id*18)) > document.getElementsByClassName('tr').length) {
            break;
          }
          if (remember_last_id != (active_page - 1)) {
            document.getElementsByClassName('tr')[(j + (remember_last_id*18) - 1)].style.display = 'none';
          }
          else {
            document.getElementsByClassName('tr')[(j + (remember_last_id*18) - 1)].style.display = 'grid';
          }
          
          // console.log('id' + (j + (remember_last_id*15)));
        }
        remember_last_id ++;
        localStorage.setItem('active_page', active_page);
        // console.log(remember_last_id);
      }
  }
}