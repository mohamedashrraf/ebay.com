//see all page
// Fetch product data from FakeStoreAPI
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    // Create product divs and append them to the allProducts containers
    const productsContainer = document.getElementById("allProducts");
    data.forEach((product, index) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("col-md-3", "mb-4"); // Use Bootstrap classes for responsive layout
      productDiv.style.background = "white";
      productDiv.style.border = "1px solid rgba(0, 0, 0, 0.175)";
      productDiv.style.outline = "8px solid #f8f8f8";

      const productName = document.createElement("h4");
      productName.textContent = product.title;

      const productPrice = document.createElement("p");
      productPrice.textContent = `Price: $${product.price}`;
      productPrice.style.fontWeight = "bold";

      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.title;
      productImage.classList.add("img-fluid", "productImg"); // Use Bootstrap class to make the image responsive
      productImage.style.width = "200px";
      productImage.style.height = "200px";



      // Append elements to the productDiv
      productDiv.appendChild(productName);
      productDiv.appendChild(productImage);
      productDiv.appendChild(productPrice);


      productsContainer.appendChild(productDiv);
    });
  })
  .catch((error) => console.error("Error fetching product data:", error));



//categories
document.addEventListener("DOMContentLoaded", function () {
  // استدعاء API للحصول على الفئات
  fetch("https://fakestoreapi.com/products/categories")
    .then(response => response.json())
    .then(categories => {
      var categoriesList = document.getElementById("categoriesList");

      // إنشاء الروابط لكل فئة
      categories.forEach(category => {
        var link = document.createElement("a");
        link.href = "categories.html?category=" + category;
        link.textContent = category;
        var listItem = document.createElement("div");
        listItem.appendChild(link);
        categoriesList.appendChild(listItem);
        link.style.color = "black";
        link.style.textDecoration = "none";
        link.style.margin = "0px 10px 0px 10px";
        link.style.display = "inline-block";
      });
    })
    .catch(error => console.error(error));
});

function getProductsByCategory(category) {
  // Call the API to get products associated with the selected category
  fetch("https://fakestoreapi.com/products/category/" + category)
    .then(response => response.json())
    .then(products => {
      displayProducts(products);
    })
    .catch(error => console.error(error));
}

function displayProducts(products) {
  var categoryProducts = document.getElementById("categoryProducts");
  categoryProducts.innerHTML = ""; // Clear previous products

  products.forEach(product => {
    var productCard = `
                    <div class="col-md-4" style=" outline:8px solid #f8f8f8; padding:10px">
                        <div class="card m-2 p-3">
                            <img src="${product.image}" class="card-img-top" alt="Product Image" style="width:200px; height:200px">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">Price: $${product.price}</p>
                            </div>
                        </div>
                    </div>
                `;
    categoryProducts.innerHTML += productCard;
  });
}

// Filter products based on price range and/or category
function filterProducts() {
  var priceMinFilter = parseFloat(document.getElementById("priceMinFilter").value);
  var priceMaxFilter = parseFloat(document.getElementById("priceMaxFilter").value);
  var categoryFilter = document.getElementById("categoryFilter").value.toLowerCase();

  // Filter products based on the selected criteria
  var filteredProducts = originalProducts.filter(product => {
    if (categoryFilter && categoryFilter !== "all" && product.category.toLowerCase() !== categoryFilter) {
      return false;
    }
    if (priceMinFilter && product.price < priceMinFilter) {
      return false;
    }
    if (priceMaxFilter && product.price > priceMaxFilter) {
      return false;
    }
    return true;
  });

  displayProducts(filteredProducts);
}

var originalProducts = []; // To store the original list of products

document.addEventListener("DOMContentLoaded", function () {
  // Fetch all products initially to keep the original list
  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(products => {
      originalProducts = products;
      displayProducts(products);
    })
    .catch(error => console.error(error));
});


