<?php
function getTwig() {
    $loader = new Twig_Loader_Filesystem(TEMPLATE_DIR);
    $twig   = new Twig_Environment($loader);
    return $twig;
}

function getView($templateName, $id = null, $json_string = "") {
    $twig = getTwig();
	$twig->addGlobal('user_id', $id);
	$twig->addGlobal('json_string', $json_string);
    return $twig->render($templateName);
}

function getViewForm($templateName) {
    $twig = getTwig();
    return $twig->render($templateName);
}

function getViewErrors($templateName, $message="") {
    $twig = getTwig();
    $twig->addGlobal('message', $message);
    return $twig->render($templateName);
}

function getViewIntroPage($templateName, $id=null, $guest="") {
    $twig = getTwig();
    $twig->addGlobal('id', $id);
    $twig->addGlobal('guest', $guest);
    return $twig->render($templateName);
}