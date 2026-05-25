<?php
    session_start();
    if($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header("Location: login.html");
        exit;
    }

    function sendResponse($status, $message) {
        echo json_encode(['status' => $status, 'message' => $message]);
        exit;
    }


    $type = $_POST['type'];
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if($type === 'register') {
        $username = $_POST['username'] ?? '';
        $confirmPassword = $_POST['confirm-password'] ?? '';

        if(empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
            sendResponse('error', 'Please fill up all fields.');
        }

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            sendResponse('error', 'Invalid Email format.');
        }

        if(strlen($password) < 8) {
            sendResponse('error', 'Password must be at least 8 characters.');
        }

        if($password !== $confirmPassword) {
            sendResponse('error', 'Passwords do not match.');
        }

        require_once 'database.php';
        $stmt = $conn->prepare("SELECT * FROM accounts WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows > 0) {

            sendResponse('error', 'Email already exists.');
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO accounts(username, password, email) VALUES(?, ?, ?)");
        $stmt->bind_param('sss', $username, $hashedPassword, $email);
        
        if(!$stmt->execute()) {
            sendResponse('error', 'Error during registration. Please try again.');
        }

        $newUserId = $conn->insert_id;
        
        $stmt = $conn->prepare("INSERT INTO user_currency(user_id, gems, coins, pity, four_star_pity) VALUES(?, 0, 0, 0, 0)");
        $stmt->bind_param('i', $newUserId);

        if($stmt->execute()) {
            sendResponse('registered', 'Successfully Registered. You can now log in.');
        }
        else{
            sendResponse('error', 'Error during registration. Please try again.');
        }
        
    }
    elseif($type === 'login') {
        if(empty($email) || empty($password)) {
            sendResponse('error', 'Please fill up all fields.');
        }

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            sendResponse('error', 'Invalid Email format.');
        }

        require_once 'database.php';
        $stmt = $conn->prepare('SELECT user_id, username, password FROM Accounts WHERE email = ?');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();

        if(!$result) {
            sendResponse('error', 'Email not found.');
        }

        if(!password_verify($password, $result['password'])) {
            sendResponse('error', 'Incorrect Password.');
            
        }


        if(!$stmt->execute()) {
            sendResponse('error', 'Error during login. Please try again.');
        }
        
        $_SESSION['userId'] = $result['user_id'];
        $_SESSION['username'] = $result['username'];
        sendResponse('logged', 'Successfully logged in. Redirecting...');
        
    }
    
?>