<?php
function isSingInCorrect()
{
    if (empty($_POST['login'])) {
        return $message = "заполните все поля, пожалуйста";
    } elseif (empty($_POST['password'])) {
        return $message = "заполните все поля, пожалуйста";
    }
    return $message = "";
}