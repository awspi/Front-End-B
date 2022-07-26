# 笔记

# 字体图标

## 下载字体图标（了解）

1. 字体图标的 **选择，上传** UI美工她们来做的，我们了解即可。

   ![63780822443](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543948.png)

具体的步骤：

![63780825652](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543949.png)

## 使用字体图标（重点）

### 引入相关文件（前提）

1. 复制相关的文件，到 `fonts`文件夹里面。

   ![63783459080](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543950.png)

2. 引入 css 

   ~~~css
   <link rel="stylesheet" href="./fonts/iconfont.css">
   ~~~

### 使用类名引入字体图标（重点最常用）

如果是一个标签来使用字体文件，可以采取2个类名的形式。（开发最常用）

~~~css
<span class="iconfont icon-daohangdizhi"></span>
~~~

- 第一个类名 `iconfont` 目的是告诉这个盒子里面的文字是字体图标。  不是普通的文字。
- 第二个类名 `icon-daohangdizhi`， 告诉盒子到底使用哪个小图标。  

### 使用unicode编码(了解) 

也可以直接在标签内部放入一个编码

html标签

~~~css
 <strong> &#xe8ab; </strong>  
~~~

css 要指定当前标签的文字是字体图标，必须要声明。

~~~css
 strong {
      font-family: 'iconfont';
}
~~~

### 使用伪元素字体图标（记住）

~~~html
<div class="car1">购物车</div>
~~~

这样结构比较的清晰，省了很多的小盒子

~~~css
.car {
      width: 200px;
      height: 45px;
      border: 1px solid pink;
      text-align: center;
      line-height: 45px;
      font-family: 'iconfont';
    }
.car::before {
    content: "\e63b";

}
.car::after {
    content: "\e686";
}
~~~

>注意： 使用伪元素字体图标，一定要声明字体。  font-family: "iconfont"





## 小结

字体图标是前端工程师必须具备的知识点。 开发中， 字体图标上传，选择，都是网页美工给我们准备好了。

我们重点是下载和使用。

字体图标使用可以整体分为两大步骤：

1. 引用线上地址即可。  

   ~~~html
     <link rel="stylesheet" href="http://at.alicdn.com/t/font_3234864_h0da2uig6lr.css">
   ~~~

2. 调用。

   - 开发中最常用的是使用类名来调用，所以重点记住这个就可以了。

     ~~~html
     <span class="iconfont icon-daohangdizhi"></span>
     ~~~

# 变形 transform（2D）

变形可以改变盒子在平面内的形态（位移、旋转、缩放等等）

## 位移 translate

translate可以让盒子沿着x轴或者y轴来移动。

*多次使用不能叠加*

语法：

~~~css
transform: translate(x, y);
transform: translateX(x);
transform: translateY(y);
~~~

问题：

1. **他和margin有啥区别。**
   - margin移动盒子**会**影响其余的盒子。把其他人挤走。
   - 位移translate移动盒子**不会**影响其他的盒子。**不脱标。**
   - **位移经常需要的场景：** 
     - 比如 盒子上下移动不影响其他盒子
     - **盒子水平和垂直居中**，写法简单
     - 轮播图的动画效果

>注意：
>
>移动的时候可以写**百分比**，如果使用的百分比，移动的是**盒子自身的宽度**

~~~css
 transform: translateX(100%);
~~~

### 应用- 盒子水平和垂直

可以让一个子盒子在父盒子里面水平和垂直居中。

~~~css
.inner {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      background-color: skyblue;
      transform: translate(-50%, -50%);
    }

    /* .inner {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 200px;
      height: 200px;
      background-color: skyblue;
    } */
~~~

- 实现一个子盒子，在父盒子里面水平居中和垂直居中有哪些方法？ 

```css
    /* 1. 定位 */
    .father {
      position: relative;
      width: 500px;
      height: 500px;
      background: pink;
    }
```

```css
.son {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -100px;
      margin-left: -100px;
      width: 200px;
      height: 200px;
      background-color: purple;
    }
```

```css
.son {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 200px;
      height: 200px;
      background-color: purple;
    }
```

```css
    .son {
      position: absolute;
      top: 50%;
      left: 50%;
      /* 子盒子水平和垂直居中 */
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
      background-color: purple;
    }
```



### 开门大吉案例

效果：![图片1](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543951.gif)



~~~html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .box {
      overflow: hidden;
      width: 1366px;
      height: 600px;
      margin: 50px auto;
      background: url(./images/bg.jpg) no-repeat top center;
    }

    .box::before,
    .box::after {
      content: '';
      width: 50%;
      height: 600px;
      transition: .5s;
      background: url(./images/fm.jpg) no-repeat;
    }

    .box::before {
      float: left;
      background-color: pink;
    }

    .box::after {
      float: right;
      background-color: purple;
      /* 背景图片右对齐 */
      background-position: right center;
    }

    /* .box:hover 
    .box::before  */
    /* 鼠标经过 box 大盒子，  两个子盒子（before 和 after）来拉动 */
    .box:hover::before {
      /* 百分比是盒子自身的宽度 */
      transform: translateX(-100%);
    }

    .box:hover::after {
      /* 百分比是盒子自身的宽度 */
      transform: translateX(100%);
    }
  </style>
</head>

<body>
  <div class="box"></div>
</body>

</html>
~~~

## 旋转 rotate

旋转可以让盒子旋转角度。 

语法：

~~~css
transform: rotate(45deg);    一定写单位deg 或着turn=360deg
~~~

> 如果是正度数，则是顺时针旋转
>
> 如果是负度数，则是逆时针旋转

### 设置中心点  transform-origin

 /* 设置旋转的中心点位置 */

   ~~~css
  transform-origin: right bottom;
   ~~~

### 多形态变形

1. 如果需要移动，也需要旋转，则一定**先写移动**，后写旋转, css属性书写顺序影响代码执行。

   ~~~css
    transform: translate(-50%, -50%) rotate(360deg);
   ~~~

2. 注意，多个值之前用 空格隔开。

## 缩放 scale

语法：

~~~css
transform: scale(1.2)；
~~~

它比这宽度和高度最大的`优势`：  他是用中心点来进行缩放的，同样他**不会**影响其他的盒子。

**一般使用伪元素进行遮罩**,例如`.box::before ` `.box::after `

```js
    .box::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(transparent, rgba(0, 0, 255, 0.3));
      opacity: 0;
       z-index: 1;
    }
```

**注意层级问题,会压住其他盒子**

如果是伪元素before 要设置z-index

## 倾斜skew

# 渐变

## 线性渐变 linear-gradient

基本语法：方向() 颜色

~~~css
background-image: linear-gradient(to right, red, blue, green);
background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .5))
background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
~~~

# 空间转换 3D

## 3D坐标系

3D 坐标系比2D 多了一个Z轴。

![63791714017](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543952.png)

>**一定要记住3个坐标轴取值的正反：**
>
>- X 轴 往右越大，是正值， 否则反之
>- Y 轴 往下越大，是正值，否则反之
>- Z轴  （指向我们）越大，是正值，否则反之   



## 3D位移 translate3d

有完整写法：

~~~css
 transform: translate3d(x, y, z);
~~~

只不过在很多情况下，我们经常喜欢分开写：

~~~css
transform: translateX(100px);
transform: translateY(100px);
transform: translateZ(100px);
~~~

只设置translateZ() 需要父元素设置透视`perspective` 不然没效果



## 透视 perspective

透视的作用： 空间转换时，为元素添加近大远小、近实远虚的视觉效果

语法:

~~~css
 perspective: 800px;
~~~

**透视注意事项：**

1. 取值范围经常在 800px ~  1200px 之间。

2. 一定给**父元素**添加

3. 透视距离也称为视距，所谓的视距就是人的眼睛到屏幕的距离。

   - 其中 d 为透视的距离
   - z 是 `translateZ` 的距离， 这个距离靠近我们，盒子越大

   ![63791754918](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543953.png)

## 3D旋转

有了**透视**的加持，我们3d旋转效果会比较明显。

**以父元素中心旋转**

### rotateX 

类似单杠旋转。

 <img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543954.gif">

> 注意：默认的旋转中心在盒子的中心位置。

~~~css
 body {
     /* 父级添加透视 */
     perspective: 400px;
}

img {
    transition: all 1s;
}

img:hover {
    transform: rotateX(360deg);
}
~~~

效果展示：

 ![63791792216](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543955.png)

### rotateY 

类似钢管舞。

 ![63791795887](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543956.png)

~~~css
body {
    perspective: 400px;
}

img {
    transition: all 1s;
}

img:hover {
    transform: rotateY(360deg);
}
~~~

效果如下：

 ![63791801317](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543957.png)

## 左手法则

一定要搞清楚X轴和Y轴如何旋转的，旋转的度数是正值还是负值。

 ![63791808340](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543958.png)

规则：

1. 大拇指指向X轴正向方（右）， 则四指指向的方向是旋转的方向
2. 大拇指指向Y轴正向方（下）， 则四指指向的方向是旋转的方向

## 立体呈现   preserve-3d

让子盒子在父盒子内有空间的展示，此时可以给**父亲**添加

~~~css
 transform-style: preserve-3d;
~~~

## perspective 和  transform-style 区别

- perspective  是透视，可以让电脑模拟 3d效果， 实现近大远小的效果。
- transform-style 立体呈现 可以让 子元素 里面按照设置位移，旋转，缩放，扭曲等。如果不给父元素这个属性，这里面所有的子盒子都是平面的。
- 正常情况下： **爷爷设置perspective、父亲设置transform-style: preserve-3d、孩子们设置位移，旋转，缩放，扭曲等**。

**exp**

//todo 旋转完 back会显示反面,能不能设置镜像?

```css
    .cube{
      position: relative;
      margin: 50px auto;
      width: 300px;
      height: 300px;
      background-color: aqua;
      transform-style: preserve-3d;
      transition: all 1s;
    }
    .cube:hover{
      transform: rotateY(120deg);
    }
    .cube div{
      position: absolute;
      width: 100%;
      height: 100%;
      color: white;
      text-align: center;
      font-size: 32px;
      line-height: 300px;
    }
    .cube .front{
      background-color:lightpink;
      transform:translateZ(100px)
    }
    .cube .back{
      background-color:wheat;
      transform:translateZ(-100px);
      /* transform:rotateY(180deg) */
    }
```



**exp2** 3dnav

