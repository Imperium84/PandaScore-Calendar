<?php

include "Class/Requete.php";

$requete = new Requete("https://api.pandascore.co//csgo/tournaments");
$requete->sendRequest();
$res = $requete->getResultat();
$lastIndex = count($res)-1;
$tab1= $res[$lastIndex];

//echo " NOUVEL OBJET \n ";

$requete->setLien("https://api.pandascore.co//csgo/tournaments/upcoming");
$requete->sendRequest();
$res2 = $requete->getResultat();
$lastIndex2 = count($res2)-1;
$tab2 = $res2[$lastIndex2];

echo json_encode([$tab1, $tab2]);