<?php
session_start();
$data = json_decode(file_get_contents('php://input'), true);
$message = $data['message'];
$userId = $_SESSION['userId'];

require_once 'database.php';

$stmt = $conn->prepare("UPDATE accounts SET message = ? WHERE user_id = ?");
$stmt->bind_param('si', $message, $userId);

if($stmt->execute()) {
    echo json_encode(['status' => 'success']);
    exit;
}
else {
    echo json_encode(['status' => 'error']);
    exit;
}
?>