```css

    .nav li{
      perspective: 200px;
      width: 100px;
      height: 50px;

      color: #fff;
    }
    .nav li a{
      position: relative;
      display: block;
      height: 100%;
      width: 100%;
      color: #fff;
      font-size: 18px;
      /* 给父元素添加 */
      transform-style: preserve-3d;
      transition: all 0.5s
    }
    .nav li a span{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      text-align: center;
      line-height:50px;
    }
    .nav li a span:nth-child(1){
      background-color: coral;
       /* 上面盒子  沿着x轴旋转90度， 往上走 y 25px 负值*/
       /* 要写在一起且先旋转再往上移动,不然显示不正常 */
      transform: translateY(-25px) rotateX(90deg);

      /* rotateX(90deg) transform: translateY(-25px); */
      /* transform:rotateX(90deg);
        transform:rotateX(90deg) */
    }
    .nav li a span:nth-child(2){
      /* 下面盒子 往我们面前移动 25px， z轴正值*/
      background-color: aqua;
      transform:translateZ(25px);
    }
    .nav li a:hover {
      transform: rotateX(-90deg);
    }
```



# 动画（重点）

动画最大的特点可以不用鼠标触发，自动的，反复的执行某些动画。

动画使用分为定义和调用：

1. **定义：**

   ~~~css
   /* 1. 定义的动画 */
   @keyframes dance {
   
       from {
           transform: scale(1)
       }
   
       to {
           transform: scale(1.5)
       }
   }
   ~~~

   或者是

   - 百分比是相对于**时间**

   ~~~css
    /* 1. 定义的动画 */
       @keyframes dance {
   
          0% {
           transform: scale(1)
         } 
   
         100% {
           transform: scale(1.5)
         }
       }
   ~~~

2. **调用**

   ~~~css
   img {
       width: 200px;
       /* 2. 使用动画  animation: 动画名称 执行时间;   infinite 循环*/
       animation: dance .5s infinite;
   }
   ~~~

## 动画属性 animation

![63791846861](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543959.png)

**重要!**

1. 动画名字参照css类选择器命名
2. 动画时长和延迟时间别忘了带单位 s 
3. **infinate**   无限循环动画（重复次数）
4. **alternate**  为反向 就是<u>左右来回执行动画</u>（跑马灯）
5. **forwards**  动画结束<u>停留在最后一帧状态</u>， 不循环状态使用
6. **linear**   让动画匀速执行 默认是ease(慢->快->慢)

![animation](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543960.png)

### 鼠标经过暂停动画 

`animation-play-state: paused;`

~~~css
/* 鼠标经过box，  则 ul 停止动画 */
.box:hover ul {
    animation-play-state: paused;
}
~~~

### 多组动画

用逗号分隔

~~~css
/* 我们想要2个动画一起执行  animation: 动画1, 动画2, ... 动画n */
animation: run 1s steps(12) infinite, m  ove 5s linear forwards;
~~~

### 逐帧动画

使用steps实现逐帧动画

逐帧动画:帧动画。开发中，一般配合**精灵图**实现动画效果。

**`animation-timing-function: steps(N);`**

将动画过程等分成N份



### transition 和  animation的区别

- transition:  属性  花费时间   速度曲线   延时时间;

  - ~~~css
    transition: width 2s ease 1s;   
    ~~~

- animation: 动画名称   花费时间  速度曲线  延时时间   重复次数  动画方向  执行完毕的状态;

- 过渡经常配合鼠标经过使用，只能设置起始和结束状态。

- 动画可以自动执行，而且无限循环等。（其中 动画名称和花费时间必须要写），里面可以有很多的形态，比如 0%，  10% .... 100%



# 移动端

## normalize.css

移动端 CSS 初始化推荐使用 normalize.css

官网地址: http://necolas.github.io/normalize.css/

## PC端/移动端不同？

PC端

- 屏幕大，网页固定版心
- 端浏览器繁多，更多考虑兼容性问题。（布局： 浮动+定位+标准流）

移动端

- 手机屏幕小，网页宽度多数为100%，是适配手机屏幕宽度
- 移动端则基本不需要考虑兼容性问题，放心大胆使用CSS新特性

## 物理分辨率和逻辑分辨率

1. 物理分辨率：硬件所支持的，屏幕出厂就设定无法修改
2. 逻辑分辨率：软件可以达到的， 我们开发中写的是逻辑分辨率

## 视口

视口（viewport）就是浏览器显示页面内容的**屏幕区域**。

视口的分类：

1. 布局视口 。  iOS, Android基本都将这个视口分辨率设置为980px。

 ![63800512844](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543961.png)

2. 视觉视口。用户正在看到的网站的区域。

 ![63800516674](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543962.png)

3. 理想视口。 设备有多宽，我的网页就显示有多宽

 ![63800520565](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543963.png)

## 视口标签

使用meta标签设置视口宽度，制作适配不同设备宽度的网页

有了视口标签，可以达到我们想要的**理想视口**。

~~~css
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
~~~

- width=device-width：视口宽度=设备宽度
- initial-scale=1.0：初始页面缩放倍数
- maximum-scale=1.0    最大缩放倍数
- user-scalable=0    不允许用户缩放页面（移动端） 或者为 no  如果为 yes 则允许用户缩放

