$("document").ready(()=>{
        $.ajax({
            url: "http://backend/user_projects",
            method: "POST",
            data: {user_id : localStorage.getItem('user_id')},
            success: (response)=>{
            //     let array_tasks = JSON.parse(response);
            //    console.log( array_tasks);

           
            let projects = response.projects;
            $.each(projects, function(key, value){
                  console.log(key);
                  let div = document.createElement('div');
                  div.classList.add('c3');
                  div.classList.add('block_project');
                  div.innerHTML = `
                  <img src="images/image 2.svg" class="c2 r1 project_folder">
                  <div class="c4 r1 project_name">Проект 1</div>
                  <div class="c5 r1 circle_gray"></div>
                  <div class="c7 r1 project_boss">
                          <img src="images/people 1.svg" class="c1 r1">
                          <div class="c3 r1">Имя</div>
                  </div>
                  <div class="c6 r1">завершен</div>
                  <div class="c9-all r1">до 22.10.2024</div>
                  <div class="c2-8 r2-all project_desc">Описание проекта................................<br>...................<br>.................................................................................................................................................................................................................................</div>
                  <img src="images/pen (1).svg" class="c10 r2-all pen">
                  <img src="images/delete 3.svg" class="c11 r2-all trash"></img>
                                  `;
                 document.getElementById('main').append(div);
                  $.each(value, function(k, v){
                     let infoRow = 
                     console.log(v+'  :   '+k);
                    
                  });
               });
           
            },
            error: ()=>{
                console.log("Ошибка запроса!");
            }
        })
})