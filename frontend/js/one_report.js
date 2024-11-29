function get_info_rep (report_id) {
    $.ajax({
        url: "http://backend/one_report_for_create",
        method: "POST",
        data: {report_id : report_id, user_id : localStorage.getItem('user_id')},
        success: (response)=>{
      
        let report = response.report[0];
        headline_html = `<h2>Отчет №${report_id}`;
        if (localStorage.getItem('role') == 'admin') {
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
               html_th3 = ``;
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
        }
        else if (localStorage.getItem('role') == 'boss' || localStorage.getItem('role') == 'doer') {
            if (localStorage.getItem('role') == 'boss') {
                headline_html += ` по проекту ${report.project_id}</h2>`;
            }
            else {
                headline_html += ` по выполнению задач</h2>`;
            }
            document.getElementById('headline_one_rep').innerHTML = headline_html;
            let stats = JSON.parse(report.stats);
           
            if (stats.count == 0) {
                let div_th = document.createElement('div');
                div_th.classList.add('no_task');
                div_th.classList.add('c3');
                html_th = `
                <div>В данный период не было задач`;
                if (localStorage.getItem('role') == 'boss') {
                    html_th+=` по данному проекту `;
                }
                html_th+=`..</div>
                `;
                div_th.innerHTML = html_th;
                document.getElementById('main').append(div_th);
            }
            else {
               
                let div_th32 = document.createElement('div');
                div_th32.classList.add('c3');
                div_th32.classList.add('headline');
                div_th32.setAttribute('style', `font-size:1.4vmax;`);
                div_th32.innerHTML = `Всего задач: ${stats.count}`;
                document.getElementById('main').append(div_th32);

                let count_comp_t = 0;
                let div_th3 = document.createElement('div');
                div_th3.classList.add('c3');
                div_th3.classList.add('headline');
                div_th3.setAttribute('id', `th_name_1`);
                document.getElementById('main').append(div_th3);


                    let div_th = document.createElement('div');
                    div_th.classList.add('c3');
                    div_th.classList.add('th');
                    div_th.setAttribute('id', `th_1`);
                    html_th = `
                    <div>Название задачи</div>
                    <div>Осталось дней</div>
                    <div>Исполнитель</div>
                    <div>Приоритет</div>
                    <div>Срок</div>
                    <div>Статус</div>
                   
                    `;
                    div_th.innerHTML = html_th;
                    document.getElementById('main').append(div_th);


                    let today = new Date();
                    let tasks = stats.tasks;
                    // console.log(tasks);
                    $.each(tasks, function(key, value){
                        //  console.log(value);
                        if (value.status == 'completed') {
                            count_comp_t ++;
                            let div = document.createElement('div');
                          div.classList.add('c3');
                          div.classList.add('tr');
                          div.setAttribute('id', `task_${value.id}`);
                          let end_date = new Date(value.end);
                          let last = end_date - today;
                          last = Math.ceil(last/1000/60/60/24);
                          if (last < 0) {
                            last = 'Просрочено';
                          }
                          html = 
                          `
                          <div title='${value.description}'>${value.name}</div>
                    <div class="double">
                        <img src="images/free-icon-wall-clock-1266978.png">
                        <div>${last}</div>
                    </div>
                    <div class="double">
                        <img src="images/people 4.svg">
                        <div>${value.name_of_doer}</div>
                    </div>
                    <div class="double">`;
                    if (value.priority == 'high') {
                        html+= `
                        <img src="images/Group 1.svg">
                        <div>высокий</div>`;
                      } else if (value.priority == 'middle') {
                        html+= `<img src="images/Group 2.svg" class="midP">
                        <div>средний</div>`;
                      }
                      else if (value.priority == 'low') {
                        html+= `<img src="images/Vector 7.svg" class="lowP">
                        <div>низкий</div>`;
                      }
                    html += `
                        
                    </div>
                    <div>до ${value.end.substr(-2)}.${value.end.substr(-5, 2)}.${value.end.substr(0,4)}</div>
                    <div class="double2">`;
                     if (value.status == 'created') {
                          html+= `
                          <div class="circle_yellow js_c"></div>
                        <div>назначена</div>`;
                        } else if (value.status == 'in_process') {
                          html+= `<div class="circle_green js_c"></div>
                        <div>выполняется</div>`;
                        }
                        else if (value.status == 'completed') {
                          html+= `<div class="circle_gray js_c"></div>
                        <div>завершена</div>`;
                        }
                        html += `
                        
                    </div>`;
                    div.innerHTML = html;
                    document.getElementById('main').append(div);
                        }  
                    });
                    document.getElementById('th_name_1').innerHTML = `Завершенные задачи (${count_comp_t})`;
                    if (count_comp_t == 0) {
                        document.getElementById('th_1').remove();
                    }



                    let count_proc_t = 0;
                let div_th30 = document.createElement('div');
                div_th30.classList.add('c3');
                div_th30.classList.add('headline');
                div_th30.setAttribute('id', `th_name_2`);
                document.getElementById('main').append(div_th30);


                    let div_th001 = document.createElement('div');
                    div_th001.classList.add('c3');
                    div_th001.classList.add('th');
                    div_th001.setAttribute('id', `th_2`);
                    html_th = `
                    <div>Название задачи</div>
                    <div>Осталось дней</div>
                    <div>Исполнитель</div>
                    <div>Приоритет</div>
                    <div>Срок</div>
                    <div>Статус</div>
                   
                    `;
                    div_th001.innerHTML = html_th;
                    document.getElementById('main').append(div_th001);


                    $.each(tasks, function(key, value){
                        //  console.log(value);
                        if (value.status == 'in_process') {
                            count_proc_t ++;
                            let div = document.createElement('div');
                          div.classList.add('c3');
                          div.classList.add('tr');
                          div.setAttribute('id', `task_${value.id}`);
                          let end_date = new Date(value.end);
                          let last = end_date - today;
                          last = Math.ceil(last/1000/60/60/24);
                          if (last < 0) {
                            last = 'Просрочено';
                          }
                          html = 
                          `
                          <div title='${value.description}'>${value.name}</div>
                    <div class="double">
                        <img src="images/free-icon-wall-clock-1266978.png">
                        <div>${last}</div>
                    </div>
                    <div class="double">
                        <img src="images/people 4.svg">
                        <div>${value.name_of_doer}</div>
                    </div>
                    <div class="double">`;
                    if (value.priority == 'high') {
                        html+= `
                        <img src="images/Group 1.svg">
                        <div>высокий</div>`;
                      } else if (value.priority == 'middle') {
                        html+= `<img src="images/Group 2.svg" class="midP">
                        <div>средний</div>`;
                      }
                      else if (value.priority == 'low') {
                        html+= `<img src="images/Vector 7.svg" class="lowP">
                        <div>низкий</div>`;
                      }
                    html += `
                        
                    </div>
                    <div>до ${value.end.substr(-2)}.${value.end.substr(-5, 2)}.${value.end.substr(0,4)}</div>
                    <div class="double2">`;
                     if (value.status == 'created') {
                          html+= `
                          <div class="circle_yellow js_c"></div>
                        <div>назначена</div>`;
                        } else if (value.status == 'in_process') {
                          html+= `<div class="circle_green js_c"></div>
                        <div>выполняется</div>`;
                        }
                        else if (value.status == 'completed') {
                          html+= `<div class="circle_gray js_c"></div>
                        <div>завершена</div>`;
                        }
                        html += `
                        
                    </div>`;
                    div.innerHTML = html;
                    document.getElementById('main').append(div);
                        }  
                    });
                    document.getElementById('th_name_2').innerHTML = `Задачи в процессе (${count_proc_t})`;
                    if (count_proc_t == 0) {
                        document.getElementById('th_2').remove();
                    }



                    let count_created_t = 0;
                    let div_th301 = document.createElement('div');
                    div_th301.classList.add('c3');
                    div_th301.classList.add('headline');
                    div_th301.setAttribute('id', `th_name_3`);
                    document.getElementById('main').append(div_th301);
    
    
                        let div_th0011 = document.createElement('div');
                        div_th0011.classList.add('c3');
                        div_th0011.classList.add('th');
                        div_th0011.setAttribute('id', `th_3`);
                        html_th = `
                        <div>Название задачи</div>
                        <div>Осталось дней</div>
                        <div>Исполнитель</div>
                        <div>Приоритет</div>
                        <div>Срок</div>
                        <div>Статус</div>
                       
                        `;
                        div_th0011.innerHTML = html_th;
                        document.getElementById('main').append(div_th0011);
    
    
                        $.each(tasks, function(key, value){
                            //  console.log(value);
                            if (value.status == 'created') {
                                count_created_t ++;
                                let div = document.createElement('div');
                              div.classList.add('c3');
                              div.classList.add('tr');
                              div.setAttribute('id', `task_${value.id}`);
                              let end_date = new Date(value.end);
                              let last = end_date - today;
                              last = Math.ceil(last/1000/60/60/24);
                              if (last < 0) {
                                last = 'Просрочено';
                              }
                              html = 
                              `
                              <div title='${value.description}'>${value.name}</div>
                        <div class="double">
                            <img src="images/free-icon-wall-clock-1266978.png">
                            <div>${last}</div>
                        </div>
                        <div class="double">
                            <img src="images/people 4.svg">
                            <div>${value.name_of_doer}</div>
                        </div>
                        <div class="double">`;
                        if (value.priority == 'high') {
                            html+= `
                            <img src="images/Group 1.svg">
                            <div>высокий</div>`;
                          } else if (value.priority == 'middle') {
                            html+= `<img src="images/Group 2.svg" class="midP">
                            <div>средний</div>`;
                          }
                          else if (value.priority == 'low') {
                            html+= `<img src="images/Vector 7.svg" class="lowP">
                            <div>низкий</div>`;
                          }
                        html += `
                            
                        </div>
                        <div>до ${value.end.substr(-2)}.${value.end.substr(-5, 2)}.${value.end.substr(0,4)}</div>
                        <div class="double2">`;
                         if (value.status == 'created') {
                              html+= `
                              <div class="circle_yellow js_c"></div>
                            <div>назначена</div>`;
                            } else if (value.status == 'in_process') {
                              html+= `<div class="circle_green js_c"></div>
                            <div>выполняется</div>`;
                            }
                            else if (value.status == 'completed') {
                              html+= `<div class="circle_gray js_c"></div>
                            <div>завершена</div>`;
                            }
                            html += `
                            
                        </div>`;
                        div.innerHTML = html;
                        document.getElementById('main').append(div);
                            }  
                        });
                        document.getElementById('th_name_3').innerHTML = `Назначенные задачи (${count_created_t})`;
                        if (count_created_t == 0) {
                            document.getElementById('th_3').remove();
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
        }},
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
}
$("document").ready(get_info_rep(report_id));
