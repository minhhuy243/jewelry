function renderProduct(product) {
    return `<div class="col-md-4">
        <div class="product">
            <div class="product-thumbnail">
                <a href="product-details-v1.html"><img src="https://drive.google.com/uc?export=view&id=1fk-eW228ajPTsVmbZkV3WczjrryykKoO" alt="product"></a>
                <div class="product-badges">
                    <span class="product-badge featured"> <i class="fas fa-star"></i> </span>
                </div>
                <div class="product-controls">
                    <a href="#" data-toggle="modal" data-target="#quickViewModal" class="quick-view"><i class="fas fa-eye"></i></a>
                    <a href="#" class="favorite"><i class="far fa-heart"></i></a>
                    <a href="#" class="compare"><i class="fas fa-shopping-cart"></i></a>
                </div>
            </div>
            <div class="product-body">
                <h5 class="product-title"> 
                    <a href="product-details-v1.html" title="Blue Blast">
                        ${product.name}
                        <br>
                        ${product.sku}
                    </a> 
                </h5>              
                <span class="product-price">${(product.price * 1000).toLocaleString("it-IT")}đ</span>
            </div>
        </div>
    </div>`;
}

function isCurrentPage(page, currentPage) {
    if(page === currentPage) {
        return `<li class="page-item active">
                    <a class="page-link" href="#">${page} <span class="sr-only">(current)</span></a>
                </li>`;
    }

    return `<li class="page-item"><a class="page-link" href="#">${page}</a></li>`;
}

function renderPagination(totalPages, currentPage) {
    let html = "";
    if(currentPage > 1) {
        html += `<li class="page-item"><a class="page-link" href="#"> <i class="fas fa-chevron-left"></i> </a></li>`;
    }

    if(totalPages <= 5) {
        for(let i = 1; i <= totalPages; i++) {
            html += isCurrentPage(i, currentPage);
        }
    } else {
        if(currentPage > 3 && currentPage < totalPages - 2) {
            for(let i = currentPage - 2; i <= currentPage + 2; i++) {
                html += isCurrentPage(i, currentPage);
            }
        } else {
            for(let i = currentPage - 2; i <= totalPages; i++) {
                html += isCurrentPage(i, currentPage);
            }
        }
    }

    if(currentPage < totalPages) {
        html += `<li class="page-item"><a class="page-link" href="#"> <i class="fas fa-chevron-right"></i> </a></li>`;
    }

    return html;
}