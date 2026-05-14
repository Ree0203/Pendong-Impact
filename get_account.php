<?php
session_start();
$userId = $_SESSION['userId'];
header('Content-Type: application/json');

require_once "database.php";

$stmt = $conn->prepare('SELECT * FROM accounts WHERE user_id = ?');
$stmt->bind_param('i', $userId);
$stmt->execute();
$accountInfo = $stmt->get_result()->fetch_assoc();

echo json_encode($accountInfo);
exit();
?>