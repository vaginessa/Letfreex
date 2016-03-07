function cachePage(url, data) {
    data = JSON.stringify(data);
    var ms = new Date().getTime() + 86400000;
    localStorage.setItem(url, ms +"|" + data);
}

function openFromCache(url) {
    return JSON.parse(localStorage.getItem(url).split('|')[1])          
}
