$("document").ready(()=>{
    $("#login").submit((event)=>{
        event.preventDefault();
        $.ajax({
            url: "http://backend/login",
            method: "POST",
            data: $("#login").serialize(),
            
            success: (response)=>{
                // console.log(response);

                if (response == 'неверный пароль' || response == 'неверный логин' || response == 'валидация не прошла') {
                    alert(response);
                }
                else {
                     localStorage.setItem('user_id', response.id);
                     localStorage.setItem('role', response.role);
                    location.href = 'projects.php';
                }
               
            },
            error: ()=>{
                console.log("Ошибка запроса!");
            }
        })
    })
})