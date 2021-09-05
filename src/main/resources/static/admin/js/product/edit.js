function renderImageGallery(image) {
    return `<div class="col-12 col-sm-4 col-md-4 mb-3 mb-lg-5">
                            <div class="card card-sm">
                                <img class="card-img-top" src="https://drive.google.com/uc?export=view&id=${image}" alt="Image Description">

                                <div class="card-body">
                                    <div class="row text-center">
                                        <div class="col">
                                            <a class="js-fancybox-item text-body" href="javascript:;" data-toggle="tooltip" data-placement="top" title="View" 
                                                data-src="https://drive.google.com/uc?export=view&id=${image}" data-caption="Image #01">
                                                <i class="tio-visible-outlined"></i>
                                            </a>
                                        </div>

                                        <div class="col column-divider">
                                            <a data-image="${image}" class="text-danger" href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="Delete">
                                                <i class="tio-delete-outlined"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
}

function renderAvatar(avatar) {
    return `<div class="col-12 col-sm-4 col-md-12 mb-3 mb-lg-5">
                            <div class="card card-sm">
                                <img class="card-img-top" src="https://drive.google.com/uc?export=view&id=${avatar}" alt="Image Description">

                                <div class="card-body">
                                    <div class="row text-center">
                                        <div class="col">
                                            <a class="js-fancybox-item text-body" href="javascript:;" data-toggle="tooltip" data-placement="top" title="View" 
                                                data-src="https://drive.google.com/uc?export=view&id=${avatar}" data-caption="Image #01">
                                                <i class="tio-visible-outlined"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
}

async function getProductInfoApi() {
    const id = pathArray.slice(-1);
    const url = baseUrl + `/products/${id}`;
    const token = localStorage.getItem("access_token");

    await axios.get(url, {headers: {"Authorization": `Bearer ${token}`}})
        .then((res) => {
            const product = res.data.content;
            $('#sku').text(product.sku).val(product.sku).css('cursor', 'not-allowed');
            $('#name').val(product.name);
            $('#goldWeight').val(product.goldWeight);
            $('#quantity').val(product.quantity);
            $('#costPrice').val(product.costPrice);
            $('#price').val(product.price);
            $('#categoryCode').val(product.categoryCode).trigger('change.select2');
            $('#goldType').val(product.goldTypePercentage).trigger('change.select2');
            $('#supplierCode').val(product.supplierCode).trigger('change.select2');

            $('#avatar').html(renderAvatar(product.avatar));

            let imageHtml = product.images.map((image) => {
                return renderImageGallery(image);
            }).join(' ');
            $('#imageGallery').html(imageHtml);
            localStorage.setItem('images', JSON.stringify(product.images));
        })
        .catch((error) => {

        });
}
