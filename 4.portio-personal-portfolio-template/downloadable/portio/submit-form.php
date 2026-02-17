

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        echo "Error: All fields are required";
    } else {

        echo "Name: $name\n";
        echo "Email: $email\n";
        echo "Phone: $phone\n";
        echo "Message: $message\n";
    }
} else {
    echo "Error: This script only handles POST requests";
}
?>
