$("#modal_edit_user").submit((event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://backend/edit_user",
        method: "POST",
        data: $("#modal_edit_user").serialize(),
        
        success: (response)=>{
            if (typeof(response) == 'object') {
                for (key in response) {
                  alert(response[key][0]);
                }
              }
              else {
                 document.getElementById("modal_edit_user").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert(response);
            get_users_with_remove();
            $("#modal_edit_user").trigger('reset');
              }
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })

  $("#modal_create_user").submit((event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://backend/create_user",
        method: "POST",
        data: $("#modal_user_task").serialize(),
        
        success: (response)=>{
          if (typeof(response) == 'object') {
            for (key in response) {
              alert(response[key][0]);
            }
          }
          else {
            document.getElementById("modal_create_user").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert('Пользователь создан');
            prepend_user(response);
            $("#modal_create_user").trigger('reset');
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })