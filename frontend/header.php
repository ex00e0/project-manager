<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>project manager</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>
<body>
    <script>
    if (localStorage.getItem('user_id') == null) {
      
        location.href="index.php";
    } 
    </script>
    <script src="js/exit.js"></script>
    <nav id="nav">
        <a class="c2">
            <div class="c3 name">Имя</div>
        </a>
        <a class="c2" href="projects.php">
            <img src="images/image 2.svg" class="folder">
            <div class="c3">Проекты</div>
        </a>
        <a class="c2" href="tasks.php">
            <img src="images/image 3.svg">
            <div class="c3">Задачи</div>
        </a>
        <script>  
        if (localStorage.getItem('role') == "admin") {
            let user_a = document.createElement('a');
              user_a.classList.add('c2');
              user_a.setAttribute('href', `users.php`);
              user_a.innerHTML = ` <img src="images/image.svg">
            <div class="c3">Пользователи</div>`;
            document.getElementById('nav').append(user_a);
        }
        </script>
        <a class="c2">
            <img src="images/image 4.svg">
            <div class="c3">Отчеты</div>
        </a>
        <div class="c2 r6" onclick="exit()">
            <img src="images/log-out 1.svg">
            <div class="c3">Выйти</div>
        </div>
    </nav>
