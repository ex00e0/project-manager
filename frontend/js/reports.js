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

            console.log(response);
          if (typeof(response) == 'object') {
            for (key in response) {
              alert(response[key][0]);
            }
          }
          else {
            document.getElementById("modal_create_report").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert('Отчет сформирован');
            prepend_report(response);
            $("#modal_create_report").trigger('reset');
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })
  

  function get_reports () {
    $.ajax({
        url: "http://backend/get_reports",
        method: "POST",
        data: {role: localStorage.getItem('role'), user_id : localStorage.getItem('user_id')},
        success: (response)=>{
        // console.log(response);
       if (response.reports.length !=0) {
        let div_th = document.createElement('div');
        div_th.classList.add('c3');
        div_th.classList.add('th_rep');
        div_th.setAttribute('id', `th_rep`);
        html_th = `
        <div>№</div>
        <div>С какого числа</div>
        <div>По какое число</div>
        `;
        if (localStorage.getItem('role') == 'admin') {
           html_th+=`
        <div>Тип отчета</div>`;
        }
        else if (localStorage.getItem('role') == 'boss') {
          html_th+=`
        <div>Проект</div>`;
        }
       html_th+= `
        <div></div>
       
        `;
        div_th.innerHTML = html_th;
        document.getElementById('main').append(div_th);
       }
       else {
        let div_th = document.createElement('div');
        div_th.classList.add('no_task');
        div_th.classList.add('c3');
        html_th = `
        <div>Отчетов нет..</div>
        `;
        div_th.innerHTML = html_th;
        document.getElementById('main').append(div_th);
       }
        let reports = response.reports;
        $.each(reports, function(key, value){
             
              let div = document.createElement('div');
              div.classList.add('c3');
              div.classList.add('tr_rep');
              div.setAttribute('id', `report_${value.id}`);
              html = 
              `
               <div>${value.id}</div>
               <div>${value.start}</div>
               <div>${value.end}</div>
               <div>`;
               if (localStorage.getItem('role') == 'admin') {
               if (value.type == 'projects') {html+=`по проектам`;}
               else if (value.type == 'doers') {html+=`по исполнителям`;}
               else if (value.type == 'bosses') {html+=`по руководителям`;}
               }
               else if (localStorage.getItem('role') == 'boss') {
                html+=`${value.project_id}`;
               }
               html+=`</div>
               <div> <a href="one_report.php?id=${value.id}" style="justify-self:center; color: #9F9E9E;">Подробнее..</a></div>
   
         `;
             div.innerHTML = html;
             document.getElementById('main').append(div);
           });
          
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  }


  $("document").ready(get_reports());


  function prepend_report (id) {
    $.ajax({
      url: "http://backend/one_report_for_create",
      method: "POST",
      data: {report_id : id, user_id : localStorage.getItem('user_id')},
      success: (response)=>{
      // console.log(response);
      let count = response.count;
        if (count == 1) {
            document.getElementsByClassName('no_task')[0].remove();
              let div_th = document.createElement('div');
              div_th.classList.add('c3');
              div_th.classList.add('th_rep');
              div_th.setAttribute('id', `th_rep`);
              html_th = `
              <div>№</div>
              <div>С какого числа</div>
              <div>По какое число</div>
              `;
        if (localStorage.getItem('role') == 'admin') {
           html_th+=`
        <div>Тип отчета</div>`;
        }
        else if (localStorage.getItem('role') == 'boss') {
          html_th+=`
        <div>Проект</div>`;
        }
       html_th+= `
              <div></div>
             
              `;
              div_th.innerHTML = html_th;
              document.getElementById('main').append(div_th);
        }
      let value = response.report[0];
      let div = document.createElement('div');
      div.classList.add('c3');
      div.classList.add('tr_rep');
      div.setAttribute('id', `report_${value.id}`);
      html = 
      `
       <div>${value.id}</div>
       <div>${value.start}</div>
       <div>${value.end}</div>
       <div>`;
       if (localStorage.getItem('role') == 'admin') {
        if (value.type == 'projects') {html+=`по проектам`;}
        else if (value.type == 'doers') {html+=`по исполнителям`;}
        else if (value.type == 'bosses') {html+=`по руководителям`;}
        }
        else if (localStorage.getItem('role') == 'boss') {
         html+=`${value.project_id}`;
        }
               html+=`</div>
       <div>  <a href="one_report.php?id=${value.id}" style="justify-self:center; color: #9F9E9E;">Подробнее..</a></div>
 `;
     div.innerHTML = html;
     document.getElementById('th_rep').after(div);
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
  }