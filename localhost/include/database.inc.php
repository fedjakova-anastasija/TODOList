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

function dbInsertJsonStringElements($id, $result)
{
    global $connection;
    dbConnect();
    $get_data = json_decode($result);
    $boards = $get_data->_boards;
    $query = "";
    var_dump($result);
    foreach ($boards as $board) {
        $idBoard = $board->_id + 1;
        $titleBoard = $board->_title;
        $listsBoard = $board->_lists;
        $notesBoard = $board->_notes;
        $imagesBoard = $board->_images;
        $query .= "INSERT INTO board (id, id_user, title) VALUES ('$idBoard', '$id', '$titleBoard'); ";
        $idItemListType = mysqli_fetch_array(mysqli_query($connection, "SELECT item_type.id FROM item_type WHERE (item_type.type = 'list')"));
        //var_dump($idItemListType[id]);
        $idItemNoteType = mysqli_fetch_array(mysqli_query($connection, "SELECT item_type.id FROM item_type WHERE (item_type.type = 'note')"));
        $idItemImageType = mysqli_fetch_array(mysqli_query($connection, "SELECT item_type.id FROM item_type WHERE (item_type.type = 'image')"));
        foreach ($listsBoard as $list) {
            $idList = $list->_id + 1;
            $titleList = $list->_title;
            $elementsList = $list->_elements;
            //$typeList = $list->_type;
            $positionList = $list->_position;
            $query .= "INSERT INTO board_item (id_board, id_item_type, title, x_pos, y_pos) VALUES ('$idBoard', '$idItemListType[id]', '$titleList', '$positionList->x', '$positionList->y'); ";
            $query .= "INSERT INTO list (id, id_board) VALUES ('$idList', '$idBoard'); ";

            foreach ($elementsList as $elements) {
                $textElements = $elements->_text;
                $idElements = $elements->_id + 1;
                $checkedElements = $elements->_checked;
                //var_dump($checkedElements);
                $state = $checkedElements ? 1 : 0;
                $idListItemStatus = mysqli_fetch_array(mysqli_query($connection, "SELECT status.id FROM status WHERE (status.state = '$state')"));
                //var_dump($idListItemStatus);
                $query .= "INSERT INTO list_item (id, id_list, id_status, text) VALUES ('$idElements', '$idList', '$idListItemStatus[id]', '$textElements'); ";
            }
        }
        foreach ($notesBoard as $note) {
            $idNote = $note->_id + 1;
            $titleNote = $note->_title;
            $textNote = $note->_text;
            //$typeNote = $note->_type;
            $positionNote = $note->_position;

            $query .= "INSERT INTO board_item (id_board, id_item_type, title, x_pos, y_pos) VALUES ('$idBoard', '$idItemNoteType[id]', '$titleNote', '$positionNote->x', '$positionNote->y'); ";
            $query .= "INSERT INTO note (id, id_board, text) VALUES ('$idNote', '$idBoard', '$textNote'); ";
        }
        foreach ($imagesBoard as $images) {
            $idImage = $images->_id + 1;
            $pathImage = $images->_path;
            //$typeImage = $images->_type;
            $positionImage = $images->_position;

            $query .= "INSERT INTO board_item (id_board, id_item_type, title, x_pos, y_pos) VALUES ('$idBoard', '$idItemImageType[id]', '', '$positionImage->x', '$positionImage->y'); ";
            $query .= "INSERT INTO image (id, id_board, image_path) VALUES ('$idImage', '$idImage', '$idBoard', '$pathImage'); ";
        }
    }
    $about = $get_data->_about;
    $name = $about->name;
    $lastName = $about->lastName;
    $info = $about->info;
    $email = $about->email;
    // $query = $queryBoard + $queryBoardItem;
    $sql = mysqli_multi_query($connection, $query);
    var_dump($query);
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

function dbUpdateJsonStringElements($id, $result)
{
    global $connection;
    dbConnect();
    $get_data = json_decode($result);
    $boards = $get_data->_boards;
    foreach ($boards as $board) {
        $idBoard = $board->_id;
        $titleBoard = $board->_title;
        $listsBoard = $board->_lists;
        $notesBoard = $board->_notes;
        $imagesBoard = $board->_images;
        $query = "UPDATE board SET id = '$idBoard', id_user = '$id', title = '$titleBoard'";
        foreach ($listsBoard as $list) {
            $idList = $list->_id;
            $titleList = $list->_title;
            $elementsList = $list->_elements;
            $typeList = $list->_type;
            $positionList = $list->_position;
            foreach ($elementsList as $elements) {
                $textElements = $elements->_text;
                $idElements = $elements->_id;
                $checkedElements = $elements->_checked;
            }
        }
        foreach ($notesBoard as $note) {
            $idNote = $note->_id;
            $titleNote = $note->_title;
            $typeNote = $note->_type;
            $positionNote = $note->_position;
        }
        foreach ($imagesBoard as $images) {
            $idImage = $images->_id;
            $pathImage = $images->_path;
            $typeImage = $images->_type;
            $positionImage = $images->_position;
        }
    }
    $about = $get_data->_about;
    $name = $about->name;
    $lastName = $about->lastName;
    $info = $about->info;
    $email = $about->email;
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
    $query = "INSERT INTO user VALUES (id, '$name','$surname','$login','$password','$email', '', '')";;
    mysqli_query($connection, $query);
    return (mysqli_affected_rows($connection) != 0);
}

function dbSelectIdUserFromBoard($id)
{
    global $connection;
    dbConnect();
    $query = "SELECT * FROM board WHERE id_user = '$id'";
    $result = mysqli_query($connection, $query);
    $check = mysqli_fetch_array($result);
    return ($check);
}

function dbSelectUserBoards($id)
{
    global $connection;
    dbConnect();
    $query = "SELECT * FROM board WHERE id_user = '$id'";
    $result = mysqli_query($connection, $query);
    $arr = [];
    while ($row = mysqli_fetch_array($result)) {
        array_push($arr, $row);
    }

    return ($arr);
}

function dbGetBoardItem($idBoard)
{
    global $connection;
    dbConnect();
    $query = "SELECT * FROM board_item WHERE id_board = '$idBoard'";
    $result = mysqli_query($connection, $query);
    $arr = [];
    while ($row = mysqli_fetch_array($result)) {
        array_push($arr, $row);
    }

    return ($arr);
}

function dbGetAllItemTypes()
{
    global $connection;
    dbConnect();
    $query = "SELECT * FROM item_type";
    $result = mysqli_query($connection, $query);
    $arr = [];
    while ($row = mysqli_fetch_array($result)) {
        array_push($arr, $row);
    }

    return ($arr);
}

function getBoardItemArray($idType, $boardItems)
{
    $arr = [];
    foreach ($boardItems as $item) {
        if ($item['id_item_type'] == $idType)
        {
            array_push($arr, $item);
        }
    }

    return $arr;
}

function dbGetBoardItemByItemType($idBoard, $itemType)
{
    global $connection;
    dbConnect();
    $query = "SELECT * FROM $itemType WHERE id = '$idBoard'";
    $result = mysqli_query($connection, $query);
    $arr = [];
    while ($row = mysqli_fetch_array($result)) {
        array_push($arr, $row);
    }

    return ($arr);
}

function dbGetJsonFromDatabase($id)
{
    global $connection;
    dbConnect();
    $boards = dbSelectUserBoards($id);
    $str = "";
    $itemTypes = dbGetAllItemTypes();
//    var_dump($itemTypes);
//    $json_string = '{"_boards":[{"_id":0,"_title":"Доска","_lists":[],"_notes":[],"_images":[]}],"_about":{"name":"' . $name . '","lastName":"' . $surname . '","info":"","email":"' . $email . '","img":""}}';
    foreach ($boards as $board) {
//        $idBoard = $board->_id;
        $titleBoard = $board['title'];
        $boardItems = dbGetBoardItem($board['id']);
        //TODO:: сделать цикл boardItems определять item type в завиимости от него
        $listBoardItems = [];
        $noteBoardItems = [];
        $imageBoardItems = [];
        $listArr = [];
        $noteArr = [];
        $imageArr = [];
        foreach ($itemTypes as $item)
        {
            switch ($item['type']) {
                case 'list':
                    $listBoardItems = getBoardItemArray($item['id'], $boardItems);
                    $listArr = dbGetBoardItemByItemType($board['id'], $item['type']);
                    //TODO: Найти все листы
                    break;
                case 'note':
                    $noteBoardItems = getBoardItemArray($item['id'], $boardItems);
                    $noteArr = dbGetBoardItemByItemType($board['id'], $item['type']);
                    break;
                case 'image':
                    $imageBoardItems = getBoardItemArray($item['id'], $boardItems);
                    $imageArr = dbGetBoardItemByItemType($board['id'], $item['type']);
                    break;
            }

        }
//        print_r($listBoardItems);
//        print_r($listArr);
//        print_r($noteBoardItems);
//        print_r($noteArr);
//        print_r($imageBoardItems);
//        print_r($imageArr);

//        $listsBoard = $board->_lists;
//        $notesBoard = $board->_notes;
//        $imagesBoard = $board->_images;
//        $query = "UPDATE board SET id = '$idBoard', id_user = '$id', title = '$titleBoard'";
//        foreach ($listsBoard as $list) {
//            $idList = $list->_id;
//            $titleList = $list->_title;
//            $elementsList = $list->_elements;
//            $typeList = $list->_type;
//            $positionList = $list->_position;
//            foreach ($elementsList as $elements) {
//                $textElements = $elements->_text;
//                $idElements = $elements->_id;
//                $checkedElements = $elements->_checked;
//            }
//        }
//        foreach ($notesBoard as $note) {
//            $idNote = $note->_id;
//            $titleNote = $note->_title;
//            $typeNote = $note->_type;
//            $positionNote = $note->_position;
//        }
//        foreach ($imagesBoard as $images) {
//            $idImage = $images->_id;
//            $pathImage = $images->_path;
//            $typeImage = $images->_type;
//            $positionImage = $images->_position;
//        }
    }
//    $about = $get_data->_about;
//    $name = $about->name;
//    $lastName = $about->lastName;
//    $info = $about->info;
//    $email = $about->email;
    return ($str);
}