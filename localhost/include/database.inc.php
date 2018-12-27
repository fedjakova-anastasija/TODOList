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
    dbUpdateUser($id, $get_data);
    $query = "";
    foreach ($boards as $board) {
        $idBoard = $id . ($board->_id + 1);
        $titleBoard = $board->_title;
        $listsBoard = $board->_lists;
        $notesBoard = $board->_notes;
        $imagesBoard = $board->_images;
        $query .= "INSERT INTO board (id, id_user, title) VALUES ('$idBoard', '$id', '$titleBoard'); ";
        $idItemListType = mysqli_fetch_array(mysqli_query($connection, "SELECT item_type.id FROM item_type WHERE (item_type.type = 'list')"));
        $idItemNoteType = mysqli_fetch_array(mysqli_query($connection, "SELECT item_type.id FROM item_type WHERE (item_type.type = 'note')"));
        $idItemImageType = mysqli_fetch_array(mysqli_query($connection, "SELECT item_type.id FROM item_type WHERE (item_type.type = 'image')"));
        foreach ($listsBoard as $list) {
            $idList = $id . ($list->_id + 1);
            $titleList = $list->_title;
            $elementsList = $list->_elements;
            $positionList = $list->_position;
            $query .= "INSERT INTO board_item (id_board, id_item_type, title, x_pos, y_pos) VALUES ('$idBoard', '$idItemListType[id]', '$titleList', '$positionList->x', '$positionList->y'); ";
            $query .= "INSERT INTO list (id, id_board) VALUES ('$idList', '$idBoard'); ";

            foreach ($elementsList as $elements) {
                $textElements = $elements->_text;
                $idElements = $id . ($elements->_id + 1);
                $checkedElements = $elements->_checked;
                $state = $checkedElements ? 1 : 0;
                $idListItemStatus = mysqli_fetch_array(mysqli_query($connection, "SELECT status.id FROM status WHERE (status.state = '$state')"));
                $query .= "INSERT INTO list_item (id, id_list, id_status, text) VALUES ('$idElements', '$idList', '$idListItemStatus[id]', '$textElements'); ";
            }
        }
        foreach ($notesBoard as $note) {
            $idNote = $id . ($note->_id + 1);
            $titleNote = $note->_title;
            $textNote = $note->_text;
            $positionNote = $note->_position;

            $query .= "INSERT INTO board_item (id_board, id_item_type, title, x_pos, y_pos) VALUES ('$idBoard', '$idItemNoteType[id]', '$titleNote', '$positionNote->x', '$positionNote->y'); ";
            $query .= "INSERT INTO note (id, id_board, text) VALUES ('$idNote', '$idBoard', '$textNote'); ";
        }
        foreach ($imagesBoard as $images) {
            $idImage = $id . ($images->_id + 1);
            $pathImage = $images->_path;
            $positionImage = $images->_position;

            $query .= "INSERT INTO board_item (id_board, id_item_type, title, x_pos, y_pos) VALUES ('$idBoard', '$idItemImageType[id]', '', '$positionImage->x', '$positionImage->y'); ";
            $query .= "INSERT INTO image (id, id_board, image_path) VALUES ('$idImage', '$idBoard', '$pathImage'); ";
        }
    }
    $sql = mysqli_multi_query($connection, $query);
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

function dbUpdateUser($id, $get_data)
{
    global $connection;
    dbConnect();

    $about = $get_data->_about;
    $name = $about->name;
    $surname = $about->lastName;
    $info = $about->info;
    $email = $about->email;
    $image = $about->img;
    $query = "UPDATE user SET `name` = '$name', surname = '$surname', email = '$email', info = '$info', image = '$image' WHERE id = '$id'";
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
    $query = "SELECT * FROM $itemType WHERE id_board = '$idBoard'";
    $result = mysqli_query($connection, $query);
    $arr = [];
    while ($row = mysqli_fetch_array($result)) {
        array_push($arr, $row);
    }

    return ($arr);
}

function dbGetListItem($idList)
{
    global $connection;
    dbConnect();
    $query = "SELECT * FROM list_item WHERE id_list = '$idList'";
    $result = mysqli_query($connection, $query);
    $arr = [];
    while ($row = mysqli_fetch_array($result)) {
        array_push($arr, $row);
    }

    return ($arr);
}

function dbGetStateItem($idStatus)
{
    global $connection;
    dbConnect();
    $query = "SELECT * FROM status WHERE id = '$idStatus'";
    $result = mysqli_query($connection, $query);
    $row = mysqli_fetch_array($result);

    return ($row);
}

function dbDeleteUserData($id)
{
    global $connection;
    dbConnect();
    $query = "DELETE FROM board WHERE id_user = '$id';";
    $result = mysqli_query($connection, $query);
    return $result;
}

/**
 * @param $id
 * @return array
 */
function dbGetJsonFromDatabase($id)
{
    global $connection;
    dbConnect();
    $boards = dbSelectUserBoards($id);

    $user = dbIdFromUser($id);

    $str = [
        "_boards" => [],
        "_about" => [
            "name"     => $user["name"],
            "lastName" => $user["surname"],
            "info"     => $user["info"],
            "email"    => $user["email"],
            "img"      => $user["image"]
        ]];

    $itemTypes = dbGetAllItemTypes();
    $str["_boards"] = [];
    foreach ($boards as $key1 => $board) {
        $boardItems = dbGetBoardItem($board['id']);
        $str["_boards"][] = [
            "_id"     => $board['id'],
            "_title"  => $board['title'],
            "_lists"  => [],
            "_notes"  => [],
            "_images" => []
        ];
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
                    if (sizeof($listBoardItems) > 0)
                    {
                        for ($i = 0; $i < sizeof($listArr); $i++)
                        {
                            $str["_boards"][$key1]["_lists"][] = [
                                "_id"       => $listArr[$i]["id"],
                                "_title"    => $listBoardItems[$i]["title"],
                                "_elements" => [],
                                "_type"     => $item['type'],
                                "_position" => [
                                    "x" => $listBoardItems[$i]["x_pos"],
                                    "y" => $listBoardItems[$i]["y_pos"]
                                ]
                            ];

                            $listItem = dbGetListItem($listArr[$i]["id"]);
                            foreach ($listItem as $key => $list)
                            {
                                $status = dbGetStateItem($list["id_status"]);
                                $str["_boards"][$key1]["_lists"][$i]["_elements"][] = [
                                    "_text"    => $list["text"],
                                    "_id"      => $list["id"],
                                    "_checked" => $status["state"] - 1
                                ];
                            }
                        }
                    }
                    break;
                case 'note':
                    $noteBoardItems = getBoardItemArray($item['id'], $boardItems);
                    $noteArr = dbGetBoardItemByItemType($board['id'], $item['type']);
                    if (sizeof($noteBoardItems) > 0)
                    {
                        for ($i = 0; $i < sizeof($noteArr); $i++)
                        {
                            $str["_boards"][$key1]["_notes"][] = [
                                "_id"       => $noteArr[$i]["id"],
                                "_title"    => $noteBoardItems[$i]["title"],
                                "_text"     => $noteArr[$i]["text"],
                                "_type"     => $item['type'],
                                "_position" => [
                                    "x" => $noteBoardItems[$i]["x_pos"],
                                    "y" => $noteBoardItems[$i]["y_pos"]
                                ]
                            ];
                        }
                    }
                    break;
                case 'image':
                    $imageBoardItems = getBoardItemArray($item['id'], $boardItems);
                    $imageArr = dbGetBoardItemByItemType($board['id'], $item['type']);
                    if (sizeof($imageBoardItems) > 0)
                    {
                        for ($i = 0; $i < sizeof($imageArr); $i++)
                        {
                            $str["_boards"][$key1]["_images"][] = [
                                "_id"       => $imageArr[$i]["id"],
                                "_path"     => $imageArr[$i]["image_path"],
                                "_type"     => $item['type'],
                                "_position" => [
                                    "x" => $imageBoardItems[$i]["x_pos"],
                                    "y" => $imageBoardItems[$i]["y_pos"]
                                ]
                            ];
                        }
                    }
                    break;
            }

        }
    }

    return (json_encode($str, JSON_FORCE_OBJECT));
}