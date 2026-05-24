<?php
session_start();

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: homepage.html');
    exit;
}

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true) ?? [];
$userId = $data['userId'] ?? $_SESSION['userId'];



require_once "database.php";

$stmt = $conn->prepare('SELECT * FROM accounts WHERE user_id = ?');
$stmt->bind_param('i', $userId);
$stmt->execute();
$accountInfo = $stmt->get_result()->fetch_assoc();

echo json_encode($accountInfo);
exit;
?>