# Node基础

## 终端中的快捷键

在 Windows 的 powershell 或 cmd 终端中，我们可以通过如下快捷键，来提高终端的操作效率:

1. 使用 `↑` 键，可以快速定位到上一次执行的命令
2. 使用 `tab` 键，能够快速补全路径
3. 使用 `esc` 键，能够快速清空当前已输入的命令
4. 输入 `cls` 命令，可以清空终端

## fs 文件系统模块

`fs` 模块提供了许多非常实用的函数来访问文件系统并与文件系统进行交互。

**导入**  **`const fs = require('fs')`**

### fs.readFile() 读取内容

```js
fs.readFile(path,[,options],callback)
```

- 参数1:必选参数，字符串，表示**文件的路径**。
- 参数2:可选参数，表示以什么**编码格式**来读取文件。
- 参数3:必选参数，文件读取完成后，通过**回调函数拿到读取的结果**。

**示例代码**

```js
const fs = require('fs')
fs.readFile('node基础/day01/files/1.txt', 'utf8', function(err, dataStr) {
  // 2.1 打印失败的结果
  // 如果读取成功，则 err 的值为 null
  // 如果读取失败，则 err 的值为 错误对象，dataStr 的值为 undefined
  console.log(err)
  console.log('-------')
  // 2.2 打印成功的结果
  console.log(dataStr)
})
```

**判断文件是否读取成功**

**可以判断 err 对象是否为 null**，从而知晓文件读取的结果:

```js
const fs = require('fs')
fs.readFile('./files/11.txt', 'utf8', function(err, dataStr) {
  if (err) {
    return console.log('读取文件失败！' + err.message)
  }
  console.log('读取文件成功！' + dataStr)
})
```



###  fs.writeFile() 写入内容

**注意事项**

- fs.writeFile() 方法**只能用来创建文件，不能用来创建路径**
- 重复调用 fs.writeFile() 写入同一个文件，新写入的内容会**覆盖**之前的旧内容

```js
fs.writeFile(file,data[,options],callback)
```

(覆盖 不是追加)

- 参数1:必选参数，需要指定一个文件路径的字符串，表示文件的**存放路径**。
- 参数2:必选参数，表示要**写入的内容**。 
- 参数3:可选参数，表示以什么**格式**写入文件内容，默认值是 utf8。
- 参数4:必选参数，文件写入完成后的**回调函数**。

```js
const fs = require('fs')
fs.writeFile('node基础/day01/files/3.txt', 'ok123', function(err) {
  // 2.1 如果文件写入成功，则 err 的值等于 null
  // 2.2 如果文件写入失败，则 err 的值等于一个 错误对象
  // console.log(err)

  if (err) {
    return console.log('文件写入失败！' + err.message)
  }
  console.log('文件写入成功！')
})
```

### 案例:整理成绩

![image-20220602125520115](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261553432.png)

![image-20220602125527740](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261553433.png)

```js
const fs = require('fs')

fs.readFile('node基础/day01/files/成绩.txt', 'utf8', function(err, dataStr) {
  if (err) {
    return console.log('读取文件失败！' + err.message)
  }

  const arrOld = dataStr.split(' ')  // 先把成绩的数据，按照空格进行分割
  //循环分割后的数组，对每一项数据，进行字符串的替换操作
  const arrNew = []
  arrOld.forEach(item => {
    arrNew.push(item.replace('=', '：'))
  })
  //把新数组中的每一项，进行合并，得到一个新的字符串
  const newStr = arrNew.join('\n')

  // 5. 调用 fs.writeFile() 方法，把处理完毕的成绩，写入到新文件中
  fs.writeFile('node基础/day01/files/成绩-ok.txt', newStr, function(err) {
    if (err) {
      return console.log('写入文件失败！' + err.message)
    }
    console.log('成绩写入成功！')
  })
})
```

### fs 模块 - 路径动态拼接的问题

在使用 fs 模块操作文件时，如果提供的操作路径是以 ./ 或 ../ 开头的相对路径时，很容易出现**路径动态拼接错误**的问题。

- 原因:代码在运行的时候，会**以执行 node 命令时所处的目录**，动态拼接出被操作文件的完整路径。

