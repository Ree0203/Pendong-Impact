<?php
    if($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header('Location: homepage.html');
        exit;
    }

    session_start();

    if(empty($_SESSION['userId'])) {
        echo json_encode(['status' => 'error', 'message' => 'Already logged out.']);
        exit;
    }

    $_SESSION = [];
    session_destroy();
    echo json_encode(['status' => 'success', 'message' => 'Successfully logged out.']);
    exit;
?>