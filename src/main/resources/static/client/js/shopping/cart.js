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