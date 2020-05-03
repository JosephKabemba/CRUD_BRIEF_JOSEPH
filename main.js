//Création de la classe Employe
let ligneSélectionnée;
let i;

class Employe {
  constructor(
    id,
    nom,
    prenom,
    email,
    age,
    poste,
    numeroTelephone,
    estMarie,
    pays
  ) {
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
          <td><i class="fas fa-edit btnModifier text-primary"></i></td>
          <td><i class="fas fa-trash-alt btnSupprimer"></i></td>         
      `;
    liste.appendChild(enregistrement);
  }

  static reinitialiserLeFormulaire() {
    document.querySelector('#formulaireEmploye').reset();
    document.querySelector("#id").focus();
  }

  static supprimerEmploye(el) {
    if (el.classList.contains("btnSupprimer")) {
      el.parentElement.parentElement.remove();
    }
  }

  static donneeEmployeFormulaire() {
    let employe = {};
    employe["id"] = document.querySelector("#id").value;
    employe["nom"] = document.querySelector("#nom").value;
    employe["prenom"] = document.querySelector("#prenom").value;
    employe["email"] = document.querySelector("#email").value;
    employe["age"] = document.querySelector("#age").value;
    employe["poste"] = document.querySelector("#poste").value;
    employe["numeroTelephone"] = document.querySelector(
      "#numeroTelephone"
    ).value;
    employe["estMarie"] = document.querySelector("#estMarie").value;
    employe["pays"] = document.querySelector("#pays").value;
    return employe;
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

  static supprimerEmploye(id) {
    const employes = Stockage.getEmployes();
    employes.forEach((employe, indice) => {
      if (employe.id === id) {
        employes.splice(indice, 1);
      }
    });

    localStorage.setItem("employes", JSON.stringify(employes));
  }
}

//Afficher tous les employés au chargement du document
document.addEventListener("DOMContentLoaded", GUI.afficherEmployes);

const btnAjouter = document.querySelector("#btnAjouter");


//Supprimer un employé
document.querySelector("#listeEmployes").addEventListener("click", (e) => {
  if (e.target.classList.contains("btnSupprimer")) {
    if (
      confirm("Etes-vous sûr de vouloir supprimer cet employé de la liste ?")
    ) {
      //Supprimer l'employé de l'interface (GUI)

      GUI.supprimerEmploye(e.target);

      //Supprimer l'employé du Local storage
      const id = e.target.parentElement.parentElement.childNodes[1].textContent;
      Stockage.supprimerEmploye(id);
    }
  }

  if (e.target.classList.contains("btnModifier")) {
    function remplirFormulaire(id) {
      return e.target.parentElement.parentElement.children[id].innerText;
    }
    document.querySelector("#id").value = remplirFormulaire(0);
    document.querySelector("#nom").value = remplirFormulaire(1);
    document.querySelector("#prenom").value = remplirFormulaire(2);
    document.querySelector("#email").value = remplirFormulaire(3);
    document.querySelector("#age").value = remplirFormulaire(4);
    document.querySelector("#poste").value = remplirFormulaire(5);
    document.querySelector("#numeroTelephone").value = remplirFormulaire(6);
    document.querySelector("#estMarie").value = remplirFormulaire(7);
    document.querySelector("#pays").value = remplirFormulaire(8);

    btnAjouter.textContent = "Mettre à jour";
    ligneSélectionnée = e.target.parentElement.parentElement;
  }
});

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

  //Validation du formulaire
  const messageDerreur = document.querySelector("#messageDerreur");
  messageDerreur.setAttribute(
    "style",
    "background-color: tomato; color:white; border-radius: 10%;"
  );

  //Cette instruction permet de faire disparaire le message d'erreur après 3s
  setTimeout(() => {
    document.querySelector("#messageDerreur").textContent = "";
    messageDerreur.setAttribute("style", "background-color: white;");
  }, 3000);

  //Validation champ par champ
  if (nom === "") {
    messageDerreur.textContent = `Le nom ne peut pas être vide`;
    document.querySelector("#nom").focus();
    return false;
  } else if (prenom === "") {
    messageDerreur.textContent = `Le prénom ne peut pas être vide`;
    document.querySelector("#prenom").focus();
    return false;
  } else if (email === "" || estUnEmail(email) === false) {
    messageDerreur.textContent = `Renseigner un email valide`;
    document.querySelector("#email").focus();
    return false;
  } else if (poste === "") {
    messageDerreur.textContent = `Veuiller renseigner un poste`;
    document.querySelector("#poste").focus();
    return false;
  } else if (isNaN(numeroTelephone) || numeroTelephone.length != 10) {
    messageDerreur.textContent = `Le numéro de téléphone doit contenir 10 chiffres`;
    document.querySelector("#numeroTelephone").focus();
  } else if (estMarie === "" || estMarie === null) {
    messageDerreur.textContent = `Veuillez renseigner un statut marital`;
    document.querySelector("#estMarie").focus();
    return false;
  } else if (pays === "") {
    messageDerreur.textContent = `Veuillez indiquer le pays d'origine`;
    document.querySelector("#pays").focus();
    return false;
  } else {
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

    if (btnAjouter.textContent === "Ajouter") {
      //Ajouter l'employé dans l'interface (GUI)
      GUI.ajouterDansLaListe(employe);

      //Ajouter l'employé dans le local storage
      Stockage.ajouterEmploye(employe);

      GUI.reinitialiserLeFormulaire();
    }

    if (btnAjouter.textContent === "Mettre à jour") {
      ligneSélectionnée.children[1].textContent = GUI.donneeEmployeFormulaire().nom;
      ligneSélectionnée.children[2].textContent = GUI.donneeEmployeFormulaire().prenom;
      ligneSélectionnée.children[3].textContent = GUI.donneeEmployeFormulaire().email;
      ligneSélectionnée.children[4].textContent = GUI.donneeEmployeFormulaire().age;
      ligneSélectionnée.children[5].textContent = GUI.donneeEmployeFormulaire().poste;
      ligneSélectionnée.children[6].textContent = GUI.donneeEmployeFormulaire().numeroTelephone;
      ligneSélectionnée.children[7].textContent = GUI.donneeEmployeFormulaire().estMarie;
      ligneSélectionnée.children[8].textContent = GUI.donneeEmployeFormulaire().pays;
      

      btnAjouter.textContent = "Ajouter";
      GUI.reinitialiserLeFormulaire();
      
    }
  }
});

function estUnEmail(email) {
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    email
  );
}


