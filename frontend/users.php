<?php require "header.php"; ?>
<script>
    if (localStorage.getItem('role') != 'admin') {
      
        location.href="projects.php";
    } 
    </script>
<script src="js/users.js"></script>
<div class="sf">
    <!-- <input type="text" class="c3-5 r1" name="search" placeholder="поиск..">
    <img src="images/image 11.svg" class="c4 r1 search_icon"> -->
    <select class="c3-5 r1" name="filter" onchange="get_users_with_remove(this.value)" id="filter">
        <option value="">все</option>
        <option value="doer">исполнители</option>
        <option value="boss">руководители</option>
    </select>
    <script>
            let plus = document.createElement('img');
              plus.classList.add('c8');
              plus.classList.add('r1');
              plus.classList.add('create_icon');
              plus.setAttribute('src', `images/image 10.svg`);
              plus.setAttribute('onclick', `open_create()`);
            document.getElementsByClassName('sf')[0].append(plus);
    </script>
</div>
<main id="main">
    <div class="c3 headline">
        <h2>Пользователи</h2>
    </div> 
    

</main>
<div class="shadow_modal" id="shadow_edit"></div>
<form class="modal_edit modal" id="modal_edit_user" method="post">
            <div class="c1 r1 headline_modal">Редактирование пользователя</div>
            <input type="hidden" name="user_id" id="user_id_edit">
            <label class="c1 r2">Имя</label>
            <input type="text" class="c1 r3" placeholder="имя" name="name" required id="user_name_edit">
            <label class="c1 r4">Почта</label>
            <input type="email" class="c1 r5" placeholder="почта" name="email" required id="user_email_edit">
            <label class="c1 r6">Роль</label>
            <select class="c1 r7" placeholder="роль" name="role" id="user_role_edit">
                <option value="boss">руководитель</option>
                <option value="doer">исполнитель</option>
            </select>
            <input type="submit" class="c1 r8" value="сохранить">
            <div class="c1 r1 cross" id="close_modal_edit" onclick="close_edit()"><img src="images/cross.png"></div>
        </form>
        <form class="modal_create_user modal" id="modal_create_user" method="post">
        <div class="c1 r1 headline_modal">Создание пользователя</div>
            <label class="c1 r2">Имя</label>
            <input type="text" class="c1 r3" placeholder="имя" name="name" required>
            <label class="c1 r4">Почта</label>
            <input type="email" class="c1 r5" placeholder="почта" name="email" required>
            <label class="c1 r6">Роль</label>
            <select class="c1 r7" placeholder="роль" name="role" id="user_role_edit">
                <option value="boss">руководитель</option>
                <option value="doer">исполнитель</option>
            </select>
            <label class="c1 r8">Пароль</label>
            <input type="password" class="c1 r9" placeholder="пароль" name="password" required>
            <input type="submit" class="c1 r10" value="сохранить">
            <div class="c1 r1 cross" id="close_modal_edit" onclick="close_create()"><img src="images/cross.png"></div>
        </form>
<script src="js/edit_user.js"></script>
</body>
</html>