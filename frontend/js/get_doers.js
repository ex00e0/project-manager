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
function show_list () {
    let autoFillJs = document.getElementsByClassName("autoFillJs");
    let blockFill = document.getElementsByClassName("blockFill");
    for(let fi1=0;fi1<autoFillJs.length;fi1++) {
        autoFillJs[fi1].addEventListener("click", function () {
            l
        })
    }
}