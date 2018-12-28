<?php
session_start();
require_once("common/view.php");
report();
require_once("../include/database.inc.php");
require_once("common/check_sign_in_errors.php");
require_once("common/view.php");

if (isset($_POST['submit'])) {
    dbSortUsers();
}