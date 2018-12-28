<?php
session_start();
require_once("common/view.php");
require_once("../include/database.inc.php");

$report = "";
if (isset($_POST['submit'])) {
    dbSortUsers();
    $report = dbGetSortedUsers();
}

$arr = [];
foreach ($report as $item)
{
    $arr[] = [
        "name" => $item["name"],
        "count" => $item["MAX(counted)"],
        ];
}

report($arr);
