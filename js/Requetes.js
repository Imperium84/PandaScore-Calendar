/* 
 * Objet Requete chargé, comme son nom l'indique, d'effectuer des reqûetes vers l'API
 */

//Constructeur
var Requetes = function ()
{
    this.allCompets= [];
    this.oneCompet = "";
};

//Requêtes pour TOUTES les competitions
//Recoit 2 tableaux à parsés en résultat
Requetes.prototype.getAllCompetitions = function()
{
     $.ajax(
    {
        type: 'GET',
        url:'main.php',
        success: this.competitionsParse.bind(this)
    });
};

//Requête pour UNE seule compétition
Requetes.prototype.getOneCompet = function(compet)
{   
    console.log(compet);
    let id = compet.dataset.id;
    
    $.ajax(
    {
        type: 'GET',
        url:'oneCompet.php',
        data: "id=" + id,
        success: this.oneCompetParse.bind(this)
    });
};

Requetes.prototype.competitionsParse=function(data)
{
    let json = JSON.parse(data);
    for (let i=0; i<json.length; i++)
    {
        this.allCompets.push(JSON.parse(json[i]));
    };
    let event = new CustomEvent("finishedAll");
    document.dispatchEvent(event);
};

Requetes.prototype.oneCompetParse = function(data)
{   
    this.oneCompet = JSON.parse(data);
    
    let event = new CustomEvent("finishedOne");
    document.dispatchEvent(event);  
};

//Getter...
Requetes.prototype.getOneCompetData = function()
{
    return this.oneCompet;
};

Requetes.prototype.getAllCompetsData = function()
{
    return this.allCompets;
};
