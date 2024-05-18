const BASE_URL = "https://66337e2bf7d50bbd9b498fd5.mockapi.io/products";
let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let card = document.querySelector(".card");

let body = document.querySelector("body");
let total = document.querySelector(".total");

let totalQuantityIcon = document.querySelector(".quantity");
let products = [];
let cart = [];
openShopping.addEventListener('click',()=>{
    body.classList.add('active');
})

closeShopping.addEventListener('click',()=>{
    body.classList.remove('active');
})




function fetchProducts(){
    axios
    .get(BASE_URL)
    .then(function(response){
        products = response.data;
        renderProduct(response.data);
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    }).catch(function(error){
        console.log("error",error)
        
    });
}
fetchProducts()

listCard.addEventListener('click',(event)=>{
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') ||  positionClick.classList.contains('plus') || positionClick.classList.contains('delete') )
        {
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            let type = "minus";
            if(positionClick.classList.contains('plus')){
                type = "plus";
            }
            else if(positionClick.classList.contains('delete')){
                type = "delete";
                
            }
            changeQuantity(product_id,type);
        }

})

