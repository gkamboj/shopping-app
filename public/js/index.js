$(() => {
    var nameTextBox = $('#name');
    var emailTextBox = $('#email');
    var login = $('#login');
    console.log(login);
    login.click(() => {
        $.post('/user', {
            name: nameTextBox.val(),
            email: emailTextBox.val()
        },
            (data) => {
                console.log('before success')
                if (data.success) {
                    console.log('success! ' + data.user.email)
                    sessionStorage.setItem('name', data.user.userName)
                    sessionStorage.setItem('email', data.user.email)
                    sessionStorage.setItem('id', data.user.id)
                    alert(data.message)
                    if (data.user.email.includes('admin')) {
                        window.location.replace('../html/vendors.html')
                    } else {
                        window.location.replace('../html/products.html')
                    }
                } else {
                    console.log(data.message)
                    alert(data.message)
                }
            })
    })
})