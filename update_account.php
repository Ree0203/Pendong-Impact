<?php
session_start();

$userId = $_SESSION['userId'];
$newUsername = $_POST['username'] ?? '';
$newPassword = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirm-password'] ?? '';

require_once 'database.php';

$username = '';
$password = '';

$stmt = $conn->prepare('SELECT username, password FROM accounts WHERE user_id = ?');
$stmt->bind_param('i', $userId);
$stmt->execute();
$stmt->bind_result($username, $password);
$stmt->fetch();
$stmt->free_result();


function sendResponse($status, $message) {
    echo json_encode(['status' => $status, 'message' => $message]);
    exit;
}

if(empty($newUsername)) {
    sendResponse('error', 'Username cannot be empty.');
}

if(!isset($_POST['change-password'])) {
    
    if($username === $newUsername) sendResponse('error', 'New username must be different.');

    $stmt = $conn->prepare('UPDATE accounts SET username = ? WHERE user_id = ?');
    $stmt->bind_param('si', $newUsername, $userId);

    if($stmt->execute()) {
        sendResponse('success', 'Username successfully changed.');
    }
    else {
        sendResponse('error', 'An error has occurred. Please try again.');
    }


}

else {

    if(empty($newPassword) || empty($confirmPassword)) sendResponse('error', 'Please fill up all fields.');

    if($newPassword !== $confirmPassword) sendResponse('error', 'Passwords do not match.');

    if(strlen($newPassword) < 8) sendResponse('error', 'Password must be at least 8 characters.');

    if(password_verify($newPassword, $password)) sendResponse('error', 'New password must be different.');

    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    if($username === $newUsername) {
        $stmt = $conn->prepare('UPDATE accounts SET password = ? WHERE user_id = ?');
        $stmt->bind_param('si', $hashedPassword, $userId);

        if($stmt->execute()) {
            sendResponse('success', 'Password successfully changed.');
        }
        else {
            sendResponse('error', 'An error has occurred. Please try again.');
        }
    }
    else {
        $stmt = $conn->prepare('UPDATE accounts SET username = ?, password = ? WHERE user_id = ?');
        $stmt->bind_param('ssi', $newUsername, $hashedPassword, $userId);

        if($stmt->execute()) {
            sendResponse('success', 'Username and password successfully changed.');
        }
        else {
            sendResponse('error', 'An error has occurred. Please try again.');
        }
    }
}


?>