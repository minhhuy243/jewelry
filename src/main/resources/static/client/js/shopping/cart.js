function renderCartItems(item) {
    return `
        <tr>
            <td class="remove">
                <div class="product-remove">
                    <a href="javascript:void(0)" data-sku="${item.product.sku}" class="close-btn close-dark">
                        <span></span>
                        <span></span>
                    </a>
                </div>
            </td>
            <td data-title="product">
                <div class="product-box">
                    <a href="${item.product.categorySlug + '/' + item.product.slug}">
                        <img src="https://drive.google.com/uc?export=view&id=${item.product.avatar}" alt="product">
                    </a>                  
                    <div class="product-name">
                        <h6>
                            <a href="${item.product.categorySlug + '/' + item.product.slug}">
                                ${item.product.name + ' ' + item.product.sku}
                            </a>
                        </h6>
                    </div>
                </div>
            </td>
            <td data-title="Price" style="font-family: Roboto">
                <strong>${(item.product.price * 1000).toLocaleString("it-IT")}đ</strong>
            </td>
            <td data-title="Quantity">
                <div class="qty-box d-flex">
                    <span class="qty-subtract"><i class="fa fa-minus"></i></span>
                    <input data-sku="${item.product.sku}" type="text" name="qty" value="${item.quantity}">
                    <span class="qty-add"><i class="fa fa-plus"></i></span>
                </div>
            </td>
            <td data-title="Total" style="font-family: Roboto">
                <strong>${(item.product.price * item.quantity * 1000).toLocaleString("it-IT")}đ</strong>
            </td>
        </tr>
    `;
}

function renderCartTable(cart) {
    const cartTable = $('#total tbody tr');
    let itemsHtml = cart.items.map((item) => {
        return renderCartItems(item);
    }).join(' ');
    $('#cart tbody').html(itemsHtml);

    cartTable.first().find('td').text((cart.total * 1000).toLocaleString("it-IT")+'đ');
    cartTable.last().find('td strong').text((cart.total * 1000).toLocaleString("it-IT")+'đ');
}

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
});

async function getApiUpdateItemInCart(sku, quantity, inputQuantity) {
    const item = {productSku: sku, quantity: quantity};
    await instance.put('/carts/mine/items', item)
        .then((res) => {
            renderCartTable(res.data);
            renderCartDropdown(res.data);
        }).catch((error) => {
            if(error.status === 500) {
                Toast.fire({title: error.response.data.message[0], icon: 'error'});
                inputQuantity.val(oldQuantity);
            }
        });
}

async function getApiDeleteItemInCart(sku) {
    await instance.delete(`/carts/mine/items/${sku}`)
        .then((res) => {
            Toast.fire({title: 'Xóa sản phẩm thành công!', icon: 'success'});
            renderCartTable(res.data);
            renderCartDropdown(res.data);
        }).catch((error) => {
            if(error.status === 500) {
                Toast.fire({title: error.response.data.message[0], icon: 'error'});
                inputQuantity.val(oldQuantity);
            }
        });
}

var inputQuantity;
var oldQuantity;
$("body")
    .on("mousedown", ".qty-box span", function() {
        inputQuantity = $(this).closest('.qty-box').find('input');
        oldQuantity = inputQuantity.val();
    })
    .on("click", ".qty-box span", async function() {
        const sku = inputQuantity.data('sku');
        const quantity = parseInt(inputQuantity.val());
        await getApiUpdateItemInCart(sku, quantity, inputQuantity);
    })
    .on("focusin", ".qty-box input", function() {
        oldQuantity = $(this).val();
    })
    .on("blur", ".qty-box input", async function() {
        const sku = $(this).data('sku');
        const quantity = parseInt($(this).val());
        await getApiUpdateItemInCart(sku, quantity, $(this));
    })
    .on("click", ".product-remove a", async function() {
        const sku = $(this).data('sku');
        await getApiDeleteItemInCart(sku);
    })