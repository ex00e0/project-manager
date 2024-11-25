<?php require "header.php"; ?>
<script>
    if (localStorage.getItem('role') != 'admin') {
      
        location.href="projects.php";
    } 
    </script>
<script src="js/users.js"></script>
<div class="sf">
    <input type="text" class="c3-5 r1" name="search" placeholder="поиск..">
    <img src="images/image 11.svg" class="c4 r1 search_icon">
    <select class="c6 r1" name="filter">
        <option>все</option>
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

</body>
</html>