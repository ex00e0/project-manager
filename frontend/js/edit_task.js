$("#modal_create_task").submit((event)=>{
    event.preventDefault();
    document.getElementById("project_project_id_create").value = project_id;
    $.ajax({
        url: "http://backend/create_task",
        method: "POST",
        data: $("#modal_create_task").serialize(),
        
        success: (response)=>{
          if (typeof(response) == 'object') {
            for (key in response) {
              alert(response[key][0]);
            }
          }
          else {
            document.getElementById("modal_create_task").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert('Задача создана');
            prepend_task(response);
            $("#modal_create_task").trigger('reset');
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })

  $("#modal_edit_task").submit((event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://backend/edit_task",
        method: "POST",
        data: $("#modal_edit_task").serialize(),
        
        success: (response)=>{
          if (typeof(response) == 'object') {
            alert(response.name[0]);
          }
          else {
            document.getElementById("modal_edit_task").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert(response);
            get_tasks_with_remove(document.getElementById("filter").value);
            $("#modal_edit_task").trigger('reset');
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })
