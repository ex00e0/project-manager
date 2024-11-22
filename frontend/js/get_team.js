$.ajax({
    url: "http://backend/get_doers",
    method: "POST",
    success: (response)=>{

//    console.log(response);
    let doers = response;
    $.each(doers, function(key, value){
         
          let div = document.createElement('div');
          div.setAttribute('id', `doer_t_${value.id}`);
          div.setAttribute('value', `${value.id}`);
          div.classList.add('option_div');
          div.classList.add('option_div_team');
          div.setAttribute('onclick', `change_color_team(${value.id})`);
          html = 
          `
          <div>
          ${value.name}
          </div>
          <img src="images/checkmark.png" id="mark_t_${value.id}" class="mark_team">
          `;
            div.innerHTML = html;
           
         document.getElementById('team_list').append(div);
       });
   
    },
    error: ()=>{
        console.log("Ошибка запроса!");
    }
})

let team_array = [];

function change_color_team(id) {
    // console.log (getComputedStyle(document.getElementById(`doer_${id}`)).backgroundColor);
    if (getComputedStyle(document.getElementById(`doer_t_${id}`)).backgroundColor == 'rgb(255, 255, 255)') {
        document.getElementById(`doer_t_${id}`).style.backgroundColor = 'rgb(240, 252, 238)';
        document.getElementById(`mark_t_${id}`).style.display = "block";
        team_array.push(id);
        document.getElementById('team_array').value = team_array;
        // console.log(document.getElementById('team_array').value);
    } 
    else {
        document.getElementById(`doer_t_${id}`).style.backgroundColor = 'rgb(255, 255, 255)';
        document.getElementById(`mark_t_${id}`).style.display = "none";
        team_array = team_array.filter((e) => e !== id);
        document.getElementById('team_array').value = team_array;
        // console.log(document.getElementById('project_team_array_create').value);
    }
    
}

document.getElementById("team_click").addEventListener('click', function () {
    if (getComputedStyle(document.getElementById("team_list")).display == 'none') {
        document.getElementById("team_list").style.display = 'block';
    } 
    else {
        document.getElementById("team_list").style.display = 'none';
    }
});


$("#modal_edit_team").submit((event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://backend/edit_team",
        method: "POST",
        data: $("#modal_edit_team").serialize(),
        
        success: (response)=>{

            // console.log(response);
          if (typeof(response) == 'object') {
            for (key in response) {
              alert(response[key][0]);
            }
          }
          else {
            document.getElementById("modal_edit_team").style.display="none";
            document.getElementById("shadow_edit").style.display="none";
            alert('Команда проекта изменена');
            get_projects_with_remove();
            $("#modal_edit_team").trigger('reset');
          }
            
           
        },
        error: ()=>{
            console.log("Ошибка запроса!");
        }
    })
  })