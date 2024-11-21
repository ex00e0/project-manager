$.ajax({
    url: "http://backend/get_bosses",
    method: "POST",
    success: (response)=>{

//    console.log(response);
    let bosses = response;
    $.each(bosses, function(key, value){
         
          let div = document.createElement('option');
          div.setAttribute('value', `${value.id}`);
          html = 
          `
          ${value.name}
          `;
            div.innerHTML = html;
           
         document.getElementById('boss_list').append(div);
       });
   
    },
    error: ()=>{
        console.log("Ошибка запроса!");
    }
})