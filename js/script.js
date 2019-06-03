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

function randomColor()
{
    let couleurs = ["bleu", "rouge", "violet", "jaune", "vert"];
    let nbreAleatoire = parseInt(Math.random() * (4 - 0) + 0);

    return couleurs[nbreAleatoire];
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

function showMonthCompet(mois, jours, nom, nomComplet)
{
    let select = document.getElementById("month");
    
    if (parseInt(mois)==parseInt(select.selectedIndex+1))
    {
        let td = document.querySelectorAll(".jours");
         for (let i=0; i<td.length; i++)
        {
            let couleur = randomColor();
            if (td[i].innerText == parseInt(jours))
            {
                 td[i].classList.add("compet");
                 td[i].setAttribute("data-name", nomComplet);
                 
                 let compet = document.createElement("a");
                 compet.innerText = nom;
                 compet.setAttribute("href", "#");
                 
                 let compet2 = document.createElement("a");
                 compet2.innerText = nomComplet;
                 compet2.setAttribute("href", "#");
                 
                 td[i].appendChild(compet);
                 td[i].appendChild(compet2);
            }
        }
    }
}

function extraireMois(date)
{
    return date.substr(5, date.indexOf("-")-2);
}

function extraireJour(date)
{
    return date.substr(8, date.length);
}

function formatData(data)
{
    //Ici il va falloir trier les data par date
    for (let i=0; i<data.length; i++)
    {
        let donnees = JSON.parse(data[i]);
        console.log(donnees);
        
        for (let j=0; j<donnees.length; j++)
        {
            let dateDebut = donnees[j].begin_at;
            dateDebut = dateDebut.substr(0, 10);
            
            let moisD = extraireMois(dateDebut);
            let jourD = extraireJour(dateDebut);
            
            showMonthCompet(moisD, jourD, donnees[j].league.name, donnees[j].serie.full_name);

            let dateFin = donnees[j].end_at;
            dateFin = dateFin.substr(0, 10);
            
            let moisF = extraireMois(dateFin);
            let joursF = extraireJour(dateFin);
            
            showMonthCompet(moisF, joursF, donnees[j].league.name, donnees[j].serie.full_name);
        }
        
    }
    
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
            
            
            formatData(json);     
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
       requeteMois();
       
   });
   
   let next = document.getElementById("rightArrow");
   next.addEventListener("click", function(){
       
       moisCourant++;
       
       if (moisCourant>12)
           moisCourant = 1;
       
       select.selectedIndex=moisCourant-1;
       
       chargerMois(moisCourant, today); 
       requeteMois();
   });
   
   let previous = document.getElementById("leftArrow");
   previous.addEventListener("click", function(){
           
       moisCourant--;
       
       if (moisCourant<=0)
           moisCourant = 12;
       
       select.selectedIndex=moisCourant-1; 
       
       chargerMois(moisCourant, today); 
       requeteMois();
   });
   
   
});