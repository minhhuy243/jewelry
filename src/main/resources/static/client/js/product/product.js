function renderProduct(product) {
    return `<div class="col-md-4">
        <div class="product">
            <div class="product-thumbnail">
                <a href="${product.categorySlug + '/' + product.slug}">
                    <img title="${product.name + ' ' + product.sku}" 
                        src="https://drive.google.com/uc?export=view&id=${product.avatar}" 
                        alt="${product.name + ' ' + product.sku}">
                </a>
                <div class="product-badges">
                    <span class="product-badge featured"> <i class="fas fa-star"></i> </span>
                    ${product.inStock === true ? "" : "<span class=\"product-badge stock\">Hết Hàng</span>"}
                </div>
                <div class="product-controls">
                    <a href="#" data-toggle="modal" data-target="#quickViewModal" class="quick-view"><i class="fas fa-eye"></i></a>
                    <a href="#" class="favorite"><i class="far fa-heart"></i></a>               
                </div>
<!--                <div class="product-cart">-->
<!--                    <a href="product-details-v1.html" class="btn-custom btn-sm secondary">Thêm vào giỏ hàng</a>-->
<!--                </div>-->
            </div>
            <div class="product-body">
                <h5 class="product-title"> 
                    <a href="${product.categorySlug + '/' + product.slug}" title="${product.name + ' ' + product.sku}">
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
                    <a class="page-link">${page} <span class="sr-only">(current)</span></a>
                </li>`;
    }

    return `<li class="page-item"><a class="page-link" href="?page=${page}">${page}</a></li>`;
}

function renderPagination(totalPages, currentPage) {
    let html = "";
    if(currentPage > 1) {
        html += `<li class="page-item"><a class="page-link" href="?page=${currentPage - 1}"> <i class="fas fa-chevron-left"></i> </a></li>`;
    }

    if(totalPages <= 5) {
        for(let i = 1; i <= totalPages; i++) {
            html += isCurrentPage(i, currentPage);
        }
    } else {
        if(currentPage <= 3){
            for(let i = 1; i <= 5; i++) {
                html += isCurrentPage(i, currentPage);
            }
        }
        else if(currentPage > 3 && currentPage < totalPages - 2) {
            for(let i = currentPage - 2; i <= currentPage + 2; i++) {
                html += isCurrentPage(i, currentPage);
            }
        } else {
            if(currentPage >= totalPages - 2) {
                for(let i = totalPages - 4; i <= totalPages; i++) {
                    html += isCurrentPage(i, currentPage);
                }
            } else {
                for(let i = currentPage - 2; i <= totalPages; i++) {
                    html += isCurrentPage(i, currentPage);
                }
            }
        }
    }

    if(currentPage < totalPages) {
        html += `<li class="page-item"><a class="page-link" href="?page=${currentPage + 1}"> <i class="fas fa-chevron-right"></i> </a></li>`;
    }

    return html;
}

$(document).ready(async () => {
    const path = pathArray.slice(-1);
    let url;

    if(path.toString() === 'trang-suc') {
        url = '/products';
    } else if(path.toString() === 'search') {
        const searchCriteria = encodeURIComponent(`{"keys":["name","sku"],"value":"${urlParams.get('q')}"}`);
        url = `/products?searchCriteria=${searchCriteria}`;
        $('#searchInput').val(urlParams.get('q')); // gán text lại cho input search
        $('#products').parent()
            .prepend(`<p>Kết quả tìm kiếm cho từ khóa '<span style="font-weight: 600">${urlParams.get('q')}</span>'</p>`);
    } else {
        url = `/products/categories/${path}`;
    }

    // Get products
    await axios.get(baseUrl + url, {
        params: {
            page: urlParams.get('page')
        }
    }).then((res) => {
        let products = res.data.elements.map((product) => {
            return renderProduct(product);
        }).join(' ');
        $('#products').html(products);

        let pagination = renderPagination(res.data.totalPages, res.data.currentPage);
        $('#pagination').html(pagination);
    });


    // Get category
    // await axios.get(baseUrl + '/categories').then((res) => {
    //     let categoryHtml = res.data.map((category) => {
    //         return `<option value="${category.name}">${category.name}</option>`;
    //     }).join(' ');
    //
    //     $('#categoryFilter').append(categoryHtml);
    // });
});