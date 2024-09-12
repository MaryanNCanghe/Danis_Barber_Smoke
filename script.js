
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


// CART //////////////////////////////////////////////////////////////////////
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector('#close-cart');

// Cart counter initialization
let itemCount = 0;

// Open cart
cartIcon.onclick = () => {
    cart.classList.add("active-2");
};

// Close cart
closeCart.onclick = () => {
    cart.classList.remove("active-2");
};

// CART working ///////////////////////////////////////////////////////////////////
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Making functions ////////////////////////////////////
function ready() {
    // Remove item from cart
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // Quantity changes
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add to cart
    let addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    // Buy button
    document.getElementsByClassName('btn-buy')[0]
        .addEventListener('click', buyButtonClicked);

    // Load saved cart items from localStorage
    loadCartItems();
}

// Buy button functionality
function buyButtonClicked() {
    alert('Será agora redirecionado para uma área de pagamento.');
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
    itemCount = 0; // Reset item count after purchase
    updateCartCount();
    saveCartItems();
}

// Remove items from cart
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    itemCount--; // Decrease item count
    updateCartCount();
    updatetotal();
    saveCartItems();
}

// Quantity changes
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItems();
}

// Add to cart functionality
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
    itemCount++; // Increment item count
    updateCartCount();
    saveCartItems();
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("Já adicionaste este item ao carrinho.");
            return;
        }
    }

    let cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="fa-regular fa-square-minus cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Add event listeners to new elements
    cartShopBox.getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}

// Update total price
function updatetotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("€", ""));
        let quantity = quantityElement.value;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100; // If price contains some cents
    document.getElementsByClassName("total-price")[0].innerText = "€" + total;

    // Save total to localStorage
    localStorage.setItem("cartTotal", total);
}

// Save cart items to localStorage
function saveCartItems() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let cartItems = [];

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let productImg = cartBox.getElementsByClassName("cart-img")[0].src;

        let item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg
        };

        cartItems.push(item);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Load saved cart items
function loadCartItems() {
    let cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (let i = 0; i < cartItems.length; i++) {
            let item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            let cartBoxes = document.getElementsByClassName("cart-box");
            let cartBox = cartBoxes[cartBoxes.length - 1];
            let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantityElement.value = item.quantity;

            // Update item count to reflect the saved cart
            itemCount++;
        }
        updateCartCount();
    }

    // Load total price
    let total = localStorage.getItem("cartTotal");
    if (total) {
        document.getElementsByClassName("total-price")[0].innerText = "€" + total;
    }
}

// Update cart counter
function updateCartCount() {
    let cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = itemCount;
}
