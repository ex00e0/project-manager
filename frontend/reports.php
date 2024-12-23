<?php require "header.php"; ?>
<script>
    // alert(localStorage.getItem('user_id'));
</script>
<!-- <div class="rep_header">
    <div class="c3-5 r1 button_rep"><div>Отчет по проектам</div></div>
    <script>
            let plus = document.createElement('img');
              plus.classList.add('c4');
              plus.classList.add('r1');
              plus.classList.add('create_icon_rep');
              plus.setAttribute('src', `images/plus_g.png`);
              plus.setAttribute('onclick', `open_create_report_task()`);
            document.getElementsByClassName('rep_header')[0].append(plus);
    </script>
     <div class="c6-8 r1 button_rep"><div>Отчет по исполнителям</div></div>
    <script>
            let plus2 = document.createElement('img');
              plus2.classList.add('c7');
              plus2.classList.add('r1');
              plus2.classList.add('create_icon_rep');
              plus2.setAttribute('src', `images/plus_g.png`);
              plus2.setAttribute('onclick', `open_create()`);
            document.getElementsByClassName('rep_header')[0].append(plus2);
    </script>
     <div class="c9-11 r1 button_rep"><div>Отчет по руководителям</div></div>
    <script>
            let plus3 = document.createElement('img');
              plus3.classList.add('c10');
              plus3.classList.add('r1');
              plus3.classList.add('create_icon_rep');
              plus3.setAttribute('src', `images/plus_g.png`);
              plus3.setAttribute('onclick', `open_create()`);
            document.getElementsByClassName('rep_header')[0].append(plus3);
    </script> 
</div> -->
<div class="sf">
  
    <script>
            let plus = document.createElement('img');
              plus.classList.add('c8');
              plus.classList.add('r1');
              plus.classList.add('create_icon');
              plus.setAttribute('src', `images/image 10.svg`);
              plus.setAttribute('onclick', `open_create_report()`);
            document.getElementsByClassName('sf')[0].append(plus);
    </script>
</div>
<main id="main">
    <div class="c3 headline">
        <h2>Отчеты</h2>
    </div>
    
</main>
<div class="shadow_modal" id="shadow_edit"></div>
<form class="modal_edit modal" id="modal_create_report" method="post">
            <div class="c1 r1 headline_modal">Создание отчета</div>
            <input type="hidden" id="report_user_id" name="user_id">
            <input type="hidden" id="report_role" name="role">
            <label class="c1 r2">С какого числа</label>
            <input type="date"  class="c1 r3" max="<?=date('Y-m-d')?>" name="start">
            <label class="c1 r4">По какое число</label>
            <input type="date"  class="c1 r5" max="<?=date('Y-m-d')?>" name="end">
            <script>
              if (localStorage.getItem('role') == 'admin') {
                let plus0 = document.createElement('label');
                plus0.classList.add('c1');
                plus0.classList.add('r6');
                plus0.innerHTML = `Тип отчета`;
                document.getElementById('modal_create_report').append(plus0);
                let plus01 = document.createElement('select');
                plus01.classList.add('c1');
                plus01.classList.add('r7');
                plus01.setAttribute('name', `type`);
                plus01.setAttribute('required');
                plus01.innerHTML = `
                 <option value="projects">по проектам</option>
                <option value="doers">по исполнителям</option>
                <option value="bosses">по руководителям</option>
                `;
                document.getElementById('modal_create_report').append(plus01);
              }
              else if (localStorage.getItem('role') == 'boss') {
                let plus00 = document.createElement('label');
                plus00.classList.add('c1');
                plus00.classList.add('r6');
                plus00.innerHTML = `Проект`;
                document.getElementById('modal_create_report').append(plus00);
                let plus001 = document.createElement('select');
                plus001.classList.add('c1');
                plus001.classList.add('r7');
                plus001.setAttribute('name', `project_id`);
                plus001.setAttribute('required', '');
                plus001.setAttribute('id', 'projects_list');
                document.getElementById('modal_create_report').append(plus001);
              }
              else if (localStorage.getItem('role') == 'doer') {
                let plus003 = document.createElement('input');
                plus003.setAttribute('type', `hidden`);
                plus003.setAttribute('name', `doer_id`);
                plus003.setAttribute('value', `${localStorage.getItem('user_id')}`);
                document.getElementById('modal_create_report').append(plus003);
              }
            </script>
            <script src="js/get_projects_for_report.js"></script>
            <!-- <label class="c1 r6">Тип отчета</label> -->
            <!-- <select type="text" class="c1 r7" name="type" required>
                <option value="projects">по проектам</option>
                <option value="doers">по исполнителям</option>
                <option value="bosses">по руководителям</option>
            </select> -->
            <input type="submit" class="c1 r8" value="сохранить">
            <div class="c1 r1 cross" id="close_modal_edit" onclick="close_create_report()"><img src="images/cross.png"></div>
        </form>
<script src="js/reports.js"></script>
</body>
</html>