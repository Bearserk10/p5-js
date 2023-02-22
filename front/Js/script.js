const fetchReponse = async () =>{
await fetch('http://localhost:3000/api/products')
.then(reponse => reponse.json())
.then(data => {
    canapData = data;
});
};

const canapDisplay = async () => { 
    await fetchReponse();

    document.getElementById("items").innerHTML = canapData.map(
        (canap) => `
        <a class="items_a" id="card${canap._id}">
        <article class="items_article">
        <img class="items_article_img" img src="${canap.imageUrl} "alt= "image du canapé ${canap.name}">
        <h3 class="items_article_h3"> ${canap.name}</h3>
        <p class="items_article_p"> ${canap.description} </p>
        <p class="items_article_p"> Prix:${canap.price}€</p>
        <p class="items_article_p"> Couleur:${canap.colors}</p>
        </article>
        </a>
        `).join("");

        let liens = document.querySelectorAll(".items_a");
        console.log(liens);

        liens.forEach((lien) => 
        lien.addEventListener("click" , () => {
            console.log(lien);

            window.location = `product.html?${lien.id}`
        })
        )
        };

        canapDisplay()    
       
       
          
          
          
          






    
   












