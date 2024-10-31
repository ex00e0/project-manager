$("document").ready(()=>{
        $.ajax({
            url: "http://backend/user_projects",
            method: "POST",
            data: {user_id : localStorage.getItem('user_id')},
            success: (response)=>{
                console.log(response);
            },
            error: ()=>{
                console.log("Ошибка запроса!");
            }
        })
})