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
            alert(response)

            get_users_with_remove(document.getElementById("filter").value);
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
        data: $("#modal_create_user").serialize(),
        
        success: (response)=>{
          // console.log(response);
          if (typeof(response) == 'object') {
            for (key in response) {
              if (response[key].length > 1) {
              
                for (val in response[key]) {
                  if (response[key][val] == 'The password must contain at least one letter.' || response[key][val] == 'The password must contain at least one number.' ) {
                    alert('Пароль должен содержать буквы и цифры');
                
                  }
                  else {
                    alert(response[key][val]);
                  }
                }
                
              }
              else {
                alert(response[key][0]);
              }
              
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