
function renderProduct(productArr){
    productArr.forEach(function(item){
        let newDiv = document.createElement("div");
        newDiv.classList.add('item');
        newDiv.dataset.id = item.id;
        newDiv.innerHTML=`
            <img class="productImg" src="${item.img}" />
            <div class="title">${item.name}</div>
            <div class="price">${item.price}</div>
            <div class="productDesc">${item.desc}</div>
            <button onclick="addToCart(${item.id})">Add to cart</button>
        `;
        list.appendChild(newDiv);
    });
    return productArr;
}




function addToCart(id){

    let position = cart.findIndex((value)=> value.id==id)
    if(cart.length <= 0)
    {
        cart = [{
            id : id,
            quantity : 1
        }]
    }
    else if(position < 0){
        cart.push({
            id:id,
            quantity:1
        })
    }
    else{
        cart[position].quantity = cart[position].quantity + 1;
    }
    
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartToHTML = () => {
    listCard.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length>0){
        cart.forEach(cart =>{
           totalQuantity = totalQuantity + cart.quantity;
           let newCart = document.createElement("div");
           let positionProduct = products.findIndex((value) => value.id == cart.id);
           let info = products[positionProduct];
           newCart.classList.add("item");
           newCart.dataset.id = cart.id;
           newCart.innerHTML = `
            <div class="image">
                <img src="${info.img}" alt="" />
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">
                ${info.price * cart.quantity}
            </div>
            <div class="quantity">
                <span class="minus" >-</span>
                <span>${cart.quantity}</span>
                <span class="plus">+</span>
                <span class="delete">X</span>
            </div>
           `;
        listCard.appendChild(newCart);
        
        })
        
        
    }

    
    
    
    
   reloadCard();
    
    
    // total.innerText = totalPrice.toLocaleString();
    totalQuantityIcon.innerText = totalQuantity;
}

function reloadCard(){
    let totalPrice = 0;
    let eachPrice =0;
    // if(cart.length>0){
    //     cart.forEach(cart =>{
    //        let positionProduct = products.findIndex((value) => value.id == cart.id);
    //        let info = products[positionProduct];
    //         if(cart.length = 1) 
    //         {
    //             eachPrice = info.price * cart.quantity;
           
    //             totalPrice = eachPrice;
    //         }
    //         else{

    //         }
            
    //     })
    //     total.innerText = totalPrice.toLocaleString();
    // }
    for(let i = 0 ; i < cart.length ; i++){
        let positionProduct = products.findIndex((value) => value.id == cart[i].id);
        let info = products[positionProduct];
        eachPrice = info.price * cart[i].quantity;
        totalPrice = totalPrice + eachPrice;
    }
    total.innerText = totalPrice.toLocaleString();
}

const changeQuantity = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            case 'delete':
                cart.splice(positionItemInCart, 1);
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

function reset(){
    cart = [];
    localStorage.clear();
    window.location.reload();
}
