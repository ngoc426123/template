const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcViewsPath } = require('./options');
const fs = require('fs');
const filesDir = () => {
  const dir = fs.readdirSync(srcViewsPath, { withFileTypes: true });

  return dir.filter(file => file.name.includes('.pug'));
}
const files = filesDir().map(file => file.name);
const routers = () => {
  return files.map(file => {
    const fileNameWithoutExt = file.replace('.pug', '');
    const fileNameHtml = `${fileNameWithoutExt}.html`
    const filePath = `${srcViewsPath}${file}`;

    return new HtmlWebpackPlugin({
      filename: fileNameHtml,
      template: filePath,
      inject: 'body',
      minify: false,
      // scriptLoading: false,
    })
  })
}

exports.routers = routers();