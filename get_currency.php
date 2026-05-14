<?php 

$user_id = 19; 

$query = "SELECT gems, coins FROM user_currency WHERE user_id = ?";
$stmt = $conn->prepare($query); 
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();

$data = $result->fetch_assoc();

echo json_encode($data);

?>