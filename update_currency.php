<?php

require_once('database.php');
header('Content-Type: application/json');

$user_id = 19; 

$data = json_decode(file_get_contents('php://input'), true);

$coins = $data['coins'];

$query = "UPDATE user_currency SET coins = ? WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $coins, $user_id);

if( $stmt->execute() ){
    echo json_encode([
        "status" => "success",
        "message" => "purchase successsful"
    ]);
} else { 
    echo json_encode([
        "status"=> "error",
        "message"=> "there was an error"
    ]);
}


?>