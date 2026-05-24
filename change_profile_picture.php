<?php
session_start();

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: homepage.html');
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$picture = $data['profilePicture'];
$userId = $_SESSION['userId'];

require_once 'database.php';

$stmt = $conn->prepare("UPDATE accounts SET profile_pic = ? WHERE user_id = ?");
$stmt->bind_param("si", $picture, $userId);

if($stmt->execute()) {
    echo json_encode(['status' => 'success']);
    exit;
}

else {
    echo json_encode(['status' => 'error']);
    exit;
}
?>