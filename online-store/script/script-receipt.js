/* Rodrigo Barba - Shinia */
document.addEventListener("DOMContentLoaded", () => {
    const cartData = localStorage.getItem("data-cart");
    const listGroup = document.querySelector(".list-group");
    const footerLeft = document.getElementById("footer-left");
    const footerRight = document.getElementById("footer-right");
  
    if (!cartData || !listGroup) return;
  
    const cart = JSON.parse(cartData);
    let totalAmount = 0;
  
    cart.forEach(({ product, quantity }) => {
      const listItem = document.createElement("a");
      listItem.href = "#";
      listItem.className = "list-group-item list-group-item-action";
      
      const itemTotal = product.price * quantity;
      totalAmount += itemTotal;
  
      listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${product.name}</h5>
          <small>ID: ${product.id}</small>
        </div>
        <p class="mb-1">Cantidad: ${quantity}</p>
        <small>Precio unitario: $${product.price.toFixed(2)}</small><br>
        <small>Total: $${itemTotal.toFixed(2)}</small>
      `;
  
      listGroup.appendChild(listItem);
    });
  
    // Fecha actual formateada
    const date = new Date();
    const formattedDate = date.toLocaleDateString("es-ES");
  
    footerLeft.innerHTML = `<p>Fecha: ${formattedDate}</p>`;
    footerRight.innerHTML = `
      <p>
        <i class="fa-solid fa-money-bill" style="padding-right: 10px"></i>
        Total: $${totalAmount.toFixed(2)}
      </p>
      <div style="margin-top: 10px;">
        <button id="clear-cart" class="btn btn-danger btn-sm" style="margin-right: 5px;">
          <i class="fa-solid fa-trash"></i> Limpiar Carrito
        </button>
        <button id="print-receipt" class="btn btn-success btn-sm">
          <i class="fa-solid fa-print"></i> Imprimir Recibo
        </button>
      </div>
    `;
  
    // Función para limpiar el carrito
    document.getElementById("clear-cart").addEventListener("click", () => {
      if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem("data-cart");
        location.reload();
      }
    });
  
    // Función para imprimir el recibo
    document.getElementById("print-receipt").addEventListener("click", () => {
      window.print();
    });
  });
  