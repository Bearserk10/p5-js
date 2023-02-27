let productLS = JSON.parse(localStorage.getItem("produit"));


const produitPanierLS = document.querySelector("#cart__items")
let totalQuantitePanier = 0;
let totalPricePanier = 0;

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
        const totalPriceProduct = quantite * data.price
        const totalPrice = quantite * data.price;
        totalPricePanier += totalPrice;
        totalQuantitePanier += parseInt(quantite, 10);
        
        produitPanier.push({id, couleur, quantite, data, totalPriceProduct})
    }
    
    
    produitPanierLS.innerHTML = produitPanier.map(({id, couleur, quantite, data, totalPriceProduct}) => 
        `<article class="cart__item" data-id="${id}" data-color="${couleur}">
            <div class="cart__item__img">
                <img src="${data.imageUrl}" alt="Photographie du canapé ${data.name}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>Couleur: ${couleur}</p>
                    <p>${totalPriceProduct}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${quantite}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`).join("");
        
        //ajout du total de tout les prix et quantite
        document.querySelector('#totalQuantity').textContent = totalQuantitePanier;
        document.querySelector('#totalPrice').textContent = totalPricePanier;

        //supp d'un produit sur la page panier
        const Supprimer = document.querySelectorAll(".deleteItem");
        Supprimer.forEach((supp) => {
            supp.addEventListener("click", (event) => {
              const item = event.target.closest(".cart__item");
              const id = item.dataset.id;
              const couleur = item.dataset.color;
              const index = productLS.findIndex(
                (item) => item.id === id && item.couleur === couleur
              );
              if (index !== -1) {
                productLS.splice(index, 1);
                localStorage.setItem("produit", JSON.stringify(productLS));
                item.remove();
              }if (productLS.length === 0) {
                localStorage.removeItem("produit");
              }
              
            });
          });
          
          //changement de la quantité sur la page panier
                          const itemQuantities = document.querySelectorAll(".itemQuantity");
                itemQuantities.forEach((quantityInput) => {
                  quantityInput.addEventListener("change", (event) => {
                    const item = event.target.closest('[data-id][data-color]');
                    const id = item.dataset.id;
                    console.log(id)
                    const couleur = item.dataset.color;
                    console.log(couleur)
                    const index = productLS.findIndex((item) => item.id === id && item.couleur === couleur);
                    if (index !== -1) {
                      const newQuantity = parseInt(event.target.value);
                      productLS[index].quantite = newQuantity;
                      localStorage.setItem("produit", JSON.stringify(productLS));
                      productLS.quantite = newQuantity;
                      const price = item.querySelector('.cart__item__content__description p:last-child');
                      price.textContent = (newQuantity * price) + " €";
                      totalQuantitePanier = productLS.reduce((acc, cur) => acc + cur.quantite, 0);
                      totalPricePanier = productLS.reduce((acc, cur) => acc + (cur.quantite * cur.price), 0);
                      document.querySelector('#totalQuantity').textContent = totalQuantitePanier;
                      document.querySelector('#totalPrice').textContent = totalPricePanier + " €";
                      document.querySelector(".cart").innerHTML = "";
                      location.reload();
                    }
                  });
});
}
canapDisplay();
}


const form = document.getElementById('order');
form.addEventListener('submit', async function(event) {
  event.preventDefault(); // Empêche la soumission du formulaire

  // Récupère les données saisies par l'utilisateur
  const contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value
  };
  
  // Vérifie les données saisies par l'utilisateur
  if (!isValidEmail(contact.email)) {
    alert('Veuillez saisir un e-mail valide');
    return;
  }

  // Récupère les produits dans le panier
  const products = getCartItems();
  
  // Récupère les données de chaque produit dans le panier
  for (let i = 0; i < products.length; i++) {
    const product = await fetchData(products[i].id);
    produitPanier.push(product);
  }
  
  // Envoie les données à l'API pour valider la commande
  const order = { contact, products: produitPanier }; // Crée l'objet de commande
  sendOrder(order); // Envoie la commande à l'API
});

const fetchData = async (id) => {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  const data = await response.json();
  return data;
};

const sendOrder = async (order) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  };

  const response = await fetch('http://localhost:3000/api/products', sendOrder);
  const data = await response.json();
  localStorage.setItem('orderId', data.orderId);
  window.location.href = 'confirmation.html';
};