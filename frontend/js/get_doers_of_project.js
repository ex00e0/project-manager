$.ajax({
    url: "http://backend/get_doers_of_project",
    method: "POST",
    data: {project_id : project_id},
    success: (response)=>{

   console.log(response);
    let doers = response;
    $.each(doers, function(key, value){
         console.log(value);
         for (val in value) {
            console.log(val);
            console.log(value[val]);
            let div = document.createElement('option');
            div.setAttribute('value', `${value[val]}`);
         }
          
    //       div.setAttribute('id', `doer_${value.id}`);
   
    //       div.classList.add('option_div');
    //       div.setAttribute('onclick', `change_color(${value.id})`);
    //       html = 
    //       `
    //       <div>
    //       ${value.name}
    //       </div>
    //       <img src="images/checkmark.png" id="mark_${value.id}">
    //       `;
    //         div.innerHTML = html;
           
    //      document.getElementById('project_doer_create').append(div);
       });
   
    },
    error: ()=>{
        console.log("Ошибка запроса!");
    }
})