- 解决方案:在使用 fs 模块操作文件时，直接提供完整的路径，不要提供 ./ 或 ../ 开头的相对路径，从而防止路径动态拼接的问题。

**`__dirname` 表示当前文件所处的目录**

```js
fs.readFile(__dirname + '/files/1.txt', 'utf8', function(err, dataStr) {
  if (err) {
    return console.log('读取文件失败！' + err.message)
  }
  console.log('读取文件成功！' + dataStr)
})
```



##  path 路径模块

path 模块是 Node.js 官方提供的、用来处理路径的模块。

**导入**  **`const path = require('path')`**

### path.join() 拼接路径

**涉及到路径拼接的操作，都要使用 path.join() 方法进行处理。不要直接使用 + 进行字符串的拼接。**

使用 path.join() 方法，可以把多个路径片段拼接为完整的路径字符串，语法格式如下:

```js
path.join([...paths])
```

-  `...paths <string>` 路径片段的序列 
-  返回值: `<string>`

```js
// 注意：  ../ 会抵消前面的路径
const pathStr = path.join('/a', '/b/c', '../../', './d', 'e') //两个../ 抵消2个路径
console.log(pathStr)  // /a/d/e
```

```js
fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function(err, dataStr) {
  if (err) {
    return console.log(err.message)
  }
  console.log(dataStr)
})
```



### path.basename() 获取路径文件名

使用 path.basename() 方法，可以获取**路径中的最后一部分**，经常通过这个方法获取路径中的文件名，语法格式如下:

```
path.basename(path[,ext])
```

-  `path <string>` 必选参数，表示一个路径的字符串
-  `ext <string>` 可选参数，表示文件扩展名
- 返回: `<string>` 表示路径中的最后一部分

```js
// 定义文件的存放路径
const fpath = '/a/b/c/index.html'

const fullName = path.basename(fpath)
console.log(fullName) //index.html

const nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt) //index
```



### path.extname() 获取扩展名

```
path.extname(path)
```

- `path <string>`必选参数，表示一个路径的字符串
- 返回: `<string>` 返回得到的扩展名字符串

```js
const path = require('path')

// 这是文件的存放路径
const fpath = '/a/b/c/index.html'

const fext = path.extname(fpath)
console.log(fext)

```

### 案例:时钟

**核心:将一个内联式CSS和JS的代码取出,放到对应.css、.js文件中,然后将html中改成外联式**

将素材目录下的 index.html 页面， 拆分成三个文件，分别是:

- index.css 
- index.js
- index.html

并且将拆分出来的 3 个文件，~~存放到 clock 目录中。~~

Step:

1. 创建两个正则表达式，分别用来匹配 `<style>` 和 `<script>` 标签
2. 使用 fs 模块，读取需要被处理的 HTML 文件
3. 自定义 resolveCSS 方法，来写入 index.css 样式文件
4. 自定义 resolveJS 方法，来写入 index.js 脚本文件
5. 自定义 resolveHTML 方法，来写入 index.html 文件

**原始index.html**

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>index首页</title>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      background-image: linear-gradient(to bottom right, red, gold);
    }

    .box {
      width: 400px;
      height: 250px;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 6px;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      box-shadow: 1px 1px 10px #fff;
      text-shadow: 0px 1px 30px white;

      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 70px;
      user-select: none;
      padding: 0 20px;

      /* 盒子投影 */
      -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0%, transparent), to(rgba(250, 250, 250, .2)));
    }
  

  </style>
</head>

<body>
  <div class="box">
    <div id="HH">00</div>
    <div>:</div>
    <div id="mm">00</div>
    <div>:</div>
    <div id="ss">00</div>
  </div>
<script>
  window.onload = function () {
      // 定时器，每隔 1 秒执行 1 次
      setInterval(() => {
        var dt = new Date()
        var HH = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds()

        // 为页面上的元素赋值
        document.querySelector('#HH').innerHTML = padZero(HH)
        document.querySelector('#mm').innerHTML = padZero(mm)
        document.querySelector('#ss').innerHTML = padZero(ss)
      }, 1000)
    }

    // 补零函数
    function padZero(n) {
      return n > 9 ? n : '0' + n
    }
</script>
</body>
</html>
```



#### 代码

```js
const fs = require('fs');
const path = require('path');

// 定义正则表达式
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

