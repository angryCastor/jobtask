<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    header('Access-Control-Allow-Origin: *');
    
    $bookedDays=$_GET['bookedDays'];
    
    $json = file_get_contents("bookedDays.json");
    $obj = json_decode($json, true);
    
    $result = array_merge($bookedDays, $obj);

    $fd = fopen("bookedDays.json", 'w') or die("не удалось создать файл");
    fwrite($fd, json_encode($result));
    fclose($fd);
?>