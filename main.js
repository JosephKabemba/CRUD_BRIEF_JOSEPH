//Création de la classe Employe
class Employe {
    constructor(id, nom, prenom, email, age, poste, numeroTelephone, estMarie, pays) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.age = age;
      this.poste = poste;
      this.numeroTelephone = numeroTelephone;
      this.estMarie = estMarie;
      this.pays = pays;
    }
  }
  
  //Création de la class GUI pour la gestion des
  //taches sur l'interface (le front)
  class GUI {
    static afficherEmployes() {
      const employes = Stockage.getEmployes();
    
      employes.forEach((employe) => GUI.ajouterDansLaListe(employe));
    }
  
    static ajouterDansLaListe(employe) {
      const liste = document.querySelector("#listeEmployes");
      const enregistrement = document.createElement("tr");
  
      enregistrement.innerHTML = `
          <td>${employe.id}</td>
          <td>${employe.nom}</td>
          <td>${employe.prenom}</td>
          <td>${employe.email}</td>
          <td>${employe.age}</td>
          <td>${employe.poste}</td>
          <td>${employe.numeroTelephone}</td>
          <td>${employe.estMarie}</td>
          <td>${employe.pays}</td>
      `;
      liste.appendChild(enregistrement);
    }

    static reinitialiserLeFormulaire() {
      document.querySelector("#id").value = "";
      document.querySelector("#nom").value = "";
      document.querySelector("#prenom").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#age").value = "";
      document.querySelector("#poste").value = "";
      document.querySelector("#numeroTelephone").value = "";
      document.querySelector("#estMarie").value = "";
      document.querySelector("#pays").value = "";
      document.querySelector("#id").focus();
    }
  }
  
  //Classe Stockage
  class Stockage {
    static getEmployes() {
      let employes;
      if (localStorage.getItem("employes") === null) {
        employes = [];
      } else {
        employes = JSON.parse(localStorage.getItem("employes"));
      }
  
      return employes;
    }
  
    static ajouterEmploye(employe) {
      const employes = Stockage.getEmployes();
      employes.push(employe);
      localStorage.setItem("employes", JSON.stringify(employes));
    }
  }
  
  //Afficher tous les employés au chargement du document
  document.addEventListener("DOMContentLoaded", GUI.afficherEmployes);
  
  //Ajouter un employé
  document.querySelector("#formulaireEmploye").addEventListener("submit", (e) => {

    //Annuler le comportement par défaut du submit
    e.preventDefault();
  
    //Récupérer les données du formulaire
    const id = document.querySelector("#id").value;
    const nom = document.querySelector("#nom").value;
    const prenom = document.querySelector("#prenom").value;
    const email = document.querySelector("#email").value;
    const age = document.querySelector("#age").value;
    const poste = document.querySelector("#poste").value;
    const numeroTelephone = document.querySelector("#numeroTelephone").value;
    const estMarie = document.querySelector("#estMarie").value;
    const pays = document.querySelector("#pays").value;
  
    //Création d'un object Employe
    const employe = new Employe(
      id,
      nom,
      prenom,
      email,
      age,
      poste,
      numeroTelephone,
      estMarie,
      pays
    );
  
    //Ajouter l'employé dans l'interface (GUI)
    GUI.ajouterDansLaListe(employe);
  
    //Ajouter l'employé dans le local storage
    Stockage.ajouterEmploye(employe);
  
    GUI.reinitialiserLeFormulaire();
  });  