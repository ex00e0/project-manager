function get_users () {
    $.ajax({
        url: "http://backend/get_users",
        method: "POST",
        success: (response)=>{
        // console.log(response);
       if (response.users.length !=0) {
        let div_th = document.createElement('div');
        div_th.classList.add('c3');
        div_th.classList.add('th_admin');
        div_th.setAttribute('id', `th_admin`);
        html_th = `
        <div>Имя</div>
        <div>Почта</div>
        <div>Роль</div>
        <div></div>
        <div></div>
       
        `;
        div_th.innerHTML = html_th;
        document.getElementById('main').append(div_th);
       }
       else {
        let div_th = document.createElement('div');
        div_th.classList.add('no_task');
        div_th.classList.add('c3');
        html_th = `
        <div>Пользователей нет..</div>
        `;
        div_th.innerHTML = html_th;
        document.getElementById('main').append(div_th);
       }
        let users = response.users;
        console.log(users);
        $.each(users, function(key, value){
             
              let div = document.createElement('div');
              div.classList.add('c3');
              div.classList.add('tr_admin');
              div.setAttribute('id', `user_${value.id}`);
              html = 
              `
               <div>${value.name}</div>
        <div>
            <div>${value.email}</div>
        </div>
        <div>
            <div>`;
        if (value.role == 'boss') {
            html += `руководитель`;
        }
        else if (value.role == 'doer') {
            html += `исполнитель`;
        }
        html += `</div>
        </div>
        <div class="except">
            <img src="images/pen (1).svg" class="pen">
        </div>
        <div class="except">
            <img src="images/delete 3.svg" class="trash">
        </div>
             `;
             div.innerHTML = html;
             document.getElementById('main').append(div);
           });
          
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  }


  $("document").ready(get_users());