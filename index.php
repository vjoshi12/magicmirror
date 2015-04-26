<!DOCTYPE html>
<html>
<head>

<title>Magic Mirror</title>

<script src="js/jquery-2.1.3.js"></script>
<script src="js/moment.js"></script>
<script src="js/config.js"></script>
<script src="js/main.js?nocache=<?php echo md5(microtime()) ?>"></script>
<script type="text/javascript">
        var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
</script>

<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
<style>
	<?php include('css/mystyle.css') ?>
</style>

</head>

<body>

	<div class="top left">
		<div class="date small dimmed"></div>
		<div class="time"></div>
		<div class="calendar xxsmall"</div>
	</div>

	<div class="top right">
		<div class="windsun small dimmed"></div>
		<div class="temp"></div>
		<div class="forecast small dimmed"></div>
	</div>

	<div class="lower-third center-hor">
		<div class="compliment light"></div>
	</div>

</body>
</html>
