import {readFile} from "./helper";
const path = require("path");
const staticDomain = '';

const filepath = path.resolve(__dirname, '../dist/template.html');

const renderHTML = async ({ reactDom, reduxState, helmetData, version }) => {
    try {
        let html = await readFile(filepath)
        let dataHelmet = renderHelmet(helmetData);
        if (html !== undefined) {
            
            html = html.replace(/<head>(\n.*)?<\/title>/g, `<head>${dataHelmet}`);
            html = html.replace(/<div class="main" id="root"><\/div>/g, `<div class="main" id="root">${reactDom}</div>`);
            html = html.replace(/<script>window.__REDUX_DATA__<\/script>/g, `<script>window.__REDUX_DATA__=${JSON.stringify(reduxState)}</script>`) ;
            html = html.replace(/\%PUBLIC_URL\%\/(js|css|fonts|images|vendors)\/([a-z0-9-.\/]+)(.css|.js|.png)/g,`${staticDomain}/$1/$2$3?v=${version}`) ;
            html = html.replace(/\%PUBLIC_URL\%\/([a-z0-9-.\/]+)(.json)/,`${staticDomain}/$1$2?v=${version}`);            
            return html.toString();
        }
      } catch (e) {
        console.log('e', e);
        return '<div/>';
      }
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