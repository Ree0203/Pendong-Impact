<?php

session_start();

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: homepage.html');
    exit;
}

require_once("database.php"); 
header('Content-Type: application/json');

$user_id = $_SESSION['userId']; 
$data = json_decode(file_get_contents('php://input'), true); 

$pity = isset($data['fourPity']) ? (int)$data['fourPity'] : 0; 

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn->begin_transaction();

    $query = "UPDATE user_currency 
              SET four_star_pity = ? 
              WHERE user_id = ?";
              
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $pity, $user_id); 
    $stmt->execute();

    $conn->commit();

    echo json_encode([
        "status" => "success",
        "message" => "pity updated successfully"
    ]); 

} catch (Exception $e) {
    $conn->rollback();

    echo json_encode([
        "status" => "error",
        "message" => "there was an error updating pity"
    ]);
}
?>