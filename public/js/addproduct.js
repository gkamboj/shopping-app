$(() => {
    var nameTextBox = $('#name');
    var addButton = $('#addProduct');
    var price = $('#price')
    var wel = document.getElementById('welc')
    if (sessionStorage.getItem('name') != undefined){
        wel.innerText = 'Welcome ' + sessionStorage.getItem('name');
    }
    refreshList();
     
    vendorsList();
    console.log(addButton);
    addButton.click(() => {
        $.post('/products', {
            name: nameTextBox.val(),
            price: price.val(),
            vendorId: $('#listOfVendors').val()
        },
            (data) => {
                console.log('before success')
                console.log('vendor id:'+$('#listOfVendors').val())
                if (data.success) {
                    console.log('added!')
                    
                    refreshList();
                    //$("#productForm")[0].reset();
                } else {
                    console.log(data.message)
                    alert('Error while adding new product: \n'+data.message+'\nTry Again!')
                }
            })
    })

    
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
            addDataToRow(document.createTextNode('Action'), headerRow, 'center', 'bold');
            table.appendChild(headerRow);
            table.appendChild(tb)

            for (let product of products.data) {
                var row = document.createElement('tr');
                var countSpan = document.createElement('span');
                var productNameSpan = document.createElement('span');
                var productPriceSpan = document.createElement('span');
                var vendorNameSpan = document.createElement('span');
                var delButton = document.createElement('button');
                var delIcon = document.createElement('img');

                delIcon.src = '../images/delete.png'
                delIcon.style.width = '25px';
                delIcon.style.height = '25px';
                delButton.appendChild(delIcon);

                countSpan.innerText = count;
                productNameSpan.innerText = product.productName;
                productPriceSpan.innerText = product.price/100;
                vendorNameSpan.innerText = product.vendor.vendorName;
                
                delButton.onclick = ((event) => {
                    console.log(event.target)
                    $.ajax({
                        url: '/products',
                        type: 'DELETE',
                        data: { "id": product.id },
                        success: (successData) => {
                            if (successData.success) {
                                refreshList();
                            }
                        }
                    });
                })

                addDataToRow(countSpan, row, 'right');
                addDataToRow(productNameSpan, row);
                addDataToRow(vendorNameSpan, row);
                addDataToRow(productPriceSpan, row);
                addDataToRow(delButton, row, 'center', false);
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

function vendorsList() {
    var vendorList = $('#vendorsdd')
    list = document.createElement('select');
    list.setAttribute('id', 'listOfVendors');
    $.get('/vendors', (vendors) => {
        if (vendors.success) {
            for(let vendor of vendors.data) {
                list.append(new Option(vendor.vendorName, vendor.id));
            }
            vendorList.append(list);
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
    if(align != false) cell.align = align;
    row.appendChild(cell);
}