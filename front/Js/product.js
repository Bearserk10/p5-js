const id = window.location.search.split("?card").join("");
console.log(id);

let idData = [];

const fetchReponse = async () =>{
    await fetch(`http://localhost:3000/api/products/${id}`)
    .then(reponse => reponse.json())
    .then(data => {
        idData = data
        console.log(idData);
    });
    };

    const idDisplay = async () => { 
        await fetchReponse();

        document.getElementById("item__img").innerHTML = 
        `<img class="item__img" img src="${idData.imageUrl}" alt= "image du canapé ${idData.name}">`;
        
        const productName = document.getElementById("title").textContent;
        document.getElementById("title").textContent = `${idData.name}`;

        const productDescription = document.getElementById("description").textContent;
        document.getElementById("description").textContent = `${idData.description}`;

        const productPrice = document.getElementById("price").textContent;
        document.getElementById("price").textContent = `${idData.price}`;
        
        
        const couleurs = idData.colors;
const select = document.getElementById("colors");

couleurs.forEach(couleur => {
  const option = document.createElement("option");
  option.value = couleur;
  option.text = couleur;
  select.add(option);







});

  let ajouterPanier = document.querySelectorAll("button");
    ajouterPanier.forEach((ajout)=>
    ajout.addEventListener("click" , () => {
      const couleurSelectionnee = document.getElementById("colors").value;
      const quantite = document.querySelector("#quantity").value;
      const nomProduit = `${idData.name}`
      const imageProduit = `${idData.imageUrl}`;
      let productPanier = {
        nom: nomProduit,
        id: id,
        couleur: couleurSelectionnee,
        quantite: quantite,
        images: imageProduit
      };
      console.log(productPanier)
      
      const ajoutProduitLS = () => {
      productLS.push(productPanier)
      localStorage.setItem("produit", JSON.stringify(productLS))
      }

    let productLS = JSON.parse(localStorage.getItem("produit"));
      if(productLS){
        ajoutProduitLS();
  } else {
    productLS = [];
    ajoutProduitLS();
  }
}))

};


  




  



  
  


idDisplay()

