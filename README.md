##iswiper -- 移动端滑动插件

两款小巧的移动端滑动插件，支持无限轮播滚动，小而美，性能极致

+ iswiper.js
+ iswiper.fade.js

## 使用

引入 `iswiper.css` 及 `iswiper.js`

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
  window.swiper = new Swiper();
</script>
```

## 接口方法
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
})
```

- `next`: 滑动到到下一屏

```
    var swiper = new Swiper();
    swiper.next();
```

- `go`: 主动滑动到指定界面。

```
    var swiper = new Swiper();
    swiper.go(1);
```

- `resetLoop`: 重置滚动轮播

```
    var swiper = new Swiper();
    swiper.resetLoop();
```

##License

MIT
