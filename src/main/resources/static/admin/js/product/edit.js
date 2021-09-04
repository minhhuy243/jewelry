
var productId;


function edit(){
    $('.fas.fa-edit').click(function () {
        var $row = $(this).closest("tr");
        $tds = $row.find("td:nth-child(1)");

        $.each($tds, function() {
            productId = $(this).text();
        });

        Swal.fire({
            title: 'Bạn có muốn cập nhật?',
            showDenyButton: true,
            confirmButtonText: `Đồng ý`,
            denyButtonText: `Không`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                window.localStorage.setItem('product_id', productId);
                window.location = "/admin/products/edit";
            } else if (result.isDenied) {

            }
        });

    });

}


function renderProductEdit() {
    const id = window.localStorage.getItem('product_id');
    const url = baseUrl +  "/products/by-id/" + id;
    const token = localStorage.getItem("access_token");


    axios.get(url, {headers: {"Authorization": `Bearer ${token}`}})
        .then((res) => {
            document.getElementById("sku").innerText = res.data.content.sku;
            document.getElementById("name").value = res.data.content.name;
            document.getElementById("goldWeight").value = res.data.content.goldWeight;
            document.getElementById("quantity").value = res.data.content.quantity;
            document.getElementById("costPrice").value = res.data.content.costPrice;
            document.getElementById("price").value = res.data.content.price;
            document.getElementById("goldType").value = res.data.content.goldTypePercentage;
            document.getElementById("supplierCode").value = res.data.content.supplierCode;
            document.getElementById("categoryCode").value = res.data.content.categoryCode;
        })
        .catch((error) => {

        });
}

function deleteProduct() {
    $('.fas.fa-trash').click(function () {
        var $row = $(this).closest("tr");
        $tds = $row.find("td:nth-child(1)");

        $.each($tds, function() {
            productId = $(this).text();
        });

        Swal.fire({
            title: 'Bạn có muốn xóa sản phẩm này?',
            showDenyButton: true,
            confirmButtonText: `Đồng ý`,
            denyButtonText: `Không`,
        }).then((result) => {
            if (result.isConfirmed) {
                const url = baseUrl +  "/products/" + productId;
                const token = localStorage.getItem("access_token");

                axios.delete(url, {headers: {"Authorization": `Bearer ${token}`}})
                    .then((res) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Xóa thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        localStorage.removeItem('product_id');
                        setTimeout(reload, 2000);
                    })
                    .catch((error) => {

                    });
            } else if (result.isDenied) {

            }
        });

    });
}

function reload() {
    window.location.reload();
}

