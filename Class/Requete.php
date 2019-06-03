<?php

class Requete
{
    private $token;
    private $lien;
    private $nomFiltre;
    private $filtre;
    private $valFiltre;
    private $resultat;
    
    public function __construct($lien, $nomFiltre="", $filtre="", array $valFiltre=[])
    {
        $this->token = "XkFoseg2yZbb0IV2YUamoAi71Ms-T3yCOWSvsMYkBzxRsclDX70";   
        $this->nomFiltre = $nomFiltre;
        $this->filtre = $filtre;
        $this->valFiltre = $valFiltre;
        $this->lien = $lien;
        $this->resultat = [];
    }
    
    public function setLien($lien)
    {
        $this->lien = $lien;
    }
    
    public function sendRequest()
    {
        $cmd = "";
        if (empty ($this->filtre))
        {
            $cmd = 'curl -gi "'.$this->lien.'?token='.$this->token.'"';
        }
        
        else
        {
            $valeur ="";
            for($i=0; $i < count($this->valFiltre); $i++)
            {
               
                if ($i==count($this->valFiltre)-1)
                {
                    $valeur .= $this->valFiltre[$i]; 
                }
                
                else
                {
                    $valeur .= $this->valFiltre[$i].',';
                }
            }
            
            $cmd = 'curl -gi "'.$this->lien.'?'.$this->nomFiltre.'['.$this->filtre.']='.$valeur.'&token='.$this->token.'"';
        }
//        echo ($cmd);
        exec($cmd, $this->resultat);
    }
    
    public function getResultat()
    {
        return $this->resultat;
    }
}