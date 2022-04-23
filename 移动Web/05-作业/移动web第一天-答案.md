### 第一题

下面关于 线性渐变linear-gradient 用法，正确的是(  D  )

A:  background-color: linear-gradient(red);

B:  background-color: linear-gradient(red, black);

C:  background-image: linear-gradient(90, red, black);

D： background-image: linear-gradient(red, black);

### 第二题

transform-origin属性的描述不正确的是(  C  )

A： 设置元素转换中心

B： 默认的转换中心在元素中心

C： 默认的转换中心在左上角

 D： 也能设置3d转换的中心 

### 第三题

现有一字体图标，对应类名是icon-arrow，以下代码正确的是(  D  )

A： <i class="icon-arrow"></i>

 B： <i class="iconfont arrow"></i>

 C： <i class="iconfontarrow"></i>

 D： <i class="iconfont icon-arrow"></i>

### 第四题

下列有关transform属性中scale()描述正确的是(  B  )

A： transform: scale(1, 1)表示元素宽和高都放大一倍

 B： 默认以元素中心点进行缩放

 C： transform: scale(0.5)表示元素宽缩小0.5倍

 D： 元素缩放后会影响其他元素

### 第五天

下列有关transform: translateY(100px) rotate(90deg)描述正确的是(  A   )

A： 元素沿着Y轴向下偏移100px，同时以自身中心顺时针旋转90°

 B： 元素先沿着Y轴向上偏移100px，再以自身中心顺时针旋转90°

 C： 与transform: rotate(90deg) translateY(100px)写法效果一致 

 D： 元素位移100px，旋转90°不是同时进行的

### 第六题

当鼠标悬停到到box元素上执行的效果是(  B  )

```css
.box {
    width: 300px;
    height: 300px;
    background-color: pink;
    transform: translateX(100px);
    transition: all 1s;
}

.box:hover {
    transform: translateX(0px);
}
```

A： 没有任何变化

 B： 往左移动100px

 C： 往右移动100px.

 D： 以上说法都不对

### 第七题

让A元素从0的位置往右水平移动至800的位置,在移动的过程中并且伴随旋转下列代码写法正确的是(  A  )

A:  

```css
.box {
    transform: translateX(800px) rotate(360deg);
}
```

B:

```css
.box {
    transform: rotate(360deg) translateX(800px);
}
```

C:

```css
.box {
    transform: translateX(800px);
    transform: rotate(360deg);
}
```

D:

```css
.box {
    transform: rotate(360deg);
    transform: translateX(800px);
}
```

### 第八题

下面哪个属性不属于变换（transform）的效果(  A  )

 A： transition

 B： translate

 C： rotate

 D： scale

### 第九题

下列有关2D转换的代码，描述错误的是(  C  )

 A： transform: scale(2); 表示让元素宽度和高度同时缩放为原来的两倍

 B： transform-origin: center top; 表示更改元素的转换原点为中上点

 C： transform: translateX(100%); 表示让元素往右平移父元素的宽度的距离

 D： transform: translateX(200px) rotate(360deg); 表示让元素往右平移200px，并且同时旋转360度

### 第十题

下列选项中能让元素往右平移400px并且同时实现放大2倍的代码是(  B   )

 A： transform: translateY(400px) scale(2);

 B： transform: translateX(400px) scale(2);

 C： transform: translateX(400px);
		transform: scale(2);

 D： transform: translateX(400px);
		transform: scaleX(2) scaleY(2);
