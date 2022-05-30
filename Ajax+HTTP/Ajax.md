# Ajax

**Asynchronous Javascript And XML（异步 JavaScript 和 XML）**

## jQuery中的Ajax

![jQuery中的Ajax](/Users/wsp/Documents/Front-End-b/资料/第四阶段：前后端交互阶段资料新/大事件项目课程资料/day2（3-7小节）/笔记/jQuery中的Ajax.png)



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

```js
headers: { },// 请求头配置对象
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

##  ajaxPrefilter

```js
$.ajaxPrefilter(function(options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
})
```

## complete回调实现权限控制

AJAX请求结束后无论成功或者失败都会调用complete回调

```
在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
```

### exp

1. 在调用有权限接口的时候，指定`complete`回调函数：

   ```js
       // 不论成功还是失败，最终都会调用 complete 回调函数
       complete: function(res) {
         // console.log('执行了 complete 回调：')
         // console.log(res)
         // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
         if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
           // 1. 强制清空 token
           localStorage.removeItem('token')
           // 2. 强制跳转到登录页面
           location.href = '/login.html'
         }
       }
   ```

### 优化权限控制的代码

1. 将权限控制的代码，从每个请求中，抽离到 `ajaxPrefilter` 中：

   ```js
   // 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
   // 会先调用 ajaxPrefilter 这个函数
   // 在这个函数中，可以拿到我们给Ajax提供的配置对象
   $.ajaxPrefilter(function(options) {
     // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
     options.url = 'http://ajax.frontend.itheima.net' + options.url
   
     // 统一为有权限的接口，设置 headers 请求头
     if (options.url.indexOf('/my/') !== -1) {
       options.headers = {
         Authorization: localStorage.getItem('token') || ''
       }
     }
   
     // 全局统一挂载 complete 回调函数
     options.complete = function(res) {
       // console.log('执行了 complete 回调：')
       // console.log(res)
       // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
       if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
         // 1. 强制清空 token
         localStorage.removeItem('token')
         // 2. 强制跳转到登录页面
         location.href = '/login.html'
       }
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

**`<form>`标签用来采集数据，`<form>`标签的属性则是用来规定如何把采集到的数据发送到服务器。**

| **属性** | **值**                                                       | **描述**                                   |
| -------- | ------------------------------------------------------------ | ------------------------------------------ |
| action   | URL地址                                                      | 规定当提交表单时，向何处发送表单数据       |
| method   | get或post                                                    | 规定以何种方式把表单数据提交到 action  URL |
| enctype  | application/x-www-form-urlencoded  multipart/form-data  text/plain | 规定在发送表单数据之前如何对其进行编码     |
| target   | _blank  _self  _parent  _top  *framename*                    | 规定在何处打开 action  URL                 |

**快速重置表单,转化dom对象,使用reset()方法**

- **`$('#formAddCmt')[0].reset();`**

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



# 模板引擎

> **渲染UI结构时遇到的问题**
>
> ```js
> var rows = []
> $.each(res.data, function (i, item) { // 循环拼接字符串
>     rows.push('<li class="list-group-item">'+ item.content +'<span class="badge cmt-date">评论时间：'+ item.time +'</span><span class="badge cmt-person">评论人：'+ item.username +'</span></li>')
> })
> $('#cmt-list').empty().append(rows.join('')) // 渲染列表的UI结构
> 
> ```
>
> 上述代码是通过字符串拼接的形式，来渲染UI结构。
> 如果UI结构比较复杂，则拼接字符串的时候需要格外注意引号之前的嵌套。且一旦需求发生变化，修改起来也非常麻烦。

**模板引擎，顾名思义，它可以根据程序员指定的模板结构和数据，自动生成一个完整的HTML页面。**

![image-20220519003230731](/Users/wsp/Library/Application Support/typora-user-images/image-20220519003230731.png)

**好处**

- 减少了字符串的拼接操作
- 使代码结构更清晰
- 使代码更易于阅读与维护

## 实现原理

**正则+字符串操作**

1. 定义模板结构
2. 预调用模板引擎
3. 封装 template 函数
4. 导入并使用自定义的模板引擎

```js
//封装 template 函数
function template(id, data) {
  var str = document.getElementById(id).innerHTML
  var pattern = /{{\s*([a-zA-Z]+)\s*}}/
  var pattResult = null
  while ((pattResult = pattern.exec(str))) {
    str = str.replace(pattResult[0], data[pattResult[1]])
  }
  return str
}

```



## art-template模板引擎

art-template 是一个简约、超快的模板引擎。中文官网首页为 http://aui.github.io/art-template/zh-cn/index.html

### 基本使用

**步骤**

1. 导入 art-template

   - 在 window 全局，多一个函数，叫做 template('模板的Id', 需要渲染的数据对象) 

   - ```js
     <script src="./lib/template-web.js"></script>
     ```

2. 定义数据

   - ```js
     let data={}
     ```

3. 定义模板

   - 模板的 HTML 结构，必须定义到 script 中

   - ```
     <script type="text/html"></script>
     ```

4. 调用 template 函数

   - ```js
     let htmlStr = template('tpl-user', data)
     ```

5. 渲染HTML结构

   - ```js
     $('#container').html(htmlStr)
     ```

     

### 标准语法

art-template 提供了 `{{ }}` 这种语法格式，在 `{{ }}` 内可以**进行变量输出，或循环数组等操作**，这种 `{{ }}` 语法在 art-template 中被称为**标准语法**。

#### 输出

**在 {{ }} 语法中，可以进行变量的输出、对象属性的输出、三元表达式输出、逻辑或输出、加减乘除等表达式输出。**

```
{{value}}
{{obj.key}}
{{obj['key']}}
{{a ? b : c}}
{{a || b}}
{{a + b}}
```





#### 原文输出

**如果要输出的 value 值中，包含了 HTML 标签结构，则需要使用原文输出语法，才能保证 HTML 标签被正常渲染。** 

```
{{@ value }}
```



#### 条件输出

**如果要实现条件输出，则可以在 {{ }} 中使用 `if … else if … /if` 的方式，进行按需输出。**

```
{{if value}} 按需输出的内容 {{/if}}

{{if v1}} 按需输出的内容 {{else if v2}} 按需输出的内容 {{/if}}

```

exp:

```html
{{if flag === 0}}
{{name}}
{{else if flag === 1}}
{{age}}
{{/if}}
```



#### 循环输出

**如果要实现循环输出，则可以在 {{ }} 内，通过 each 语法循环数组，当前循环的索引使用 `$index` 进行访问，当前的循环项使用 `$value` 进行访问。**

```
{{each arr}}
    {{$index}} {{$value}}
{{/each}}
```

exp:

```html
    <ul>
      {{each hobby}}
      <li>索引是:{{$index}}，循环项是:{{$value}}</li>
      {{/each}}
    </ul>
```



#### 过滤器

**过滤器的本质，就是一个 function 处理函数。**

![image-20220519005912775](/Users/wsp/Library/Application Support/typora-user-images/image-20220519005912775.png)

```
{{value | filterName}}
```

过滤器语法类似**管道操作符**，它的上一个输出作为下一个输入。

定义过滤器的基本语法如下：

```js  
template.defaults.imports.filterName = function(value){/*return处理的结果*/}
```

**exp**

```html
<div>注册时间：{{regTime | dateFormat}}</div>
```

定义一个格式化时间的过滤器 dateFormat 如下：

```js
 template.defaults.imports.dateFormat = function(date) {	//regTime: new Date() 
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()

    return y + '-' + m + '-' + d // 注意，过滤器最后一定要 return 一个值
 }
```



# 数据交换格式

数据交换格式，就是服务器端与客户端之间进行数据传输与交换的格式。

前端领域，经常提及的两种数据交换格式分别是 XML 和 JSON。其中 XML 用的非常少，所以，我们重点要学习的数据交换格式就是 JSON。

## XML

XML 的英文全称是 E**X**tensible **M**arkup **L**anguage，即**可扩展标记语言**。因此，XML 和 HTML 类似，也是一种标记语言。

![image-20220519221913487](/Users/wsp/Library/Application Support/typora-user-images/image-20220519221913487.png)

**XML和HTML的区别**

XML 和 HTML 虽然都是**标记语言**，但是，它们两者之间没有任何的关系。

- HTML 被设计用来描述网页上的内容，是**网页内容的载体**
- **XML 被设计用来传输和存储数据，是数据的载体**

XML的缺点

- XML 格式臃肿，和数据无关的代码多，体积大，传输效率低
- 在 Javascript 中解析 XML 比较麻烦

## JSON

概念：JSON 的英文全称是 JavaScript Object Notation，即“JavaScript 对象表示法”。

简单来讲，JSON 就是 Javascript 对象和数组的字符串表示法，它使用文本表示一个 JS 对象或数组的信息，因此，**JSON 的本质是字符串。**

作用：JSON 是一种轻量级的文本数据交换格式，在作用上类似于 XML，**专门用于存储和传输数据**，**但是 JSON 比 XML 更小、更快、更易解析。**

现状：JSON 是在 2001 年开始被推广和使用的数据格式，到现今为止，JSON 已经成为了主流的数据交换格式。

### 两种结构

#### 对象结构

**对象结构**：对象结构在 JSON 中表示为 { } 括起来的内容。数据结构为 **`{ key: value, key: value, … }`** 的键值对结构。其中，**key 必须是使用英文的双引号包裹的字符串**，value 的数据类型可以是数字、字符串、布尔值、null、数组、对象6种类型。

#### 数组结构

**数组结构**：数组结构在 JSON 中表示为 **[ ]** 括起来的内容。数据结构为 [ "java", "javascript", 30, true … ] 。数组中数据的类型可以是数字、字符串、布尔值、null、数组、对象6种类型。



- ①属性名必须使用双引号包裹
- ②字符串类型的值必须使用双引号包裹
- ③JSON 中不允许使用单引号表示字符串
- ④JSON 中不能写注释
- ⑤JSON 的最外层必须是对象或数组格式
- ⑥不能使用 undefined 或函数作为 JSON 的值

- JSON 的作用：在计算机与网络之间存储和传输数据。
- JSON 的本质：用字符串来表示 Javascript 对象数据或数组数据

### JSON和JS对象的关系

JSON 是 JS 对象的字符串表示法，它使用文本表示一个 JS 对象的信息，本质是一个字符串。例如：

```js
//这是一个对象
var obj = {a: 'Hello', b: 'World'}

//这是一个 JSON 字符串，本质是一个字符串
var json = '{"a": "Hello", "b": "World"}' 

```

### JSON和JS**对象的互转**

要实现从 JSON 字符串转换为 JS 对象，使用 `JSON.parse()` 方法：

```js
var obj = JSON.parse('{"a": "Hello", "b": "World"}')
//结果是 {a: 'Hello', b: 'World'}
```

要实现从 JS 对象转换为 JSON 字符串，使用 `JSON.stringify()` 方法：

```js
var json = JSON.stringify({a: 'Hello', b: 'World'})
//结果是 '{"a": "Hello", "b": "World"}'
```

### 序列化和反序列化

把**数据对象转换为字符串**的过程，叫做**序列化**，例如：调用 JSON.stringify() 函数的操作，叫做 JSON 序列化。

把字**符串转换为数据对象**的过程，叫做**反序列化**，例如：调用 JSON.parse() 函数的操作，叫做 JSON 反序列化。

# xhr

**XMLHttpRequest**（简称 xhr）是浏览器提供的 Javascript 对象，通过它，可以**请求服务器上的数据资源**。之前所学的 jQuery 中的 Ajax 函数，就是基于 xhr 对象封装出来的。

## readyState属性

XMLHttpRequest 对象的 readyState 属性，用来表示**当前** **Ajax** **请求所处的状态**。每个 Ajax 请求必然处于以下状态中的一个：

| **值** | **状态**         | **描述**                                                 |
| ------ | ---------------- | -------------------------------------------------------- |
| 0      | UNSENT           | XMLHttpRequest  对象已被创建，但尚未调用  open方法。     |
| 1      | OPENED           | open() 方法已经被调用。                                  |
| 2      | HEADERS_RECEIVED | send() 方法已经被调用，响应头也已经被接收。              |
| 3      | LOADING          | 数据接收中，此时  response  属性中已经包含部分数据。     |
| **4**  | **DONE**         | **Ajax  请求完成，这意味着数据传输已经彻底完成或失败。** |



## 查询字符串

查询字符串（URL 参数）是指在 URL 的末尾加上用于向服务器发送信息的字符串（变量）。

格式：将英文的 **?** 放在URL 的末尾，然后再加上 **参数＝值** ，想加上多个参数的话，使用 **&** 符号进行分隔。以这个形式，可以将想要发送给服务器的数据添加到 URL 中。

```
// 不带参数的 URL 地址
http://www.liulongbin.top:3006/api/getbooks
// 带一个参数的 URL 地址
http://www.liulongbin.top:3006/api/getbooks?id=1
// 带两个参数的 URL 地址
http://www.liulongbin.top:3006/api/getbooks?id=1&bookname=西游记
```

**GET请求携带参数的本质**

无论使用 $.ajax()，还是使用 $.get()，又或者直接使用 xhr 对象发起 GET 请求，当需要携带参数的时候，本质上，都是直接将参数以查询字符串的形式，追加到 URL 地址的后面，发送到服务器的。

```js
$.get('url', {name: 'zs', age: 20}, function() {})
// 等价于
$.get('url?name=zs&age=20', function() {})

$.ajax({ method: 'GET', url: 'url', data: {name: 'zs', age: 20}, success: function() {} })
// 等价于
$.ajax({ method: 'GET', url: 'url?name=zs&age=20', success: function() {} })
```



## URL编码与解码

URL 地址中，只允许出现英文相关的字母、标点符号、数字，因此，**在 URL 地址中不允许出现中文字符。**

如果 URL 中需要包含中文这样的字符，**则必须对中文字符进行编码（转义）。**

浏览器提供了 URL 编码与解码的 API，分别是：

- **`encodeURI()`** 编码的函数
- **`decodeURI()`** 解码的函数

由于浏览器会自动对 URL 地址进行编码操作，因此，大多数情况下，程序员不需要关心 URL 地址的编码与解码操作。



## **GET**

步骤：

1. 创建 `xhr` 对象
2. 调用 `xhr.open()` 函数
3. 调用 `xhr.send()` 函数
4. 监听 `xhr.onreadystatechange` 事件

```js
// 1. 创建 XHR 对象
var xhr = new XMLHttpRequest()
// 2. 调用 open 函数，指定 请求方式 与 URL地址
xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks')
// 3. 调用 send 函数，发起 Ajax 请求
xhr.send()
// 4. 监听 onreadystatechange 事件
xhr.onreadystatechange = function() {
    // 4.1 监听 xhr 对象的请求状态 readyState ；与服务器响应的状态 status
    if (xhr.readyState === 4 && xhr.status === 200) {
        // 4.2 打印服务器响应回来的数据
        console.log(xhr.responseText)
    }
}
```



## POST

1. 创建 `xhr` 对象
2. 调用 `xhr.open()` 函数
3. **设置** **Content-Type** **属性**（固定写法）
4. 调用 `xhr.send()` 函数,**同时指定要发送的数据**
5. 监听 `xhr.onreadystatechange` 事件

```js
// 1. 创建 xhr 对象
var xhr = new XMLHttpRequest()
// 2. 调用 open()
xhr.open('POST', 'http://www.liulongbin.top:3006/api/addbook')
// 3. 设置 Content-Type 属性（固定写法）
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
// 4. 调用 send()，同时将数据以查询字符串的形式，提交给服务器
xhr.send('bookname=水浒传&author=施耐庵&publisher=天津图书出版社')
// 5. 监听 onreadystatechange 事件
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText)
    }
}

```



## 封装Ajax函数

myAjax.js

```js
function resolveData(data){
  let arr=[];
  for(let key in data){
    let str=key+'='+data[key];
    arr.push(str);
  }
  return arr.join('&');
};
function myAjax(options){
  let xhr=new XMLHttpRequest();
  let data=resolveData(options.data);
  if(options.method.toUpperCase()=='GET'){
    xhr.open(options.method,options.url+"?"+data);
    xhr.send();
  }else{
    xhr.open(options.method,options.url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(data);
    }
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      let res=JSON.parse(xhr.responseText);
      //转为对象
      options.success(res);
    }
  }
}
```

```html
<script src="./js/myAjax.js"></script>  
<script>
    myAjax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/getbooks',
      data: {
        id: 1
      },
      success: function (res) {
        console.log(res)
      }
    })

    myAjax({
      method: 'post',
      url: 'http://www.liulongbin.top:3006/api/addbook',
      data: {
        bookname: '水浒传',
        author: '施耐庵',
        publisher: '北京图书出版社'
      },
      success: function (res) {
        console.log(res)
      }
    })
  </script>
```



## Level2的新特性

> 旧版的不足:
>
> - 只支持文本数据的传输，无法用来读取和上传文件
> - 传送和接收数据时，没有进度信息，只能提示有没有完成

1. 可以设置 HTTP 请求的时限
2. 可以使用 FormData 对象管理表单数据
3. 可以上传文件
4. 可以获得数据传输的进度信息



### 设置HTTP请求时限

有时，Ajax 操作很耗时，而且无法预知要花多少时间。如果网速很慢，用户可能要等很久。新版本的 XMLHttpRequest 对象，增加了 **timeout 属性**，可以设置 HTTP 请求的时限：

```
 xhr.timeout = 3000
```

上面的语句，将最长等待时间设为 3000 毫秒。过了这个时限，就自动停止HTTP请求。与之配套的还有一个 **`ontimeout`** 事件，用来指定回调函数：

```js
 xhr.ontimeout = function(event){
     alert('请求超时！')
 }
```



### FormData对象管理表单数据

Ajax 操作往往用来提交表单数据。为了方便表单处理，H5 新增了一个 FormData 对象，可以模拟表单操作：

```js
      // 1. 新建 FormData 对象
      var fd = new FormData()
      // 2. 为 FormData 添加表单项
      fd.append('uname', 'zs')
      fd.append('upwd', '123456')
      // 3. 创建 XHR 对象
      var xhr = new XMLHttpRequest()
      // 4. 指定请求类型与URL地址
      xhr.open('POST', 'http://www.liulongbin.top:3006/api/formdata')
      // 5. 直接提交 FormData 对象，这与提交网页表单的效果，完全一样
      xhr.send(fd)
```

FormData对象也可以用来获取网页表单的值，示例代码如下：

```js
let form = document.querySelector('#form1')
let fd = new FormData(form)//////////
```

```js
 // 获取表单元素
 let form = document.querySelector('#form1')
 // 监听表单元素的 submit 事件
 form.addEventListener('submit', function(e) {
    e.preventDefault()
     // 根据 form 表单创建 FormData 对象，会自动将表单数据填充到 FormData 对象中
     let fd = new FormData(form)//////////
     let xhr = new XMLHttpRequest()
     xhr.open('POST', 'http://www.liulongbin.top:3006/api/formdata')
     xhr.send(fd)
     xhr.onreadystatechange = function() {}
})
```



### 上传文件

新版 XMLHttpRequest 对象，不仅可以发送文本信息，还可以上传文件。

实现步骤：

1. 定义 UI 结构
2. 验证是否选择了文件
3. 向 FormData 中追加文件
4. 使用 xhr 发起上传文件的请求
5. 监听 onreadystatechange 事件

**定义 UI 结构**

```html
    <!-- 1. 文件选择框 -->
    <input type="file" id="file1" />
    <!-- 2. 上传按钮 -->
    <button id="btnUpload">上传文件</button>
    <br />
    <!-- 3. 显示上传到服务器上的图片 -->
    <img src="" alt="" id="img" width="800" />

```

**验证是否选择了文件**

```js
 // 1. 获取上传文件的按钮
 var btnUpload = document.querySelector('#btnUpload')
 // 2. 为按钮添加 click 事件监听
 btnUpload.addEventListener('click', function() {
     // 3. 获取到选择的文件列表
     var files = document.querySelector('#file1').files//
     if (files.length <= 0) {
         return alert('请选择要上传的文件！')
     }
     // ...后续业务逻辑
 })


```

**向 FormData 中追加文件**

```js
   
 // 1. 创建 FormData 对象
 var fd = new FormData()
 // 2. 向 FormData 中追加文件
 fd.append('avatar', files[0])//files是数组


```

**使用 xhr 发起上传文件的请求**

```js
   
 // 1. 创建 xhr 对象
 var xhr = new XMLHttpRequest()
 // 2. 调用 open 函数，指定请求类型与URL地址。其中，请求类型必须为 POST
 xhr.open('POST', 'http://www.liulongbin.top:3006/api/upload/avatar')
 // 3. 发起请求
 xhr.send(fd)


```

**监听 onreadystatechange 事件**

```js
   
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var data = JSON.parse(xhr.responseText)
    if (data.status === 200) { // 上传文件成功
      // 将服务器返回的图片地址，设置为 <img> 标签的 src 属性
      document.querySelector('#img').src = 'http://www.liulongbin.top:3006' + data.url
    } else { // 上传文件失败
      console.log(data.message)
    }
  }
}
```

#### 显示文件上传进度

新版本的 XMLHttpRequest 对象中，可以通过监听 xhr.upload.onprogress 事件，来获取到文件的上传进度。语法格式如下：

```js
 // 创建 XHR 对象
 var xhr = new XMLHttpRequest()
 // 监听 xhr.upload 的 onprogress 事件
 xhr.upload.onprogress = function(e) {
    // e.lengthComputable 是一个布尔值，表示当前上传的资源是否具有可计算的长度
    if (e.lengthComputable) {
        // e.loaded 已传输的字节
        // e.total  需传输的总字节
        var percentComplete = Math.ceil((e.loaded / e.total) * 100)
    }
 }
```

- **`xhr.upload.onprogress`**要放在`xhr.send()`前



**案例**

**导入需要的库**

```html
<link rel="stylesheet" href="./lib/bootstrap.css" />
<script src="./lib/jquery.js"></script>
```

**基于Bootstrap渲染进度条**

```html
    <!-- 进度条 -->
    <div class="progress" style="width: 500px; margin: 10px 0;">
      <div class="progress-bar progress-bar-info progress-bar-striped active" id="percent" style="width: 0%">
        0%
      </div>
    </div>
```

**监听上传进度的事件**

```js
   
 xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
    // 1. 计算出当前上传进度的百分比
    var percentComplete = Math.ceil((e.loaded / e.total) * 100)
    $('#percent')
        // 2. 设置进度条的宽度
        .attr('style', 'width:' + percentComplete + '%')
        // 3. 显示当前的上传进度百分比
        .html(percentComplete + '%')
    }
 }

      xhr.upload.onload = function () {//上传成功
        $('#percent').removeClass().addClass('progress-bar progress-bar-success')
      }
```

**监听上传完成的事件**

```js
   
 xhr.upload.onload = function() {
     $('#percent')
         // 移除上传中的类样式
         .removeClass()
         // 添加上传完成的类样式
         .addClass('progress-bar progress-bar-success')
 }


```



#### jQuery实现文件上传

只能用`$.ajax({method:'POST',contentType: false, processData: false})  `  

```js
	 <!-- 导入 jQuery -->
    <script src="./lib/jquery.js"></script>
    <!-- 文件选择框 -->
    <input type="file" id="file1" />
    <!-- 上传文件按钮 -->
    <button id="btnUpload">上传</button>

//------------------------------------------------------------//
   
 $('#btnUpload').on('click', function() {
     // 1. 将 jQuery 对象转化为 DOM 对象，并获取选中的文件列表
     var files = $('#file1')[0].files
     // 2. 判断是否选择了文件
     if (files.length <= 0) {
         return alert('请选择图片后再上传！‘)
     }
 })
//------------------------------------------------------------//
 // 向 FormData 中追加文件
 var fd = new FormData()
 fd.append('avatar', files[0])
//------------------------------------------------------------//
   
 // 1. 创建 xhr 对象
 var xhr = new XMLHttpRequest()
 // 2. 调用 open 函数，指定请求类型与URL地址。其中，请求类型必须为 POST
 xhr.open('POST', 'http://www.liulongbin.top:3006/api/upload/avatar')
 // 3. 发起请求
 xhr.send(fd)
//------------------------------------------------------------//
$.ajax({
     method: 'POST',
     url: 'http://www.liulongbin.top:3006/api/upload/avatar',
     data: fd,
     // 不修改 Content-Type 属性，使用 FormData 默认的 Content-Type 值
     contentType: false,
     // 不对 FormData 中的数据进行 url 编码，而是将 FormData 数据原样发送到服务器
     processData: false,
     success: function(res) {
         console.log(res)
     }
 })
```

##### 实现loading效果

**`ajaxStart(callback)`**

```js
// 自 jQuery 版本 1.8 起，该方法只能被附加到documnet
 $(document).ajaxStart(function() {
     $('#loading').show()
 })
```

- 注意： $(document).ajaxStart() 函数**会监听当前文档内所有的** **Ajax** **请求**。

**`ajaxStop(callback)`**

- Ajax 请求**结束**时，执行 ajaxStop 函数。可以在 ajaxStop 的 callback 中隐藏 loading 效果，示例代码如下：

```js
   
 // 自 jQuery 版本 1.8 起，该方法只能被附加到文档
 $(document).ajaxStop(function() {
     $('#loading').hide()
 })
```

# axios

Axios 是专注于**网络数据请求**的库。

相比于原生的 XMLHttpRequest 对象，axios **简单易用**。

相比于 jQuery，**axios 更加轻量化**，只专注于网络数据请求。

## GET

axios 发起 get 请求的语法：

```js
 axios.get('url', { params: { /*参数*/ } }).then(callback)
```

```js
 // 请求的 URL 地址
 var url = 'http://www.liulongbin.top:3006/api/get'
 // 请求的参数对象
 var paramsObj = { name: 'zs', age: 20 }
 // 调用 axios.get() 发起 GET 请求
 axios.get(url, { params: paramsObj }).then(function(res) {
     // res.data 是服务器返回的数据
     var result = res.data
     console.log(res)
 })
```



## POST

axios 发起 post 请求的语法：

```js
 axios.post('url', { /*参数*/ }).then(callback)
```

```js
 // 请求的 URL 地址
 var url = 'http://www.liulongbin.top:3006/api/post'
 // 要提交到服务器的数据
 var dataObj = { location: '北京', address: '顺义' }
 // 调用 axios.post() 发起 POST 请求
 axios.post(url, dataObj).then(function(res) {
     // res.data 是服务器返回的数据
     var result = res.data
     console.log(result)
 })
```

## axios请求

axios 也提供了类似于 jQuery 中 $.ajax() 的函数，语法如下：

```js
 axios({
     method: '请求类型',
     url: '请求的URL地址',
     data: { /* POST数据 */ },
     params: { /* GET参数 */ }
 }) .then(callback)
```

对post和get的数据进行了区分

-  `data: { /* POST数据 */ }*`
-  `params: { /* GET参数 */ }`



# 同源策略和跨域

## 同源策略

**同源策略**（英文全称 Same origin policy）是浏览器提供的一个安全功能。

MDN 官方给定的概念：同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

通俗的理解：浏览器规定，A 网站的 JavaScript，不允许和非同源的网站 C 之间，进行资源的交互，例如：

- 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB
- 无法接触非同源网页的 DOM
- 无法向非同源地址发送 Ajax 请求

如果两个页面的协议，域名和端口都相同，则两个页面具有相同的源。
例如，下表给出了相对于 http://www.test.com/index.html 页面的同源检测：

| **URL**                            | **是否同源** | **原因**                                      |
| ---------------------------------- | ------------ | --------------------------------------------- |
| http://www.test.com/other.html     | 是           | 同源（协议、域名、端口相同）                  |
| https://www.test.com/about.html    | 否           | 协议不同（**http  与  https**）               |
| http://blog.test.com/movie.html    | 否           | 域名不同（**www.test.com 与 blog.test.com**） |
| http://www.test.com:7001/home.html | 否           | 端口不同（**默认的  80 端口与  7001 端口**）  |
| http://www.test.com:80/main.html   | 是           | 同源（协议、域名、端口相同）                  |



### 实现跨域数据请求

现如今，实现跨域数据请求，最主要的两种解决方案，分别是 JSONP 和 CORS。

- JSONP：出现的早，兼容性好（兼容低版本IE）。是前端程序员为了解决跨域问题，被迫想出来的一种临时解决方案。缺点是**只支持 GET 请求**，不支持 POST 请求。
- **CORS**：出现的较晚，它是 W3C 标准，属于跨域 Ajax 请求的根本解决方案。支持 GET 和 POST 请求。缺点是不兼容某些低版本的浏览器。



## 跨域

**同源**指的是两个 URL 的协议、域名、端口一致，反之，则是**跨域**。

出现跨域的根本原因：**浏览器的同源策略**不允许非同源的 URL 之间进行资源的交互。

`Failed to load resource: net::ERR_CONNECTION_REFUSED`

网页：http://www.test.com/index.html

接口：http://www.api.com/userlist

### 浏览器对跨域请求的拦截

![image-20220522120115545](/Users/wsp/Library/Application Support/typora-user-images/image-20220522120115545.png)

- 浏览器允许发起跨域请求，但是，跨域请求回来的数据，会被浏览器拦截，无法被页面获取到！

# **JSONP**

JSONP (JSON with Padding) 是 JSON 的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。

**实现原理**

由于浏览器同源策略的限制，网页中无法通过 Ajax 请求非同源的接口数据。但是 **`<script>` 标签不受浏览器同源策略的影响，可以通过 src 属性，请求非同源的 js 脚本。**

因此，JSONP 的实现原理，就是通过 `<script>` 标签的 src 属性，请求跨域的数据接口，并通过**函数调用**的形式，接收跨域接口响应回来的数据。

**缺点**

由于 JSONP 是通过 `<script>` 标签的 src 属性，来实现跨域数据获取的，所以，JSONP 只支持 GET 数据请求，不支持 POST 请求。

- 注意：**JSONP** **和** **Ajax** **之间没有任何关系**，不能把 JSONP 请求数据的方式叫做 Ajax，因为 JSONP 没有用到 XMLHttpRequest 这个对象。

## 实现一个简单的JSONP



```html
<script>
  <!--定义一个 success 回调函数：-->
  function success(data) {
    console.log('JSONP响应回来的数据是：')
    console.log(data)
  }
  
</script>
	<!--通过 <script> 标签，请求接口数据：-->
	<!-- callback=success 服务器会调用success函数 -->
<script src="http://www.liulongbin.top:3006/api/jsonp?	&name=ls&age=30"></script>
```



## jQuery中的JSONP

### jq实现过程

jQuery 中的 JSONP，也是通过 `<script>` 标签的 src 属性实现跨域数据访问的，只不过，jQuery 采用的是动态创建和移除 `<script>` 标签的方式，来发起 JSONP 数据请求。

1. 在发起 JSONP 请求的时候，动态向 `<header>` 中 append 一个 `<script>` 标签；
2. 在 JSONP 请求成功以后，动态从 `<header>` 中移除刚才 append 进去的 `<script>` 标签；



jQuery 提供的 $.ajax() 函数，除了可以发起真正的 Ajax 数据请求之外，还能够发起 JSONP 数据请求

- `dataType: 'jsonp`

```js
 $.ajax({
    url: 'http://ajax.frontend.itheima.net:3006/api/jsonp?name=zs&age=20',
    // 如果要使用 $.ajax() 发起 JSONP 请求，必须指定 datatype 为 jsonp
    dataType: 'jsonp',
   //默认回调函数回调函数名称是 jQueryxxxxx
    success: function(res) {
       console.log(res)
    }
 })
```

- 默认情况下，使用 jQuery 发起 JSONP 请求，会自动携带一个 **`callback=jQueryxxx`** 的参数，`jQueryxxx` 是随机生成的一个回调函数名称。

### 自定义参数及回调函数名称

在使用 jQuery 发起 JSONP 请求时，如果想要自定义 JSONP 的**参数**以及**回调函数名称**，可以通过如下两个参数来指定：

- `jsonp`
- `jsonpCallback`

```js
 $.ajax({
    url: 'http://ajax.frontend.itheima.net:3006/api/jsonp?name=asd&age=111',
    dataType: 'jsonp',
    // 发送到服务端的参数名称，默认值为 callback
    jsonp: 'callback',
    // 自定义的回调函数名称，默认值为 jQueryxxx 格式
    jsonpCallback: 'abc',
    success: function(res) {
       console.log(res)
    }
 })
```



# 防抖和节流

**区别**

- 防抖：如果事件被频繁触发，防抖能保证只有最有一次触发生效！前面 N 多次的触发都会被忽略！
- 节流：如果事件被频繁触发，节流能够减少事件触发的频率，因此，节流是有选择性地执行一部分事件！

## 防抖

**防抖策略**（debounce）是当**事件被触发后，延迟 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。**

![image-20220522132102764](/Users/wsp/Library/Application Support/typora-user-images/image-20220522132102764.png)

- 例如用户在输入框中连续输入一串字符时，可以通过防抖策略，只在输入完后，才执行查询的请求，这样可以有效减少请求次数，节约请求资源；

**实现输入框的防抖**

```js
 var timer = null                    // 1. 防抖动的 timer

 function debounceSearch(keywords) { // 2. 定义防抖的函数
    timer = setTimeout(function() {
    // 发起 JSONP 请求
    getSuggestList(keywords)
    }, 500)
 }

 $('#ipt').on('keyup', function() {  // 3. 在触发 keyup 事件时，立即清空 timer
    clearTimeout(timer)//清空timer 让请求不被发起
    // ...省略其他代码
    debounceSearch(keywords)
 })
```



## 节流

**节流策略**（throttle），顾名思义，可以减少一段时间内事件的触发频率。

例如

- 鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次；
- 懒加载时要监听计算滚动条的位置，但不必每次滑动都触发，可以降低计算的频率，而不必去浪费 CPU 资源；

**节流阀**

**节流阀为空，表示可以执行下次操作；不为空，表示不能执行下次操作。**

- 当前操作执行完，必须将节流阀**重置**为空，表示可以执行下次操作了。
- 每次执行操作前，必须**先判断节流阀是否为空**。

### **节流案例** **–** **鼠标跟随效果**

```js
$(function() {
   // 获取图片元素
   var angel = $('#angel')
   // 监听文档的 mousemove 事件
   $(document).on('mousemove', function(e) {      // 设置图片的位置
      $(angel).css('left', e.pageX + 'px').css('top', e.pageY + 'px')
   })
})
```

**节流版:**

```js
$(function() {
  var angel = $('#angel')
  var timer = null // 1.预定义一个 timer 节流阀
  $(document).on('mousemove', function(e) {
    if (timer) { return } // 3.判断节流阀是否为空，如果不为空，则证明距离上次执行间隔不足16毫秒
    timer = setTimeout(function() {
      $(angel).css('left', e.pageX + 'px').css('top', e.pageY + 'px')
      timer = null // 2.当设置了鼠标跟随效果后，清空 timer 节流阀，方便下次开启延时器
    }, 16)
  })
})
```

**节流案例** **–** **鼠标跟随效果**

```html
<!-- UI 结构 -->
<img src="./assets/angel.gif" alt="" id="angel" />

/* CSS 样式 */
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#angel {
  position: absolute;
}
```

```js
$(function() {
  var angel = $('#angel')
  var timer = null // 1.预定义一个 timer 节流阀
  $(document).on('mousemove', function(e) {
    if (timer) { return } // 3.判断节流阀是否为空，如果不为空，则证明距离上次执行间隔不足16毫秒
    timer = setTimeout(function() {//开启就不为null
      $(angel).css('left', e.pageX + 'px').css('top', e.pageY + 'px')
      timer = null // 2.当设置了鼠标跟随效果后，清空 timer 节流阀，方便下次开启延时器
    }, 16)
  })
})

```



# 淘宝搜索案例

## **输入框防抖**

```js
  $('#ipt').keyup(function(){
    let keywords=$(this).val().trim();
    if(keywords.length<=0) return $('#suggest-list').empty().hide();
    clearTimeout(timer);//清空timer 让请求不被发起
    debounceSearch(keywords);
  })  
//防抖
  let timer=null;
  function debounceSearch(keywords){
    timer=setTimeout(function () {
      getSuggestList(keywords);
    },500)
  }

  function getSuggestList(keywords){
    $.ajax({
      url:'https://suggest.taobao.com/sug?q='+keywords,
      dataType: 'Jsonp',
      success: function(res){
        renderSuggestList(res);
      }
    })
  }
  function renderSuggestList(res){
    let key=$('#ipt').val().trim();
    if(res.length<=0){
      return $('#tpl-suggestList').empty().hide();
    }
    let htmlStr=template('tpl-suggestList',res)
    $('#suggest-list').html(htmlStr).show();
  }
```

## **缓存搜索的建议列表**

```js
  // 缓存对象
  var cacheObj = {}
////////////////////////////////////////////////////////////////////////////////////////////
 // 渲染建议列表
 function renderSuggestList(res) {
    // ...省略其他代码
   // 将搜索的结果，添加到缓存对象中
    var k = $('#ipt').val().trim()
    cacheObj[k] = res
 }
//////////////////////////////////////////////////////////////////
 // 监听文本框的 keyup 事件
 $('#ipt').on('keyup', function() {
    // ...省略其他代码

    // 优先从缓存中获取搜索建议
    if (cacheObj[keywords]) {
       return renderSuggestList(cacheObj[keywords])
    }
   // 获取搜索建议列表
    debounceSearch(keywords)
  })


```

