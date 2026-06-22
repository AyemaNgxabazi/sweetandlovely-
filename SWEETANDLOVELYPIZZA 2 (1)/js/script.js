// ===============================
// CART SYSTEM
// ===============================

// Load cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price) {
    price = Number(price);

    // check if item already exists
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    saveCart();
    alert(`${name} added to order 🛒`);
}

// Attach click events to all "Add To Order" buttons
document.querySelectorAll(".add-to-order").forEach(button => {
    button.addEventListener("click", () => {
        let name = button.dataset.name;
        let price = button.dataset.price;

        addToCart(name, price);
    });
});


// ===============================
// OPTIONAL: SHOW CART COUNT (if you want later)
// ===============================
function getCartCount() {
    return cart.reduce((total, item) => total + item.qty, 0);
}


// ===============================
// DARK MODE TOGGLE
// ===============================

const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {
    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // save preference
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            darkBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            darkBtn.textContent = "🌙";
        }
    });
}

// Load saved theme on refresh
window.addEventListener("load", () => {
    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        if (darkBtn) darkBtn.textContent = "☀️";
    }
});


// ===============================
// BACK TO TOP BUTTON
// ===============================

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });
}
// ===============================
// CHECKOUT PAGE CART DISPLAY
// ===============================

if (document.getElementById("orderList")) {

    const orderList = document.getElementById("orderList");
    const orderTotal = document.getElementById("orderTotal");

    function renderCart() {

        orderList.innerHTML = "";

        if (cart.length === 0) {
            orderList.innerHTML = "<li>Your cart is empty.</li>";
            orderTotal.textContent = "0";
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {

            total += item.price * item.qty;

            const li = document.createElement("li");

            li.innerHTML = `
                ${item.name} x ${item.qty}
                - R${item.price * item.qty}
                <button type="button"
                        class="remove-btn"
                        data-index="${index}">
                    Remove
                </button>
            `;

            orderList.appendChild(li);
        });

        orderTotal.textContent = total;
    }

    renderCart();

    orderList.addEventListener("click", function (e) {

        if (e.target.classList.contains("remove-btn")) {

            const index = e.target.dataset.index;

            cart.splice(index, 1);

            saveCart();

            renderCart();
        }
    });
}
const clearCartBtn = document.getElementById("clearCartBtn");

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {

        if (confirm("Are you sure you want to clear your cart?")) {

           cart = [];

saveCart();

alert("Cart cleared successfully.");

window.location.href = "index.html";
        }
    });
}
// ===============================
// CHECKOUT FORM SUBMISSION
// ===============================

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const response = document.getElementById("checkoutResponse");

        const orderNumber = "SLP" + Math.floor(Math.random() * 100000);

        response.innerHTML =
            `✅ Order placed successfully!<br>
             Order Number: <strong>${orderNumber}</strong><br>
             We will contact you shortly.`;

        // Clear cart
        cart = [];
        saveCart();

        // Refresh cart display if checkout page is open
        setTimeout(() => {
    window.location.href = "index.html";
}, 3000);

        // Clear form fields
        checkoutForm.reset();
    });

}