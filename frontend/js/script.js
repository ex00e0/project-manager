$("document").ready(()=>{
    $("#login").submit((event)=>{
        event.preventDefault();
        $.ajax({
            url: "http://backend/login",
            method: "POST",
            data: $("#login").serialize(),
            success: (response)=>{
                console.log(response);
            },
            error: ()=>{
                console.log("Ошибка запроса!");
            }
        })
    })
})