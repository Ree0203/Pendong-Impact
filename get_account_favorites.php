<?php
session_start();

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: homepage.html');
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];

require_once "database.php";

$stmt = $conn->prepare('SELECT character_id FROM account_favorites WHERE user_id = ? ORDER BY position ASC');
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result()->fetch_all(MYSQLI_NUM);
$favorites = array_column($result, 0);

echo json_encode($favorites);
?>