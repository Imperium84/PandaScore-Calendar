/* 
 * Fenête modale qui s'affiche lorsque l'on clique sur une div
 * Elle va afficher des informations sur une compétitions
 */


var Modale = function(data)
{    
    this.title = data[0].league.name;
    this.subtitle = data[0].serie.full_name;
    this.date = new Competition(data[0].begin_at, data[0].end_at, data[0].league.name, data[0].serie.full_name, data[0].id);
    this.imgUrl = data[0].league.image_url;
    this.price = data[0].serie.prizepool;
    this.listMatch = data[0].matches;
       
    this.checkModale();
    this.div = this.createModale();

};

//Pour éviter les doublons...
Modale.prototype.checkModale = function()
{
    let fond=document.getElementById("fond");
    if (fond && typeof fond != 'undefined')
    {
        fond.parentNode.removeChild(fond);
    }
};

//Retourne la fenêtre modale créer
Modale.prototype.getDOM = function()
{
    return this.div;
}

//Crée la modale
Modale.prototype.createModale = function()
{
    //Fenetre modale + fond
    let divFond = document.createElement("aside");
    divFond.setAttribute("id", "fond"); 
    divFond.setAttribute("data-color", this.couleur)
    
    //Cadre...
    let divRole = document.createElement("div");
    divRole.setAttribute("id", "role");
       
    //Titre principale
    let h2 = document.createElement("h2");
    h2.innerText = this.title;
    
    //Sous titre
    let h4 = document.createElement("h4");
    h4.innerText = this.subtitle;
    
    divRole.appendChild(h2);
    divRole.appendChild(h4);
    
    
    let divPrincipale = document.createElement("div");
    divRole.setAttribute("id", "principale");
    
    //Partie gauche avec l'image
    let divGauche = document.createElement("div");
    divGauche.setAttribute("id", "gauche");
      
    let img = document.createElement("img");
    img.setAttribute("src", this.imgUrl);
    img.setAttribute("alt", this.title);
    
    divGauche.appendChild(img);
    
    //Partie centrale avec le prizepool, les dates, etc...
    let divCentre = document.createElement("div");
    divCentre.setAttribute("id", "centre");
    
    let spanDate1 = document.createElement("span");
    
    let dateDebut = document.createElement("h5");
    dateDebut.innerText = "Date début: ";
    let p1 = document.createElement("p");
    p1.innerText = this.date.dateDebut;
    
    spanDate1.appendChild(dateDebut);
    spanDate1.appendChild(p1);
    
    let spanDate2 = document.createElement("span");
    
    let dateFin = document.createElement("h5");
    dateFin.innerText = "Date Fin: ";
    let p2 = document.createElement("p");
    p2.innerText = this.date.dateFin;
    
    spanDate2.appendChild(dateFin);
    spanDate2.appendChild(p2);
    
    let spanPrix = document.createElement("span");
    
    let prizepool = document.createElement("h5");
    prizepool.innerText = "Prix: ";
    let p3 = document.createElement("p");
    p3.innerText = this.price;
    
    spanPrix.appendChild(prizepool);
    spanPrix.appendChild(p3);
    
    divCentre.appendChild(spanDate1);
    divCentre.appendChild(spanDate2);
    divCentre.appendChild(spanPrix);
    
    //Div de droite qui contiendra la liste des match
    let divDroite = document.createElement("div");
    divDroite.setAttribute("id", "droite");
    
    let ul = document.createElement("ul");
    
    for (let i=0; i<this.listMatch.length; i++)
    {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href", "#");
        a.innerText = this.listMatch[i].name;
        
        li.appendChild(a);
        ul.appendChild(li);
    }
    
    divDroite.appendChild(ul);
    
    divPrincipale.appendChild(divGauche);
    divPrincipale.appendChild(divCentre);
    divPrincipale.appendChild(divDroite);
    divRole.appendChild(divPrincipale);
    divFond.appendChild(divRole);
    
    
//    divFond.style.backgroundColor.opacity = 0.5;
    
    return divFond;
};

//Evenement concernant la modale
Modale.prototype.openModal = function()
{
    if (this.div == null)
        return;
    
    let main = document.querySelector("main"); 
    main.appendChild(this.div);
    
    this.div.classList.add("transition");
   
    window.addEventListener("keydown", this.keyboardEvent.bind(this));   
};

Modale.prototype.closeModal = function()
{    
     if (this.div == null)
        return;
    
    this.div.style.display = "none";
    window.removeEventListener("keydown", this.keyboardEvent); 
};

Modale.prototype.stopPropagation = function(e)
{
    e.stopPropagation();
};

Modale.prototype.keyboardEvent = function(e)
{
    if (e.key === "Escape" || e.key === "Esc")
    {
        this.closeModal();
    }
};