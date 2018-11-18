<?php
session_start();
require_once("../include/database.inc.php");
require_once("common/check_sign_in_errors.php");
require_once("common/view.php");

if (isset($_POST['submit'])) {
    $message = isSingInCorrect();
    if (empty($message)) {
        $login = $_POST['login'];
        $password = $_POST['password'];
        $password = md5($password);

        checkEntrance($login, $password);
    } else {
        signInErrors($message);
    }
}

function checkEntrance($login, $password)
{
    $check = dbLoginFromUser($login);
    if (empty($check['password'])) {
        $message = "извините, введённый вами логин или пароль неверный";
        signInErrors($message);
    } else {
        if ($check['password'] == $password) {
            $_SESSION['id'] = $check['id'];
            $guest = $check['name'] . " " . $check['surname'];
            signInIntroPage($guest);
        } else {
            $message = "извините, введённый вами логин или пароль неверный";
            signInErrors($message);
        }
    }
}

