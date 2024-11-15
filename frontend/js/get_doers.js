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
        // console.log(doers_id_array);
    } 
    else {
        document.getElementById(`doer_${id}`).style.backgroundColor = 'rgb(255, 255, 255)';
        document.getElementById(`mark_${id}`).style.display = "none";
        doers_id_array = doers_id_array.filter((e) => e !== id);
        // console.log(doers_id_array);
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