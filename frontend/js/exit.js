function exit () {
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    location.href="index.php";
}