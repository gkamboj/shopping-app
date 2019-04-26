$(() => {
    var wel = document.getElementById('welc')
    if (sessionStorage.getItem('name') != undefined) {
        wel.innerText = 'Welcome ' + sessionStorage.getItem('name');
    }
    refreshList();

})

function refreshList() {
    var productTable = $('#products');
    productTable.empty();

    $.get('/products', (products) => {
        if (products.success) {
            var count = 1;
            var table = document.createElement('table');
            table.setAttribute("class","table table-hover");
            var tb = document.createElement("tbody");
            var headerRow = document.createElement('tr');
            addDataToRow(document.createTextNode('S. No.'), headerRow, 'center', 'bold')
            addDataToRow(document.createTextNode('Product Name'), headerRow, 'center', 'bold');
            addDataToRow(document.createTextNode('Vendor'), headerRow, 'center', 'bold');
            addDataToRow(document.createTextNode('Price'), headerRow, 'center', 'bold');
            addDataToRow(document.createTextNode('Cart Quantity'), headerRow, 'center', 'bold');
            addDataToRow(document.createTextNode('Action'), headerRow, 'center', 'bold');
            table.appendChild(headerRow);
            table.appendChild(tb)
            
            for (let product of products.data) {
                var row = document.createElement('tr');
                var countSpan = document.createElement('span');
                var productNameSpan = document.createElement('span');
                var productPriceSpan = document.createElement('span');
                var vendorNameSpan = document.createElement('span');
                var cartCountSpan = document.createElement('input');
                cartCountSpan.setAttribute("id", "quantity"+product.id);

                var addButton = document.createElement('button');
                var addIcon = document.createElement('img');

                addIcon.src = '../images/add_to_cart.png'
                addIcon.style.width = '25px';
                addIcon.style.height = '25px';
                addButton.appendChild(addIcon);

                addButton.onclick = (() => {
                    console.log('Quantity:'+$("#quantity"+product.id).val())
                    $.post('/cart', {
                        quantity: $("#quantity"+product.id).val(),
                        totalPrice: product.price*$("#quantity"+product.id).val()/100,
                        userId: sessionStorage.getItem('id'),
                        productId: product.id,
                        productName: product.productName
                    },
                        (data) => {
                            if (data.success) {
                                alert('Product added');
                            } else {
                                alert("Can't add: "+data.message)
                            }
                        })
                })

                countSpan.innerText = count;
                productNameSpan.innerText = product.productName;
                productPriceSpan.innerText = product.price / 100;
                vendorNameSpan.innerText = product.vendor.vendorName;
                cartCountSpan.setAttribute('type', 'number');
                cartCountSpan.min = 1;

                addDataToRow(countSpan, row, 'right');
                addDataToRow(productNameSpan, row);
                addDataToRow(vendorNameSpan, row);
                addDataToRow(productPriceSpan, row);
                addDataToRow(cartCountSpan, row, 'center');
                addDataToRow(addButton, row, 'center');
                tb.appendChild(row);
                table.setAttribute("border", "2");

                productTable[0].appendChild(table);
                count += 1;
            }
        } else {
            productTable[0].append(products.message)
        }

    })
}

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