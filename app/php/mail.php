<?
require_once 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];


// От кого
$mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], 'Your best site');
 
// Кому
$mail->addAddress('kribedko@yandex.ru');
$mail->addAddress('kribedko@gmail.com');

// Тема письма
$mail->Subject = 'Заявка с тестового сайта';
 
// Тело письма
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = 'Пользователь <b>' . $name . '</b> оставил заявку. <br> Его телефон <b>' .$phone. '</b>';
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    echo 'Ok';
}
?>