## 二倍图

其实实际开发中还有三倍图甚至四倍图等，多倍图，但是现在市场还是二倍图偏多，我们称为二倍图。

简单理解，二倍图存在就是为了让页面中图片更加清晰，遵循即可。

-   图片设计稿为 100x100, 然后选择 缩小一半通过 代码css改为 50x50 ,放到真机里面则不模糊

> 1. 网页美工的设计稿基本是 750px
> 2. 我们前端工程师拿到设计稿利用像素大厨**选择 2X**， 进行缩小一半，按照提示的单位开发即可。

 ![63800549386](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543964.png)

![63800551240](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543965.png)



> 百分比布局:使用百分比布局开发网页 也叫流式布局
>
> 效果: **宽度自适应(100%)，高度固定。**

**背景精灵图**

- 背景精灵图也存在二倍图
- 核心做法:
- 到像素大厨里面选择2X，利用background-size缩放背景图片
- 测量坐标即可

#  flex布局

flex布局极大的提高了我们布局的效率，更简单、灵活。

![63800561629](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543966.png)

> display: flex;  一定要给**亲爸爸**加。

1. 在flex眼中，标签不再分类。

   - 简单说就是没有块级元素，行内元素和行内块元素
   - 任何一个元素都可以直接给宽度和高度一行显示

2. Flex不存在脱标的情况：也就是基本淘汰了浮动，更不用清除浮动

3. 当然存在兼容性问题，如果不考虑兼容性可以大量使用，如果是移动端则不用考虑直接flex

   <https://caniuse.com/>   可以查看兼容性

## 主轴对齐方式

修改主轴对齐方式属性: **justify-content**

| 属性值                | 作用                                                |
| --------------------- | --------------------------------------------------- |
| flex-start            | 默认值, 起点开始依次排列                            |
| flex-end              | 终点开始依次排列                                    |
| **` center`**         | 沿主轴居中排列                                      |
| **`space-around`**    | 弹性盒子沿主轴均匀排列,  空白间距均分在弹性盒子两侧 |
| **`space-between `**  | 弹性盒子沿主轴均匀排列,  空白间距均分在相邻盒子之间 |
| **` space-evenly  `** | 弹性盒子沿主轴均匀排列,  弹性盒子与容器之间间距相等 |



重点记住标红的。如果非要问我那个常用，我只能说是  `space-between ` 

~~~css
justify-content: space-between;
~~~

显示效果：**两侧没缝隙**

![63800582917](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543967.png)

~~~css
justify-content: space-around;
~~~

效果如下：  **记住2倍**

![63800603827](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543968.png)

~~~css
justify-content: space-evenly;
~~~

效果如下： **记住空隙一样大**

![63800611991](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543969.png)

~~~css
 justify-content: center;
~~~

效果如下： **经常用于让一个盒子水平居中**

![63800615173](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543970.png)

记忆：

1. 两侧没缝隙是 between
2. 缝隙一样大是 evenly
3. 2倍缝隙是 around

**小技巧：**

 ![64069442849](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543971.png)

见到这个效果，最简单的做法就是： 给大盒一个 左右的padding， 然后在加 `justify-content: space-between`

## 侧轴对齐方式

使用**align-items**调节元素在侧轴的对齐方式

| 属性值         | 作用                                                         |
| -------------- | ------------------------------------------------------------ |
| flex-start     | 起点开始依次排列                                             |
| flex-end       | 终点开始依次排列                                             |
| **`center  `** | 沿侧轴居中排列                                               |
| **stretch**    | 默认效果, 弹性盒子沿着侧轴线被拉伸至铺满容器(flex-item不设置高度的情况下) |

重点记住center ，可以让元素垂直居中。

~~~css
align-items: center;
~~~



我们可以通过flex让一个子盒子水平和垂直居中。

 ![63800636092](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543972.png)

~~~css
.father {
    width: 500px;
    height: 500px;
    background-color: pink;
    /* 设置为flex布局 */
    display: flex;
    /* 主轴水平居中 */
    justify-content: center;
    /* 侧轴垂直居中 */
    align-items: center;
}

.son {
    width: 200px;
    height: 200px;
    background-color: purple;
}
~~~

## 伸缩比

使用flex属性修改弹性盒子伸缩比

把父盒子分为若干份数，每个子盒子各占几份。

>flex:1; 

1. 只占用父盒子剩余尺寸
2. 是给**子盒子**添加这个属性

语法：

~~~css
flex: 1;
~~~

比如有一个父盒子里面有三个子盒子，每个子盒子写 flex：1；  此时每个子盒子各占三分之一。

~~~css
.father {
    display: flex;
    height: 300px;
    background-color: pink;
}

.father div {
    /* 每个孩子各占1份 */
    flex: 1;
    /* 默认子盒子和父亲一样高 */
    background: purple;
}
~~~

html 结构

~~~html
<div class="father">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
~~~

显示效果：

![63800701573](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543973.png)

>1. 一定要给子盒子添加。
>2. 子盒子默认高度会和父盒子一样高。（前提是不给高度）

```css
    .box div:nth-child(2) {
      background-color: skyblue;
      flex: 2;/* 占(剩余宽度-margin) */
      margin: 0 10px;
      
    }
```



## 圣杯布局

