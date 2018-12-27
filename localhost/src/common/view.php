<?php
require_once("../include/common.inc.php");

function view($view)
{
    echo getViewForm('header.twig');
    echo $view;
    echo getViewForm('footer.twig');
}

function registrationErrors($message)
{
    view(getViewErrors('registration_errors.twig', $message));
}

function signInErrors($message)
{
    view(getViewErrors('sign_in_errors.twig', $message));
}

function signInIntroPage($guest)
{
    $id = $_SESSION['id'];
    view(getViewIntroPage('sign_in_intro_page.twig', $id, $guest));
}

function registrationIntroPage($guest)
{
    $id = $_SESSION['id'];
    view(getViewIntroPage('registration_intro_page.twig', $id, $guest));
}

function signIn()
{
    view(getViewForm('sign_in.twig'));
}

function report()
{
    view(getViewForm('report.twig'));
}

function registration()
{
    view(getViewForm('registration.twig'));
}



