let allProducts = [];

async function fetchProducts() {
  const url =
    "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json";

  try {
    const res = await fetch(url);
    const data = await res.json();

    allProducts = data;
    displayProducts(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayProducts(products) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  products.forEach((product) => {
    const price = (product.priceCents / 100).toFixed(2);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="">
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <p class="price">$${price}</p>
      <button>Add to Cart</button>
    `;

    grid.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...allProducts];

  // 🔍 SEARCH
  const searchValue = document.getElementById("search").value.toLowerCase();
  if (searchValue) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchValue),
    );
  }

  const filterValue = document.getElementById("filter").value;
  if (filterValue) {
    const [min, max] = filterValue.split("-").map(Number);

    filtered = filtered.filter((p) => {
      const price = p.priceCents / 100;
      return max ? price >= min && price <= max : price >= min;
    });
  }

  const sortValue = document.getElementById("sort").value;
  if (sortValue === "low") {
    filtered.sort((a, b) => a.priceCents - b.priceCents);
  } else if (sortValue === "high") {
    filtered.sort((a, b) => b.priceCents - a.priceCents);
  }

  displayProducts(filtered);
}

// EVENT LISTENERS
document.getElementById("search").addEventListener("input", applyFilters);
document.getElementById("sort").addEventListener("change", applyFilters);
document.getElementById("filter").addEventListener("change", applyFilters);

fetchProducts();
