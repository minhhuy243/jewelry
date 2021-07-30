function renderProduct(product) {
    return `<div class="col-md-4">
        <div class="product">
            <div class="product-thumbnail">
                <a href="product-details-v1.html"><img src="/client/img/products/1.jpg" alt="product"></a>
                <div class="product-badges">
                    <span class="product-badge featured"> <i class="fas fa-star"></i> </span>
                    <span class="product-badge stock"> Out of Stock</span>
                </div>
                <div class="product-controls">
                    <a href="#" class="favorite"><i class="far fa-heart"></i></a>
                    <a href="#" class="compare"><i class="fas fa-sync-alt"></i></a>
                    <a href="#" data-toggle="modal" data-target="#quickViewModal" class="quick-view"><i class="fas fa-eye"></i></a>
                </div>
            </div>
            <div class="product-body">
                <h5 class="product-title"> <a href="product-details-v1.html" title="Blue Blast">${product.name}</a> </h5>
                <div class="acr-rating">
                    <i class="fas fa-star active"></i>
                    <i class="fas fa-star active"></i>
                    <i class="fas fa-star active"></i>
                    <i class="fas fa-star active"></i>
                    <i class="fas fa-star-half-alt active"></i>
                </div>
                <span class="product-price">3,500$ <span>4,200$</span> </span>
                <p class="product-text">${product.description}</p>
                <div class="product-gallery-wrapper">
                    <a href="product-details-v1.html" class="btn-custom btn-sm secondary">Add to Cart</a>
                    <a href="#" data-toggle="tooltip" title="Gallery" class="product-gallery"> <i class="fas fa-camera"></i> </a>
                </div>
            </div>
        </div>
    </div>`
}