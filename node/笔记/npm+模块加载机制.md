# npm+模块加载机制

## npm与包

**Node.js 中的<u>第三方模块</u>又叫做包。**

由于 Node.js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发的时，效率很低。 

包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率。 

包和内置模块之间的关系，类似于 jQuery 和 浏览器内置 API 之间的关系。

- 从 https://www.npmjs.com/ 网站上搜索自己所需要的包
- 从 https://registry.npmjs.org/ 服务器上下载自己需要的包

**npm, Inc.** **公司**提供了一个包管理工具 Node Package Manager(简称 npm 包管理工具)，我们可以使用这个包管理工具，从 https://registry.npmjs.org/ 服务器把需要 的包下载到本地使用。

### 初体验

#### 解决速度缓慢

##### 切换 npm 的下包镜像源

下包的镜像源，指的就是下包的服务器地址。

```bash
#查看当前的下包镜像源
npm config get registry
#将下包的镜像源切换为淘宝镜像源
npm config set registry=https://registry.npm.taobao.org/
#检查镜像源是否下载成功
npm config get registry
```

##### nrm

为了更方便的切换下包的镜像源，我们可以安装 **nrm** ，利用 nrm 提供的终端命令，可以快速查看和切换下包的镜像源。

```bash
#通过npm包管理器，将nrm安装为全局可用的工具
npm i nrm -g
#查看所有可用的镜像源
nrm ls
#将下包的镜像源切换为 taobao镜像
nrm use taobao
```



#### **npm安装包**

```bash
#如果想在项目中安装指定名称的包，需要运行如下的命令:
npm install 包的完整名称
#上述的装包命令，可以简写成如下格式:
npm i 包的完整名称
```

初次装包完成后，在项目文件夹下多一个叫做 **`node_modules`** 的文件夹和 **`package-lock.json`** 的配置文件。

其中:

- **`node_modules`** 文件夹用来**存放所有已安装到项目中的包**。**<u>require() 导入第三方包时，就是从这个目录中查找并加载包。</u>** 
- **`package-lock.json`** 配置文件用来**记录 `node_modules` 目录下的每一个包的下载信息**，例如包的名字、版本号、下载地址等。

注意:不要手动修改 node_modules 或 package-lock.json 文件中的任何代码，npm 包管理工具会自动维护它们。

#### 安装指定版本的包

默认情况下，使用 npm install 命令安装包的时候，会自动安装最新版本的包。如果需要安装指定版本的包，可以在包 名之后，通过 @ 符号指定具体的版本，例如:

```bash
npm i comment@2.22.2
```

####  包的语义化版本规范

包的版本号是以“点分十进制”形式进行定义的，总共有三位数字，

例如 **2.24.0** 其中每一位数字所代表的的含义如下:

- 第1位数字**:大版本**
- 第2位数字:**功能版本**
- 第3位数字:**Bug修复版本**

- 版本号提升的规则:只要前面的版本号增长了，则后面的版本号**归零。**

### 包管理配置文件

npm 规定，在项目根目录中，**必须**提供一个叫做 **`package.json`** 的包管理配置文件。用来记录与项目有关的一些配置 信息。例如:

- 项目的名称、版本号、描述等
- 项目中都用到了哪些包
- 哪些包只在**开发期间**会用到
- 那些包在**开发和部署**时都需要用到

####  

#### **多人协作的问题**

![image-20220602233119940](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261553755.png)

> 整个项目的体积是 30.4M 第三方包的体积是 28.8M 项目源代码的体积 1.6M

- **遇到的问题:第三方包的体积过大，不方便团队成员之间共享项目源代码。**
- **解决方案:共享时剔除node_modules**

#### **如何记录项目中安装了哪些包**

在项目根目录中，创建一个叫做 **`package.json`** 的配置文件，即可用来记录项目中安装了哪些包。从而方便剔除 `node_modules` 目录之后，在团队成员之间共享项目的源代码。

**注意:今后在项目开发中，一定要把 node_modules 文件夹，添加到 .gitignore 忽略文件中。**

**.gitignore**

```bash
#忽略所有名为node_modules的文件夹
node_modules/
```



#### 快速创建 package.json

npm 包管理工具提供了一个快捷命令，可以在执行命令时所处的目录中，快速创建 package.json 这个包管理 配置文件:

```bash
#在执行命令所在的目录中,快速创建 package.json 
npm init -y
```

注意:

1. 上述命令只能在英文的目录下成功运行! 所以，项目文件夹的名称**一定要使用英文命名，不要使用中文，不能出现空格。**
2. 运行 npm install 命令安装包的时候，npm 包管理工具会自动把**包的名称**和**版本号**，记录到 package.json 中。



#### dependencies 节点

package.json 文件中，有一个 dependencies 节点，专门用来记录您使用 npm install 命令安装了哪些包。

```json
{
  "name": "code",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {//dependencies
    "art-template": "^4.13.2",
    "express": "^4.17.1",
    "jquery": "^3.4.1",
    "moment": "^2.24.0"
  },
  "devDependencies": {
    "webpack": "^4.42.1"
  }
}
```

