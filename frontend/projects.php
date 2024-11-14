<?php require "header.php"; ?>
<script>
    // alert(localStorage.getItem('user_id'));
</script>
<div class="sf">
    <input type="text" class="c3-5 r1" name="search" placeholder="поиск проектов..">
    <img src="images/image 11.svg" class="c4 r1 search_icon">
    <select class="c6 r1" name="filter">
        <option>все</option>
        <option>создан</option>
        <option>в процессе</option>
        <option>завершен</option>
    </select>
    <script>
        if (localStorage.getItem('role') == "boss") {
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
    <div class="c3 headline" id="headline_projects">
        <h2>Мои проекты</h2>
    </div>
    <script src="js/get_projects.js"></script>
    <!-- <div class="c3 block_project">
       <img src="images/image 2.svg" class="c2 r1 project_folder">
       <div class="c4 r1 project_name">Проект 1</div>
       <div class="c5 r1 circle_gray"></div>
       <div class="c7 r1 project_boss">
            <img src="images/people 1.svg" class="c1 r1">
            <div class="c3 r1">Имя</div>
       </div>
       <div class="c6 r1">завершен</div>
       <div class="c9-all r1">до 22.10.2024</div>
       <div class="c2-8 r2-all project_desc">Описание проекта................................<br>...................<br>.................................................................................................................................................................................................................................</div>
       <img src="images/pen (1).svg" class="c10 r2-all pen">
       <img src="images/delete 3.svg" class="c11 r2-all trash">
    </div>
    <div class="vh1-1 c3"></div>

    <div class="c3 block_project">
       <img src="images/image 2.svg" class="c2 r1 project_folder">
       <div class="c4 r1 project_name">Проект 1</div>
       <div class="c5 r1 circle_green"></div>
       <div class="c7 r1 project_boss">
            <img src="images/people 1.svg" class="c1 r1">
            <div class="c3 r1">Имя</div>
       </div>
       <div class="c6 r1">в процессе</div>
       <div class="c9-all r1">до 22.10.2024</div>
       <div class="c2-8 r2-all project_desc">Описание проекта................................<br>...................<br>.................................................................................................................................................................................................................................</div>
       <img src="images/pen (1).svg" class="c10 r2-all pen">
       <img src="images/delete 3.svg" class="c11 r2-all trash">
    </div>
    <div class="vh1-1 c3"></div>

    <div class="c3 block_project">
       <img src="images/image 2.svg" class="c2 r1 project_folder">
       <div class="c4 r1 project_name">Проект 1</div>
       <div class="c5 r1 circle_yellow"></div>
       <div class="c7 r1 project_boss">
            <img src="images/people 1.svg" class="c1 r1">
            <div class="c3 r1">Имя</div>
       </div>
       <div class="c6 r1">создан</div>
       <div class="c9-all r1">до 22.10.2024</div>
       <div class="c2-8 r2-all project_desc">Описание проекта................................<br>...................<br>.................................................................................................................................................................................................................................</div>
       <img src="images/pen (1).svg" class="c10 r2-all pen">
       <img src="images/delete 3.svg" class="c11 r2-all trash">
    </div> -->
</main>
<div class="shadow_modal" id="shadow_edit"></div>
        <form class="modal_edit modal" id="modal_edit" method="post">
            <div class="c1 r1 headline_modal">Редактирование проекта</div>
            <input type="hidden" id="project_id" name="id">
            <label class="c1 r2">Название</label>
            <input type="text" class="c1 r3" placeholder="название" name="name" required id="project_name">
            <label class="c1 r4">Описание</label>
            <textarea type="text" class="c1 r5" placeholder="описание" name="description" id="project_description" required>описание</textarea>
            <label class="c1 r6">Срок сдачи проекта</label>
            <input type="date" class="c1 r7" placeholder="сроки" name="end" required id="project_end">
            <input type="submit" class="c1 r8" value="сохранить">
            <div class="c1 r1 cross" id="close_modal_edit" onclick="close_edit()"><img src="images/cross.png"></div>
        </form>

        <form class="modal_create modal" id="modal_create" method="post">
            <div class="c1 r1 headline_modal">Создание проекта</div>
            <input type="hidden" name="user_id" id="project_user_id_create">
            <label class="c1 r2">Название</label>
            <input type="text" class="c1 r3" placeholder="название" name="name" required id="project_name_create">
            <label class="c1 r4">Описание</label>
            <textarea type="text" class="c1 r5" placeholder="описание" name="description" required id="project_description_create">описание</textarea>
            <label class="c1 r6">Дата начала проекта</label>
            <input type="date" class="c1 r7" placeholder="сроки" name="start" required min="<?=date('Y-m-d')?>"  id="project_start_create">
            <label class="c1 r8">Срок сдачи проекта</label>
            <input type="date" class="c1 r9" placeholder="сроки" name="end" required min="<?=date('Y-m-d')?>" id="project_end_create">
            <label class="c1 r10">Команда</label>
            <select class="c1 r11" placeholder="сроки" name="end" id="project_team_create">
                <script src="js/get_doers.js"></script>
            </select>
            <input type="submit" class="c1 r12" value="сохранить">
            <div class="c1 r1 cross" id="close_modal_edit" onclick="close_create()"><img src="images/cross.png"></div>
        </form>

<script src="js/edit_project.js"></script>
</body>
</html>