$(async function () {
    // const token = localStorage.getItem("access_token");
    // const headers = {headers: {"Authorization": `Bearer ${token}`}};

    // const getCategories = axios.get(baseUrl + "/categories", headers);
    // const getGoldTypes = axios.get(baseUrl + "/gold-types", headers);
    // const getSuppliers = axios.get(baseUrl + "/suppliers", headers);
    //
    // await axios.all([getCategories, getGoldTypes, getSuppliers])
    //     .then(axios.spread((categories, goldTypes, suppliers) => {
    //         let category = categories.data.map((category) => {
    //             return renderCategory(category);
    //         }).join(' ');
    //         $('#categoryCode').append(category);
    //
    //         let goldType = goldTypes.data.map((goldType) => {
    //             return renderGoldType(goldType);
    //         }).join(' ');
    //         $('#goldType').append(goldType);
    //
    //         let supplier = suppliers.data.map((supplier) => {
    //             return renderSupplier(supplier);
    //         }).join(' ');
    //         $('#supplierCode').append(supplier);
    //
    //     }));

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
            title: 'Thêm sản phẩm thành công'
        })
    }
    sessionStorage.removeItem('toastMessages');
})

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

    const avatarDropzone = Dropzone.forElement('#avatar');
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
        avatar: null
    }

    const errors = validation(dto, avatar);
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

        await instance.post('/admin/products', formData)
            .then((res) => {
                if(res.status === 200) {
                    sessionStorage.setItem('toastMessages', true);
                    window.location.reload();
                }
            })
            .catch((error) => {
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