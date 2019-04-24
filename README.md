# README

Demander à un utilsateur de renseigner son salaire et le nombre d'enfants à sa charge. Afficher la prime de salaire, la prime d'enfants et la prime totale selon les choix de l'utilisateur.

## Table des matières
1. [Ressources](#ressources)
2. [Head](#head)
3. [Body - Infos utilisateur](#infos)
4. [Body - Check boxes](#boxes)
5. [Body - Afficher les primes](#primes)
6. [JS - Classe Personne()](#presonne)
7. [JS - Fonction Traitement()](#traitement)

## <a href="ressources"></a>Ressources

Tutos rapides en JavaScript sur le site <a href="https://www.w3schools.com/js/default.asp" target="_blank">W3Schools</a>.

## <a href="head">Head</a>

Les feuilles de style BS4 sont définies sur le site maxcdn.bootstrapcdn.com

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

Scripts nécessaires pour utiliser BS4 :

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

## <a href="infos">Body - Infos utilisateur</a>

Créer un label et son input sur la même ligne (par ex. nom de l'utilisateur). L'**input** doit prendre un **id** unique afin de pouvoir facilement récupérer sa valeur dans le fichier **source.js**. Le **label** possède un attribut **for** qui sépcifie à quel élément il est lié.

    <form action="/action_page.php" class="form-horizontal" method="post">
        <div class="form-group row">

            <label for="txtNom" class="col-sm-2">Nom</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="txtNom" name="txtNom" placeholder="Votre nom">
            </div>

        </div>
    </form>

## <a href="boxes">Body - Check boxes</a>

L'utilisateur peut choisir les primes qu'il souhaite voir s'afficher. On a recours aux **checkboxes** pour permettre à l'utilisateur de sélectionner plusieurs **input** (en opposition aux **radioboxes**, où un seul **input** peut être sélectionné dans la liste).

La classe **.form-check-inline** sert à afficher les checkboxes sur une seule ligne plutôt que les uns au-dessus des autres. Quand il détecte un clic de souris, l'**input** lance la fonction **Traitement(this)** définies dans le fichier **source.js**.

    <form action="/action_page.php" class="form-horizontal" method="post">
        <div class="form-check form-check-inline">

            <input class="form-check-input" type="checkbox" value="" id="checkSalaire" onclick="Traitement(this)">
            <label class="form-check-label" for="checkSalaire">
                Prime annuelle salaire
            </label>

        </div>
    </form>

Le paramètre **this** se réfère à l'élément faisant appel à la fonction. Quand on définit cette fonction, on se réfère à cet élément avec le mot-clé **selection** qui permet d'en récupérer les attributs et leurs valeurs (voir [plus bas](#traitement)).

## <a href="primes">Body - Afficher les primes</a>

On affiche enfin la prime de l'utilisateur. Cette section de la page est cachée (**style="visibility:hidden"**) jusqu'à ce que l'utilisateur clique sur le **checkbox** correspondant.

La balise **div** possède un **id** spécifique qui permettra à la fonction **Traitement()** de manipuler sa visibilité.

L'**input** affiche le résultat final, on ne peut pas modifier son contenu (attribut **readonly**)

    <div class="form-group row" style="visibility:hidden" id="divSalaire">

        <label for="resultSalaire" class="col-sm-2 col-form-label">
            Votre prime salaire
        </label>
        <input type="text" class="form-control col-sm-10" id="resultSalaire" name="resultSalaire" readonly>

    </div>

## <a href="personne">JS - Classe Personne()</a>

Le constructeur passe en premier. Il indique qu'à chaque fois qu'on crée un objet, il doit prendre en paramètre les nom, prénom, salaire et nombre d'enfants de l'utilisateur.

    class Personne {
        constructor(nom, prenom, salaire, nbEnf) {
            this.Nom = nom
            this.Prenom = prenom
            this.Salaire = salaire
            this.NbEnf = nbEnf
        }
        ...
    }

La classe **Personne** définit plusieurs méthodes permettant de calculer une prime différente. Ces méthodes ne prennent pas de paramètre puisqu'elles se basent sur les attributs de classe (**this.Salaire**, etc.).

    PrimeSalaire() {
        if (this.Salaire < 2000)
            return this.Salaire * 0.5
        
        else if (this.Salaire < 4000)
            return this.Salaire * 0.3
        
        return this.Salaire * 0.15
    }

La méthode **CalculPrime()** permet d'attribuer le résultat de chaque fonction calculant une prime à un élément particulier de la page HTML. Il s'agit en l'occurrence des balises **div** qui lancent la fonction **Traitement()** quand elles détectent un clic de souris.

    CalculPrime() {
        document.getElementById("resultSalaire").value = this.PrimeSalaire()
        document.getElementById("resultEnfants").value = this.PrimeEnfants()
        document.getElementById("resultTotale").value = this.PrimeTotale()
    }

## <a href="traitement">JS - Fonction Traitement()</a>

La fonction **Traitement()** agit sur l'élément dans lequel elle est appelée. On se réfère à cet élément avec le mot-clé **selection**. Elle agit en quatre étapes.

1 - Récupérer et stocker les infos utilisateur dans des variables. Ces infos sont situées dans les balises **input** en haut de page. 

2 - Créer un objet de classe **Personne** à partir des infos utilisateur enregistrées.

3 - Calculer les primes de l'utilisateur. Par défaut, l'utilisateur ne peut pas visualiser ces primes puisque les balises d'affichage sont invisibles (voir [plus haut](#resultat)).

4 - L'expression **switch** sert à sélectionner un bloc de code à exécuter. Cette sélection repose sur l'**id** de l'élément **selection**. En passant tous les éléments en question et en vérifiant s'ils ont été cliqué, la fonction **Traitement()** affichera ou cachera ces éléments.

    function Traitement(selection) {
        var nom = document.getElementById("txtNom").value
        var prenom = document.getElementById("txtPrenom").value
        var salaire = document.getElementById("txtSalaire").value
        var nbEnf = document.getElementById("txtNbEnfants").value

        var p = new Personne(nom, prenom, salaire, nbEnf)
        p.CalculPrime()

        switch (selection.id) {
            case "checkSalaire":
                if (selection.checked) {
                    document.getElementById("divSalaire").style.visibility = "visible"
                }
                else {
                    document.getElementById("divSalaire").style.visibility = "hidden"
                }
                break

            case "...":
            case "...":
        }
    }
