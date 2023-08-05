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
                    <div class="col-md-4">
                        <div class="card m-2">
                            <img src="${product.image}" class="card-img-top" alt="Product Image">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.description}</p>
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