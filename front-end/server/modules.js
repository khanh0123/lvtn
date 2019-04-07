var fs = require("fs");
const path = require("path");
const staticDomain = '';

const filename = path.resolve(__dirname, '../dist/template.html');
console.log(filename);

const renderHTML = ({ reactDom, reduxState, helmetData, version },callback) => {

    fs.readFile(filename,'utf8' , (err, html) => {
        if (err) throw err;
        html = trim(html);

        let dataHelmet = renderHelmet(helmetData);

        if (html && html !== 'undefined') {
            html = html != 'undefined' ? html.replace(/<head>(\n.*)?<\/title>/g, `<head>${dataHelmet}`) : html;
            html = html != 'undefined' ? html.replace(/<div class="main" id="root"><\/div>/g, `<div class="main" id="root">${reactDom}</div>`) : '';
            html = html != 'undefined' ? html.replace(/<script>window.__REDUX_DATA__<\/script>/g, `<script>window.__REDUX_DATA__=${JSON.stringify(reduxState)}</script>`) : '';
            html = html != 'undefined' ? html.replace(/\%PUBLIC_URL\%\/assets\/(js|css|fonts|images|vendors)\/([a-z0-9-.\/]+)(.css|.js|.png)/g,`${staticDomain}/assets/$1/$2$3?v=${version}`) : '';
            // html = html != 'undefined' ? html.replace(/.js/, `.js?v=${version}`) : '';
            // html = html != 'undefined' ? html.replace(/.css/, `.css?v=${version}`) : '';
        }
        
        return callback(html.toString());
    });
    return '<div/>';

}

const renderHelmet = (helmetData) => {
    if (helmetData) {
        let title = helmetData.title ? helmetData.title.toString() : '';
        let meta = helmetData.meta ? helmetData.meta.toString() : '';
        let script = helmetData.script ? helmetData.script.toString() : '';
        let link = helmetData.link ? helmetData.link.toString() : '';
        return `${title + meta + script + link}`;
    }
    return '';
}
const trim = (str) => {
    return str != 'undefined' ? str.toString().replace(/^\s+|\s+$/g, '') : '';
}
module.exports = {
    renderHTML,
}