所谓的圣杯布局就是左右两边大小固定不变，中间宽度自适应。

一般这种布局方式适用于各种移动端顶部搜索部分，这是最常见的，如京东手机版主页面顶部搜索

![63800721880](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543974.png)

核心思路：

- 两侧盒子写固定大小
- 中间盒子 flex: 1;  占满剩余空间

~~~css
.top {
    display: flex;
    justify-content: c;
}

.top div:first-child {
    width: 50px;
    height: 50px;
    background-color: red;
}

.top div:last-child {
    width: 50px;
    height: 50px;
    background-color: red;
}

.top div:nth-child(2) {
    flex: 1;
    height: 50px;
    background-color: pink;
}
~~~

****

>注意：中间flex: 1;     和 width 有冲突。  **优先**执行 flex：1；

```css
      /* 防止盒子变的太小变形 */
      min-width: 300px;
```





## 设置主轴方向

主轴默认是水平方向, 侧轴默认是垂直方向

修改主轴方向属性: flex-direction  

| 属性值         | 作用             |
| -------------- | ---------------- |
| `row  `        | 行, 水平(默认值) |
| `column  `     | *列,  垂直       |
| row-reverse    | 行, 从右向左     |
| column-reverse | 列, 从下向上     |

语法：

~~~css
flex-direction：column;
~~~

修改完毕，主轴是Y轴， 侧轴是X轴。

### 修改主轴经常的使用场景：

请完成如下场景：

比如：

 ![63814422549](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543975.png)

 ![63814419734](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543976.png)

~~~css

~~~



## 弹性盒子换行

> 特性：  给父亲添加了 `display: flex;` 所有的子盒子（弹性盒子）都会在一行显示，不会自动换行。

弹性盒子换行显示 : flex-wrap:

语法：

~~~css
flex-wrap: wrap;
~~~

 ![63814467912](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543977.png)

## 设置侧轴对齐方式



注意:

1. 此处设置侧轴**多行**的垂直对齐方式。  `align-content`（少）
2. 和前面学过的 `align-items` （侧轴**单行**垂直对齐） （多）
3. align 垂直 比如 align-items 垂直对齐      align-content 多行垂直对齐
4. content     主轴  justify-content     align-content  侧轴多行对齐

~~~css
align-content：center；
~~~

| 属性值        | 作用                                                |
| ------------- | --------------------------------------------------- |
| flex-start    | 默认值, 起点开始依次排列                            |
| flex-end      | 终点开始依次排列                                    |
| center        | 沿主轴居中排列                                      |
| space-around  | 弹性盒子沿主轴均匀排列,  空白间距均分在弹性盒子两侧 |
| space-between | 弹性盒子沿主轴均匀排列,  空白间距均分在相邻盒子之间 |

## flex 总结梳理

flex 它是一种布局方式。 主要目的是通过父盒子控制子盒子如何排列,一定是亲爸爸和亲儿子

### 主轴排列方式（重点）

默认的水平，但是可以转换。

1. 如果给父盒子添加 display: flex 

   ![63815370734](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543978.png)

2. justify-content: center;

   ![63815375813](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543979.png)

3. justify-content: **space-between;** 左右两侧无缝隙

   ![63815379669](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543980.png)

4. justify-content: space-around;   两倍关系

   ![63815385707](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543981.png)

5. justify-content: space-evenly;   缝隙均等

   ![63815390752](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543982.png)

### 侧轴对齐方式-单行对齐（重点）

1. 默认的对齐方式  stretch 拉伸

2. 顶对齐  flex-start

   ![63815398806](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543983.png)

3. align-items: center;   (重点)

   ![63815403693](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543984.png)

### 侧轴对齐方式-多行

1. align-content: space-between;

   ![63815410074](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543985.png)

2. align-content: space-around; 

   ![63815414978](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543986.png)

3. align-content: space-evenly; 

   ![63815418652](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543987.png)

4. align-content: center;

   ![63815423184](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543988.png)

### 弹性盒子换行（重点）flex-wrap 

特别是多行的情况下，我们需要给弹性盒子换行，给 父盒子 弹性容器加。

~~~css
flex-wrap: wrap;
~~~

### 设置主轴方向（重点）flex-direction

~~~css
flex-direction: column;
~~~

让我们的主轴设置为垂直。 默认的是 row  水平的。

 ![64722514425](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543989.png)

# LESS

less 可以帮我们把px单位转换到rem单位。

Less是一个CSS预处理器, Less文件后缀是.less

扩充了 CSS 语言, 使 CSS 具备一定的逻辑性、计算能力。

**vscode插件Easy Less :**

-  作用:less文件保存自动生成css文件
-  注意: html页面引入的还是css文件，而不是 less 文件

## less 运算

~~~less
.box {
  width: 100px + 100;
  // 注意：单位的转换 计算的时候以第一个单位为准
  height: (100 / 37.5rem);
  // height: (100rem / 37.5);
  // height: 100px - 50;
  margin: (20px * 5) auto;
  padding: (10px / 5);
  border: 1px + 2 * 3 solid red;

}
~~~

注意点：

1. 计算以第一个单位为准， 尽量写到最后一个数字上。 比如

   ~~~less
    height: (100 / 37.5rem);
   ~~~

2. **除法比较特殊，必须添加小括号。**

