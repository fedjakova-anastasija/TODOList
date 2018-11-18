<?php
require_once("../src/common/constants.php");
$connection = null;

function dbConnect()
{
    global $connection;
    $connection =
        mysqli_connect(DB_HOST, DB_USERNAME, DB_PASS, DB_NAME);
    $error = mysqli_connect_error();
    if ($error)
        die('Ошибка подключения к базе данных');

    mysqli_select_db($connection, DB_NAME);
}

function dbLoginFromUser($login)
{
    global $connection;
    dbConnect();
    $query = "SELECT * FROM user WHERE login='$login'";
    $result = mysqli_query($connection, $query);
    $check = mysqli_fetch_array($result);
    return ($check);
}

function dbIdFromUser($id)
{
    global $connection;
    dbConnect();
    $query = "SELECT * FROM user WHERE id='$id'";
    $result = mysqli_query($connection, $query);
    $check = mysqli_fetch_array($result);
    return ($check);
}

function dbInsertJsonString($id, $result)
{
    global $connection;
    dbConnect();
    $query = "INSERT INTO user_page (id, id_user, json_string) VALUES ('$id', '$id', '$result')";
    $sql = mysqli_query($connection, $query);
    return ($sql);
}

function dbUpdateJsonString($id, $result)
{
    global $connection;
    dbConnect();
    $query = "UPDATE user_page SET json_string = '$result' WHERE id = '$id'";
    $sql = mysqli_query($connection, $query);
    return ($sql);
}

function dbUpdateUser($id, $name, $surname, $email)
{
    global $connection;
    dbConnect();
    $query = "UPDATE user SET name = '$name', surname = '$surname', email = '$email' WHERE id = '$id'";
    $sql = mysqli_query($connection, $query);
    return ($sql);
}

function dbRegistrationInsert($name, $surname, $login, $password, $email)
{
    global $connection;
    dbConnect();
    $query = "INSERT INTO user VALUES (id, '$name','$surname','$login','$password','$email')";;
    mysqli_query($connection, $query);
    return (mysqli_affected_rows($connection) != 0);
}

function dbSelectIdFromUserPage($id)
{
    global $connection;
    dbConnect();
    $query = "SELECT * FROM user_page WHERE  id = '$id'";
    $result = mysqli_query($connection, $query);
    $check = mysqli_fetch_array($result);
    return ($check);
}