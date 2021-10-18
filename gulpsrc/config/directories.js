// ENVIRONMENT
const isProduct = process.env.NODE_ENV === 'production';

// DIRECTORIES PATH
const src = './src';
const assets = 'assets';
const build = 'build';

// DIRECTORIES SOURCE
const html = '/html/*.pug';
const style = '/scss/app.scss';
const script = '/js/all.js';
const data = '/data/*';
const images = '/images/**';
const fonts = ['node_modules/@fortawesome/fontawesome-free/webfonts/*', `${assets}/fonts/**`];

// MODULE EXPORT
exports.src = src;
exports.src_html = src + html;
exports.src_style = src + style;
exports.src_script = src + script;
exports.src_data = assets + data;
exports.src_images = assets + images;
exports.src_fonts = fonts;

exports.build = build;
exports.build_html = build + '';
exports.build_style = build + '/css';
exports.build_script = build + '/js';
exports.build_data = build + '/data';
exports.build_images = build + '/images';
exports.build_fonts = build + '/fonts';

exports.path_assets = assets;
exports.path_html = src + '/html';