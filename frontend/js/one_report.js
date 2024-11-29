function get_info_rep (report_id) {
    $.ajax({
        url: "http://backend/one_report_for_create",
        method: "POST",
        data: {report_id : report_id, user_id : localStorage.getItem('user_id')},
        success: (response)=>{
      
        let report = response.report[0];
        headline_html = `<h2>Отчет №${report_id}`;
        if (report.type == 'projects') {headline_html+=` по проектам`;}
        else if (report.type == 'doers') {headline_html+=` по исполнителям`;}
        else if (report.type == 'bosses') {headline_html+=` по руководителям`;}
        headline_html += `</h2>`;
        document.getElementById('headline_one_rep').innerHTML = headline_html;
        let stats = JSON.parse(report.stats);
        
        if (stats.count == 0) {
            let div_th = document.createElement('div');
            div_th.classList.add('no_task');
            div_th.classList.add('c3');
            if (report.type == 'projects') {
                 html_th = `
            <div>В данный период было завершено или начато 0 проектов..</div>
            `;
            }
           else if (report.type == 'doers') {
            html_th = `
            <div>Исполнителей c задачами на данный период нет..</div>
            `;
           }
           else if (report.type == 'bosses') {
            html_th = `
            <div>Руководителей c проектами на данный период нет..</div>
            `;
           }
            div_th.innerHTML = html_th;
            document.getElementById('main').append(div_th);
        }
        else {
            let div_th = document.createElement('div');
            div_th.classList.add('c3');
            div_th.classList.add('th_proj');
            div_th.setAttribute('id', `th_proj`);
            html_th = `<div></div>`;
            
            if (report.type == 'projects') {
                 html_th += `
           <div>Название проекта</div>
            `;
            }
           else if (report.type == 'doers') {
            html_th += `
            <div>Имя исполнителя</div>
            `;
           }
           else if (report.type == 'bosses') {
            html_th += `
            <div>Имя руководителя</div>
            `;
           }
           if (report.type == 'doers' || report.type == 'projects') {
            html_th += `
            <div>Всего задач</div>
            <div>Завершено задач</div>
            <div>В процессе задач</div>
         
           
            `;
           }
           else if (report.type == 'bosses') {
            html_th += `
            <div>Всего проектов</div>
            <div>Проектов завершенно</div>
            <div>Проектов в процессе</div>
         
           
            `;
           }
            
            if (report.type == 'projects') {
                html_th += `
             <div>Статус проекта</div>
           `;
           }
            div_th.innerHTML = html_th;
            document.getElementById('main').append(div_th);
            let stats_arr;
            if (report.type == 'projects') {
                 stats_arr = stats.projects;
            }
            else if (report.type == 'doers' || report.type == 'bosses') {
                stats_arr = stats.users;
            }
                 let count_all = 0;
                 let count_completed = 0;
                 let count_in_process = 0;
                 let proj_completed = 0;
                 let proj_in_process = 0;
                    $.each(stats_arr, function(key, value){
                    if (value.all != 0) {
                        let div = document.createElement('div');
                        div.classList.add('c3');
                        div.classList.add('tr_proj');
                        div.setAttribute('id', `report_${value.id}`);
                        html = 
                        `
                        <div></div>
                        <div>${value.name}</div>
                        <div>${value.all}</div>
                        <div>${value.completed}</div>
                         <div>${value.in_process}</div>
                       `;
                       if (report.type == 'projects') {
                        if (value.status == 'completed') {html+=`<div>завершен</div>`;
                            proj_completed++;
                        }
                        else if (value.status == 'in_process') {html+=`<div>в процессе</div>`;
                            proj_in_process++;
                        }
                        }
                     count_all+= value.all;
                     count_completed+= value.completed;
                     count_in_process+= value.in_process;
                 div.innerHTML = html;
                 document.getElementById('main').append(div);
                    }
                   
           });

           let div_th2 = document.createElement('div');
           div_th2.classList.add('c3');
           div_th2.classList.add('th_proj');
           div_th2.setAttribute('id', `th_proj`);
           html_th2 = `
           <div>Итого</div>
           <div></div>
           <div>${count_all}</div>
           <div>${count_completed}</div>
           <div>${count_in_process}</div>
           
          
           `;
           if (report.type == 'projects') {
                html_th2 += `<div></div>`;
           }
           div_th2.innerHTML = html_th2;
           document.getElementById('main').append(div_th2);

           let div_th3 = document.createElement('div');
           div_th3.classList.add('c3');
           div_th3.classList.add('headline');
           div_th3.setAttribute('id', `th_proj`);
           if (report.type == 'projects') {
           html_th3 = `
           Всего проектов: ${stats.count} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            Завершено проектов: ${proj_completed} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            Проектов в процессе: ${proj_in_process}
           `;
           }
           else if (report.type == 'doers') {
            html_th3 = `
            Всего исполнителей: ${stats.count} 
            `;
           }
           else if (report.type == 'bosses') {
            html_th3 = `
            Всего руководителей: ${stats.count} 
            `;
           }
           div_th3.innerHTML = html_th3;
           document.getElementById('main').append(div_th3);
            
           if (document.getElementsByClassName('tr_proj').length == 0) {
            document.getElementById('main').innerHTML = '';
            let div_th00 = document.createElement('div');
            div_th00.classList.add('headline');
            div_th00.classList.add('c3');
            div_th00.setAttribute('id', `headline_one_rep`);
            document.getElementById('main').append(div_th00);
            document.getElementById('headline_one_rep').innerHTML = headline_html;
            let div_th0 = document.createElement('div');
            div_th0.classList.add('no_task');
            div_th0.classList.add('c3');
            if (report.type == 'projects') {
                 html_th = `
            <div>В данный период было завершено или начато 0 проектов..</div>
            `;
            }
           else if (report.type == 'doers') {
            html_th = `
            <div>Исполнителей c задачами на данный период нет..</div>
            `;
           }
           else if (report.type == 'bosses') {
            html_th = `
            <div>Руководителей c проектами на данный период нет..</div>
            `;
           }
            div_th0.innerHTML = html_th;
            document.getElementById('main').append(div_th0);
           }
        }
//         let value = response.report[0];
//         let div = document.createElement('div');
//         div.classList.add('c3');
//         div.classList.add('tr_rep');
//         div.setAttribute('id', `report_${value.id}`);
//         html = 
//         `
//          <div>${value.id}</div>
//          <div>${value.start}</div>
//          <div>${value.end}</div>
//          <div>`;
//                  if (value.type == 'projects') {html+=`по проектам`;}
//                  else if (value.type == 'doers') {html+=`по исполнителям`;}
//                  else if (value.type == 'bosses') {html+=`по руководителям`;}
//                  html+=`</div>
//          <div>  <a href="one_report.php?id=${value.id}" style="justify-self:center; color: #9F9E9E;">Подробнее..</a></div>
//    `;
//        div.innerHTML = html;
//        document.getElementById('th_rep').after(div);
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
}
$("document").ready(get_info_rep(report_id));