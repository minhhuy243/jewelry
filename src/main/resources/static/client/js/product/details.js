function renderProductDetails(product) {
    document.title = product.name + ' ' + product.sku + ' - BLUX';

    $('.detail-page-slider-for')
        .slick('slickAdd',
            `<div class='slide-item'>
                    <div class='product-zoom-image'>
                        <img src='https://drive.google.com/uc?export=view&id=${product.avatar}' alt='image'>
                    </div>
                </div>`);

    $('.detail-page-slider-nav')
        .slick('slickAdd',
            `<div class='slide-item'>
                    <a href='javascript:void(0)'>
                        <img src='https://drive.google.com/uc?export=view&id=${product.avatar}' class='full-width' alt='image'>
                    </a>
                </div>`);

    product.images.forEach((image) => {
        $('.detail-page-slider-for')
            .slick('slickAdd',
                `<div class='slide-item'>
                    <div class='product-zoom-image'>
                        <img src='https://drive.google.com/uc?export=view&id=${image}' alt='image'>
                    </div>
                </div>`);

        $('.detail-page-slider-nav')
            .slick('slickAdd',
                `<div class='slide-item'>
                    <a href='javascript:void(0)'>
                        <img src='https://drive.google.com/uc?export=view&id=${image}' class='full-width' alt='image'>
                    </a>
                </div>`);
    });

    $('.shop-detail-title > h3').text(product.name + ' ' + product.sku);

    $('#sku').text(product.sku);

    $('#category > a').text(product.categoryName).css('href', '#');

    $('.product-price').text((product.price * 1000).toLocaleString("it-IT") + 'đ');

    $('#tab-desc').append(product.description);

    $('#goldWeight').append('<td>' + product.goldWeight + '</td>');

    $('#goldType').append('<td>' + product.goldTypePercentage + '</td>');


    if(product.inStock) {
        $('.shop-button-box').append(`<a href="javascript:void(0)" class="btn-custom primary">Thêm Vào Giỏ Hàng</a>`);
    } else {
        $('.shop-button-box').append(`<a href="javascript:void(0)" class="btn-custom out-of-stock">Hết Hàng</a>`);
    }

}