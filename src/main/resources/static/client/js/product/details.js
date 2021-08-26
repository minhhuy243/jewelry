function renderProductDetails(product) {
    document.title = 'test';
    product.images.forEach((image) => {
        $('.detail-page-slider-for')
            .slick('slickAdd',
                `<div class="slide-item">
                    <div class="product-zoom-image">
                        <img src="https://drive.google.com/uc?export=view&id=${image}" alt="image">
                    </div>
                </div>`);

        $('.detail-page-slider-nav')
            .slick('slickAdd',
                `<div class="slide-item">
                    <a href="javascript:void(0)">
                        <img src="https://drive.google.com/uc?export=view&id=${image}" class="full-width" alt="image">
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
}