//----------- Setting for Project ---------------------
const uiFolderPath = '../../src/layouts/contents/pages'; // Page source Base Path
const pageRouteFilePath = '../../src/systems/router/pageRoutes.js'; // Router Page file Path
//-----------------------------------------------------
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const pageFolderPath = path.join(__dirname, uiFolderPath).replace(/\\/g, '/');
const pageRouterPath = path
  .join(__dirname, pageRouteFilePath)
  .replace(/\\/g, '/');
const srcFolderPath = path.join(__dirname, '../../src').replace(/\\/g, '/');

let pageRoutes = 'export default [';

glob.sync(pageFolderPath.concat('/**/*.vue')).forEach(pagePath => {
  const routePath = pagePath
    .replace(pageFolderPath, '/page')
    .replace(/.vue/g, '');

  pageRoutes += `{
        path: '/:menuid${routePath}',
        name: '${routePath}',
        component: () => import('@${pagePath.substr(srcFolderPath.length)}'),
        meta: {
        requiresAuth: true
        }
    },`;
}, {});

pageRoutes += ']';

// Create Page Router File
fs.writeFileSync(pageRouterPath, pageRoutes);
