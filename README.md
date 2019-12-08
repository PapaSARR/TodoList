# Rapport projet PWA TodoList

## Installation et lancement du projet

1. git clone https://github.com/PapaSARR/TodoList.git
2. cd TodoList
3. npm install
4. ng serve --open

## Liste des fonctionnalités développées:

### Annuler / Refaire
Création de deux boutons undo et redo dans le TodoListComponent pour annuler une action ou refaire une action.
L'action peut-être l'ajout d'un todo, la suppression d'un todo, une modification de label...
Pour cela, on créé dans le TodoService deux tableaux, l'un s'occupant des undos et l'autre des redos.
Deux méthodes gérant les événements (clique des boutons undo et redo) sont aussi nécessaires pour mettre à jour les tableaux.

### Effacer tout
Fonctionnalité simple permettant d'effacer tous les todos de la liste ainsi que les tableaux undo et redo. 
Pour cela, on créé un simple bouton Clear All et une fonction gérant l'event clique de ce bouton. 
Pour supprimer les items dans la fonction, on initialise juste la longueur du tableau d'item ainsi que celles des tableaux undo, redo à 0.

### Local Storage 
Cette fonctionnalité permet la sérialisation et la désérialisation de notre tableau d'items et des tableaux undo et redo.
Ainsi, il était question d'implémenter dans le TodoService une méthode set et une méthode get pour chaque tableau permettant respectivement la sauvegarde 
du tableau dans le local storage et la récupération du tableau.
A travers le service, si besoin on fait appel à ces méthodes pour soit mettre à jour les données ou les récupérer.

### Firebase
Pour cette fonctionnalité, on veut ajouter un système d'authentification à notre TodoList App en utilisant les services Firebase. 
Dans le console firebase, on créé un projet pour héberger notre application TodoList, ensuite on configure le mode connexion adresse email/mot de passe.
Pour terminer, il est nécessaire d'avoir un composant signup pour la création d'un user, un composant signin pour gérer la connexion d'un user ainsi que deux services,
un pour gérer ces fonctions et un autre (service de garde) pour protéger le TodoList App si un user n'est pas connecté.
Vous pouvez tester l'application en vous connectant avec les identifiants suivants que j'ai créé:
##### Adresse email: blarre@test.fr     ----     Mot de passe: blarre
Vous avez aussi la possibilité de créer un compte en cliquant sur "Créer un compte".

## Difficultés rencontrées
J'avais quelques soucis avec la prise en compte des modifications venant de la fonctionnalté Undo / Redo dans le Local Storage, ce n'était pas simple à réaliser. 
Du coup, ça m'avait fait perdre un peu de temps.
J'avais aussi eu un petit souci côté design, avec la barre de navigation et les boutons.
En fait, je voulais travailler avec bootsrap mais j'ai dû mal à le combiner avec styles.css que vous avez défini dans le projet.
Après avoir installer Bootstrap, dès que je l'injecte dans le fichier angular.json, tout le style de l'application est déformé. 
Du coup, j'ai finalement supprimé bootstrap et continuer à travailler avec styles.css en rajoutant d'autres classes pour la barre de navigation et les boutons undo/redo.
