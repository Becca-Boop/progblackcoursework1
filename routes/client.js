window.addEventListener('click', async function(event){
    try{
        let response = await fetch('http://127.0.0.1:8090');
        let body = await response.text()
        this.document.getElementById('content').innerHTML=body
    } catch(e) {
        this.alert(e);
    }
});