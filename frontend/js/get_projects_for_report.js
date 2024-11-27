
    $.ajax({
        url: "http://backend/user_projects",
        method: "POST",
        data: {user_id : localStorage.getItem('user_id'), role: localStorage.getItem('role')},
        success: (response)=>{

        let projects = response.projects;

        if (projects != undefined && projects != null && projects.length != 0 ) {
            $.each(projects, function(key, value){
            
                   let div = document.createElement('option');
                   div.setAttribute('value', `${value.id}`); 
                   html = 
                       `
                       ${value.name}
                       `;
                   div.innerHTML = html;
                  
                document.getElementById('projects_list').append(div);
               
              });
         }
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })