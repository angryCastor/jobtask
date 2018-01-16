<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    $json = file_get_contents("bookedDays.json");
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    echo $json;
?>