3. 计算别忘了先乘除后加减

##  less 嵌套

![63832837039](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543990.png)

可以生成后代选择器

~~~less
.father {
    width: 500px;
    height: 500px;
    background-color: purple;
  
    .son {  // 孩子
        width: 200px;
        height: 200px;
        background-color: pink;
        p {
            color: red;
        }
    }

}
~~~

生成css之后：

~~~ css
.father {
  width: 500px;
  height: 500px;
  background-color: purple;
}
.father .son {
  width: 200px;
  height: 200px;
  background-color: pink;
}
.father .son p {
  color: red;
}
~~~



**我们在写伪类和伪元素的时候，经常使用 `&` 来代替父元素** 

~~~less
.nav {
  width: 100px;
  height: 100px;
  background-color: pink;
  &::before {
    content: '1';
  }
  &:hover::before {
    color: red;
  }
}
~~~

~~~css
.nav {
  width: 100px;
  height: 100px;
  background-color: pink;
}
.nav::before {
  content: '1';
}
.nav:hover::before {
  color: red;
}

~~~



## less 变量

变量最大的优点是： 方便使用和修改。

语法：

~~~css
@变量名: 值;
@fontSize: 16px;
~~~

~~~css
@suibian: hotpink;
body {
  background-color: @suibian;
}
p {
  background-color: @suibian;

}
div {
  color: @suibian;
}
nav {
  border: 1px solid @suibian;
}
~~~

~~~css
body {
  background-color: hotpink;
}
p {
  background-color: hotpink;
}
div {
  color: hotpink;
}
nav {
  border: 1px solid hotpink;
}
~~~

	-  建议： 小驼峰命名法     @backgroundColor

~~~less
// 背景颜色变量
@backGroundColor: deeppink;
// 定义边框
@bd: 3px solid green;
.father {
  width: 500px;
  height: 500px;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  border: @bd;
  .son {
    width: 200px;
    height: 200px;
    background-color: skyblue;
    border: @bd;
  }
  // &:hover .son {
  //   background-color: hotpink;
  // }
  &:hover {
    .son {
      background-color: @backGroundColor;
    }
  }
}
~~~

## less导入

less的导入实际 是  less 文件的导入。 

~~~less
@import './变量.less';
@import url(./变量.less);
~~~

使用less导入的好处是：  减少了html页面 的 link标签数量。

## less 导出

可以使用插件来设置导出：

~~~css
  "less.compile": {
    "out": "../css/" // 设置导出css路径
  },
~~~



手动给每个less文件指定导出

>导出必须写到第一行

~~~less
// out: 路径/文件名
~~~

~~~css
// out: ./mycss/pink.css
~~~

设置导出：  当面目录下，创建一个 mycss 文件夹， 生成 一个 pink.css （做了改名）

~~~css
// out: ./mycss/
~~~

设置导出：  当面目录下，创建一个 mycss 文件夹， 生成 一个 跟less一样的文件名（原名）

## less 禁止导出

~~~less
// out: false
~~~



## 小结

我们的需求的是要做移动端适配： 页面中的元素尺寸跟随屏幕宽度等比例缩放（适当调整大小）

方案如下：

flex + rem  + flexiable.js  + less  

1. 我们移动端采取 `flex 布局`。
2. rem单位：  做移动端`适配`的。 
   - rem相对单位，跟html文字大小有关系
3. 媒体查询： `检测屏幕的视口宽度`
4. flexiable.js ：`可以根据屏幕的宽度自动修改html文字大小`
5. less:  `less让我们的css具有了计算能力`
   - less 可以让我们很方便的 把 px 转换为 rem  



# 适配方案

移动端的适配方案：

1.  flex + rem单位   做适配效果  （比如淘宝和小米移动端） 当前市场最多       
2.  flex + viewport  width /vh单位  做适配效果  （比如 B站移动端 ） 新兴，马上的一个趋势

>让flex做布局（盒子摆放），让rem或者vw/vh 实现网页元素的尺寸（宽度和高度）适配屏幕

## rem 适配

### rem 单位

rem 是一个**相对单位**，**1rem 就是 html 文字的大小**

比如

~~~css
html {
    font-size: 35px;
}
~~~

则此时  1rem 就是 35像素。

 **rem单位尺寸**

1. 确定设计稿对应的设备的HTML标签字号
   	查看设计稿宽度 → 确定参考设备宽度(视口宽度) → 确定基准根字号(1/10视口宽度)

2. rem单位的尺寸

   rem单位的尺寸 = px单位数值 / 基准根字号

### 媒体查询（了解）

媒体查询 mediaquery  可以自动检测视口的宽度。

媒体查询一个非常大的作用是：`根据屏幕宽度修改html文字大小`。

> 使用媒体查询, 根据不同的视口宽度, 设置不同的根字号 ，就完成了适配

**语法：**

~~~css
@media (width:375px) {
    html {
        font-size: 40px;
    }
}

@media (width:320px) {
    html {
        font-size: 30px;
    }
}
~~~

综合：

~~~css
@media (width:375px) {
    html {
        font-size: 37.5px;
    }
}
@media (width:414px) {
    html {
        font-size: 41.4px;
    }
}


.box {
    width: 5rem;
    height: 5rem;
    background-color: pink;
}
~~~



