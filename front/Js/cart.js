let productLS = JSON.parse(localStorage.getItem("produit"));
console.log(productLS);

const produitPanierLS = document.querySelector("#cart__items")

if(productLS === null){
    const panierVide = `
    <h2> Le panier est vide </h2> `
    produitPanierLS.innerHTML =  panierVide;

} else {
    let produitPanier = [];

    const fetchData = async (id) => {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await response.json();
        return data;
      };
    
    const canapDisplay = async () => {
    for (let j = 0; j < productLS.length; j++){
        const id = productLS[j].id
        const couleur = productLS[j].couleur
        const quantite = productLS[j].quantite
        
        const reponse = await fetch(`http://localhost:3000/api/products/${id}`)
        const data = await reponse.json()
        const totalPrice = quantite * data.price
        console.log(totalPrice)
        produitPanier.push({id, couleur, quantite, data, totalPrice})
    }
    
    
    produitPanierLS.innerHTML = produitPanier.map(({id, couleur, quantite, data, totalPrice}) => 
        `<article class="cart__item" data-id="${id}" data-color="${couleur}">
            <div class="cart__item__img">
                <img src="${data.imageUrl}" alt="Photographie du canapé ${data.name}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>Couleur: ${couleur}</p>
                    <p>${totalPrice}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${quantite}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`).join("");
}
canapDisplay();
}
