function renderOrderItem(item) {
    return `
    <tr>
        <td data-title="product">
            <div class="product-box">
                <a href="/${item.product.categorySlug + '/' + item.product.slug}">
                    <img style="width: 80px;" src="https://drive.google.com/uc?export=view&id=${item.product.avatar}" alt="product">
                </a>
                <div class="product-name">
                    <h6><a href="/${item.product.categorySlug + '/' + item.product.slug}">${item.product.name + ' ' + item.product.sku}</a></h6>
                    <p>SỐ LƯỢNG: ${item.quantity}</p>
                </div>
            </div>
        </td>
    
        <td data-title="" style="font-family: Roboto">${(item.product.price * 1000).toLocaleString("it-IT")}đ</td>
        <td data-title="" style="font-family: Roboto">
            <strong>${(item.product.price * item.quantity * 1000).toLocaleString("it-IT")}đ</strong>
        </td>
    </tr>
    `;
}

function renderOrderTable(cart) {
    let itemsHtml = cart.items.map((item) => {
        return renderOrderItem(item);
    }).join(' ');
    itemsHtml += `
                    <tr class="total">
                        <td>
                            <h6 class="mb-0">Thành tiền</h6>
                        </td>
                        <td></td>
                        <td>
                            <strong style="font-family: Roboto">${(cart.total * 1000).toLocaleString("it-IT")+'đ'}</strong>
                        </td>
                    </tr>`;
    $('#order tbody').html(itemsHtml);
}

async function getUserInfoApi() {
    await instance.get('/user/me')
        .then((res) => {
            const user = res.data;
            $('#full-name').val(user.fullName);
            $('#address').val(user.address);
            $('#phone-number').val(user.phoneNumber);
            $('#email').val(user.email);
        });
}

$('#btnSubmit').on('click', async function () {
    const orderInfo = {
        fullName: $('#full-name').val(),
        address: $('#address').val(),
        phoneNumber: $('#phone-number').val(),
        email: $('#email').val(),
        content: $('#content').val()
    };
    await instance.post('/orders', orderInfo)
        .then((res) => {
        localStorage.setItem('order', JSON.stringify(res.data))
        localStorage.removeItem('cart');
        window.location = '/checkout/complete';
    })
});

$(document).ready(async () => {
    if(getLocalAccessToken() && getLocalRefreshToken()) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if(cart) {
            await getUserInfoApi();
            await renderOrderTable(cart);
        }
    } else {
        window.location = '/login';
    }
});