>通过媒体查询，检测不同的视口宽度，设定不同的html文字大小，元素设置rem单位后，可以达到元素适配效果

### flexible.js 

媒体查询写起来超级麻烦，而且检测不够精确，因此我们使用 flexible.js 这个 js文件，通过js 实时检测屏幕窗口的变化实现检测视口宽度。

这个也是值得提倡使用的一种方式。

>有了这个js文件，可以帮我们自动**检测屏幕宽度**，**自动修改html文字大小**，这样就可以让盒子配合rem完成适配。

~~~html
<script src="./js/flexible.js"></script>
~~~

### 如何把设计稿的px转换为rem 

问题：

1. flexible 能够修改html文字大小，修改文字大小:   当前屏幕 / 10  就是文字大小

   例如：  当前屏幕 375px，则加了 flexible之后，html文字大小为 37.5px 

2. 我们的设计稿里面元素大小是固定的吗？ 是 ， 而是 px 单位 ，但是我们开发的时候，要使用 rem 才能适配。

3. 那怎么把我们测量的px 转换为适配的rem呢？ 

   >直接使用**测量的px值 /  37.5** 就是 rem的值

后面我们学习vue开发的时候，所有的单位我们写  px。就足够了。  





## vw / vh

相对单位

相对**视口的尺寸**计算结果

**vw就是视口的宽度，vw 是个相对单位。**  

不管在什么屏幕下， 我们把屏幕分为平均的 100等份。  

>1vw =  1 / 100 屏幕的宽度 

1vw  和    1%  

width: 1vw; 

width: 1%;

vw 和  1% 有没有区别：

1. vw 永远是以视口的宽度为准。· 在 375设计稿下， 1vw 永远是  3.75px
2. 百分比以父盒子为准。  假如父盒子是 200px，则 1% 是 2px

### px 如何转为vw

我们设计稿是 iphone 678  是  375px， vw 把屏幕划分了100等份， 则 1vw  =  3.75 px

有个盒子啊，我测量了下，他的宽度是 3.75px * 3.75px ，则 写成 vw 是多少？    1vw * 1vw

又一个盒子，宽度和高度分别是  37.5px 和 37.5px  ，则 转换为vw 是多少？  10vw * 10vw 

有一个盒子  68px  *  29px ，则我们写代码 less  vw  ？

~~~less
width: (68 / 3.75vw);
height: (29 / 3.75vw);

~~~

### tabs 布局分析

![64118199048](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543991.png)

里面需要放一个 tabs-list 盒子   这个盒子放 a 

拖动的时候，拖动的是   tabs-list 

里面有很多小链接， 不允许换行。

给 tabs-list  添加 display: flex;   因为 加了弹性容器 ，里面所有的弹性盒子都会沿着主轴一行显示，不会换行。

文字不允许换行

~~~css
white-space: nowrap;
~~~



## 媒体查询

学习媒体查询的目的：

1. 了解如何使用媒体查询做响应式页面。
2. 为接下来学的 Bootstrap  做铺垫。

### **外链式**

```css
<!-- 宽度大于 900px 的屏幕使用该样式 -->
<link rel="stylesheet" media="screen and (min-width: 900px)" href="widescreen.css">
<!-- 宽度小于或等于 600px 的屏幕使用该样式 -->
<link rel="stylesheet" media="screen and (max-width: 600px)" href="smallscreen.css">
....
```

**Exp**

~~~css
body {
    background-color: gray;
}

/* 大于等于768px 为粉色 */
@media (min-width: 768px) {
    body {
        background-color: pink;
    }
}

/* 大于等于992px 为蓝色 */
@media (min-width: 992px) {
    body {
        background-color: skyblue;
    }
}

/* 大于等于992px 为绿色 */
@media (min-width: 1200px) {
    body {
        background-color: green;
    }
}
~~~

### **使用场景**

#### 约束移动端不要超过规定大小

~~~css
body {
    max-width: 540px;
    margin: 0 auto;
}

/* 大于等于540px 则不允许  html文字大小再改动，强制定为 54px*/
@media (min-width: 540px) {
    html {
        font-size: 54px !important;
    }
}
~~~

#### 元素的显示和隐藏

~~~css
@media (max-width: 800px) {
    .box div:nth-child(2) {
        display: none;
    }

    .box div:last-child {
        width: 350px;
    }
}
~~~

#### 响应式原理

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      width: 1000px;
      height: 150px;
      /* background-color: pink; */
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
    }

    .box div {
      width: 25%;
      background-color: skyblue;
      height: 150px;
      margin-bottom: 20px;
    }

    .box div:nth-child(even) {
      background-color: pink;
    }

    @media (max-width: 992px) {
      .box {
        width: 768px;
      }

      .box div {
        width: 50%;
      }
    }

    @media (max-width: 768px) {
      .box {
        width: 100%;
      }

      .box div {
        width: 100%;
      }
    }
  </style>
</head>

<body>
  <div class="box">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
</body>

</html>
~~~



# Bootstrap 

Bootstrap 是由 Twitter 公司开发维护的前端 **UI 框架**，它提供了大量编写好的 CSS 样式，允许开发者结合一定 HTML 结构及JavaScript，快速编写功能完善的网页及常见交互效果。

中文官网: <https://www.bootcss.com/>

