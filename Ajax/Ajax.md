# Ajax

**Asynchronous Javascript And XML（异步 JavaScript 和 XML）**

## jQuery中的Ajax

浏览器中提供的 XMLHttpRequest 用法比较复杂，所以 jQuery 对 XMLHttpRequest 进行了封装，提供了一系列 Ajax 相关的函数，极大地降低了 Ajax 的使用难度。

jQuery 中发起 Ajax 请求最常用的三个方法如下：

-  $.get()
-  $.post()
-  $.ajax()

##  $.get()

jQuery 中 $.get() 函数的功能单一，专门用来发起 get 请求，从而将服务器上的资源请求到客户端来进行使用。

$.get() 函数的语法如下：

`$.get(url, [data], [callback])`

| **参数名** | **参数类型** | **是否必选** | **说明**                 |
| ---------- | ------------ | ------------ | ------------------------ |
| url        | string       | 是           | 要请求的资源地址         |
| data       | **object**   | 否           | 请求资源期间要携带的参数 |
| callback   | function     | 否           | 请求成功时的回调函数     |



##  $.post()

jQuery 中 $.post() 函数的功能单一，专门用来发起 post 请求，从而向服务器提交数据。

$.post() 函数的语法如下：

`$.post(url, [data], [callback])`



| **参数名** | **参数类型** | **是否必选** | **说明**                 |
| ---------- | ------------ | ------------ | ------------------------ |
| url        | string       | 是           | 提交数据的地址           |
| data       | **object**   | 否           | 要提交的数据             |
| callback   | function     | 否           | 数据提交成功时的回调函数 |



##  $.ajax()

相比于 $.get() 和 $.post() 函数，jQuery 中提供的 $.ajax() 函数，是一个功能比较综合的函数，它允许我们对 Ajax 请求进行更详细的配置。

$.ajax() 函数的基本语法如下：

```js
$.ajax({
   type: '', // 请求的方式，例如 GET 或 POST
   url: '',  // 请求的 URL 地址
   data: { },// 这次请求要携带的数据
   success: function(res) { } // 请求成功之后的回调函数
})

```



### 6.4 使用$.ajax()发起GET请求

```js
$.ajax({
   type: 'GET', // 请求的方式
   url: 'http://www.liulongbin.top:3006/api/getbooks',  // 请求的 URL 地址
   data: { id: 1 },// 这次请求要携带的数据
   success: function(res) { // 请求成功之后的回调函数
       console.log(res)
   }
})

```



### 6.4 使用$.ajax()发起POST请求

```js
$.ajax({
   type: 'POST', // 请求的方式
   url: 'http://www.liulongbin.top:3006/api/addbook',  // 请求的 URL 地址
   data: { // 要提交给服务器的数据
      bookname: '水浒传',
      author: '施耐庵',
      publisher: '上海图书出版社'
    },
   success: function(res) { // 请求成功之后的回调函数
       console.log(res)
   }
})
```

# 接口

使用 Ajax 请求数据时，被请求的 URL 地址，就叫做数据接口（简称接口）。同时，每个接口必须有请求方式。

例如：

```
http://www.liulongbin.top:3006/api/getbooks  获取图书列表的接口(GET请求)
http://www.liulongbin.top:3006/api/addbook   添加图书的接口（POST请求）
```

![image-20220517172641316](/Users/wsp/Library/Application Support/typora-user-images/image-20220517172641316.png)

![image-20220517172653930](/Users/wsp/Library/Application Support/typora-user-images/image-20220517172653930.png)

## 接口文档

接口文档，顾名思义就是**接口的说明文档**，它是我们调用接口的依据。好的接口文档包含了对接口URL，参数以及输出内容的说明，我们参照接口文档就能方便的知道接口的作用，以及接口如何进行调用。

### 接口文档的组成部分

接口文档可以包含很多信息，也可以按需进行精简，不过，一个合格的接口文档，应该包含以下6项内容，从而为接口的调用提供依据：

- **接口名称**：用来标识各个接口的简单说明，如登录接口，获取图书列表接口等。
- **接口URL**：接口的调用地址。
- **调用方式**：接口的调用方式，如 GET 或 POST。
- **参数格式**：接口需要传递的参数，每个参数必须包含参数名称、参数类型、是否必选、参数说明这4项内容。
- **响应格式**：接口的返回值的详细描述，一般包含数据名称、数据类型、说明3项内容。
- 返回示例（可选）：通过对象的形式，例举服务器返回数据的结构。

# 表单

表单在网页中主要负责数据采集功能。HTML中的`<form>`标签，就是用于采集用户输入的信息，并通过`<form>`标签的提交操作，把采集到的信息提交到服务器端进行处理。

```html
<form>
    <input type="text" name="email_or_mobile" />
    <input type="password" name="password" />
    <input type="checkbox" name="remember_me" checked />
    <button type="submit">提交</button>
</form>

```

表单由三个基本部分组成：

- 表单标签
- 表单域
- 表单按钮

`<form>`标签用来采集数据，`<form>`标签的属性则是用来规定如何把采集到的数据发送到服务器。

