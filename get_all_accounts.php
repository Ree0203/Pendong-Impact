<?php
session_start();
header('Content-Type: application/json');
$accountId = $_SESSION['userId'];

require_once 'database.php';

$stmt = $conn->prepare('SELECT user_id, username, profile_pic FROM accounts WHERE user_id != ?');
$stmt->bind_param('i', $accountId);
$stmt->execute();
$accounts = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode($accounts);
exit;
?>