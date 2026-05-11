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
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if($type === 'register') {
        $email = $_POST['email'] ?? '';
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
        $stmt = $conn->prepare("SELECT * FROM Accounts WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows > 0) {

            sendResponse('error', 'Email already exists.');
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO Accounts(username, password, email) VALUES(?, ?, ?)");
        $stmt->bind_param('sss', $username, $hashedPassword, $email);
        
        if($stmt->execute()) {
            sendResponse('registered', 'Successfully Registered. You can now log in.');
        }
        else{
            sendResponse('error', 'Error during registration. Please try again.');
        }

        $stmt = $conn->(prepare("INSERT INTO user_currency(gems, coins) VALUES(0, 0)" ));
        $stmt->execute(); 
        
    }
    elseif($type === 'login') {
        if(empty($username) || empty($password)) {
            sendResponse('error', 'Please fill up all fields.');
        }

        require_once 'database.php';
        $stmt = $conn->prepare('SELECT user_id, username, password FROM Accounts WHERE username = ?');
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();

        if(!$result) {
            sendResponse('error', 'Username not found.');
        }

        if(password_verify($password, $result['password'])) {
            $_SESSION['userId'] = $result['user_id'];
            $_SESSION['username'] = $username;
            sendResponse('logged', 'Successfully logged in. Redirecting...');
        }
        else {
            sendResponse('error', 'Incorrect Password.');
        }
        
    }
    
?>