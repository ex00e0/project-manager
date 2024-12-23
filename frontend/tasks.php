<?php require "header.php"; ?>
<script>
    var url_string = window.location.href; 
    var url = new URL(url_string);
    var project_id = url.searchParams.get("id");
    let project_start = null; 
    let project_end = null;
</script>
<script src="js/tasks.js"></script>
<div class="sf">
    <!-- <input type="text" class="c3-5 r1" name="search" placeholder="поиск проектов..">
    <img src="images/image 11.svg" class="c4 r1 search_icon"> -->
    <select class="c3-5 r1" name="filter" onchange="get_tasks_with_remove(this.value)" id="filter">
        <option value="">все</option>
        <option value="high">высокий приоритет</option>
        <option value="middle">средний приоритет</option>
        <option value="low">низкий приоритет</option>
    </select>
    <script>
        if (localStorage.getItem('role') == "boss" && project_id!=null) {
                $.ajax({
                    url: "http://backend/one_project_for_create",
                    method: "POST",
                    data: {project_id : project_id, user_id : localStorage.getItem('user_id')},
                    success: (response)=>{
                        
                        if (response.projects[0].status != 'completed') {
                            project_start = response.projects[0].start;
                            project_end = response.projects[0].end;
                        let plus = document.createElement('img');
                                    plus.classList.add('c8');
                                    plus.classList.add('r1');
                                    plus.classList.add('create_icon');
                                    plus.setAttribute('src', `images/image 10.svg`);
                                    plus.setAttribute('onclick', `open_create()`);
                                    document.getElementsByClassName('sf')[0].append(plus);
                        }
                    },
                });
           
        }
    </script>
</div>
<main id="main">
   
    
    <!-- <div class="c3 tr">
        <div>Задача 1</div>
        <div class="double">
            <img src="images/free-icon-wall-clock-1266978.png">
            <div>1 день</div>
        </div>
        <div class="double">
            <img src="images/people 4.svg">
            <div>Имя</div>
        </div>
        <div class="double">
            <img src="images/Group 1.svg">
            <div>высокий</div>
        </div>
        <div>до 22.10.2024</div>
        <div class="double2">
            <div class="circle_gray js_c"></div>
            <div>завершена</div>
        </div>
        <div class="except">
            <img src="images/pen (1).svg" class="pen">
        </div>
        <div class="except">
            <img src="images/delete 3.svg" class="trash">
        </div>
    </div>

    <div class="c3 tr">
        <div>Задача 1</div>
        <div class="double">
            <img src="images/free-icon-wall-clock-1266978.png">
            <div>1 день</div>
        </div>
        <div class="double">
            <img src="images/people 4.svg">
            <div>Имя</div>
        </div>
        <div class="double">
            <img src="images/Group 2.svg" class="midP">
            <div>средний</div>
        </div>
        <div>до 22.10.2024</div>
        <div class="double2">
            <div class="circle_green js_c"></div>
            <div>выполняется</div>
        </div>
        <div class="except">
            <img src="images/pen (1).svg" class="pen">
        </div>
        <div class="except">
            <img src="images/delete 3.svg" class="trash">
        </div>
    </div>

    <div class="c3 tr last_tr">
        <div>Задача 1</div>
        <div class="double">
            <img src="images/free-icon-wall-clock-1266978.png">
            <div>1 день</div>
        </div>
        <div class="double">
            <img src="images/people 4.svg">
            <div>Имя</div>
        </div>
        <div class="double">
            <img src="images/Vector 7.svg" class="lowP">
            <div>низкий</div>
        </div>
        <div>до 22.10.2024</div>
        <div class="double2">
            <div class="circle_yellow js_c"></div>
            <div>назначена</div>
        </div>
        <div class="except">
            <img src="images/pen (1).svg" class="pen">
        </div>
        <div class="except">
            <img src="images/delete 3.svg" class="trash">
        </div>
    </div> -->
</main>
<div id="pages_block">
    <script>
        function get_pages () {
            //  console.log(document.getElementsByClassName('tr').length); 
          if (document.getElementsByClassName('tr').length > 18) {
            // console.log(document.getElementsByClassName('tr').length);    //16
            let count_pages =  Math.ceil(document.getElementsByClassName('tr').length/18);
            let page_div = '';
            // console.log(count_pages);       //2
            let remember_last_id = 0;
            for (let i=1;i<=count_pages;i++) {
                page_div = document.createElement('div');
                if (i == 1) {
                      page_div.classList.add('active_page');
                }
                page_div.classList.add('r1');
                page_div.setAttribute('onclick', `paginate(${i})`);
                page_div.innerHTML = i;
                document.getElementById('pages_block').append(page_div);
              // console.log('page' + i);
              for (let j=1;j<=18;j++) {
                if ((j + (remember_last_id*18)) > document.getElementsByClassName('tr').length) {
                  break;
                }
                if (remember_last_id != 0) {
                  document.getElementsByClassName('tr')[(j + (remember_last_id*18) - 1)].style.display = 'none';
                }
                
                // console.log('id' + (j + (remember_last_id*15)));
              }
              remember_last_id ++;
              localStorage.setItem('active_page', 1);
              // console.log(remember_last_id);
            }
        }
         
        }
    </script>
    <!-- <div class="r1 active_page" onclick="get_tasks(1)">1</div>
    <div class="r1" onclick="get_tasks(2)">2</div> -->
