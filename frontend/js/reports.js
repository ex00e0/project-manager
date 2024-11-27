function open_create_report_task () {
    document.getElementById("shadow_edit").style.display="block";
    document.getElementById("modal_create_report_task").style.display="grid";
  }
  function close_create_report_task () {
    document.getElementById("shadow_edit").style.display="none";
    document.getElementById("modal_create_report_task").style.display="none";
  }

  $("#modal_create_report_task").submit((event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://backend/create_report_task",
        method: "POST",
        data: $("#modal_create_report_task").serialize(),
        
        success: (response)=>{

            // console.log(response);
          if (typeof(response) == 'object') {
            for (key in response) {
              alert(response[key][0]);
            }
          }
          else {
            document.getElementById("modal_create_report_task").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert('Отчет сформирован');
            // get_projects_with_remove();
            $("#modal_create_report_task").trigger('reset');
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })
  