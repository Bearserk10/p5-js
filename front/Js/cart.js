let productLS = JSON.parse(localStorage.getItem("produit"));
console.log(productLS);

const produitPanierLS = document.querySelector("#cart__items")
if(productLS === null){
    const panierVide = `
    <h2> Le panier est vide </h2> `
    produitPanierLS.innerHTML =  panierVide;

}else{
    let produitPanier = [];

    for (j = 0; j < productLS.length; j++){
        produitPanier = produitPanier + `
        <article class="cart__item" data-id="${productLS[j].id}" data-color=${productLS[j].coleur}>
        <div class="cart__item__img">
        <img src="${productLS[j].image}" alt="Photographie du canapé ${productLS[j].nom}">
        </div>
        
        `;}

        if(j === productLS.length)
        produitPanierLS.innerHTML = produitPanier; 
    }
    