</div>
<div class="shadow_modal" id="shadow_edit"></div>

        <form class="modal_create_task modal" id="modal_create_task" method="post">
            <div class="c1 r1 headline_modal">Создание задачи</div>
            <input type="hidden" name="project_id" id="project_project_id_create">
            <label class="c1 r2">Название</label>
            <input type="text" class="c1 r3" placeholder="название" name="name" required id="project_name_create">
            <label class="c1 r4">Описание</label>
            <textarea type="text" class="c1 r5" placeholder="описание" name="description" required id="project_description_create">описание</textarea>
            <label class="c1 r6">Дата начала задачи</label>
            <input type="date" class="c1 r7" placeholder="сроки" name="start" required min="<?=date('Y-m-d')?>"  id="project_start_create">
            <label class="c1 r8">Срок сдачи задачи</label>
            <input type="date" class="c1 r9" placeholder="сроки" name="end" required min="<?=date('Y-m-d')?>" id="project_end_create">
            <label class="c1 r10">Исполнитель</label>
            <select class="c1 r11" placeholder="сроки" name="doer_id" id="project_doer_create">
                <script src="js/get_doers_of_project.js"></script>
            </select>
            <label class="c1 r12">Приоритет</label>
            <select class="c1 r13" placeholder="сроки" name="priority" id="project_priority_create">
                <option value="low">низкий</option>
                <option value="middle">средний</option>
                <option value="high">высокий</option>
            </select>
            <input type="submit" class="c1 r14" value="сохранить">
            <div class="c1 r1 cross" id="close_modal_edit" onclick="close_create()"><img src="images/cross.png"></div>
        </form>

        <form class="modal_create modal" id="modal_edit_task" method="post">
            <div class="c1 r1 headline_modal">Редактирование задачи</div>
            <input type="hidden" name="task_id" id="task_id_edit">
            <label class="c1 r2">Название</label>
            <input type="text" class="c1 r3" placeholder="название" name="name" required id="task_name_edit">
            <label class="c1 r4">Описание</label>
            <textarea type="text" class="c1 r5" placeholder="описание" name="description" required id="task_description_edit">описание</textarea>
            <label class="c1 r6">Дата начала задачи</label>
            <input type="date" class="c1 r7" placeholder="сроки" name="start" required min="<?=date('Y-m-d')?>"  id="task_start_edit">
            <label class="c1 r8">Срок сдачи задачи</label>
            <input type="date" class="c1 r9" placeholder="сроки" name="end" required min="<?=date('Y-m-d')?>" id="task_end_edit">
            <label class="c1 r10">Приоритет</label>
            <select class="c1 r11" placeholder="сроки" name="priority" id="task_priority_edit">
                <option value="low">низкий</option>
                <option value="middle">средний</option>
                <option value="high">высокий</option>
            </select>
            <input type="submit" class="c1 r12" value="сохранить">
            <div class="c1 r1 cross" id="close_modal_edit" onclick="close_edit()"><img src="images/cross.png"></div>
        </form>

        <form class="modal_comment modal" id="modal_comment" method="post">
            <div class="c1 r1 headline_modal">Комментарии к задаче</div>
            <div class="c1 r2 scroll_comment" id="scroll_comment">
                <!-- <div class="c2 comment">
                    <div class="c2 r1 comment_date">10:00:00 12.12.2024</div>
                    <div class="c2 r1 comment_doer">
                        <img src="images/people 4.svg">
                        <div class="c3">ИмяИмяИмяИмяИмяИмяИмяИмя</div>
                    </div>
                    <div class="c2 r2 comment_text">Текст КомментарияТекст КомментарияТекст КомментарияТекст КомментарияТекст КомментарияТекст КомментарияТекст КомментарияТекст КомментарияТекст Комментария</div>
                </div>
                <div class="c2 comment_void"></div>
                <div class="c2 comment">
                    <div class="c2 r1 comment_date">10:00:00 12.12.2024</div>
                    <div class="c2 r1 comment_doer">
                        <img src="images/people 4.svg">
                        <div class="c3">Имя</div>
                    </div>
                    <div class="c2 r2 comment_text">Текст Комментария</div>
                </div> -->
            </div>
            <script> if (localStorage.getItem('role') == "doer") {
                    let comm = document.createElement('div');
                    comm.classList.add('c1');
                    comm.classList.add('r3');
                    comm.classList.add('send_comment');
                    html_comm = ` 
                    <input type="hidden" id="comment_task_id" name="task_id">
                <input type="hidden" id="comment_doer" name="name_of_doer">
                <input type="text" id="input_comment" class="c2-4 r1" placeholder="Введите комментарий..">
                <img src="images/image 13.svg" class="c3 r1" onclick="send_comment()">
                `;
                comm.innerHTML = html_comm;
                    document.getElementById('modal_comment').append(comm);
                }
                else {
                    let comm = document.createElement('div');
                    comm.classList.add('c1');
                    comm.classList.add('r3');
                    comm.classList.add('send_comment');
                    html_comm = ` 
                    <input type="hidden" id="comment_task_id" name="task_id">
                <input type="hidden" id="comment_doer" name="name_of_doer">
                `;
                comm.innerHTML = html_comm;
                    document.getElementById('modal_comment').append(comm);
                }
        </script>
            <!-- <div class="c1 r3 send_comment">
                <input type="hidden" id="comment_task_id" name="task_id">
                <input type="hidden" id="comment_doer" name="name_of_doer">
                <input type="text" id="input_comment" class="c2-4 r1" placeholder="Введите комментарий..">
                <img src="images/image 13.svg" class="c3 r1" onclick="send_comment()">
            </div> -->
            <div class="c1 r1 cross" id="close_modal_edit" onclick="close_comment()"><img src="images/cross.png"></div>
        </form>
<script src="js/edit_task.js"></script>
</body>
</html>