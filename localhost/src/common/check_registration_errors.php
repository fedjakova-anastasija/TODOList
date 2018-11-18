<?php
function isRegistrationCorrect()
{
    $message = validationCheck();
    if(empty($message))
    {
        $login = $_POST['login'];
        $check = dbLoginFromUser($login);
        if (!empty($check['id'])) {
            return $message = "извините, введённый вами логин уже зарегистрирован";
        }
    }
    else{
        return $message;
    }
    return $message = "";
}

function validationCheck()
{
    if (empty($_POST['login'])) {
        return $message = "заполните все поля, пожалуйста";
    } elseif (!preg_match('/^([a-zA-Z0-9])(\w|-|_)+([a-z0-9])$/is', $_POST['login'])) {
        return $message = "в поле \"Логин\" введены недопустимые символы";
    } elseif (empty($_POST['password'])) {
        return $message = "заполните все поля, пожалуйста";
    } elseif (strlen($_POST['password']) < 5) {
        return $message = "пароль должен быть не менее 5 символов";
    } elseif (empty($_POST['check_password'])) {
        return $message = "заполните все поля, пожалуйста";
    } elseif ($_POST['password'] != $_POST['check_password']) {
        return $message = "введенные пароли не совпадают";
    } elseif (empty($_POST['email'])) {
        return $message = "заполните все поля, пожалуйста";
    } elseif (!preg_match('/^([a-z0-9])(\w|[.]|-|_)+([a-z0-9])@([a-z0-9])([a-z0-9.-]*)([a-z0-9])([.]{1})([a-z]{2,4})$/is', $_POST['email'])) {
        return $message = "недопустимый формат e-mail";
    }
    return $message="";
}