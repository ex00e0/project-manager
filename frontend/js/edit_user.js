$("#modal_edit_user").submit((event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://backend/edit_user",
        method: "POST",
        data: $("#modal_edit_user").serialize(),
        
        success: (response)=>{
            document.getElementById("modal_edit_user").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert(response);
            get_users_with_remove();
            $("#modal_edit_user").trigger('reset');
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })