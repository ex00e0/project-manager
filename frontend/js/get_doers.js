$.ajax({
    url: "http://backend/get_doers",
    method: "POST",
    success: (response)=>{

   console.log(response);
    let doers = response;
    $.each(doers, function(key, value){
         
          let div = document.createElement('option');
          div.setAttribute('id', `doer_${value.id}`);
          div.setAttribute('value', `${value.id}`);
          div.setAttribute('onclick', `change_color(${value.id})`);
          html = 
          `
          ${value.name}
          `;
            div.innerHTML = html;
           
         document.getElementById('project_team_create').append(div);
       });
   
    },
    error: ()=>{
        console.log("Ошибка запроса!");
    }
})

function change_color(id) {
    document.getElementById(`doer_${id}`).style.backgroundColor = 'green';
}