$(function () {
    $('#articlesCarousel').owlCarousel({
        loop: true,
        margin: 32,
        nav: true,
        dots: true,
        autoplay: true,
        responsive:{
            0:{
                items: 1
            },
            480:{
                items: 2
            },
            667:{
                items: 3
            }
        }
    })
})

'use strict';

function toggleHeaderBg() {
    const header = document.querySelector('#header');
    const windowInnerWidth = document.documentElement.clientWidth;
    let pdBig = '63px';
    let pdSm = '20px';
    window.addEventListener('scroll', function() {
        if (pageYOffset >= 10 ) {
            header.classList.add('headerColored');
            header.style.paddingTop = pdSm;
            header.style.paddingBottom = pdSm;
        } 
        else {
            header.classList.remove('headerColored');
            if (windowInnerWidth >= 1024) {
                header.style.paddingTop = pdBig;
                header.style.paddingBottom = pdBig;
            } else {
                header.style.paddingTop = pdSm;
                header.style.paddingBottom = pdSm;
            }
        }
    });
}

toggleHeaderBg();

// Add burger menu
function addBurgerMenu() {
    const hamburgerBtn = document.querySelector('#hamburgerBtn');
    const nav = document.querySelector('#nav');
    function toggleMenu() {
        nav.classList.toggle('active');
        document.body.classList.toggle('hideScroll');
    }
    hamburgerBtn.addEventListener('pointerenter', toggleMenu);
}
addBurgerMenu();

// Action for buttons
function isLoginBtn() {
    const loginBtn = document.querySelector('#loginBtn');

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Login button'); 
    });
}
isLoginBtn();

function isEmailBtn() {
    const emailBtn = document.querySelector('#emailBtn');

    emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Email button'); 
    });
}
isEmailBtn();
    
function isBtn() {
    const addToCartBtn = document.querySelectorAll('.products__addBtn');
    const shareBtn = document.querySelectorAll('.products__shareBtn');
    const likeBtn = document.querySelectorAll('.products__likeBtn');
    
    addToCartBtn.forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Add to cart button');
        });
    });

    shareBtn.forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Share button');
        });
    });

    likeBtn.forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Like button'); 
        });
    });    
}

//download products
function downloadProducts() {
    const itemsBlock = document.querySelector('#itemsBlock');
    const showMoreBtn = document.querySelector('#showMoreBtn');
    const url = 'https://fakestoreapi.com/products';
    let num = 0;
    function createProductCard(products) {
        let block = '';
        let start = num > 0 ? 8 * num : num;
        let end = start + 8;
        if (end > products.length) {
            end = products.length;
            showMoreBtn.style.display = 'none';
        }
        for (let i = start; i < end; i++) {
            block += `<div class="products__item">
                <div class="products__imgBlok">
                    <img class="products__img" src="${products[i].image}" alt="product item">
                </div>
                <div class="products__textBlock">
                    <p class="products__name">${products[i].title}</p>
                    <p class="products__descr">${products[i].category}</p>
                    <div class="products__price">
                    <p class="products__price_new">$ ${products[i].price}</p>
                    </div>
                </div>
                <div class="products__actions">
                    <div class="products__btnWrap">
                    <button class="products__addBtn btn">Add to cart</button>
                    </div>
                    <div class="products__btnWrap">
                    <button class="products__shareBtn btn">
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 14C14.212 14 13.5 14.31 12.966 14.807L5.91 10.7C5.96 10.47 6 10.24 6 10C6 9.76 5.96 9.53 5.91 9.3L12.96 5.19C13.5 5.69 14.21 6 15 6C16.66 6 18 4.66 18 3C18 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 3.24 12.04 3.47 12.09 3.7L5.04 7.81C4.5 7.31 3.79 7 3 7C1.34 7 0 8.34 0 10C0 11.66 1.34 13 3 13C3.79 13 4.5 12.69 5.04 12.19L12.088 16.308C12.0317 16.5344 12.0022 16.7667 12 17C12 17.5933 12.1759 18.1734 12.5056 18.6667C12.8352 19.1601 13.3038 19.5446 13.8519 19.7716C14.4001 19.9987 15.0033 20.0581 15.5853 19.9424C16.1672 19.8266 16.7018 19.5409 17.1213 19.1213C17.5409 18.7018 17.8266 18.1672 17.9424 17.5853C18.0581 17.0033 17.9987 16.4001 17.7716 15.8519C17.5446 15.3038 17.1601 14.8352 16.6667 14.5056C16.1734 14.1759 15.5933 14 15 14Z" fill="white"/>
                        </svg>
                        Share
                    </button>
                    <button class="products__likeBtn btn">
                        <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9996 19.0542C-8 8.00003 5.99999 -3.99997 11.9996 3.58809C18 -3.99997 32 8.00003 11.9996 19.0542Z" stroke="white" stroke-width="1.8"/>
                        </svg>
                        Like
                    </button>
                    </div>
                </div>
            </div>`;
        }
        num++;
        itemsBlock.insertAdjacentHTML('beforeend', block);
    }

    fetch(url)
    .then((response) => {
        if (!response.ok) {
            console.log('The server is unavailable.');
        }
        return response.json();
    })
    .then(data => {
      let products = data;
      createProductCard(products);
      isBtn();
      showMoreBtn.addEventListener('click',()=> {
            createProductCard(products);
            isBtn();
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
downloadProducts();