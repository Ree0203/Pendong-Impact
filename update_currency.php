<?php

session_start(); 

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: homepage.html');
    exit;
}

require_once('database.php');
header('Content-Type: application/json');

$user_id = $_SESSION['userId']; 

$data = json_decode(file_get_contents('php://input'), true);

$js_coins = isset($data['coins']) ? (int)$data['coins'] : 0;
$js_gems  = isset($data['gems']) ? (int)$data['gems'] : 0;
$js_pity  = isset($data['pity']) ? (int)$data['pity'] : 0; 

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn->begin_transaction();

    
    $query = "UPDATE user_currency 
              SET coins = coins + ?, 
                  gems = gems + ?, 
                  pity = pity + ? 
              WHERE user_id = ?";
              
    $stmt = $conn->prepare($query);
    $stmt->bind_param("iiii", $js_coins, $js_gems, $js_pity, $user_id);
    
    $stmt->execute();

    if ($stmt->affected_rows === 0) {
        throw new Exception("User currency record not found.");
    }

    $conn->commit();

    echo json_encode([
        "status" => "success",
        "message" => "purchase successful"
    ]);

} catch (Exception $e) {
    $conn->rollback();

    echo json_encode([
        "status" => "error",
        "message" => "there was an error processing your transaction"
    ]);
}

?>