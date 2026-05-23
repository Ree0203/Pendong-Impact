<?php

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: homepage.html');
    exit;
}

session_start();
header('Content-Type: application/json');

echo json_encode($_SESSION);
exit;
?>