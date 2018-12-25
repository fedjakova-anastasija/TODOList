<?php
session_start();
require_once("../include/common.inc.php");
include("../include/database.inc.php");
include("../src/common/view.php");

$id = null;
$name = "";
$surname = "";
$email = "";

if (isset($_GET['id']) && is_numeric($_GET['id'])) $id = $_GET['id'];
if (!empty($id)) {
    $id = $_GET['id'];
    $check = dbIdFromUser($id);
    if ($check['id'] == $id) {
        $name = $check['name'];
        $surname = $check['surname'];
        $email = $check['email'];
    }
    getMainPage($id, $name, $surname, $email);
}

function getMainPage($id, $name, $surname, $email)
{
    $check = dbIdFromUser($id);
    if ($check['id'] == $id) {
        $id_session = $_SESSION['id'];
        if ($id == $id_session) {
            $check = dbSelectIdUserFromBoard($id);
            if ($check['id_user'] == $id) {
                //TODO: вытянуть и собрать json
                $json_string = dbGetJsonFromDatabase($id);
            } else {
                $json_string = '{"_boards":[{"_id":0,"_title":"Доска","_lists":[],"_notes":[],"_images":[]}],"_about":{"name":"' . $name . '","lastName":"' . $surname . '","info":"","email":"' . $email . '","img":""}}';
            }
            echo getView('index.twig', $id, $json_string);
        } else {
            $message = "извините, вы не вошли в личный кабинет";
            signInErrors($message);
        }
    } else {
        $message = "извините, вы не вошли в личный кабинет";
        signInErrors($message);
    }
}
