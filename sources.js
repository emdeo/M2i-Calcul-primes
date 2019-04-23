
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

        case "checkEnfants":
            if (selection.checked) {
                document.getElementById("divEnfants").style.visibility = "visible"
            }
            else {
                document.getElementById("divEnfants").style.visibility = "hidden"
            }
            break

        case "checkTotale":
            if (selection.checked) {
                document.getElementById("divTotal").style.visibility = "visible"
            }
            else {
                document.getElementById("divTotal").style.visibility = "hidden"
            }
            break
    }
}

class Personne {
    constructor(nom, prenom, salaire, nbEnf) {
        this.Nom = nom
        this.Prenom = prenom
        this.Salaire = salaire
        this.NbEnf = nbEnf
    }

    CalculPrime() {
        document.getElementById("resultSalaire").value = this.PrimeSalaire()
        document.getElementById("resultEnfants").value = this.PrimeEnfants()
        document.getElementById("resultTotale").value = this.PrimeTotale()
    }

    PrimeSalaire() {
        if (this.Salaire < 2000)
            return this.Salaire * 0.5

        else if (this.Salaire < 4000)
            return this.Salaire * 0.3

        return this.Salaire * 0.15
    }

    PrimeEnfants() {
        if (this.NbEnf < 2)
            return this.NbEnf * 200

        else if (this.NbEnf < 4)
            return this.NbEnf * 500

        return this.NbEnf * 700
    }

    PrimeTotale() {
        return this.PrimeSalaire() + this.PrimeEnfants()
    }
}