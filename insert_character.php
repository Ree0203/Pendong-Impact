<?php
    header('Content-Type: application/json');  
    require_once "database.php"; 


    $user_id = 18; 
    $characters_array = json_decode(file_get_contents('php://input'), true); 

    for($i = 0; $i<count($characters_array); $i++) { 
        //check if user has the character. 

        $character_id = $characters_array[$i]['id']; 
        
        $query = "SELECT * FROM inventory WHERE user_id = ? AND character_id = ?"; 
        $stmt = $conn->prepare($query); 
        $stmt->bind_param("ii", $user_id, $character_id); 
        $stmt->execute(); 
        $result = $stmt->get_result(); 
        $row = $result->fetch_assoc();
        
        //user doesnt have the character yet, put the character in the database. 
        if($row === null) { 
            $query1 = "INSERT INTO inventory (user_id, character_id) VALUES (?, ?)";
            $stmt1 = $conn->prepare($query1); 
            $stmt1->bind_param("ii", $user_id, $character_id); 

            $stmt1->execute();
        }
    }
    echo json_encode(["status" => "success",]);
?>