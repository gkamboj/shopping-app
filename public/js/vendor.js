$(() => {
    var nameTextBox = $('#name');
    var addButton = $('#addvendor');
    var wel = document.getElementById('welc')
    if (sessionStorage.getItem('name') != undefined){
        wel.innerText = 'Welcome ' + sessionStorage.getItem('name');
    }

    refreshList();

    console.log(addButton);
    addButton.click(() => {
        $.post('/vendors', {
            name: nameTextBox.val(),
        },
            (data) => {
                console.log('before success')
                if (data.success) {
                    console.log('added!')
                    refreshList();
                    //$("#vendorForm")[0].reset();
                } else {
                    console.log(data.message)
                    alert('Error while adding new vendor: \n'+data.message+'\nTry Again!')
                }
            })
    })

})

function refreshList() {
    var vendorTable = $('#vendors');
    vendorTable.empty();
    $.get('/vendors', (vendors) => {
        if (vendors.success) {
            var count = 1;
            var table = document.createElement('table');
            table.setAttribute("class","table table-hover");
            var tb = document.createElement("tbody");
            var headerRow = document.createElement('tr');
            addDataToRow(document.createTextNode('S. No.'), headerRow, 'center', 'bold')
            addDataToRow(document.createTextNode('Vendor Name'), headerRow, 'center', 'bold');
            addDataToRow(document.createTextNode('Action'), headerRow, 'center', 'bold');
            table.appendChild(headerRow);
            table.appendChild(tb)

            for (let vendor of vendors.data) {
                var row = document.createElement('tr');
                var countSpan = document.createElement('span');
                var vendorSpan = document.createElement('span');
                var delIcon = document.createElement('img');
                var delButton = document.createElement('button');

                delIcon.src = '../images/delete.png'
                delIcon.style.width = '21px';
                delIcon.style.height = '21px';
                delButton.appendChild(delIcon);

                countSpan.innerText = count;
                vendorSpan.innerText = vendor.vendorName;
                
                delButton.onclick = ((event) => {
                    console.log(event.target)
                    $.ajax({
                        url: '/vendors',
                        type: 'DELETE',
                        data: { "id": vendor.id },
                        success: (successData) => {
                            if (successData.success) {
                                refreshList();
                            }
                        }
                    });
                })

                addDataToRow(countSpan, row, 'right');
                addDataToRow(vendorSpan, row);
                addDataToRow(delButton, row, 'center');
                tb.appendChild(row);
                table.setAttribute("border", "2");
                
                vendorTable[0].appendChild(table);
                count += 1;
            }
        } else {
            vendorTable[0].append(vendors.message)
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