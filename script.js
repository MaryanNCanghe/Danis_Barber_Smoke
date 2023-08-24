
//Mantem a navbar transparente//
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
        menuLi.forEach(sec => sec.classList.remove("active"));
        menuLi[len].classList.add("active");
    } 

    activeMenu();
    window.addEventListener("scroll",activeMenu);

    //sticky menu//////////////////////////////////////////////////////////////////////////////////
    const header = document.querySelector("header");
    window.addEventListener("scroll",function(){
        header.classList.toggle("sticky",this.window.scrollY > 5);
    })

    //nav-list open 768px//toogle icon navbar/////////////////////////////////////////////////////
    let menuIcon = document.querySelector("#menu-icon");
    let navlist = document.querySelector(".navlist");

    menuIcon.onclick = ()=>{
        menuIcon.classList.toggle("fa-xmark");
        navlist.classList.toggle("open");
    }

    window.onscroll = ()=>{
        menuIcon.classList.remove("fa-xmark");
        navlist.classList.remove("open");
    }

    //SWIPER HOME HEAD IMAGENS////////////////////////////////////////////////////////////////////////
    var swiper = new Swiper(".home-slider", {
      spaceBetween: 30,
      effect: "fade",
      grabCursor:true,
      loop:true,
      centeredSlide:true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });

    ///cortes home slide////// feature section/////galerry///////////////////////77777777777777777777777777777777777777777777
    var swiper = new Swiper(".feature-slider", {
        spaceBetween: 30,
        grabCursor:true,
        loop:true,
        centeredSlide:true,
        autoplay: {
          delay: 400,
          disableOnInteraction: false,
        },
       
        breakpoints: {
            0:{
                slidesPerView:1,
            },
            768:{
                slidesPerView:3,
            },
            991:{
                slidesPerView:4,
            },
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
          }
      });


      ////product container shop arrow index////////////////////////////////

      const productContainers = [...document.querySelectorAll('.product-container')];
      const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
      const preBtn = [...document.querySelectorAll('.pre-btn')];

      productContainers.forEach((item, i) => {
        let containerDimenstioons = item.getBoundingClientRect();
        let  containerWidth = containerDimenstioons.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft +=  containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -=  containerWidth;
        })
      });

    //product  detail images responsive//////////////////////////////////////////

    var swiper = new Swiper(".product-details", {
        spaceBetween: 30,
        effect: "fade",
        grabCursor:true,
        loop:true,
        centeredSlide:true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
      });


//CART //////////////////////////////////////////////////////////////////////
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector('#close-cart');

//open cart
cartIcon.onclick = () =>{
    cart.classList.add("active-2")
};

//close cart
closeCart.onclick = () =>{
    cart.classList.remove("active-2")
};



    //CARt working///////////////////////////////////////////////////////////////////
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else {
ready();
}

//Makingk function////////////////////////////////////
function ready() {
    //remove item from cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons [i];
        button.addEventListener("click", removeCartItem);
    }
    //quANTITY changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input =  quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //ADD TO CART
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++){
     var button = addCart[i];
     button.addEventListener("click", addCartClicked);
    }
    //buy work
    document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked);
}
   //buy button
   function buyButtonClicked(){
    alert('será agora redirecionado para uma área de pagamento');
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
   }



//funcion remove items from cart///
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItems();
}

//quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItems();
}
//add  to cart /////
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
    saveCartItems();
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
      if (cartItemsNames[i].innerText == title) {
       alert("já adcionaste este intem ao carrinho");
       return;
    }  
}
 var cartBoxContent = `
 <img src="${productImg}" alt="" class="cart-img">
  <div class="detail-box">
     <div class="cart-product-title">${title}</div>
     <div class="cart-price">${price}</div>
     <input type="number" value="1" class="cart-quantity">
 </div>
 <!--remove cart------->
 <i class="fa-regular fa-square-minus cart-remove"></i>`;
 cartShopBox.innerHTML = cartBoxContent;
 cartItems.append(cartShopBox);
 cartShopBox
 .getElementsByClassName("cart-remove")[0]
 .addEventListener("click", removeCartItem);
 cartShopBox
 .getElementsByClassName("cart-quantity")[0]
 .addEventListener("change", quantityChanged);
 saveCartItems();
}


//update total///
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("€", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

        //if price contain some cents value
        total = Math.round(total * 100) /100;

        document.getElementsByClassName("total-price")[0].innerText = "€" + total;

        //save price local storage
        localStorage.setItem("cartTotal", total);
    }



    //MANTER ITEM NO CARRO APOS O REFRESH

    function saveCartItems () {
      var cartContent = document.getElementsByClassName("cart-content")[0];
      var cartBoxes = cartContent.getElementsByTagName("cart-box");
      var cartItems = [];

      for (var i=0; i< cartBoxes.length; i++) {
         cartBox = cartBoxes[i];
         var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
         var priceElement = cart.getElementsByClassName("cart-price")[0];
         var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
         var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

         var item = {
          title: titleElement.innerText,
          price: priceElement.innerText,
          quantity: quantityElement.value,
          productImg: productImg,
         };
         cartItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }

    //load in cart
    function loadCartItems (){
        var cart = localStorage.getElementsByClassName("cartItems");
        if (cartItems) {
            cartItems = JSON.parse(cartItems);

            for (var i= 0; i < cartItems.length; i++) {
                var item = cartItems[i];
                addProductToCart(item.tittle, item.price, item.productImg);

                var cartBoxes = document.getElementsByClassName("carrt-box");
                var cartBox = cartBoxes[cartBoxes.length-1];
                var quantityElement = cartBox.getElementsByName("cart-quantity")[0];
                quantityElement.value =item.quantity;
            
        }

    }
}