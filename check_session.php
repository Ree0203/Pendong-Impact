<?php
session_start();

if(isset($_SESSION['userId'])) {
    echo json_encode(['loggedIn' => true]);
    exit();
}
else {
    echo json_encode(['loggedIn' => false]);
    exit();
}
?>