function open_create_report () {
    document.getElementById('report_user_id').value = localStorage.getItem('user_id');
    document.getElementById('report_role').value = localStorage.getItem('role');
    document.getElementById("shadow_edit").style.display="block";
    document.getElementById("modal_create_report").style.display="grid";
  }
  function close_create_report () {
    document.getElementById("shadow_edit").style.display="none";
    document.getElementById("modal_create_report").style.display="none";
  }

  $("#modal_create_report").submit((event)=>{
    event.preventDefault();

    $.ajax({
        url: "http://backend/create_report",
        method: "POST",
        data: $("#modal_create_report").serialize(),
        
        success: (response)=>{

            // console.log(response);
          if (typeof(response) == 'object') {
            for (key in response) {
              alert(response[key][0]);
            }
          }
          else {
            document.getElementById("modal_create_report").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert('Отчет сформирован');
            // get_projects_with_remove();
            $("#modal_create_report").trigger('reset');
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })
  