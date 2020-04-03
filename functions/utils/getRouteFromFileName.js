module.exports.getRouteFromFileName = (file) => file.slice(0, -5).split('/')[file.split('/').length - 1];
