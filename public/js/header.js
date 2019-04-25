$(() => {
    //updateHead();
    if (sessionStorage.getItem('name') != undefined){
        //wel.innerText = 'Welcome ' + sessionStorage.getItem('name');
        $('#logout').prop('hidden',false)
    }
    $('#logout').click(()=>{
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        location.href = '../html/index.html';
    })
})

function updateHead() {
    var headHtml;
    console.log('Test session: '+sessionStorage.getItem('name'))
    $('#welc').empty();
    if (sessionStorage.getItem("name") == undefined) {
        console.log('Test session 2: '+sessionStorage.getItem('name'))
        headHtml = `
                <button id="loginButton" class="btn btn-success float-right" onclick=login()>Login</button>
                <input type="text" id="userInput" class="float-right">
                `;
    } else {
        headHtml = `
                <h4>Welcome ${sessionStorage.getItem('name')}</h4>
                `
    }
    $('#welc').append(headHtml);
}