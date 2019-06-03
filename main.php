<?php

include "Class/Requete.php";

$requete = new Requete("https://api.pandascore.co//csgo/tournaments");
$requete->sendRequest();
$res = $requete->getResultat();
$lastIndex = count($res)-1;
echo $res[$lastIndex];

//echo " NOUVEL OBJET \n ";

$requete->setLien("https://api.pandascore.co//csgo/tournaments/upcoming");
$requete->sendRequest();
$res2 = $requete->getResultat();
$lastIndex2 = count($res2)-1;
echo $res2[$lastIndex2];