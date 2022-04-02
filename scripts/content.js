console.log('content ' + window.location.href)
if (window.location.href.indexOf('/pin/') > 0) {

    console.log('inject button')
    var item = document.querySelector('');
    var button = '<button>Download</button>'
    item.append(button)

}
