<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Replace these values with your database credentials
$servername = "localhost";
$username = "your_database_username";
$password = "your_database_password";
$dbname = "your_database_name";
$table_name = "your_table_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection to database failed: " . $conn->connect_error]);
    exit;
}

// Read input JSON data
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Prepare SQL statement
$sql = "INSERT INTO $table_name (column_id, issue_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE issue_id=VALUES(issue_id)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "SQL statement preparation failed: " . $conn->error]);
    exit;
}

// Save board state to database
foreach ($input as $column_id => $issue_ids) {
    foreach ($issue_ids as $issue_id) {
        $stmt->bind_param("ss", $column_id, $issue_id);
        $stmt->execute();
    }
}

// Close connection
$stmt->close();
$conn->close();

http_response_code(200);
echo json_encode(["success" => true]);
?>
