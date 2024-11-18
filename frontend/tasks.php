<?php require "header.php"; ?>
<script>
    var url_string = window.location.href; 
    var url = new URL(url_string);
    var project_id = url.searchParams.get("id");
</script>
<script src="js/tasks.js"></script>
<div class="sf">
    <input type="text" class="c3-5 r1" name="search" placeholder="поиск проектов..">
    <img src="images/image 11.svg" class="c4 r1 search_icon">
    <select class="c6 r1" name="filter">
        <option>все</option>
        <option>высокий приоритет</option>
        <option>средний приоритет</option>
        <option>низкий приоритет</option>
    </select>
    <script>
        if (localStorage.getItem('role') == "boss" && project_id!=null) {
            let plus = document.createElement('img');
              plus.classList.add('c8');
              plus.classList.add('r1');
              plus.classList.add('create_icon');
              plus.setAttribute('src', `images/image 10.svg`);
              plus.setAttribute('onclick', `open_create()`);
            document.getElementsByClassName('sf')[0].append(plus);
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
<script src="js/edit_task.js"></script>
</body>
</html>