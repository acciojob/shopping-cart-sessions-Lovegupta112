// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];


// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn=document.getElementById('clear-cart-btn');

let carts=JSON.parse(sessionStorage.getItem('carts')) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
}
clearCartBtn.addEventListener('click',clearCart);

// Render cart list
function renderCart() {
 if(carts){
  cartList.innerHTML="";
  carts.forEach((product)=>{
    const li=document.createElement('li');
    li.innerHTML=`${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}" onclick="removeFromCart(${product.id})">Remove from Cart</button>`;
    cartList.appendChild(li);
  })
 }else{
  cartList.innerHTML="";
 }
}


// Add item to cart
function addToCart(productId) {

 let product=products.find((product)=>{
    if(product.id==productId)
       return product;
  })
  carts.push(product);
  sessionStorage.setItem('carts',JSON.stringify(carts));
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
// console.log(productId)
if(carts){
     carts=carts.filter((product)=>{
        if(product.id!=productId)
        return product;
 })
 renderCart();
 sessionStorage.setItem('carts',JSON.stringify(carts));
}
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem('carts');
  carts=[];
  renderCart();
}

// Initial render
renderProducts();
renderCart();
