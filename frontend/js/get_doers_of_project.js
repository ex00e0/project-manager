$.ajax({
    url: "http://backend/get_doers_of_project",
    method: "POST",
    data: {project_id : project_id},
    success: (response)=>{

//    console.log(response);
    let doers = response;
    $.each(doers, function(key, value){
        
         for (val in value) {
           
            let div = document.createElement('option');
            div.setAttribute('value', `${value[val]}`); 
            html = 
                `
                ${val}
                `;
            div.innerHTML = html;
           
         document.getElementById('project_doer_create').append(div);
         }
          
        
       });
   
    },
    error: ()=>{
        console.log("Ошибка запроса!");
    }
})