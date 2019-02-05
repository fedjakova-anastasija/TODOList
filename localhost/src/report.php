<?php
session_start();
require_once("common/view.php");
require_once("../include/database.inc.php");

$report = "";
if (isset($_POST['submit'])) {
    //dbSortUsers();
    $report = dbGetSortedUsers();
}

$arr = [];
foreach ($report as $item)
{
    $arr[] = [
        "name" => $item["name"],
        "surname" => $item["surname"],
        "count" => $item["COUNT(board.id_user)"],
        ];
}
report($arr);
