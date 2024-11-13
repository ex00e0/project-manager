
  $("#modal_edit").submit((event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://backend/edit_project",
        method: "POST",
        data: $("#modal_edit").serialize(),
        
        success: (response)=>{
          if (typeof(response) == 'object') {
            alert(response.name[0]);
          }
          else {
            document.getElementById("modal_edit").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert(response);
            get_projects_with_remove();
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })

  $("#modal_create").submit((event)=>{
    event.preventDefault();
    document.getElementById("project_user_id_create").value = localStorage.getItem("user_id");
    $.ajax({
        url: "http://backend/create_project",
        method: "POST",
        data: $("#modal_create").serialize(),
        
        success: (response)=>{
          if (typeof(response) == 'object') {
            for (key in response) {
              alert(response[key][0]);
            }
          }
          else {
            document.getElementById("modal_create").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert('Проект создан');
            prepend_project(response);
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })