<?php

include "Class/Requete.php";

$requete =  new Requete("https://api.pandascore.co//csgo/tournaments", "filter", "id", [$_GET['id']]);
$requete->sendRequest();
$res = $requete->getResultat();
$lastIndex = count($res)-1;
$tab1= $res[$lastIndex];


echo $tab1;