/* 
 * Point d'entrée du programme, il est chargé de: 
 * créer les objets : HTML, Requetes et Modale
 * Pour cela il commence par récupérer la date du jour, ou de régler le mois choisi par 
 * l'utilisateur
 */

$(function(){
 
    //Date du jour = date par défaut
    let date = new Date();   
    let moisCourant = date.getMonth()+1;    
    let jourCourant = date.getDate();
    
    //Element "select" du DOM qui contient la liste des mois
    let select = document.getElementById("month");
    select.selectedIndex = moisCourant -1;
    
    //Création des objets BuildHTML et Requetes
    let html = new BuildHTML(moisCourant, jourCourant);
    let req = new Requetes();
    html.setMonth(moisCourant);    
    html.construireCalendrier();
    req.getAllCompetitions();
    
    //Au clic sur le bouton ok, on récupère le mois selectionné dans le select
    //On envoie ces informations a l'objet BuildHTML et on génère un calendrier
    let ok = document.querySelector("input");
    ok.addEventListener("click", function(){
        
        moisCourant=select.selectedIndex+1;
        html.setMonth(moisCourant);    
        html.construireCalendrier();
        
        //Une fois le calendrier généré, on fais une requete pour obtenir toutes les compet
        //du mois
        req.getAllCompetitions();
        
    });
    
    //Evenement flèche droite (donc mois + 1)
    let next = document.getElementById("rightArrow");
    next.addEventListener("click", function(){
       
       moisCourant++;
       
       if (moisCourant>12)
           moisCourant = 1;
       
       select.selectedIndex=moisCourant-1;
       
       html.setMonth(moisCourant);        
       html.construireCalendrier();
       req.getAllCompetitions();
       
   });
   
   //Evenement flèche gauche (donc mois - 1)
    let previous = document.getElementById("leftArrow");
    previous.addEventListener("click", function(){
           
       moisCourant--;
       
       if (moisCourant<=0)
           moisCourant = 12;
       
       select.selectedIndex=moisCourant-1; 
       
       html.setMonth(moisCourant);        
       html.construireCalendrier();
       req.getAllCompetitions();
   });
    
    //Evenement personnalisé, renvoyé par l'objet Requetes
    //Il se charge d'indiquer que la requete GET pour obtenir
    //Toutes les competitions est TERMINE
    document.addEventListener("finishedAll", function(){
        
        //on récupère les données...
        let dataCompets = req.getAllCompetsData();
        //Et on les passe à l'objet HTML pour qu'ils les affichent sur la calendrier
        html.afficherCompetition(dataCompets);
        
        //On ajoute un gestionnaire d'évenement sur chaque div qui contient une compétition
        let divs = document.querySelectorAll(".jours.compet");
   
        for (let i=0; i<divs.length; i++)
        {
            //Si l'utilisateur clique sur la div, on fais une nouvelle requête
            //Cette fois ci sur une seule compétition (celle sur laquelle on a cliqué)
            divs[i].addEventListener("click", function(){
                
                req.getOneCompet(this.childNodes[1]);   
                //Autre évenement personnalisé, toujours renvoyé par l'objet Requetes
                //Cette fois ci pour indiquer que la requête pour UNE compétition est terminé
                document.addEventListener("finishedOne", function()
                {
                    //Une fois les informations récupérés, on crée un nouvel objet "Modale"
                    //Contenant les informations nécessaire et on ouvre cet objet
                    let oneCompet = req.getOneCompetData();
                    let modale = new Modale(oneCompet);    
                    modale.openModal();
                });

            });
        }

    });
   
    
    
});