####  一次性安装所有的包

当我们拿到一个**剔除了 node_modules** 的项目之后，需要先把所有的包下载到项目中，才能将项目运行起来。 否则会报类似于下面的错误:

```
//由于项目运行依赖于moment 这个包，如果没有提前安装好这个包，就会报如下的错误:
Error: Cannot find module 'moment'
```

**可以运行 `npm install` 命令(或 npm i)一次性安装所有的依赖包:**

```bash
#执行npm install 命令时，npm包管理工具会先读取package.json中的dependencies节点，
#读取到记录的所有依赖包名称和版本号之后，npm包管理T具会把这些包-次性下载到项目中
npm install 
```

#### 卸载包

可以运行 `npm uninstall` 命令，来卸载指定的包:

```bash
#使用npm uninstall 具体的包名来卸载包
npm uninstall moment
```

- 注意:npm uninstall 命令执行成功后，会把卸载的包，自动从 package.json 的 dependencies 中移除掉。

#### devDependencies 节点

如果某些包**只在项目开发阶段**会用到，在**项目上线之后不会用到**，则建议把这些包记录到 `devDependencies` 节点中。

与之对应的，如果某些包**在开发和项目上线之后**都需要用到，则建议把这些包记录到 `dependencies` 节点中。

```bash
#安装指定的包，并记录到devDependencies 节点中
npm install 包名 -D
#注意:上述命令是简写形式，等价于下面完整的写法:
npm install 包名 --save-dev
```



### 包的分类

使用 npm 包管理工具下载的包，共分为两大类，分别是: 

- 项目包
- 全局包

####  项目包

**那些被安装到项目的 `node_modules` 目录中的包，都是项目包。**

项目包又分为两类，分别是:

- **开发依赖包**(被记录到 **`devDependencies`** 节点中的包，只在开发期间会用到)
- **核心依赖包**(被记录到 **`dependencies`** 节点中的包，在开发期间和项目上线之后都会用到)

```bash
npm i 包名-D  #开发依赖包(会被记录到devDependencies 节点下)
npm i包名 #核心依赖包(会被记录到dependencies 节点下)
```



#### 全局包

在执行 npm install 命令时，如果提供了 -g 参数，则会把包安装为全局包。 

全局包会被安装到系统目录下,而不只是在该项目中。

```bash
npmi 包名 -g #全局安装指定的包
npm uninstall 包名 -g 卸载全局安装的包
```

注意:

1. 只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令
2. 判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可。



### 规范的包结构

一个规范的包，它的组成结构，必须符合以下 3 点要求:

1. 包必须以**单独的目录**而存在
2. 包的顶级目录下要必须包含 **`package.json`** 这个包管理配置文件
3. package.json 中必须包含 **`name，version，main`** 这三个属性，分别代表**包的名字、版本号、包的入口。**

注意:以上 3 点要求是一个规范的包结构必须遵守的格式，关于更多的约束，可以参考如下网址:

https://yarnpkg.com/zh-Hans/docs/package-json



## 开发一个自己的包

案例

**需要实现的功能**

- 格式化日期
- 转义 HTML 中的特殊字符
- 还原 HTML 中的特殊字符

**初始化包的基本结构**

1. 新建 pithy-tools 文件夹，作为包的根目录

2. 在 pithy-tools 文件夹中，新建如下三个文件:

   - package.json (包管理配置文件)

   - index.js (包的入口文件) 
   - README.md (包的说明文档)

**将不同的功能进行模块化拆分**

- 将格式化时间的功能，拆分到 src -> dateFormat.js 中
- 将处理 HTML 字符串的功能，拆分到 src -> htmlEscape.js 中
- **在 index.js 中，导入两个模块，得到需要向外共享的方法**
  - **再使用 module.exports 把对应的方法共享出去**



![image-20220603095251026](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261553757.png)

### package.json

如果导入包时未制定入口文件,只定位到文件夹,则会查找package.json,找到main所指向的入口文件

```json
{
  "name": "pithy-tools",
  "version": "1.0.0",
  "main": "index.js",
  "description": "提供了格式化时间、HTMLEscape相关的功能",
  "keywords": [
    "pithy",
    "dateFormat",
    "escape"
  ],
  "license": "ISC"
}
```

### README.md

安装方式、导入方式、格式化时间、转义 HTML 中的特殊字符、还原 HTML 中的特殊字符、开源协议

~~~markdown
## 安装
```
npm install pithy-tools
```

## 导入
```js
const pithy = require('pithy-tools')
```

## 格式化时间
```js
// 调用 dateFormat 对时间进行格式化
const dtStr = pithy.dateFormat(new Date())
// 结果  2020-04-03 17:20:58
console.log(dtStr)
```

## 转义 HTML 中的特殊字符
```js
// 带转换的 HTML 字符串
const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
// 调用 htmlEscape 方法进行转换
const str = pithy.htmlEscape(htmlStr)
// 转换的结果 &lt;h1 title=&quot;abc&quot;&gt;这是h1标签&lt;span&gt;123&amp;nbsp;&lt;/span&gt;&lt;/h1&gt;
console.log(str)
```

