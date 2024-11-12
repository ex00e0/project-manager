var url_string = window.location.href; 
var url = new URL(url_string);
var project_id = url.searchParams.get("id");

function get_tasks () {
    $.ajax({
        url: "http://backend/get_tasks",
        method: "POST",
        data: {project_id : project_id, role: localStorage.getItem('role'), user_id : localStorage.getItem('user_id')},
        success: (response)=>{
  
       console.log(response);
        // let projects = response.projects;
        // $.each(projects, function(key, value){
             
        //       let div = document.createElement('div');
        //       div.classList.add('c3');
        //       div.classList.add('block_project');
        //       div.setAttribute('id', `project_${value.id}`);
        //       html = 
        //       `
        //       <img src="images/image 2.svg" class="c2 r1 project_folder">
        //       <div class="c4 r1 project_name" onclick="to_tasks(${value.id})">${value.name}</div>
        //       <div class="c5 r1 circle_gray"></div>
        //       <div class="c7 r1 project_boss">
        //               <img src="images/people 1.svg" class="c1 r1">
        //               <div class="c3 r1">${value.name_of_user}</div>
        //       </div>
        //       <div class="c6 r1">`;
        //       if (value.status == 'created') {
        //         html+= `создан  </div> <div class="c5 r1 circle_yellow"></div>`;
        //       } else if (value.status == 'in_process') {
        //         html+= `в процессе  </div> <div class="c5 r1 circle_green"></div>`;
        //       }
        //       else if (value.status == 'completed') {
        //         html+= `завершен   </div> <div class="c5 r1 circle_gray"></div>`;
        //       }
        //       html += `
        //       <div class="c9-all r1">до ${value.end.substr(-2)}.${value.end.substr(-5, 2)}.${value.end.substr(0,4)}</div>
        //       <div class="c2-8 r2-all project_desc">${value.description}</div>`;
        //       if (localStorage.getItem('role') == 'boss') {
        //        html +=`
        //       <img src="images/pen (1).svg" class="c10 r2-all pen" onclick="show_edit_project(${value.id})">
        //       <img src="images/delete 3.svg" class="c11 r2-all trash" onclick="delete_project(${value.id})"></img>
        //                       `;}
        //         div.innerHTML = html;
        //         let empty = document.createElement('div');
        //         empty.classList.add('c3');
        //         empty.classList.add('vh1-1');
        //         empty.setAttribute('id', `empty_${value.id}`);
        //      document.getElementById('main').append(div);
        //      document.getElementById('main').append(empty);
        //    });
       
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  }

  $("document").ready(get_tasks());