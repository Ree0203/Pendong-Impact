<?php


require_once("database.php"); 

$user_id = 18; 

$data = json_decode(file_get_contents('php://input'), true); 

$pity = $data['pity']; 

$stmt = $conn->prepare("UPDATE user_currency SET pity = ? WHERE user_id = ?");
$stmt->bind_param("ii", $pity, $user_id); 

if($stmt->execute()) { 
    echo json_encode([
        "status" => "success",
        "message" => "pity set successful"
    ]); 
} else { 
    echo json_encode([
        "status" => "error",
        "message" => "there was an error during setting of pity"
    ]);
}
?>