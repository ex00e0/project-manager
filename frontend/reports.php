<?php require "header.php"; ?>
<script>
    // alert(localStorage.getItem('user_id'));
</script>
<div class="rep_header">
    <div class="c3-5 r1 button_rep"><div>Отчет по задачам</div></div>
    <script>
            let plus = document.createElement('img');
              plus.classList.add('c4');
              plus.classList.add('r1');
              plus.classList.add('create_icon_rep');
              plus.setAttribute('src', `images/plus_g.png`);
              plus.setAttribute('onclick', `open_create_report_task()`);
            document.getElementsByClassName('rep_header')[0].append(plus);
    </script>
     <div class="c6-8 r1 button_rep"><div>Отчет по проектам</div></div>
    <script>
            let plus2 = document.createElement('img');
              plus2.classList.add('c7');
              plus2.classList.add('r1');
              plus2.classList.add('create_icon_rep');
              plus2.setAttribute('src', `images/plus_g.png`);
              plus2.setAttribute('onclick', `open_create()`);
            document.getElementsByClassName('rep_header')[0].append(plus2);
    </script>
     <div class="c9-11 r1 button_rep"><div>Отчет по задачам</div></div>
    <script>
            let plus3 = document.createElement('img');
              plus3.classList.add('c10');
              plus3.classList.add('r1');
              plus3.classList.add('create_icon_rep');
              plus3.setAttribute('src', `images/plus_g.png`);
              plus3.setAttribute('onclick', `open_create()`);
            document.getElementsByClassName('rep_header')[0].append(plus3);
    </script>
</div>
<main id="main">
    <div class="c3 headline">
        <h2>Отчеты</h2>
    </div>
    <div></div>
</main>
<div class="shadow_modal" id="shadow_edit"></div>
       
</body>
</html>