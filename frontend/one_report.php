<?php require "header.php"; ?>
<script>
    var url_string = window.location.href; 
    var url = new URL(url_string);
    var report_id = url.searchParams.get("id");
    if (report_id == null) {
        location.href="reports.php";
    }
</script>
<div class="sf">
  
</div>
<main id="main">
    <div class="c3 headline" id="headline_one_rep">
        
    </div>
</main>
<script src="js/one_report.js"></script>
</body>
</html>