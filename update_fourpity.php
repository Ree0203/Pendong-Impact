<?php

session_start();

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: homepage.html');
    exit;
}

require_once("database.php"); 

$user_id = $_SESSION['userId']; 

$data = json_decode(file_get_contents('php://input'), true); 

$four_star_pity = $data['fourPity']; 

$stmt = $conn->prepare("UPDATE user_currency SET four_star_pity = ? WHERE user_id = ?");
$stmt->bind_param("ii", $four_star_pity, $user_id); 

if($stmt->execute()) { 
    echo json_encode([
        "status" => "success",
        "message" => "pity set successfully"
    ]); 
} else { 
    echo json_encode([
        "status" => "error",
        "message" => "there was an error during setting of pity"
    ]);
}
?>