下载安装包。

开发中，我们都是**按需导入**，简单理解，需要用到啥，我们复制那个文件，没有必要都放入，提高性能。

使用步骤：

1. 复制 css文件

   ![63837279259](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543992.png)

   并且引入到html文件中

   ~~~html
   <link rel="stylesheet" href="./css/bootstrap.min.css">
   ~~~

2. 复制字体图标文件夹

   ![63837284310](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543993.png)

3. 如果需要js，则复制js文件，并引入html文件中

   ~~~html
   <script src="./js/bootstrap.min.js"></script>
   ~~~

4. 使用内部预定义好的类即可。

   ~~~html
   <div class="container">我的内容</div>
   ~~~

## 栅格系统

### container

**.container**是 Bootstrap 中专门提供的类名，所有应用该类名的盒子，默认已被指定宽度且居中。

.container-fluid也是 Bootstrap 中专门提供的类名，所有应用该类名的盒子，宽度均为 100%。

分别使用**.row**类名和 **.col**类名定义栅格布局的行和列。



栅格系统(gridsystems),也叫“网格系统，它就是通过一系列的**行（row）与列（column）**的组合创建页面布局。

简单说，栅格系统也是一种布局方式。 BootStrap 给咱们内置好了一套布局系统。

BootStrap3默认将网页**分成12等份**

![bs-grid](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543994.png)比如，超大屏幕下我们想要一个通栏的大盒子

~~~html
 <div class="container">
    <div class="col-lg-12">我自己独占一行</div>
  </div>
~~~

又比如，超大屏幕下，我们想要一行左右来分

~~~html
<div class="container">
    <div class="col-lg-6">我占左边6个</div>
    <div class="col-lg-6">我站右边6个</div>
</div>
~~~

![63837547481](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543995.png)

超大屏下，如果一行放4个，怎么做呢？

~~~css
 <div class="container">
    <div class="col-lg-3">我占左边3个</div>
    <div class="col-lg-3">我站右边3个</div>
    <div class="col-lg-3">我站右边3个</div>
    <div class="col-lg-3">我站右边3个</div>
  </div>
~~~

如果实现不同屏幕下，不同的显示个数，可以通过使用不同类名。

还是这4个盒子，如果在中等屏幕下放3个怎么做呢？

~~~css
 <div class="container">
    <div class="col-lg-3 col-md-4">盒子内容</div>
    <div class="col-lg-3 col-md-4">盒子内容</div>
    <div class="col-lg-3 col-md-4">盒子内容</div>
    <div class="col-lg-3 col-md-4">盒子内容</div>
  </div>
~~~

还是这4个盒子，如果在小屏幕下放2个怎么做呢？

~~~css
<div class="container">
    <div class="col-lg-3 col-md-4 col-sm-6">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6">盒子内容</div>
  </div>
~~~

还是这4个盒子，如果在超小屏幕下放1个怎么做呢？

~~~css
 <div class="container">
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">盒子内容</div>
  </div>
~~~



**注意:**

1. **container类自带间距15px;** 
2. **row类自带间距-15px**

### row 类

row 可以去掉container默认的内边距



## 列偏移

列偏移 通过  col-lg-**offset**-*  

让盒子往右侧走，左边有几份

比如：

~~~css
    .first div {
      height: 100px;
      background-color: pink;
    }

    .second div {
      background-color: purple;
      height: 100px;
    }

    .third div {
      height: 100px;
      background-color: skyblue;
    }

~~~

~~~html
  <div class="container">
    <div class="row first">
      <div class="col-lg-4">左侧</div>
      <div class="col-lg-4 col-lg-offset-4">右侧</div>
    </div>
    <div class="row second">
      <div class="col-lg-3 col-lg-offset-3">1侧</div>
      <div class="col-lg-3 col-lg-offset-3">2侧</div>
    </div>
    <div class="row third">
      <div class="col-lg-6 col-lg-offset-3"></div>
    </div>
  </div>

~~~

效果如下：

![63849848929](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543996.png)

## 列嵌套

一个盒子里面可以再嵌套其他的盒子，但是站在这个盒子的角度来看，他又分为了12份。

~~~css
.container .row div {
      height: 100px;
      background-color: pink;
    }
~~~

~~~html
<div class="container">
    <div class="row">
      <div class="col-lg-4">
        <p class="col-lg-6">登录</p>
        <p class="col-lg-6">注册</p>
      </div>
      <div class="col-lg-4">2</div>
      <div class="col-lg-4">3</div>
    </div>
  </div>
~~~

效果：

![63850012795](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261543997.png)



## 反馈

1. px  pt  em   rem   vw  几个单位
   - px  绝对单位 网页布局最常用的单位， 一般用于pc端布局。  px 像素的意思。  版心是 1200px  
   - pt  点  常用于 印刷。   或者 ios 常用的单位。 我们前端基本不用。
   - em   相对单位。   1em 就是当**前的一个文字**大小。 场景：   段落首行缩进 2个字。   text-indent: 2em;
   - rem 相对单位。  相对于 **html标签** 的文字大小，跟其余标签没有任何关系。  场景： 做适配。
   - vw 可以看做是适配的终极版本。  vw也是相对单位。  vw 把屏幕划分了 100等份。 场景： 做适配。



