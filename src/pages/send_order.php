<?php
// function ValidateEmail($email)
// {
//   $pattern = '/^([0-9a-z]([-.\w]*[0-9a-z])*@(([0-9a-z])+([-\w]*[0-9a-z])*\.)+[a-z]{2,6})$/i';
//   return preg_match($pattern, $email);
// }

// Read POST data
$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$salary = $data->salary;
$email = $data->email;

// Insert record
$sql = "insert into employee(emp_name,salary,email) values('".$name."',".$salary.",'".$email."')";
if(mysqli_query($con,$sql)){
   echo 1; 
}else{
   echo 0;
}

exit;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $mailto = '0504112264m@gmail.com, promo.romashov@gmail.com, endurotour7@gmail.com';
  $mailfrom = '0504112264m@gmail.com'; //isset($_POST['email']) ? $_POST['email'] : $mailto;
  $subject = 'Заказ ' . $_POST['service'];
  $message = 'Контакты клиента:';
  $success_url = '/thk.php';
  $error_url = '/';
  $error = '';
  $eol = "\n";
  $max_filesize = isset($_POST['filesize']) ? $_POST['filesize'] * 1024 : 1024000;
  $boundary = md5(uniqid(time()));
  $header = 'From: ' . $mailfrom . $eol;
  $header .= 'Reply-To: ' . $mailfrom . $eol;
  $header .= 'MIME-Version: 1.0' . $eol;
  $header .= 'Content-Type: multipart/mixed; boundary="' . $boundary . '"' . $eol;
  $header .= 'X-Mailer: PHP v' . phpversion() . $eol;
  if (!ValidateEmail($mailfrom)) {
    $error .= "The specified email address is invalid!\n<br>";
  }
  if (!empty($error)) {
    $errorcode = file_get_contents($error_url);
    $replace = "##error##";
    $errorcode = str_replace($replace, $error, $errorcode);
    echo $errorcode;
    exit;
  }
  $internalfields = array("submit", "reset", "send", "captcha_code");
  $message .= $eol;
  foreach ($_POST as $key => $value) {

    if (!in_array(strtolower($key), $internalfields)) {
      if (!is_array($value)) {
        $message .= ucwords(str_replace("_", " ", $key)) . " : " . $value . $eol;
      } else {
        $message .= ucwords(str_replace("_", " ", $key)) . " : " . implode(",", $value) . $eol;
      }
    }
  }
  $body = 'This is a multi-part message in MIME format.' . $eol . $eol;
  $body .= '--' . $boundary . $eol;
  $body .= 'Content-Type: text/plain; charset=UTF-8' . $eol;
  $body .= 'Content-Transfer-Encoding: 8bit' . $eol;
  $body .= $eol . stripslashes($message) . $eol;
  if (!empty($_FILES)) {
    foreach ($_FILES as $key => $value) {
      if ($_FILES[$key]['error'] == 0 && $_FILES[$key]['size'] <= $max_filesize) {
        $body .= '--' . $boundary . $eol;
        $body .= 'Content-Type: ' . $_FILES[$key]['type'] . '; name=' . $_FILES[$key]['name'] . $eol;
        $body .= 'Content-Transfer-Encoding: base64' . $eol;
        $body .= 'Content-Disposition: attachment; filename=' . $_FILES[$key]['name'] . $eol;
        $body .= $eol . chunk_split(base64_encode(file_get_contents($_FILES[$key]['tmp_name']))) . $eol;
      }
    }
  }
  $body .= '--' . $boundary . '--' . $eol;
  if ($mailto != '') {
    mail($mailto, $subject, $body, $header);
    $header = 'From: 0504112264m@gmail.com';
    $header .= 'Reply-To: ' . $_POST['Email:'];
    $header .= 'MIME-Version: 1.0' . $eol;
    $header .= 'Content-Type: multipart/mixed; boundary="' . $boundary . '"' . $eol;
    $header .= 'X-Mailer: PHP v' . phpversion() . $eol;
    mail($_POST['Email:'], 'Заявка', "Ваша заявка принята!</br>
<p aling=\"center\">Спасибо, что обратились к нам!</p>", 'Content-type: text/html; charset=utf-8');
  }

  header('Location: ' . $success_url);
  exit;
}