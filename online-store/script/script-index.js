/* Rodrigo Barba - Shinia */
// Arreglo de productos en el cart
const cart = [];

document.addEventListener("DOMContentLoaded", function () {
  // Productos del catálogo: Equipos y servicios de mantenimiento
  const productList = [
    {
      id: 1,
      image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/desktop-1834294_1280.jpg",
      name: "Computadora de Escritorio Intel i5",
      description: "Equipo de escritorio con procesador Intel Core i5, 8GB RAM, 500GB SSD. Ideal para oficina y hogar.",
      price: 549.99,
    },
    {
      id: 2,
      image: "https://cdn.pixabay.com/photo/2014/05/02/21/50/laptop-336371_1280.jpg",
      name: "Laptop HP Ryzen 5",
      description: "Laptop portátil con procesador Ryzen 5, 16GB RAM, 1TB SSD. Excelente para trabajo remoto.",
      price: 749.99,
    },
    {
      id: 3,
      image: "https://cdn.pixabay.com/photo/2017/01/17/10/25/keyboard-1983864_1280.jpg",
      name: "Kit Teclado y Mouse Inalámbrico",
      description: "Set ergonómico inalámbrico de teclado y mouse con batería recargable.",
      price: 39.99,
    },
    {
      id: 4,
      image: "https://cdn.pixabay.com/photo/2018/08/06/08/56/pc-3581878_1280.jpg",
      name: "Servicio de Mantenimiento Preventivo",
      description: "Limpieza interna, revisión de hardware, y optimización de sistema operativo.",
      price: 19.99,
    },
    {
      id: 5,
      image: "https://cdn.pixabay.com/photo/2017/05/10/00/29/computer-2302790_1280.jpg",
      name: "Instalación de Software y Drivers",
      description: "Instalación profesional de programas esenciales y drivers actualizados.",
      price: 14.99,
    },
    {
      id: 6,
      image: "https://cdn.pixabay.com/photo/2016/02/19/11/19/laptop-1205256_1280.jpg",
      name: "Diagnóstico y Reparación de Hardware",
      description: "Evaluación y reparación de fallas físicas: fuente, disco, RAM, tarjeta madre.",
      price: 29.99,
    },
  ];

  // Contenedores
  const productListContainer = document.getElementById("productList");
  const checkoutCartContainer = document.getElementById("checkoutCart");
  const totalCheckout = document.getElementById("totalCheckout");

  // Mostrar productos
  productList.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
      <div class="card card-custom neo-md rounded-md">
          <img src="${product.image}" class="card-img-top card-img-custom" alt="${product.name}">
          <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">Precio: $${product.price}</p>
              <div class="input-group">
                  <span class="input-group-btn">
                      <button type="button" class="btn btn-danger btn-number" data-type="minus" data-field="inputQuantity${product.id}">-</button>
                  </span>
                  <input type="text" id="inputQuantity${product.id}" class="form-control input-number" value="1" min="1" max="10">
                  <span class="input-group-btn">
                      <button type="button" class="btn btn-success btn-number" data-type="plus" data-field="inputQuantity${product.id}">+</button>
                  </span>
              </div>
              <button class="btn btn-primary add-to-cart" data-product-id="${product.id}" style="margin-top: 20px">Agregar al carrito</button>
          </div>
      </div>
    `;
    productListContainer.appendChild(card);

    const btnAdd = card.querySelector(".add-to-cart");
    btnAdd.addEventListener("click", function () {
      const quantity = parseInt(document.getElementById(`inputQuantity${product.id}`).value);
      if (quantity > 0) {
        addProduct(product, quantity);
      }
    });
  });

  // Agregar al carrito
  function addProduct(product, quantity) {
    const cartProduct = cart.find((item) => item.product.id === product.id);
    if (cartProduct) {
      cartProduct.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    updateCheckoutCart();
  }

  // Botones +/- cantidad
  const btnNumberButtons = document.querySelectorAll(".btn-number");
  btnNumberButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const fieldName = this.getAttribute("data-field");
      const type = this.getAttribute("data-type");
      const input = document.getElementById(fieldName);
      const currentVal = parseInt(input.value);

      if (!isNaN(currentVal)) {
        if (type === "minus" && currentVal > input.min) {
          input.value = currentVal - 1;
        } else if (type === "plus" && currentVal < input.max) {
          input.value = currentVal + 1;
        }
      }
    });
  });

  // Eliminar producto del carrito
  checkoutCartContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("btnDelete")) {
      const id = parseInt(e.target.dataset.productId);
      const index = cart.findIndex((item) => item.product.id === id);
      if (index > -1) {
        cart.splice(index, 1);
        updateCheckoutCart();
      }
    }
  });

  // Actualizar carrito
  function updateCheckoutCart() {
    checkoutCartContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.product.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.product.price}</td>
        <td>$${(item.product.price * item.quantity).toFixed(2)}</td>
        <td><button type="button" class="btn btn-danger btnDelete" data-product-id="${item.product.id}">Eliminar</button></td>
      `;
      checkoutCartContainer.appendChild(row);
      subtotal += item.product.price * item.quantity;
    });

    totalCheckout.textContent = `$${subtotal.toFixed(2)}`;
  }
});

// Botón de compra
const btnBuy = document.querySelector(".btn-comprar");
btnBuy.addEventListener("click", function () {
  if (cart.length > 0) {
    localStorage.removeItem("data-cart");
    const cartProducts = JSON.stringify(cart);
    localStorage.setItem("data-cart", cartProducts);
    window.location.href = "receipt.html";
  } else {
    alert("El carrito está vacío.");
  }
});