| **属性** | **值**                                                       | **描述**                                   |
| -------- | ------------------------------------------------------------ | ------------------------------------------ |
| action   | URL地址                                                      | 规定当提交表单时，向何处发送表单数据       |
| method   | get或post                                                    | 规定以何种方式把表单数据提交到 action  URL |
| enctype  | application/x-www-form-urlencoded  multipart/form-data  text/plain | 规定在发送表单数据之前如何对其进行编码     |
| target   | _blank  _self  _parent  _top  *framename*                    | 规定在何处打开 action  URL                 |



## `<form>`标签的属性

### action

**`action` 属性用来规定当提交表单时，向何处发送表单数据。**

`action` 属性的值应该是后端提供的一个 URL 地址，这个 URL 地址专门负责接收表单提交过来的数据。

当 `<form>` 表单在未指定 action 属性值的情况下，`action` 的默认值为当前页面的 URL 地址。

- 注意：当提交表单后，页面会立即跳转到 action 属性指定的 URL 地址

### target

target 属性用来规定在何处打开 action URL。

它的可选值有5个，默认情况下，target 的值是 _self，表示在相同的框架中打开 action URL。



| **值**      | **描述**                       |
| ----------- | ------------------------------ |
| **_blank**  | **在新窗口中打开。**           |
| **_self**   | **默认。在相同的框架中打开。** |
| _parent     | 在父框架集中打开。（很少用）   |
| _top        | 在整个窗口中打开。（很少用）   |
| *framename* | 在指定的框架中打开。（很少用） |

 

### method

**method 属性用来规定以何种方式把表单数据提交到 action URL。**

它的可选值有两个，分别是 get 和 post。

默认情况下，method 的值为 get，表示通过URL地址的形式，把表单数据提交到 action URL。

**注意：**

- get 方式适合用来提交少量的、简单的数据。
- post 方式适合用来提交大量的、复杂的、或包含文件上传的数据。
- 在实际开发中，`<form>` 表单的 post 提交方式用的最多，很少用 get。
  - 例如登录、注册、添加数据等表单操作，都需要使用 post 方式来提交表单。



### enctype 

enctype 属性用来规定在**发送表单数据之前如何对数据进行编码**。

它的可选值有三个，默认情况下，enctype 的值为 application/x-www-form-urlencoded，表示在发送前编码所有的字符。



| **值**                            | **描述**                                                     |
| --------------------------------- | ------------------------------------------------------------ |
| application/x-www-form-urlencoded | 在发送前编码所有字符（默认）                                 |
| multipart/form-data               | 不对字符编码。  在使用包含文件上传控件的表单时，必须使用该值。 |
| text/plain                        | 空格转换为 “+”  加号，但不对特殊字符编码。（很少用）         |

**注意：**

- 在涉及到**文件上传**的操作时，必须将 enctype 的值设置为 **multipart/form-data**
- 如果表单的提交**不涉及到文件上传**操作，则直接将 enctype 的值设置为 **application/x-www-form-urlencoded** 即可！



## 表单的同步提交

通过点击 submit 按钮，触发表单提交的操作，从而使页面跳转到 action URL 的行为，叫做表单的同步提交。

**缺点**

- `<form>`表单同步提交后，整个页面会发生跳转，跳转到 action URL 所指向的地址，用户体验很差。
- `<form>`表单同步提交后，页面之前的状态和数据会丢失。

**解决方案：表单只负责采集数据，Ajax 负责将数据提交到服务器。**



## 通过Ajax提交表单数据

### 监听表单提交事件

在 jQuery 中，可以使用如下两种方式，监听到表单的提交事件：

```js
$('#form1').submit(function(e) {
   alert('监听到了表单的提交事件')
})

$('#form1').on('submit', function(e) {
   alert('监听到了表单的提交事件')
})

```



### 阻止表单默认提交行为

当监听到表单的提交事件以后，可以调用事件对象的 **`event.preventDefault()`** 函数，来阻止表单的提交和页面的跳转，示例代码如下：

```js
$('#form1').submit(function(e) {
   // 阻止表单的提交和页面的跳转
   e.preventDefault()
})

$('#form1').on('submit', function(e) {
   // 阻止表单的提交和页面的跳转
   e.preventDefault()
})

```



### 快速获取表单中的数据

**serialize()函数**

为了简化表单中数据的获取操作，jQuery 提供了 serialize() 函数，其语法格式如下：

- **`$(selector).serialize()`**

**serialize() 函数的好处：可以一次性获取到表单中的所有的数据。**

注意：在使用 serialize() 函数快速获取表单数据时，**必须为每个表单元素添加** **name** **属性**！

```html
<body>
  <form id='f1' action="/login">
    <input type="text" name="uname">
    <input type="password" name="password">
    <button type="submit">submit</button>
  </form>
  <script>
    $(function () {
     $('#f1').submit(function(e){
       e.preventDefault();
      let data=$(this).serialize();
      console.log(data);
     })
    })
  </script>
</body>
```



