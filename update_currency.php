<?php

require_once('database.php');
header('Content-Type: application/json');

$user_id = 19; 

$data = json_decode(file_get_contents('php://input'), true);

$js_coins = $data['coins'];

$query = "UPDATE user_currency SET coins = ? WHERE user_id = ?";
$stmt = $conn->prepare($query);

$query1 = "SELECT coins FROM user_currency WHERE user_id = ?";
$stmt1 = $conn->prepare($query1); 
$stmt1->bind_param("s", $user_id);
$stmt1->execute();

$result = $stmt1->get_result();
$row = $result->fetch_assoc();
$db_coins = $row["coins"];
$coins = $db_coins+$js_coins; 

$stmt1 = $conn->prepare($query1);
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