// readFile
fs.readFile(path.join(__dirname,'/index.html'),'utf-8',function(err,dataStr){
  if(err){
    return console.log(err)
  }
  //读取文件成功后，调用对应的三个方法，分别拆解出 css, js, html 文件
  resolveCSS(dataStr)
  resolveJS(dataStr)
  resolveHTML(dataStr)
})

function resolveCSS(htmlStr){
    const r1 = regStyle.exec(htmlStr);
    const newCSS = r1[0].replace('<style>','').replace('</style>','')
    fs.writeFile(path.join(__dirname,'/index.css'),newCSS,function(err){
      if(err){
        return console.log(err)
      }
      console.log('CSS Done');
    });
}

function resolveJS(htmlStr){
  const r2 = regScript.exec(htmlStr);
  const newJS = r2[0].replace('<script>','').replace('</script>','')
  fs.writeFile(path.join(__dirname,'/index.js'),newJS,function(err){
    if(err){
      return console.log(err)
    }
    console.log('JS Done');
  });
}

function resolveHTML(htmlStr){
  // 将字符串调用 replace 方法，把内嵌的 style 和 script 标签，替换为外联的 link 和 script 标签
  const newHTML = htmlStr.replace(regStyle,'<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')//replace支持正则
  fs.writeFile(path.join(__dirname,'/index.html'),newHTML,function(err){
    if(err){
      return console.log(err);
    }
    console.log('HTML Done');
  })
}
```

**注意事项**

- fs.writeFile() 方法**只能用来创建文件，不能用来创建路径**
- 重复调用 fs.writeFile() 写入同一个文件，新写入的内容会**覆盖**之前的旧内容



##  http 模块

![image-20220602182551556](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261553435.png)

http 模块是 Node.js 官方提供的、**用来创建 web 服务器**的模块。通过 http 模块提供的 `http.createServer()` 方法，就 能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。

``` 
const http = require('http')
```

在 Node.js 中，我们不需要使用 IIS、Apache 等这些第三方 web 服务器软件。因为我们可以基于 Node.js 提供的 http 模块，**通过几行简单的代码，就能轻松的手写一个服务器软件**，从而对外提供 web 服务。

### 创建 基本web 服务器

**创建 web 服务器的基本步骤**

1. 导入 http 模块
2. 创建 web 服务器实例
3. 为服务器实例绑定 **request** 事件，监听客户端的请求
4. 启动服务器

```js
// 1. 导入 http 模块
const hlogttp = require('http')
// 2. 创建 web 服务器实例
const server = http.createServer()
// 3. 为服务器实例绑定 request 事件，监听客户端的请求
server.on('request', function (req, res) {
  console.log('Someone visit our web server.')
})
// 4. 启动服务器
server.listen(8080, function () {  //默认80 可以省略
  console.log('server running at http://127.0.0.1:8080')
})
```

####  req 请求对象

只要服务器接收到了客户端的请求，就会调用通过 `server.on()` 为服务器绑定的 `request` 事件处理函数。 如果想在事件处理函数中，访问与客户端相关的**数据**或**属性**，可以使用如下的方式:

```js
const http = require('http')
const server = http.createServer()
// req 是请求对象，包含了与客户端相关的数据和属性
server.on('request', (req, res) => {
  // req.url 是客户端请求的 URL 地址
  const url = req.url
  // req.method 是客户端请求的 method 类型
  const method = req.method
  const str = `Your request url is ${url}, and request method is ${method}`
  console.log(str)
  // 调用 res.end() 方法，向客户端响应一些内容
  res.end(str)
})
server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})

```

#### res响应对象

在服务器的 request 事件处理函数中，如果想访问与服务器相关的**数据**或**属性**，可以使用如下的方式:

```js
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  // 定义一个字符串，包含中文的内容
  const str = `您请求的 URL 地址是 ${req.url}，请求的 method 类型为 ${req.method}`
  // 调用 res.setHeader() 方法，设置 Content-Type 响应头，解决中文乱码的问题
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // res.end() 将内容响应给客户端
  res.end(str)
})

