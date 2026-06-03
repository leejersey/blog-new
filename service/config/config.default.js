/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577286259393_3773';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '123456',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
　　　　csrf: {enable: false},
　　　　domainWhiteList: [ '*' ]
　};

  config.cors = {
    origin: ctx => {
      const whiteList = [
        'http://localhost:3000',
        'http://localhost:8001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:8001',
      ];
      const origin = ctx.request.header.origin;
      if (whiteList.includes(origin)) {
        return origin;
      }
      return 'http://localhost:3000'; // 默认回退
    },
    credentials: true,   // 开启认证
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
