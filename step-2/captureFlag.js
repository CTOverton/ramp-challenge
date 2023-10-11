function getFlag() {
    let url = '';
    document.querySelectorAll('code[data-class^="23"]').forEach(code => {
        code.querySelectorAll('div[data-tag$="93"]').forEach(div => {
            div.querySelectorAll('span[data-id*="21"]').forEach(span => {
                span.querySelectorAll('i.char').forEach(i => {
                    url += i.getAttribute('value');
                });
            });
        });
    });

    return url;
}

function displayFlag(flag) {
    console.log({flag});
    document.body.innerHTML += `
            <h1>Flag captured</h1>
            <a href="${flag}">${flag}</a>
        `;
}

window.addEventListener("DOMContentLoaded", function() {
    const flag = getFlag();
    displayFlag(flag);
}, false);
