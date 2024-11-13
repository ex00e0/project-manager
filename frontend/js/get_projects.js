function get_projects () {
  $.ajax({
      url: "http://backend/user_projects",
      method: "POST",
      data: {user_id : localStorage.getItem('user_id'), role: localStorage.getItem('role')},
      success: (response)=>{

  //    console.log(response);
      let projects = response.projects;
      $.each(projects, function(key, value){
           
            let div = document.createElement('div');
            div.classList.add('c3');
            div.classList.add('block_project');
            div.setAttribute('id', `project_${value.id}`);
            html = 
            `
            <img src="images/image 2.svg" class="c2 r1 project_folder">
            <div class="c4 r1 project_name" onclick="to_tasks(${value.id})">${value.name}</div>
            <div class="c5 r1 circle_gray"></div>
            <div class="c7 r1 project_boss">
                    <img src="images/people 1.svg" class="c1 r1">
                    <div class="c3 r1">${value.name_of_user}</div>
            </div>
            <div class="c6 r1">`;
            if (value.status == 'created') {
              html+= `создан  </div> <div class="c5 r1 circle_yellow"></div>`;
            } else if (value.status == 'in_process') {
              html+= `в процессе  </div> <div class="c5 r1 circle_green"></div>`;
            }
            else if (value.status == 'completed') {
              html+= `завершен   </div> <div class="c5 r1 circle_gray"></div>`;
            }
            html += `
            <div class="c9-all r1">до ${value.end.substr(-2)}.${value.end.substr(-5, 2)}.${value.end.substr(0,4)}</div>
            <div class="c2-8 r2-all project_desc">${value.description}</div>`;
            if (localStorage.getItem('role') == 'boss') {
             html +=`
            <img src="images/pen (1).svg" class="c10 r2-all pen" onclick="show_edit_project(${value.id})">
            <img src="images/delete 3.svg" class="c11 r2-all trash" onclick="delete_project(${value.id})"></img>
                            `;}
              div.innerHTML = html;
              let empty = document.createElement('div');
              empty.classList.add('c3');
              empty.classList.add('vh1-1');
              empty.setAttribute('id', `empty_${value.id}`);
           document.getElementById('main').append(div);
           document.getElementById('main').append(empty);
         });
     
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
}

function get_projects_with_remove () {
  $.ajax({
      url: "http://backend/user_projects",
      method: "POST",
      data: {user_id : localStorage.getItem('user_id'), role: localStorage.getItem('role')},
      success: (response)=>{

  //    console.log(response);
      let projects = response.projects;
      $.each(projects, function(key, value){
            document.getElementById(`project_${value.id}`).remove();
            document.getElementById(`empty_${value.id}`).remove();
            let div = document.createElement('div');
            div.classList.add('c3');
            div.classList.add('block_project');
            div.setAttribute('id', `project_${value.id}`);
            html = 
            `
            <img src="images/image 2.svg" class="c2 r1 project_folder">
            <div class="c4 r1 project_name" onclick="to_tasks(${value.id})">${value.name}</div>
            <div class="c5 r1 circle_gray"></div>
            <div class="c7 r1 project_boss">
                    <img src="images/people 1.svg" class="c1 r1">
                    <div class="c3 r1">${value.name_of_user}</div>
            </div>
            <div class="c6 r1">`;
            if (value.status == 'created') {
              html+= `создан  </div> <div class="c5 r1 circle_yellow"></div>`;
            } else if (value.status == 'in_process') {
              html+= `в процессе  </div> <div class="c5 r1 circle_green"></div>`;
            }
            else if (value.status == 'completed') {
              html+= `завершен   </div> <div class="c5 r1 circle_gray"></div>`;
            }
            html += `
            <div class="c9-all r1">до ${value.end.substr(-2)}.${value.end.substr(-5, 2)}.${value.end.substr(0,4)}</div>
            <div class="c2-8 r2-all project_desc">${value.description}</div>`;
            if (localStorage.getItem('role') == 'boss') {
             html +=`
            <img src="images/pen (1).svg" class="c10 r2-all pen" onclick="show_edit_project(${value.id})">
            <img src="images/delete 3.svg" class="c11 r2-all trash" onclick="delete_project(${value.id})"></img>
                            `;}
              div.innerHTML = html;
              let empty = document.createElement('div');
              empty.classList.add('c3');
              empty.classList.add('vh1-1');
              empty.setAttribute('id', `empty_${value.id}`);
           document.getElementById('main').append(div);
           document.getElementById('main').append(empty);
         });
     
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
}

$("document").ready(get_projects());


function delete_project (id) {
  $.ajax({
    url: "http://backend/delete_project",
    method: "POST",
    data: {project_id : id},
    success: (response)=>{
    alert(response);
   
    document.getElementById(`project_${id}`).remove();
    document.getElementById(`empty_${id}`).remove();
    },
    error: ()=>{
        console.log("Ошибка запроса!");
    }
})
}


function show_edit_project (id) {
  $.ajax({
    url: "http://backend/one_project",
    method: "POST",
    data: {project_id : id},
    success: (response)=>{
    // console.log(response[0]);
    document.getElementById("project_end").setAttribute("min", response[0].start);
    document.getElementById("project_end").value = response[0].end;
    document.getElementById("project_id").value = response[0].id;
    document.getElementById("project_name").value = response[0].name;
    document.getElementById("project_description").value = response[0].description;
    },
    error: ()=>{
        console.log("Ошибка запроса!");
    }
})
  document.getElementById("shadow_edit").style.display="block";
  document.getElementById("modal_edit").style.display="grid";
}

function close_edit () {
  document.getElementById("modal_edit").style.display="none";
  document.getElementById("shadow_edit").style.display="none";
}
function open_create () {
  document.getElementById("shadow_edit").style.display="block";
  document.getElementById("modal_create").style.display="grid";
}
function close_create () {
  document.getElementById("modal_create").style.display="none";
  document.getElementById("shadow_edit").style.display="none";
}

function to_tasks(id) {
  location.href=`tasks.php?id=${id}`;
}

function prepend_project (id) {
  $.ajax({
    url: "http://backend/one_project_for_create",
    method: "POST",
    data: {project_id : id},
    success: (response)=>{
    console.log(response);
    let value = response[0];
    let div = document.createElement('div');
    div.classList.add('c3');
    div.classList.add('block_project');
    div.setAttribute('id', `project_${value.id}`);
    html = 
    `
    <img src="images/image 2.svg" class="c2 r1 project_folder">
    <div class="c4 r1 project_name" onclick="to_tasks(${value.id})">${value.name}</div>
    <div class="c5 r1 circle_gray"></div>
    <div class="c7 r1 project_boss">
            <img src="images/people 1.svg" class="c1 r1">
            <div class="c3 r1">${value.name_of_user}</div>
    </div>
    <div class="c6 r1">`;
    if (value.status == 'created') {
      html+= `создан  </div> <div class="c5 r1 circle_yellow"></div>`;
    } else if (value.status == 'in_process') {
      html+= `в процессе  </div> <div class="c5 r1 circle_green"></div>`;
    }
    else if (value.status == 'completed') {
      html+= `завершен   </div> <div class="c5 r1 circle_gray"></div>`;
    }
    html += `
    <div class="c9-all r1">до ${value.end.substr(-2)}.${value.end.substr(-5, 2)}.${value.end.substr(0,4)}</div>
    <div class="c2-8 r2-all project_desc">${value.description}</div>`;
    if (localStorage.getItem('role') == 'boss') {
     html +=`
    <img src="images/pen (1).svg" class="c10 r2-all pen" onclick="show_edit_project(${value.id})">
    <img src="images/delete 3.svg" class="c11 r2-all trash" onclick="delete_project(${value.id})"></img>
                    `;}
      div.innerHTML = html;
      let empty = document.createElement('div');
      empty.classList.add('c3');
      empty.classList.add('vh1-1');
      empty.setAttribute('id', `empty_${value.id}`);
   document.getElementById('headline_projects').after(empty);
   document.getElementById('headline_projects').after(div);
    },
    error: ()=>{
        console.log("Ошибка запроса!");
    }
})
}