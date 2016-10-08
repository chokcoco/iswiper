##iswiper -- 移动端滑动插件

小巧轻量的移动端滑动插件，支持首尾相连无限滑动，支持自动滑动。

```html
<div class="swiper">
  <div class="item">
      <img src="xxx1.jpg">
  </div>
  <div class="item">
      <img src="xxx2.jpg">
  </div>
  <div class="item">
      <img src="xxx3.jpg">
  </div>
  <div class="item">
      <img src="xxx4.jpg">
  </div>
</div>
<script src="../swiper.js"></script>
<script>
  window.swiper = new Swiper();
</script>
```

### API
```javascript
new Swiper({
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
  duration: 300,
  // 自动切换，默认为 false，自动切换必须 infinite:true
  autoSwitch: false,
  // 切换间隔
  loopTime: 5000
})
```

##License

MIT
