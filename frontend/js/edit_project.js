
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
            $("#modal_edit").trigger('reset');
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })
