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


const form = document.querySelector('#order');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');
const orderButton = document.querySelector('#order');

let regName = new RegExp("^[a-zA-ZéèàêëïÈÉÊËÌÍÎÏ,.' -]+$");
let regAdress = new RegExp("^[A-zÀ-ú0-9 ,.'-]+$");
let regMail = new RegExp('^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$');

const errorFirstName = document.querySelector('#firstNameErrorMsg')
firstName.addEventListener('change', function(event) {
  let valueUser = event.target.value;
  if (regName.test(valueUser)){
    errorFirstName.innerHTML ='';
  }else {
    errorFirstName.innerHTML = 'erreur detecter lors de la saisie de votre prénom veuillez rentrer une valeur valide !'
  }
})

const errorLastName = document.querySelector('#lastNameErrorMsg')
lastName.addEventListener('change', function(event) {
  let valueUser = event.target.value;
  if (regName.test(valueUser)){
    errorLastName.innerHTML ='';
  }else {
    errorLastName.innerHTML = 'erreur detecter lors de la saisie de votre nom veuillez rentrer une valeur valide !'
  }
})

const errorAddress = document.querySelector('#addressErrorMsg')
address.addEventListener('change', function(event) {
  let valueUser = event.target.value;
  if (regAdress.test(valueUser)){
    errorAddress.innerHTML ='';
  }else {
    errorAddress.innerHTML = 'erreur detecter lors de la saisie de votre adresse veuillez rentrer une valeur valide !'
  }
})

const errorCity = document.querySelector('#cityErrorMsg')
city.addEventListener('change', function(event) {
  let valueUser = event.target.value;
  if (regAdress.test(valueUser)){
    errorCity.innerHTML ='';
  }else {
    errorCity.innerHTML = 'erreur detecter lors de la saisie de votre ville veuillez rentrer une valeur valide !'
  }
})

const errorEmail = document.querySelector('#emailErrorMsg')
errorEmail.addEventListener('change', function(event) {
  let valueUser = event.target.value;
  if (regMail.test(valueUser)){
    errorEmail.innerHTML ='';
  }else {
    errorEmail.innerHTML = 'erreur detecter lors de la saisie de votre mail veuillez rentrer une valeur valide !'
  }
})





form.addEventListener('click', function (c) {
  c.preventDefault();
  if (
    firstName.value === '' ||
    lastName.value === '' ||
    address.value === '' ||
    city.value === '' ||
    email.value === ''
  ) {
    alert('Veuillez renseigner vos coordonnées pour passer commande !');
  } else if (productLS == null){
    alert('Votre panier doit contenir des articles pour pouvoir passer un commande !')
  } else {
    product = [];
    for (let p = 0; p < productLS.length; p++) {
        product.push(productLS[p].id);
    }
    requetePost();
  }
});

function requetePost(request){
  // Récupérer les informations du formulaire
  const formData = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: product
  };
  console.log(formData)
  const heading = {
    method: 'POST',
    headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
};
  // Envoyer les informations à l'API
  fetch('http://localhost:3000/api/products/order', heading)
    .then((response) => response.json())
    .then(function(data) {
      localStorage.removeItem('produit');
        orderId = data.orderId;
            if (data.orderId != '') {
                console.log(orderId);
                location.href = 'confirmation.html?id=' + orderId;
            }
            console.log(orderId);
        })
    .catch((error) => {
      console.error(error);
      alert('Une erreur est survenue lors de la validation de la commande. Veuillez réessayer plus tard.');
    });
}

