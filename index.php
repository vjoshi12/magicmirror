<!DOCTYPE html>
<html>
<head>

<title>Magic Mirror</title>

<script src="jquery-2.1.3.js"></script>
<script src="moment.js"></script>
<script src="config.js"></script>
<script src="main.js"></script>
<script type="text/javascript">
        var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
</script>
<link rel="stylesheet" type="text/css" href="mystyle.css">

</head>

<body>

	<div id="timeBox">
		<h1 id="displayTime"></h1>
		<p id="displayDate"></p>
	</div>

	<div id="weatherBox">
		<h1 id="currWeather">70 degrees</h1>
		<p id="otherWeather">Other weather</p>
	</div>

</body>
</html>
