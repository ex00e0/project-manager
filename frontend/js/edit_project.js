
  $("#modal_edit").submit((event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://backend/edit_project",
        method: "POST",
        data: $("#modal_edit").serialize(),
        
        success: (response)=>{
            document.getElementById("modal_edit").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert(response);
            get_projects_with_remove();
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })