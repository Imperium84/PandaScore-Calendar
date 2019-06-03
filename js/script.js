const annee = 2019;
const listNomMois = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const listeJourMois = [31,28,31,30,31,30,31,31,30,31,30,31];
const listeJours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];


function checkTable()
{
    var check = document.getElementById("check");
    if (check && typeof check != 'undefined')
    {
        check.parentNode.removeChild(check);
    }
}

function trouverJourTotal(mois)
{
    let total = 0;
    for (let i=0; i<mois; i++)
    {
        total += listeJourMois[i];
    }
    
    return total;
}

function checkMonth(mois)
{
    let date = new Date();
    let month = date.getMonth();
    if (month==mois-1)
        return true;
    
    else 
        return false;
}

function chargerMois(mois, today)
{   
    checkTable();
    let div = document.createElement("div");
    div.setAttribute("id", "calendrier");
    let table = document.createElement('table');
    table.setAttribute("id", "check");
    let ligne = document.createElement("tr");
    ligne.setAttribute("id", "nomJours");
    
    for (let i=0; i<listeJours.length; i++)
    {
        let caseJours = document.createElement("td");
        caseJours.textContent = listeJours[i];
        ligne.appendChild(caseJours);
    }
    
    table.appendChild(ligne);    
    
    //Calcul du nombre de jours écoulé depuis le 1er janvier
    let jourTotal = trouverJourTotal(mois-1);
    //Calcul du jour de la semaine du 1er du mois 
    let jourDebut = ((jourTotal+2)%7);
    
    if (jourDebut == 0)
        jourDebut = 7;
    
    
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
    
    //Affichage du reste des td
    for (let i=1; i<=listeJourMois[mois-1]; i++)
    {
        if (jourCourant%7==0)
        {
            semaine = document.createElement("tr");
            table.appendChild(semaine);
        }
        
        
        
        let colJour = document.createElement("td");
        colJour.setAttribute("class", "jours");
        
        colJour.innerText = i;
       
        //coloriage du jour courant
        if (i==today && checkMonth(mois))
        {
          colJour.classList.add("courant");   
        }
       
        semaine.appendChild(colJour);
        jourCourant++;
    }

    
    
    var main = document.querySelector("main");
    div.appendChild(table);
    main.appendChild(div);
    
}

function afficherCompetMois(data)
{
    //Ici il va falloir trier les data par date
}

function requeteMois()
{
    
    $.ajax(
    {
        type: 'GET',
        url:'main.php',
        success: function(data)
        {
            let json = JSON.parse(data);
            console.log(json);
            afficherCompetMois(json);        
        }
    });   
    
    
}

$(function(){
    
   let date = new Date();   
   let select = document.getElementById("month");
   let moisCourant = date.getMonth()+1;
   select.selectedIndex = moisCourant-1;
   let today = date.getDate();
   
   chargerMois(moisCourant, today);  
   requeteMois();
   
   let ok = document.querySelector("input");
   ok.addEventListener("click", function()
   {
       moisCourant=select.selectedIndex+1;
       chargerMois(moisCourant, today);
       
   });
   
   let next = document.getElementById("rightArrow");
   next.addEventListener("click", function(){
       
       moisCourant++;
       
       if (moisCourant>12)
           moisCourant = 1;
       
       select.selectedIndex=moisCourant-1;
       
       chargerMois(moisCourant, today); 
   });
   
   let previous = document.getElementById("leftArrow");
   previous.addEventListener("click", function(){
           
       moisCourant--;
       
       if (moisCourant<=0)
           moisCourant = 12;
       
       select.selectedIndex=moisCourant-1; 
       
       chargerMois(moisCourant, today); 
   });
   
   
});