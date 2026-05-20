<?php
session_start();
$favorites = json_decode(file_get_contents('php://input'), true);
$userId = $_SESSION['userId'];

require_once 'database.php';

$stmt1 = $conn->prepare("DELETE FROM account_favorites WHERE user_id = ?");
$stmt1->bind_param('i', $userId);

if(!$stmt1->execute()) {
    echo json_encode(['status' => 'error']);
    exit;
}

$position = 0;
$favorite = 0;

$stmt2 = $conn->prepare("INSERT INTO account_favorites VALUES(?, ?, ?)");
$stmt2->bind_param('iii', $userId, $position, $favorite);

for($i = 0; $i < count($favorites); $i++) {
    $position = $i+1;
    $favorite = $favorites[$i];
    
    if(!$stmt2->execute()) {
        echo json_encode(['status' => 'error']);
        exit;
    }
}

echo json_encode(['status' => 'success']);
exit;
?>