server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
```



#### 解决中文乱码问题

**Header** `Content-Type:text/html; charset=utf-8`

```js
 // 调用 res.setHeader() 方法，设置 Content-Type 响应头，解决中文乱码的问题
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
```

### 路由

**根据不同的 url 响应不同的 html 内容**

1. 获取请求的 url 地址
2. 设置默认的响应内容为 404 Not found
3. 判断用户请求的是否为 / 或 /index.html 首页
4. 判断用户请求的是否为 /about.html 关于页面
5. 设置 Content-Type 响应头，防止中文乱码
6. 使用 res.end() 把内容响应给客户端

```js
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  // 1. 获取请求的 url 地址
  const url = req.url
  // 2. 设置默认的响应内容为 404 Not found
  let content = '<h1>404 Not found!</h1>'
  // 3. 判断用户请求的是否为 / 或 /index.html 首页
  // 4. 判断用户请求的是否为 /about.html 关于页面
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>'
  } else if (url === '/about.html') {
    content = '<h1>关于页面</h1>'
  }
  // 5. 设置 Content-Type 响应头，防止中文乱码
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // 6. 使用 res.end() 把内容响应给客户端
  res.end(content)
})

server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})

```



### 案例:时钟web服务器案例

1. 导入需要的模块
2. 创建基本的 web 服务器
3. 将资源的请求 url 地址映射为文件的存放路径 4 读取文件内容并响应给客户端
4. 优化资源的请求路径

```js
const http=require('http');
const fs=require('fs');
const path= require('path');

const server= http.createServer();
server.on('request',(req,res)=>{
  const url = req.url;
  let fpath=''
  if(req.url=='/'){
    fpath=path.join(__dirname,'./clock/index.html')
  }else(
    fpath=path.join(__dirname,'./clock',url)
  )
  fs.readFile(fpath,'utf-8',(err,dataStr)=>{
    if(err) return res.end('404')
    res.end(dataStr);
  })
})
server.listen(80,()=>{
  console.log('server running at 80 port');
})
```



## 模块化

编程领域中的模块化，就是**遵守固定的规则**，把一个大文件拆成独立并互相依赖的多个小模块。

把代码进行模块化拆分的好处: 

1. 提高了代码的复用性
2. 提高了代码的可维护性
3. 可以实现按需加载

### **模块化规范**

Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。

CommonJS 规定:

- 每个模块内部，**module 变量**代表当前模块。
- module 变量是一个对象，它的 exports 属性(**即 module.exports)是对外的接口。**
- 加载某个模块，其实是加载该模块的 **module.exports** 属性。**require() 方法用于加载模块。**



例如:

- 使用什么样的语法格式来引用模块
- 在模块中使用什么样的语法格式向外暴露成员

 **Node.js** **中模块的分类**

Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是:

- 内置模块(内置模块是由 Node.js 官方提供的，例如 fs、path、http 等)
- 自定义模块(用户创建的每个 .js 文件，都是自定义模块)
- 第三方模块(由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载)

###  **加载模块**

使用 require() 方法，可以加载需要的**内置模块、用户自定义模块、第三方模块**进行使用。例如:

- **注意**：在使用 require 加载用户自定义模块期间可以省略 .js 的后缀名

### **模块作用域**

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做**模块 作用域**。

- 防止全局变量污染

###  向外共享模块作用域中的成员

#### module 对象

在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息，打印如下:

![image-20220602191918753](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261553436.png)

#### module.exports 对象

在自定义模块中，可以使用 **`module.exports`** 对象，**将模块内的成员共享出去，供外界使用。** 

**外界用 `require()` 方法导入自定义模块时，得到的就是 `module.exports` 所指向的对象。**

![image-20220602192450251](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261553437.png)

- **指向全新对象`{ }` 则之前挂载的方法和属性都无效**



####  exports 对象 

由于 module.exports 单词写起来比较复杂，为了**简化**向外共享成员的代码，Node 提供了 `exports` 对象。

![image-20220602192615706](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261553438.png)

#### exports 和 module.exports 的使用误区

**默认情况 下，exports 和 module.exports 指向同一个对象。最终共享的结果，还是以 <u>module.exports 指向的对象</u>为准。**

- 时刻谨记，require() 模块时，得到的永远是 module.exports 指向的对象:

![image-20220602224450201](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261553439.png)

> exports是module.exports的引用,如果给module.exports赋值了一个对象{},则给exports赋值无效
>
> 为了防止混乱，建议不要在同一个模块中同时使用 exports 和 module.exports

