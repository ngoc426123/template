// PATH
const srcPath = './src/';
const publicPath = './public/';
const buildPath = './build/';

const srcScriptPath = 'js/';
const srcsStylePath = 'scss/';
const srcviewsPath = 'views/';

const buildScriptPath = 'js/';
const buildStylePath = 'css/';

// FILES
const srcScriptFile = 'all.js';
const srcStyleFile = 'app.scss';

const buildScriptFile = '[name].min.js';
const buildStyleFile = 'style.min.css';

// EXPORT
exports.src = srcPath;
exports.srcScriptPath = srcPath + srcScriptPath;
exports.srcViewsPath = srcPath + srcviewsPath;
exports.srcScript = srcPath + srcScriptPath + srcScriptFile;
exports.srcStyle = srcPath + srcsStylePath + srcStyleFile;

exports.buildPath = buildPath;
exports.buildScript = buildScriptPath + buildScriptFile;
exports.buildStyle = buildStylePath + buildStyleFile;

exports.publicPath = publicPath;