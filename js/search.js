async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

async function searchProducts() {
    const searchTerm = document.getElementById('textInput').value;
    const products = await fetchProducts();
    const matchedProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    localStorage.setItem('searchResults', JSON.stringify(matchedProducts));
    window.location.href = 'search.html';
}
