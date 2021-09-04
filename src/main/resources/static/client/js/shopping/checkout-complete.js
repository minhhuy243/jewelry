function renderItem(item) {
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

function renderOrder() {
    const order = JSON.parse(localStorage.getItem('order'));

    $('#orderInfo').html(`<div class="col-6">
                                <ul class="order-details-list">
                                    <li style="font-family: Roboto">Mã đơn hàng: <strong>${order.id}</strong></li>
                                    <li style="font-family: Roboto">Tổng: <strong>${order.total}</strong></li>
                                    <li style="font-family: Roboto">Ghi chú: <strong>${order.content}</strong></li>
                                </ul>
                            </div>

                            <div class="col-6">
                                <ul class="order-details-list">
                                    <li style="font-family: Roboto">Tên người đặt: <strong>${order.fullName}</strong></li>
                                    <li style="font-family: Roboto">Địa chỉ: <strong>${order.address}</strong></li>
                                    <li style="font-family: Roboto">Số điện thoại: <strong>${order.phoneNumber}</strong></li>
                                </ul>
                            </div>`);

    let itemsHtml = order.items.map((item) => {
        return renderItem(item);
    }).join(' ');
    itemsHtml += `
                    <tr class="total">
                        <td>
                            <h6 class="mb-0">Thành tiền</h6>
                        </td>
                        <td></td>
                        <td>
                            <strong style="font-family: Roboto">${(order.total * 1000).toLocaleString("it-IT")+'đ'}</strong>
                        </td>
                    </tr>`;
    $('#orderDetails tbody').html(itemsHtml);

    localStorage.removeItem('order');
}