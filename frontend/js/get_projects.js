$("document").ready(()=>{
        $.ajax({
            url: "http://backend/user_projects",
            method: "POST",
            data: {user_id : localStorage.getItem('user_id'), role: localStorage.getItem('role')},
            success: (response)=>{
            //     let array_tasks = JSON.parse(response);
            //    console.log( array_tasks);

           console.log(response);
            // let projects = response.projects;
            // $.each(projects, function(key, value){
                 
            //       let div = document.createElement('div');
            //       div.classList.add('c3');
            //       div.classList.add('block_project');
            //       html = 
            //       `
            //       <img src="images/image 2.svg" class="c2 r1 project_folder">
            //       <div class="c4 r1 project_name">${value.name}</div>
            //       <div class="c5 r1 circle_gray"></div>
            //       <div class="c7 r1 project_boss">
            //               <img src="images/people 1.svg" class="c1 r1">
            //               <div class="c3 r1">${value.boss_id}</div>
            //       </div>
            //       <div class="c6 r1">${value.status}</div>
            //       <div class="c9-all r1">до 22.10.2024</div>
            //       <div class="c2-8 r2-all project_desc"`;
            //       html +=
            //        `>${value.description}</div>
            //       <img src="images/pen (1).svg" class="c10 r2-all pen">
            //       <img src="images/delete 3.svg" class="c11 r2-all trash"></img>
            //                       `;
            //         div.innerHTML = html;
            //      document.getElementById('main').append(div);
            //     //   $.each(value, function(k, v){
            //     //      let infoRow = 
            //     //      console.log(v+'  :   '+k);
                    
            //     //   });
            //    });
           
            },
            error: ()=>{
                console.log("Ошибка запроса!");
            }
        })
})