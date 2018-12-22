<?php
session_start();
require_once("../include/database.inc.php");

if ($_GET['cmd'] == "save") {
    if (isset($_POST["data"])) {
        $result = $_POST["data"];
        $get_data = json_decode($result);
        $id = $_GET['id'];

        checkSave($id, $result);
    }
}

function checkSave($id, $result)
{
    $check = dbSelectIdFromUserPage($id);
    if (empty($check['id'])) {
        //dbInsertJsonString($id, $result);
        dbInsertJsonStringElements($id, $result);
    } else {
        dbUpdateJsonString($id, $result);
        dbUpdateJsonStringElements($id, $result);
        $get_data = json_decode($result);
        $name = $get_data->_about->name;
        $surname = $get_data->_about->lastName;
        $email = $get_data->_about->email;
        dbUpdateUser($id, $name, $surname, $email);
    }
}