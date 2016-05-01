<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = "$email \n\n" . trim($_POST["message"]);
        $subject = "Web Inquiry";
        $to = "contact@lucianobruzzoni.com";
        $headers = "From: $name <$to> \r\nReply-To: $name <$email>";

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "There was a problem with your submission. \n Please complete the form and try again.";
            exit;
        }
        
        if (mail($to, $subject, $message, $headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent. \n I will contact you as soon as I can!";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Sorry! There was a problem with your submission. \n Please try again.";
        }
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Sorry! There was a problem with your submission. \n please try again.";
    }
?>