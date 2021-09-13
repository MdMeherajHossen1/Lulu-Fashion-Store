const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {  
   const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
                       <div>
                         <img class="product-image" src=${image}></img>
                       </div>
                            <h3>${product.title}</h3>
                            <p>Category: ${product.category}</p>
                            <p> <P>Total Rating: ${product.rating.rate}</P> 
                            <P> Total Count: ${product.rating.count} </p>
                            <h2>Price: $ ${product.price}</h2>
                        <div class="product-footer"> 
                           <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
                           <button id="details-btn" onclick="loadDetails(${product.id})" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
                        </div>
                      </div>`;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.abs(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.abs(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};

// display products details
const loadDetails = async data => {
  
  const url = `https://fakestoreapi.com/products/${data}`;
  const res = await fetch(url);
  const product = await res.json();
  console.log(product)
   displayProductDetails(product);
}

const displayProductDetails = product => {
  const detailsDiv  = document.getElementById('details');
  detailsDiv.innerHTML = '';
  const div = document.createElement("div");
  div.classList.add('details')
    div.classList.add("product");
    div.innerHTML = `<div >
                        <h3>${product.title}</h3>
                        <p>Category: ${product.category}</p>
                        <p> Description: ${product.description}
                        <button onclick="clearDetails()" class="btn btn-danger  ">Closed Details</button>
                      </div>`;
      detailsDiv.appendChild(div)
}
const clearDetails = () => {
  location.reload();
}