## 还原 HTML 中的特殊字符
```js
// 待还原的 HTML 字符串
const str2 = pithy.htmlUnEscape(str)
// 输出的结果 <h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>
console.log(str2)
```

## 开源协议
ISC
~~~

### index.js

```js
// 这是包的入口文件

const date = require('./src/dateFormat')
const escape = require('./src/htmlEscape')

// 向外暴露需要的成员
module.exports = {//展开运算符
  ...date,
  ...escape
}
```

### /src/

#### dateFormat.js

```js
// 定义格式化时间的函数
function dateFormat(dateStr) {
  const dt = new Date(dateStr)

  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())

  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

// 定义一个补零的函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}

module.exports = {
  dateFormat
}
```

#### htmlEscape.js

```js
// 定义转义 HTML 字符的函数
function htmlEscape(htmlstr) {
  return htmlstr.replace(/<|>|"|&/g, match => {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case '&':
        return '&amp;'
    }
  })
}

// 定义还原 HTML 字符串的函数
function htmlUnEscape(str) {
  return str.replace(/&lt;|&gt;|&quot;|&amp;/g, match => {
    switch (match) {
      case '&lt;':
        return '<'
      case '&gt;':
        return '>'
      case '&quot;':
        return '"'
      case '&amp;':
        return '&'
    }
  })
}

module.exports = {
  htmlEscape,
  htmlUnEscape
}
```

## 发布包 

**注册 npm 账号**

### **登录** **npm** **账号**

npm 账号注册完成后，可以在终端中执行 npm login 命令，依次输入用户名、密码、邮箱后，即可登录成功。

- 注意:在运行 `npm login` 命令之前，必须 先把下包的服务器地址切换为 npm 的官方 服务器。否则会导致发布包失败!

### **把包发布到 npm 上**

将终端**切换到包的根目录之后**，运行 `npm publish` 命令，即可将包发布到 npm 上(注意:包名不能雷同)。

![image-20220603102915061](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261553758.png)

### **删除已发布的包**

运行 `npm unpublish 包名 --force` 命令，即可从 npm 删除已发布的包。

注意:

- npm unpublish 命令只能删除 72 小时以内发布的包
- npm unpublish 删除的包，在 24 小时内不允许重复发布

## 模块的加载机制

### **优先从缓存中加载**

**模块在第一次加载后会被缓存**。 <u>这也意味着多次调用 require() 不会导致模块的代码被执行多次。</u> 

```js
require('./03.自定义模块')
require('./03.自定义模块')
require('./03.自定义模块')
```

> 只会执行一次

- **注意:不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。**



### **内置模块的加载机制**

内置模块是由 Node.js 官方提供的模块，**内置模块的加载优先级最高。**

- 例如，<u>require('fs') 始终返回内置的 fs 模块</u>，即使在 node_modules 目录下有名字相同的包也叫做 fs。



### **自定义模块的加载机制**

**使用 require() 加载自定义模块时，必须指定以 `./` 或 `../` 开头的路径标识符。**

- 在加载自定义模块时，如果<u>没有指定 `./` 或 ../ 这样的路径标识符</u>，则 node 会把它当作**内置模块或第三方模块**进行加载。

同时，在使用 require() 导入自定义模块时，**如果省略了文件的扩展名**，则 Node.js 会按顺序分别尝试加载以下的文件: 

1. 按照确切的文件名进行加载
2. 补全 **.js** 扩展名进行加载
3. 补全 **.json** 扩展名进行加载
4. 补全 **.node** 扩展名进行加载
5. 加载失败，终端报错



### **第三方模块的加载机制**

如果传递给 require() 的模块标识符**不是一个内置模块，也没有以 ‘./’ 或 ‘../’ 开头**，则 Node.js 会**从当前模块的父目录开始**，尝试从 **`/node_modules`** 文件夹中加载第三方模块。

**如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。** 

例如，假设在 '**C:\Users\itheimaproject**\foo.js' 文件里调用了 `require('tools')`，则 Node.js 会按以下顺序查找:  

1. **C:\Users\itheima\project**<u>\node_modules</u>\tools
2. **C:\Users\itheima**<u>\node_modules</u>\tools
3. **C:\Users**<u>\node_modules</u>\tools
4. **C:**<u>\node_modules</u>\tools



### 目录作为模块

当把**目录**作为模块标识符，传递给 require() 进行加载的时候，有三种加载方式:

1. 在被加载的目录下查找一个叫做 **`package.json`** 的文件，并寻找 **main** 属性，作为 **require()** 加载的入口
2. 如果目录里**没有 package.json** 文件，或者 **main 入口不存在或无法解析**，则 Node.js 将会试图**加载目录下的 `index.js` 文件。** 
3. 如果以上两步都失败了，则 Node.js 会在终端打印错误消息，报告模块的缺失:Error: Cannot find module 'xxx'