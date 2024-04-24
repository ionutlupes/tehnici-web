window.addEventListener("load", function () {
    document.getElementById("inp-pret").onchange = function () {
        document.getElementById("infoRange").innerHTML = `(${this.value})`

    }


    // console.log(document.getElementById("filtare").addEventListener("click",function(){})
    document.getElementById("filtrare").onclick = function () {
        var inpNume = document.getElementById("inp-nume").value.trim().toLowerCase()

        var vRadio = document.getElementsByName("gr_rad")

        for (let r of vRadio) {
            if (r.checked) {
                inpCalorii = r.value;
                break
            }
        }

        if (inpCalorii != "toate") {
            let aux = inpCalorii.split(":")
            minCalorii = parseInt(aux[0])
            maxCalorii = parseInt(aux[1])
        }

        var inpPret = parseInt(document.getElementById("inp-pret").value)
        var inpCateg = document.getElementById("inp-categorie").value.trim().toLowerCase()
        var produse = document.getElementsByClassName("produs")

        for (let produs of produse) {
            let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()
            let cond1 = valNume.startsWith(inpNume)

            let valCalorii = parseInt(produs.getElementsByClassName("val-calorii")[0].innerHTML)
            let cond2 = (inpCalorii == "toate" || (minCalorii <= valCalorii && valCalorii < maxCalorii))


            let valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML)

            let cond3 = inpPret < valPret;
            let valCategorie = produs.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase()
            let cond4 = (inpCateg == "toate" || inpCateg == valCategorie)
            if (cond1 && cond2 && cond3) {
                produs.style.display = "block";
            }
            else {
                produs.style.display = "none";
            }
        }
    }
})

