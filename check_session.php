<?php
session_start();
if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: homepage.html');
    exit;
}

if(isset($_SESSION['userId'])) {
    echo json_encode(['loggedIn' => true]);
    exit();
}
else {
    echo json_encode(['loggedIn' => false]);
    exit();
}
?>