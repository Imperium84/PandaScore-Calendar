/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Competition = function(dateDebut, dateFin, nom, nomComplet, id)
{
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.jourDebut = 0;
    this.jourFin = 0;
    this.moisDebut = 0;
    this.moisFin = 0;  
    this.intervalle = 0;
    this.nom = nom;
    this.nomComplet = nomComplet;
    this.id = id;

    this.calculerDate();
};

Competition.prototype.setName = function(nom)
{
    this.nom = nom;
};

Competition.prototype.setFullName = function(nomComplet)
{
    this.nomComplet = nomComplet;
};
    
Competition.prototype.calculerDate = function()
{
    this.dateDebut = this.dateDebut.substr(0, 10);

    this.moisDebut = this.extraireMois(this.dateDebut);
    this.jourDebut = this.extraireJour(this.dateDebut);

    this.dateFin = this.dateFin.substr(0, 10);

    this.moisFin = this.extraireMois(this.dateFin);
    this.jourFin = this.extraireJour(this.dateFin);

    this.intervalle = this.calculerIntervalle();


};

Competition.prototype.extraireJour = function(date)
{
    return date.substr(8, date.length);
};

Competition.prototype.extraireMois = function(date)
{
    return date.substr(5, date.indexOf("-")-2);
};

Competition.prototype.calculerIntervalle = function()
{
    let intervalle;
    if (this.moisDebut != this.moisFin)
    {
        if (this.moisDebut < this.moisFin)
        {
            intervalle = this.jourFin - this.jourDebut;
            if (intervalle < 0)
                intervalle = parseInt(this.jourDebut + intervalle);
        }
    }       
    
    else if (this.jourDebut<this.jourFin)
    {
        intervalle = this.jourFin - this.jourDebut;
    }
    
    else if (this.jourDebut>this.jourFin)
    {
        intervalle = -1;
    }
    //Si c'est égal
    else
    {
        intervalle = 0;
    }
    
    return intervalle;
};
    
