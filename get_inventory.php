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

$stmt1 = $conn->prepare("SELECT Characters.* FROM Inventory INNER JOIN Characters ON Inventory.character_id = Characters.character_id WHERE Inventory.user_id = ?");
$stmt1->bind_param('i', $userId);
$stmt1->execute();
$owned = $stmt1->get_result()->fetch_all(MYSQLI_ASSOC);

$stmt2 = $conn->prepare("SELECT * FROM Characters WHERE character_id NOT IN(SELECT character_id FROM Inventory WHERE user_id = ?)");
$stmt2->bind_param('i', $userId);
$stmt2->execute();
$unowned = $stmt2->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode(['owned' => $owned, 'unowned' => $unowned]);
exit();
?>