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

    await instance.get(`/admin/products/${id}`)
        .then((res) => {
            const product = res.data;
            $('#sku').text(product.sku).val(product.sku).css('cursor', 'not-allowed');
            $('#name').val(product.name);
            $('#goldWeight').val(product.goldWeight);
            $('#quantity').val(product.quantity);
            $('#costPrice').val(product.costPrice);
            $('#price').val(product.price);
            $('#categoryCode').val(product.categoryCode).trigger('change.select2');
            $('#goldType').val(product.goldTypePercentage).trigger('change.select2');
            $('#supplierCode').val(product.supplierCode).trigger('change.select2');
            $('.ql-editor').html(product.description);

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


$(async function () {
    // INITIALIZATION OF FANCYBOX
    // =======================================================
    $('.js-fancybox').each(function() {
        $.HSCore.components.HSFancyBox.init($(this));
    })

    localStorage.removeItem('images');
    localStorage.removeItem('imagesRemoved');
    localStorage.removeItem('cart');

    await instance.get("/admin/categories")
        .then((res) => {
            let categories = res.data.map((category) => {
                return renderCategory(category);
            }).join(' ');
            $('#categoryCode').append(categories);
    });

    await instance.get("/admin/gold-types")
        .then((res) => {
            let goldTypes = res.data.map((goldType) => {
                return renderGoldType(goldType);
            }).join(' ');
            $('#goldType').append(goldTypes);
        });

    await instance.get("/admin/suppliers")
        .then((res) => {
            let suppliers = res.data.map((supplier) => {
                return renderSupplier(supplier);
            }).join(' ');
            $('#supplierCode').append(suppliers);
        });

    await getProductInfoApi();
});

$(window).load(() => {
    const toastMessages = sessionStorage.getItem('toastMessages');
    if(toastMessages) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true
        });
        Toast.fire({
            icon: 'success',
            title: 'Cập nhật thành công'
        })
    }
    sessionStorage.removeItem('toastMessages');
})

$('#cancel').on('click', async (ee) => {
    ee.preventDefault();
    ee.stopPropagation();

    Swal.fire({
        title: 'Bạn có muốn hủy cập nhật?',
        showDenyButton: true,
        confirmButtonText: `Đồng ý`,
        denyButtonText: `Không`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            localStorage.removeItem('product_id');
            window.location = "/admin/products";
        } else if (result.isDenied) {

        }
    });

});

$('#submit').on('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    Swal.fire({
        title: 'Vui lòng đợi!',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const imagesDropzone = Dropzone.forElement('#images');
    const images = imagesDropzone.getQueuedFiles();

    const avatarDropzone = Dropzone.forElement('#newAvatar');
    const avatar = avatarDropzone.getQueuedFiles()[0];

    const dto = {
        sku: $('#sku').val(),
        name: $('#name').val(),
        description: $('.ql-editor').html(),
        goldWeight: $('#goldWeight').val(),
        costPrice: $('#costPrice').val(),
        price: $('#price').val(),
        quantity: $('#quantity').val(),
        supplierCode: $('#supplierCode').val(),
        categoryCode: $('#categoryCode').val(),
        goldType: $('#goldType').val(),
        images: null,
        avatar: null,
        imagesRemoved: JSON.parse(localStorage.getItem('imagesRemoved'))
    }

    const errors = validation(dto, 1);
    if(errors === null) {
        const formData = new FormData();

        formData.append('dto', new Blob([JSON.stringify(dto)], {type: "application/json"}));

        if(avatar != null) {
            formData.append('avatar', avatar);
        }

        if(images != null) {
            images.map((image) => {
                formData.append('images[]', image);
            });
        }

        await instance.put(`/admin/products/${pathArray.slice(-1)}`, formData)
            .then((res) => {
                if(res.status === 200) {
                    sessionStorage.setItem('toastMessages', true);
                    window.location.reload();
                }
        }).catch((error) => {
            const status = error.response.status;
            if(status === 500 || status === 400){
                Swal.fire({
                    icon: 'error',
                    title: 'Đã có lỗi xảy ra',
                    text: 'Vui lòng kiểm tra lại thông tin!',
                    confirmButtonColor: '#377dff',
                    confirmButtonText: 'Đồng ý!'
                });
                removeError();
                addErrorToMap(error.response.data.errors);
                renderError();
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Đã có lỗi xảy ra',
            text: 'Vui lòng kiểm tra lại thông tin!',
            showConfirmButton: true,
            confirmButtonColor: '#377dff',
            confirmButtonText: 'Đồng ý!',
            didOpen: () => {
                Swal.hideLoading();
            }
        });
        removeError();
        addErrorToMap(errors);
        renderError();
    }

});

$('body').on('click', '#imageGallery a[data-image]', function () {
    const imageId = $(this).data('image');
    const images = JSON.parse(localStorage.getItem('images'));
    const imagesFiltered = images.filter((image) => image !== imageId);
    let imageHtml = imagesFiltered.map((image) => {
        return renderImageGallery(image);
    }).join(' ');
    $('#imageGallery').html(imageHtml);
    localStorage.setItem('images', JSON.stringify(imagesFiltered));

    const imagesRemoved = localStorage.getItem('imagesRemoved')
        ? JSON.parse(localStorage.getItem('imagesRemoved')) : [];
    imagesRemoved.push(imageId);
    localStorage.setItem('imagesRemoved', JSON.stringify(imagesRemoved));
});
