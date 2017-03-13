![npm_version](https://img.shields.io/npm/v/mobile_iswiper.svg)[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://github.com/chokcoco/iswiper)![License](https://img.shields.io/npm/l/express.svg)

#iswiper

一款小而美的轻量级、高性能移动端滑动插件。

保留最基本的功能，提供最大限度的拓展。

## Features

- 支持横屏、竖屏
- 支持无限轮播
- 支持手势
- 支持进度条

## Build

使用 Gulp 构建，可查看完整 Demo。安装包：

```
$ npm install mobile_iswiper
```

运行：

```
$ npm start
```

## Use

引入 `iswiper.css` 及 `iswiper.js` 。支持 AMD 、CMD 规范。

```html
<div class="container">
  <!-- 滑动结构 -->
  <div class="swiper">
    <div class="item">
        <!--内部结构-->
    </div>
    <div class="item">
        <!--内部结构-->
    </div>
    <div class="item">
        <!--内部结构-->
    </div>
    <div class="item">
        <!--内部结构-->
    </div>
  </div>
  <!-- 进度条结构，可选 -->
  <div class="progress-bar">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
</div>

<script>
  var swiper = new Swiper();
</script>
```

## API
```javascript
var swiper = new Swiper({
  // 容器
  container: '.swiper',
  // 每页 className
  item: '.item',
  // 默认竖屏，可选横屏 horizontal
  direction: 'vertical',
  // 激活态 className
  activeClass: 'active',
  // 默认不无限首尾相连
  infinite: false,
  // 滑动切换距离阀值
  threshold: 30,
  // 切换动画时间
  duration: 600,
  // 自动切换，默认为 false，自动切换必须 infinite:true
  autoSwitch: false,
  // 切换间隔
  loopTime: 5000,
  // 切换缓动函数，默认为 linear，可传入 cubic-bezier()
  easing: "linear",
  // 进度条，默认没有进度条，可选 true 且需要加上进度条 html 代码
  progressBar:false
});
```

- `next`: 滑动到到下一屏

```javascript
    var swiper = new Swiper();
    swiper.next();
```

- `go`: 主动滑动到指定界面。

```javascript
    var swiper = new Swiper();
    swiper.go(1);
```

- `resetLoop`: 重置滚动轮播

```javascript
    var swiper = new Swiper();
    swiper.resetLoop();
```

##License

MIT
