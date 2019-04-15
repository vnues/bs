# 毕业设计

## 前言

个人用react做的一个小说类的webapp,前期先准备好设计稿,边写边开搞,react+sketch写起来挺nice的



## 技术栈

react全家桶+node+mongodb+antd-mobile+flex+rem

## 关于接口数据

还在完善中....


## 项目运行

```shell
git@github.com:vnues/newapp.git

cd newapp

yarn

npm start


```

## 说明

- 如果对您有帮助，您可以点右上角 "Star" 支持一下 十分感谢!
- 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR

## 效果演示

![](./1.gif)


## 目标功能

- [x] app首页
- [x] 动画功能
- [x] 菜单功能
- [x] 笔记功能
- [x] 本地缓存功能

### 关于antd-mobile的引入

```javascript
//在webpack.config.js文件点oneof下引入
 {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
    customize: require.resolve(
        'babel-preset-react-app/webpack-overrides'
    ),

    plugins: [
        [
        require.resolve('babel-plugin-named-asset-import'),
        {
            loaderMap: {
            svg: {
                ReactComponent:
                '@svgr/webpack?-prettier,-svgo![path]',
            },
            },
        },
        ],
        //引入antd-mobile的css样式 按需加载
        ["import", { "libraryName": "antd-mobile", "style": "css" }]
    ],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    cacheCompression: isEnvProduction,
    compact: isEnvProduction,
    },
},

```


## 项目交流群
> QQ群: 666512516

## 续

- 更多的功能后期还会陆续的补上.
- 更多的细节会陆续修复代码会陆续优化.
- 由于作者精力有限，后续可能只会修复某些bug
- 秉着学习的态度,感谢大家.

## 目录结构

```txt
.
├── README.md
├── config
│   ├── env.js
│   ├── jest
│   ├── paths.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src
│   ├── App.js
│   ├── App.scss
│   ├── App.test.js
│   ├── index.js
│   ├── page
│   ├── serviceWorker.js
│   └── static
└── yarn.lock
.
```
# 写在最后的总结

>flex+rem的布局确实舒服，但是注意的是千万不要用窗口缩放来解决移动端1px问题,这样造成的情况你引入的UI框架会样式崩溃,后期会用vw在布局上做进一步改善

## 后期优化的点

- [x] 引入typescript解决写法障碍
- [x] 优化设计稿
- [x] 接入原生api

