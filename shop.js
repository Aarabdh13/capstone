async function fetchProducts() {
  const url =
    "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json";

  try {
    const res = await fetch(url);
    const data = await res.json();

    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";

    data.forEach((product) => {
      const price = (product.priceCents / 100).toFixed(2);

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${product.image}" alt="">
        <h3>${product.name}</h3>
        <p><b>Category:</b> ${product.category}</p>
        <p class="price">$${price}</p>
        <button>Add to Cart</button>
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchProducts();
