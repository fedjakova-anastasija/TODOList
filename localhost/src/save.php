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
    $check = dbSelectIdUserFromBoard($id);
    if (!empty($check['id_user'])) {
        dbDeleteUserData($id);
    }

    dbInsertJsonStringElements($id, $result);
}