<?php
session_start();
require_once("../include/database.inc.php");
require_once("common/check_registration_errors.php");
require_once("common/view.php");

if (isset($_POST['submit'])) {
    $message = isRegistrationCorrect();
    if (empty($message)) {
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $login = $_POST['login'];
        $password = $_POST['password'];
        $email = $_POST['email'];
        $login = transformLogin($login);
        $password = transformPassword($password);

        checkEntrance($name, $surname, $login, $password, $email);
    } else {
        registrationErrors($message);
    }
}

function checkEntrance($name, $surname, $login, $password, $email)
{
    if (dbRegistrationInsert($name, $surname, $login, $password, $email)) {
        $check = dbLoginFromUser($login);
        if ($check['password'] == $password) {
            $_SESSION['id'] = $check['id'];
            $guest = $check['name'] . " " . $check['surname'];
            registrationIntroPage($guest);

        }
    } else {
        $message = "вы не зарегистрированы";
        registrationErrors($message);
    }
}

function transformLogin($login)
{
    $login = stripslashes($login);
    $login = htmlspecialchars($login);
    $login = trim($login);
    return($login);
}

function transformPassword($password)
{
    $password = stripslashes($password);
    $password = htmlspecialchars($password);
    $password = trim($password);
    $password = md5($password);
    return($password);
}
