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
            <img src="images/pen (1).svg" class="pen" onclick="show_edit_user(${value.id})">
        </div>
        <div class="except">
            <img src="images/delete 3.svg" class="trash" onclick="delete_user(${value.id})">
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

  function get_users_with_remove (filter) {
    $.ajax({
        url: "http://backend/get_users",
        method: "POST",
        success: (response)=>{
        // console.log(response);
        document.getElementById('main').innerHTML = '';
        
        let div0 = document.createElement('div');
        div0.classList.add('c3');
        div0.classList.add('headline');
        div0.innerHTML = `<h2>Пользователи</h2>`;
        document.getElementById('main').append(div0);

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
        // let trs = document.getElementsByClassName('tr_admin');
        // console.log(trs);
        // $.each(trs, function(key2, value2){
        //     console.log(key2);
        //     console.log(value2);
        //     // value2.remove();
        //   });
        $.each(users, function(key, value){
          
            // document.getElementById(`user_${value.id}`).remove();
             if (filter != null && value.role == filter) {
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
                <img src="images/pen (1).svg" class="pen" onclick="show_edit_user(${value.id})">
            </div>
            <div class="except">
                <img src="images/delete 3.svg" class="trash" onclick="delete_user(${value.id})">
            </div>
                `;
                div.innerHTML = html;
                document.getElementById('main').append(div);
             }
             else if (filter == '' || filter == null) {
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
                <img src="images/pen (1).svg" class="pen" onclick="show_edit_user(${value.id})">
            </div>
            <div class="except">
                <img src="images/delete 3.svg" class="trash" onclick="delete_user(${value.id})">
            </div>
                `;
                div.innerHTML = html;
                document.getElementById('main').append(div);
             }   
           });
           
          
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  }

  function close_edit () {
    document.getElementById("modal_edit_user").style.display="none";
    document.getElementById("shadow_edit").style.display="none";
  }
  function open_create () {
    document.getElementById("shadow_edit").style.display="block";
    document.getElementById("modal_create_user").style.display="grid";
  }
  function close_create () {
    document.getElementById("modal_create_user").style.display="none";
    document.getElementById("shadow_edit").style.display="none";
  }

  function show_edit_user (id) {
    $.ajax({
      url: "http://backend/one_user",
      method: "POST",
      data: {user_id : id},
      success: (response)=>{
      // console.log(response[0]);
      document.getElementById("user_id_edit").value = id;
      document.getElementById("user_name_edit").value = response[0].name;
      document.getElementById("user_email_edit").value = response[0].email;
      document.getElementById("user_role_edit").value = response[0].role;
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
    document.getElementById("shadow_edit").style.display="block";
    document.getElementById("modal_edit_user").style.display="grid";
  }

  function prepend_user (id) {
    $.ajax({
      url: "http://backend/one_user_for_create",
      method: "POST",
      data: {user_id : id},
      success: (response)=>{
        filter = document.getElementById("filter").value;
        if (filter != null && filter != '') {
            if (response.user[0].role == filter) {
                let count = response.count;
                if (count == 1) {
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
                    document.getElementsByClassName('no_task')[0].remove();
                }
          
                let users = response.user;
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
                      <img src="images/pen (1).svg" class="pen" onclick="show_edit_user(${value.id})">
                  </div>
                  <div class="except">
                      <img src="images/delete 3.svg" class="trash" onclick="delete_user(${value.id})">
                  </div>
                       `;
                       div.innerHTML = html;
                       if (count == 1) {
                          document.getElementById('main').append(div);
                      }
                      else {
                        document.getElementById('th_admin').after(div);
                      }
                     });
            }
        }
        
    //   console.log(response);
     
             
     
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
  }

  function delete_user (id) {
    $.ajax({
      url: "http://backend/delete_user",
      method: "POST",
      data: {user_id: id},
      success: (response)=>{
      alert(response.message);
      document.getElementById(`user_${id}`).remove();
     
        if (response.count == 0) { 
          document.getElementById(`th_admin`).remove();
          let div_th = document.createElement('div');
          div_th.classList.add('no_task');
          div_th.classList.add('c3');
          html_th = `
          <div>Пользователей нет..</div>
          `;
          div_th.innerHTML = html_th;
          document.getElementById('main').append(div_th);
      }
      
      },
      error: ()=>{
          console.log("Ошибка запроса!");
      }
  })
  }
