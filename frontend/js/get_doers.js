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
          `;
            div.innerHTML = html;
           
         document.getElementById('list_block').append(div);
       });
   
    },
    error: ()=>{
        console.log("Ошибка запроса!");
    }
})

function change_color(id) {
    console.log (getComputedStyle(document.getElementById(`doer_${id}`)).backgroundColor);
    if (getComputedStyle(document.getElementById(`doer_${id}`)).backgroundColor == 'rgb(255, 255, 255)') {
        document.getElementById(`doer_${id}`).style.backgroundColor = 'rgb(0, 255, 255)';
    } 
    else {
        document.getElementById(`doer_${id}`).style.backgroundColor = 'rgb(255, 255, 255)';
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

function show_list () {
    
    let list_option = document.getElementsByClassName("list_option");
    

    // for(let fi1=0;fi1<autoFillJs.length;fi1++) {
    //     autoFillJs[fi1].addEventListener("click", function () {
            
    //     })
    // }
}