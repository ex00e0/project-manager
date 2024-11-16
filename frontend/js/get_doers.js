$.ajax({
    url: "http://backend/get_doers",
    method: "POST",
    success: (response)=>{

//    console.log(response);
    let doers = response;
    $.each(doers, function(key, value){
         
          let div = document.createElement('div');
          div.setAttribute('id', `doer_${value.id}`);
          div.setAttribute('value', `${value.id}`);
          div.classList.add('option_div');
          div.setAttribute('onclick', `change_color(${value.id})`);
          html = 
          `
          <div>
          ${value.name}
          </div>
          <img src="images/checkmark.png" id="mark_${value.id}">
          `;
            div.innerHTML = html;
           
         document.getElementById('list_block').append(div);
       });
   
    },
    error: ()=>{
        console.log("Ошибка запроса!");
    }
})

let doers_id_array = [];

function change_color(id) {
    // console.log (getComputedStyle(document.getElementById(`doer_${id}`)).backgroundColor);
    if (getComputedStyle(document.getElementById(`doer_${id}`)).backgroundColor == 'rgb(255, 255, 255)') {
        document.getElementById(`doer_${id}`).style.backgroundColor = 'rgb(240, 252, 238)';
        document.getElementById(`mark_${id}`).style.display = "block";
        doers_id_array.push(id);
        document.getElementById('project_team_array_create').value = doers_id_array;
        // console.log(document.getElementById('project_team_array_create').value);
    } 
    else {
        document.getElementById(`doer_${id}`).style.backgroundColor = 'rgb(255, 255, 255)';
        document.getElementById(`mark_${id}`).style.display = "none";
        doers_id_array = doers_id_array.filter((e) => e !== id);
        document.getElementById('project_team_array_create').value = doers_id_array;
        // console.log(document.getElementById('project_team_array_create').value);
    }
    
}

document.getElementById("project_team_create").addEventListener('click', function () {
    if (getComputedStyle(document.getElementById("list_block")).display == 'none') {
        document.getElementById("list_block").style.display = 'block';
    } 
    else {
        document.getElementById("list_block").style.display = 'none';
    }
});

  $("#modal_create").submit((event)=>{
    event.preventDefault();
    document.getElementById("project_user_id_create").value = localStorage.getItem("user_id");
    $.ajax({
        url: "http://backend/create_project",
        method: "POST",
        data: $("#modal_create").serialize(),
        
        success: (response)=>{

            // console.log(response);
          if (typeof(response) == 'object') {
            for (key in response) {
              alert(response[key][0]);
            }
          }
          else {
            document.getElementById("modal_create").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert('Проект создан');
            prepend_project(response);
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })