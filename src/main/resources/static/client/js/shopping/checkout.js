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