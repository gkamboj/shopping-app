$(() => {

    var wel = document.getElementById('welc')
    if (sessionStorage.getItem('name') != undefined) {
        wel.innerText = 'Welcome ' + sessionStorage.getItem('name');
    }

    function refreshList() {
        var cartTable = $('#cartitems');
        cartTable.empty();
        if (cartTable[0] != undefined) {
            $.get('/cart/' + sessionStorage.getItem('id'), (cart) => {
                if (cart.success && cart.data.length > 0) {
                    var cartValue = 0;
                    var count = 1;
                    var table = document.createElement('table');
                    table.setAttribute("class", "table table-hover");
                    var tb = document.createElement("tbody");
                    var headerRow = document.createElement('tr');
                    addDataToRow(document.createTextNode('S. No.'), headerRow, 'center', 'bold')
                    addDataToRow(document.createTextNode('Product Name'), headerRow, 'center', 'bold');
                    addDataToRow(document.createTextNode('Vendor'), headerRow, 'center', 'bold');
                    addDataToRow(document.createTextNode('Quantity'), headerRow, 'center', 'bold');
                    addDataToRow(document.createTextNode('Price'), headerRow, 'center', 'bold');
                    addDataToRow(document.createTextNode('Action'), headerRow, 'center', 'bold');
                    table.appendChild(headerRow);
                    table.appendChild(tb)

                    for (let item of cart.data) {
                        var row = document.createElement('tr');
                        var countSpan = document.createElement('span');
                        var productNameSpan = document.createElement('span');
                        var productPriceSpan = document.createElement('span');
                        var vendorNameSpan = document.createElement('span');
                        var cartCountSpan = document.createElement('span');
                        var delButton = document.createElement('button');
                        var delIcon = document.createElement('img');

                        delIcon.src = '../images/delete.png'
                        delIcon.style.width = '25px';
                        delIcon.style.height = '25px';
                        delButton.appendChild(delIcon);

                        delButton.onclick = ((event) => {
                            console.log(event.target)
                            $.ajax({
                                url: '/cart',
                                type: 'DELETE',
                                data: { "id": item.id },
                                success: (successData) => {
                                    if (successData.success) {
                                        refreshList();
                                    }
                                }
                            });
                        })

                        countSpan.innerText = count;
                        productNameSpan.innerText = item.productName;
                        vendorNameSpan.innerText = item.product.vendor.vendorName;
                        cartCountSpan.innerText = item.quantity;
                        productPriceSpan.innerText = item.totalPrice;
                        cartValue += item.totalPrice;

                        addDataToRow(countSpan, row, 'right');
                        addDataToRow(productNameSpan, row);
                        addDataToRow(vendorNameSpan, row);
                        addDataToRow(cartCountSpan, row, 'center');
                        addDataToRow(productPriceSpan, row);
                        addDataToRow(delButton, row, 'center', false);
                        tb.appendChild(row);
                        table.setAttribute("border", "2");

                        cartTable[0].appendChild(table);
                        count += 1;
                    }

                    document.getElementById('cartValue').innerText = ' Total cart value is INR ' + cartValue;
                } else {
                    document.getElementById('cartitems').innerHTML = `<h1 style='text-align: center; font-weight:bold;'>${cart.message}</h1>`;
                    document.getElementById('cartValue').innerText = ' Total cart value is INR 0';
                }
            })
        }
    }

    refreshList();

    function addDataToRow(data, row, align = false, bold = false) {
        var cell = document.createElement("td");
        if (bold != false) {
            bold = document.createElement('strong');
            bold.appendChild(data);
            cell.appendChild(bold);
        } else {
            cell.appendChild(data);
        }
        if (align != false) cell.align = align;
        row.appendChild(cell);
    }
})