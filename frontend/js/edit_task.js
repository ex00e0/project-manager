$("#modal_create_task").submit((event)=>{
    event.preventDefault();
    document.getElementById("project_user_id_create").value = localStorage.getItem("user_id");
    $.ajax({
        url: "http://backend/create_task",
        method: "POST",
        data: $("#modal_create").serialize(),
        
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
            prepend_project(response);
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })