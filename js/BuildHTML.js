/* 
 * Objet BuildHTML
 * Il est chargé de générer le calendrier, ainsi qu'afficher
 * les compétitions présentes dans le mois courant
 */

//Constructeur
var BuildHTML = function(moisCourant, jourCourant)
{
    this.jourCourant = jourCourant;
    this.moisCourant = moisCourant;
    this.compet = [];
    this.listeJourMois = [31,28,31,30,31,30,31,31,30,31,30,31];
    this.listeJours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];    
};

//Setter
BuildHTML.prototype.setMonth = function(month)
{
    this.moisCourant = month;
};

BuildHTML.prototype.setDay = function(day)
{
    this.jourCourant = day;
};

//Ce setter reçoit les données de la requête en paramètre,
//il se charge de trier les informations et de générer un objet "Competition"
BuildHTML.prototype.setCompet=function(data)
{
    for (let i=0; i<data.length; i++)
    {         
        for (let j=0; j<data[i].length; j++)
        {
            let dateDebut = data[i][j].begin_at;
            let dateFin = data[i][j].end_at;
            let nom = data[i][j].league.name;
            let nomComplet = data[i][j].serie.full_name;
            let id = data[i][j].id;

            this.compet.push(new Competition(dateDebut, dateFin, nom, nomComplet, id));
        }
    } 
};


//Pour éviter les doublons
BuildHTML.prototype.checkTable = function()
{
    var check = document.getElementById("calendrier");
    if (check && typeof check != 'undefined')
    {
        check.parentNode.removeChild(check);
    }
};

//Génère le calendrier SANS les compétitions
 BuildHTML.prototype.construireCalendrier=function()
{
    this.checkTable();
    
    let table = document.createElement('table');
    table.setAttribute("id", "calendrier");
    let ligne = document.createElement("tr");
    ligne.setAttribute("id", "nomJours");
    
    for (let i=0; i<this.listeJours.length; i++)
    {
        let caseJours = document.createElement("td");
        caseJours.textContent = this.listeJours[i];
        ligne.appendChild(caseJours);
    }
    
    table.appendChild(ligne);    
    
    //Calcul du nombre de jours écoulé depuis le 1er janvier
    let jourTotal = 0;
    for (let i=0; i<this.moisCourant; i++)
    {
        jourTotal += this.listeJourMois[i];
    }
    //Calcul du jour de la semaine du 1er du mois 
    let date = new Date("2019-"+(this.moisCourant).toString()+"-01 23:59:59");
    let jourDebut = date.getDay();
    
    if (jourDebut==0)
        jourDebut=7;
         
    
    //Affichage des td vide selon le jour de la premiere semaine
    let semaine = document.createElement("tr");
    let jourCourant = 0; 
    for (let i=1; i<jourDebut; i++)
    {
        let colJour = document.createElement("td");
        colJour.setAttribute("class", "jours");
        colJour.classList.add("unexist");
        
        semaine.appendChild(colJour);
        jourCourant++;
    }
   
    table.appendChild(semaine);
    
    //Affichage du reste des tr
    for (let i=1; i<=this.listeJourMois[this.moisCourant-1]; i++)
    {
        if (jourCourant%7==0)
        {
            semaine = document.createElement("tr");
            table.appendChild(semaine);
        }

        let colJour = document.createElement("td");
        colJour.setAttribute("class", "jours");
        
        colJour.innerText = i;
       
        //detection du jour courant
        date = new Date();
        if (i==date.getDate() && this.checkMonth(this.moisCourant))
        {
          colJour.classList.add("courant");   
        }
       
        semaine.appendChild(colJour);
        jourCourant++;
    }    
    
    var section = document.querySelector("section");
    section.appendChild(table);
};

//Pour vérifier si on est sur le bon mois
BuildHTML.prototype.checkMonth=function(mois)
{
    let date = new Date();
    let month = date.getMonth();
    if (parseInt(month)==parseInt(mois)-1)
        return true;
    
    else 
        return false;
};

//Méthode pour afficher sur le calendrier les compétitions
//Grâce aux données passés en paramètre
 BuildHTML.prototype.afficherCompetition=function(data)
{
    this.setCompet(data);
    let td = document.querySelectorAll(".jours");
    console.log(this.compet);
    for (let i=0; i<this.compet.length; i++)
    {
        let couleur = this.randomColor();
        for (let j=0; j<td.length; j++)
        {    
            if (parseInt(this.compet[i].moisDebut)==parseInt(this.moisCourant))
            {           
                if (parseInt(td[j].innerText) == parseInt(this.compet[i].jourDebut))
                {
                    if (!td[j].classList.contains("compet"))
                    {
                         td[j].classList.add("compet");

                        let div = document.createElement("div");
                        div.setAttribute("data-name", this.compet[i].nomComplet);
                        div.setAttribute("data-id", this.compet[i].id);
                        div.classList.add("debut");
                        div.classList.add("div-compet");
                        td[j].setAttribute("data-color", couleur);

   //                     div.innerHTML = this.compet[i].nom+"<br/>";
   //                     div.innerHTML += this.compet[i].nomComplet;

                        td[j].appendChild(div);
                    }
                    

                }

                else if (td[j].innerText == parseInt(this.compet[i].jourFin))
                {
                    if (!td[j].classList.contains("compet"))
                    {
                        td[j].classList.add("compet");

                        let div = document.createElement("div");
                        div.setAttribute("data-name", this.compet[i].nomComplet);
                        div.setAttribute("data-id", this.compet[i].id);
                        div.classList.add("fin");
                        div.classList.add("div-compet");
                        td[j].setAttribute("data-color", couleur);

   //                     div.innerHTML = this.compet[i].nom+"<br/>";
   //                     div.innerHTML = this.compet[i].nomComplet;

                        td[j].appendChild(div);
                    }
                }
            }

        }
    }
    
    this.fillDiv();
};


//Génère une couleur aléatoire
BuildHTML.prototype.randomColor = function()
{
    let couleurs = ["blue", "red", "purple", "yellow", "green", "brown", "grey", "cyan"];
    let nbreAleatoire = parseInt(Math.random() * (4 - 0) + 0);

    return couleurs[nbreAleatoire];
};

//Remplit des informations sur les div contenant les compétitions
BuildHTML.prototype.fillDiv = function()
{
    let divs = document.getElementsByClassName("div-compet");

    let nomCourant = "";
    let div = [];
    for (let i=0; i<divs.length; i++)
    {
        if (divs[i].dataset.name == nomCourant)
        {
            div.push(divs[i]);
        }
        
        else
        {
            nomCourant = divs[i].dataset.name;
        }
    }    
};
