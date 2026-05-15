<?php

require_once('database.php');
header('Content-Type: application/json');

$user_id = 19; 

$data = json_decode(file_get_contents('php://input'), true);

$js_coins = $data['coins'];
$js_gems = $data['gems']; 

$query = "UPDATE user_currency SET coins = ?, gems = ? WHERE user_id = ?";
$stmt = $conn->prepare($query);

$query1 = "SELECT coins FROM user_currency WHERE user_id = ?";
$stmt1 = $conn->prepare($query1); 
$stmt1->bind_param("s", $user_id);
$stmt1->execute();
$result = $stmt1->get_result();
$row = $result->fetch_assoc();
$db_coins = $row["coins"];
$coins = $db_coins+$js_coins; 

$get_db_gems_query = "SELECT gems
                      FROM user_currency
                      WHERE user_id = ?"; 
$get_db_gems = $conn->prepare($get_db_gems_query); 
$get_db_gems->bind_param("i", $user_id); 
$get_db_gems->execute();
$gem_result = $get_db_gems->get_result();
$gem_row = $gem_result->fetch_assoc(); 
$db_gems = $gem_row["gems"]; 
$gems = $db_gems+$js_gems; 

$stmt->bind_param("iii", $coins, $gems, $user_id);

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