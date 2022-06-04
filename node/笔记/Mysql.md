# Mysql

**实际开发中库、表、行、字段的关系**

1. 在实际项目开发中，一般情况下，每个项目都对应独立的数据库。
2. 不同的数据，要存储到数据库的不同表中，例如:用户数据存储到 users 表中，图书数据存储到 books 表中。
3. 每个表中具体存储哪些信息，由字段来决定，例如:我们可以为 users 表设计 id、username、password 这 3 个 字段。
4. 表中的行，代表每一条具体的数据。

对于开发人员来说，只需要安装 **MySQL Server** 和 **MySQL Workbench** 这两个软件，就能满足开发的需要了。

- MySQL Server:专门用来提供数据存储和服务的软件。
- MySQL Workbench:可视化的 MySQL 管理工具，通过它，可以方便的操作存储在 MySQL Server 中的数据。



## 安装并配置 MySQL

## 使用 MySQL Workbench 管理数据库

![image-20220604105825995](/Users/wsp/Library/Application Support/typora-user-images/image-20220604105825995.png)

![image-20220604105832990](/Users/wsp/Library/Application Support/typora-user-images/image-20220604105832990.png)

#### 创建数据库

![image-20220604105844200](/Users/wsp/Library/Application Support/typora-user-images/image-20220604105844200.png)

#### 创建数据表

![image-20220604105905256](/Users/wsp/Library/Application Support/typora-user-images/image-20220604105905256.png)

DataType 数据类型：

1. **int** 整数
2.  **varchar(len)** 字符串
3.  **tinyint(1)** 布尔值

1. 字段的特殊标识：
2. **PK**（Primary Key）主键、唯一标识
3. **NN**（Not Null）值不允许为空
4. **UQ**（Unique）值唯一
5. AI**（**Auto Increment）值自动增长

#### 向表中写入数据

![image-20220604105948793](/Users/wsp/Library/Application Support/typora-user-images/image-20220604105948793.png)

## 使用 SQL 管理数据库

SQL（英文全称：Structured Query Language）是结构化查询语言，专门用来访问和处理数据库的编程语言。能够让我们**以编程的形式**，**操作数据库里面的数据**。

```
 从数据库中查询数据
 向数据库中插入新的数据
 更新数据库中的数据
 从数据库删除数据
 可以创建新数据库
 可在数据库中创建新表
 可在数据库中创建存储过程、视图
 etc…
```

三个关键点：

1. SQL 是一门数据库编程语言
2. 使用 SQL 语言编写出来的代码，叫做 SQL 语句
3. SQL 语言只能在**关系型数据库**中使用（例如 **MySQL、Oracle、SQL Server**）。

- **非关系型数据库（例如 Mongodb）不支持 SQL 语言**



> 注意：SQL 语句中的关键字对**大小写不敏感**。SELECT 等效于 select，FROM 等效于 from。



重点掌握如何使用 SQL 从数据表中：

- **查询数据（select） 、插入数据（insert into） 、更新数据（update） 、删除数据（delete）**

额外需要掌握的 4 种 SQL 语法：

- **where 条件、and 和 or 运算符、order by 排序、count(*) 函数**



```sql
-- 使用哪一个表
use my_db_01;
```



### SELECT

SELECT 语句用于**从表中查询数据**。执行的结果被存储在一个**结果表中（称为结果集）**。语法格式如下：

```sql
-- 这是注释
-- 从FROM指定的[表中]，查询出[所有的]数据。
-- *表示[所有列]
SELECT * FROM 表名称
-- 从FROM指定的[表中] ,查询出指定列名称(字段)的数据。
SELECT 列名称FROM表名称
```

**SELECT *** 

```sql
-- 通过 * 把 users 表中所有的数据查询出来
select * from users
```

**SELECT 列名称** 

如需获取**名为 "username" 和 "password" 的列的**内容(从名为 "users" 的数据库表)，请使用下面的 SELECT 语句:

```sql
-- 从 users 表中把 username 和 password 对应的数据查询出来
select username, password from users
```



### INSERT INTO

**`INSERT INTO`** 语句用于**向数据表中插入新的数据行**，语法格式如下:

```sql
-- 语法解读:向指定的表中，插入如下几列数据，列的值通过values一一指定
-- 注意:列和值要一一对应，多个列和多个值之间，使用英文的逗号分隔
INSERT INTO table_ name (列1,列2,...) VALUES (值1,值2,.... )
```

 **示例
** 向 users 表中，插入一条 username 为 tony stark，password 为 098123 的用户数据，示例如下:

```sql
-- 向 users 表中，插入新数据，username 的值为 tony stark  password 的值为 098123
insert into users (username, password) values ('tony stark', '098123')
```



### UPDATE

Update 语句用于修改表中的数据。语法格式如下:

```sql
-- 语法解读:
-- 1.用UPDATE指定要更新哪个表中的数据
-- 2.用SET指定列对应的新值
-- 3.用WHERE 指定更新的条件
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
```

**示例**

**更新某一行中的一个列**

```sql
update users set password='123456' where id=2;
```

**更新某一行中的若干列**

```sql
-- 多个被更新的列之间，使用英文的逗号进行分隔
-- WHERE 后面跟着的是更新的条件
-- 注意:初学者经常忘记提供更新的WHERE 条件，这样会导致整张表的数据都被更新，一定要慎重!
UPDATE users SET password= 'admin123'，status=1 WHERE id=2;
```

### DELETE

DELETE 语句用于删除表中的行。语法格式如下:

```sql
-- 语法解读:
-- 从指定的表中，根据WHERE条件，删除对应的数据行
DELETE FROM 表名称 WHERE 列名称=值
```

**示例**

```sql
-- 注意:对初学者来说，经常忘记提供WHERE条件,
-- 从而导致误删整张表的数据! 一定要慎重!
DELETE FROM users WHERE id=4;
```



### WHERE 子句

**`WHERE 子句`**用于限定选择的标准。在 **`SELECT、UPDATE、DELETE`** 语句中，**皆可使用** WHERE 子句来限定选择的标准。

```sql
-- 查询语句中的WHERE条件
SELECT 列名称 FROM 表名称 WHERE 列运算符值
-- 更新语句中的WHERE条件
UPDATE 表名称 SET 列=新值 WHERE 列运算符值
-- 删除语句中的WHERE条件
DELETE FROM 表名称 WHERE 列运算符值
```

#### 运算符

**`= <> > < >= <= BETWEEN LIKE`**

![image-20220604132814559](/Users/wsp/Library/Application Support/typora-user-images/image-20220604132814559.png)

- 注意：在某些版本的 SQL 中，操作符 **`<>`** 可以写为 **`!=`**

```sql
-- 演示 where 子句的使用
select * from users where status=1
select * from users where id>=2
select * from users where username<>'ls'
select * from users where username!='ls'
```



#### AND 和 OR

AND 和 OR 可在 **WHERE 子语句**中把两个或多个条件结合起来。

**AND** 表示必须同时满足多个条件，相当于 JavaScript 中的 **&&** 运算符，例如 if (a !== 10 && a !== 20) 

**OR** 表示只要满足任意一个条件即可，相当于 JavaScript 中的 **||** 运算符，例如 if(a !== 10 || a !== 20)

```sql
-- 使用 AND 来显示所有状态为0且id小于3的用户
select * from users where status=0 and id<3

-- 使用 or 来显示所有状态为1 或 username 为 zs 的用户
select * from users where status=1 or username='zs'
```



### ORDER BY 子句

ORDER BY 语句用于根据**指定的列**对**结果集**进行排序。

ORDER BY 语句**默认按照升序**对记录进行排序。 

如果您希望按照**降序**对记录进行排序，可以使用 **DESC** 关键字。

**示例**

#### 升序排序 ASC

对 users 表中的数据，**按照 status 字段进行升序排序**，示例如下:

```sql
-- 注意:如下两条SQL语句是等价的，
-- 因为ORDER BY默认进行升序排序:
-- 其中，ASC 关键字代表升序排序
SELECT * FROM users ORDER BY status;
SELECT * FROM users ORDER BY status ASC; 
```

####  **降序排序 **DESC

对 users 表中的数据，按照 id 字段进行降序排序，示例如下:

```sql
-- 按照 id 对结果进行降序的排序  desc 表示降序排序   asc 表示升序排序（默认情况下，就是升序排序的）
select * from users order by id desc
```

#### 多重排序

对 users 表中的数据，**先按照** status 字段进行降序排序，再按照 username 的字母顺序，进行升序排序，示例如下:

```sql
select * from users order by status desc, username asc
```



### COUNT(*) 函数

**`COUNT(*)`** 函数用于**返回查询结果的总数据条数**，语法格式如下:

```sql
SELECT COUNT(*) FROM 表名称
```

**示例**

```sql
-- 使用 count(*) 来统计 users 表中，状态为 0 用户的总数量
select count(*) from users where status=0
```

#### 使用 AS 为列设置别名

如果希望给查询出来的列名称设置别名，可以使用 AS 关键字，示例如下:

```sql
select count(*) as total from users where status=0;
```

![image-20220604143010780](/Users/wsp/Library/Application Support/typora-user-images/image-20220604143010780.png)



## 在项目中操作 MySQL

mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。 想要在项目中使用它，需要先运行如下命令，将 mysql 安装为项目的依赖包:

```bash
npm i mysql
```

**配置** **mysql** **模块
** 在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下:

```js
// 1. 导入 mysql 模块
const mysql = require('mysql')
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1', // 数据库的 IP 地址
  user: 'root', // 登录数据库的账号
  password: '12345678', // 登录数据库的密码
  database: 'my_db_01', // 指定要操作哪个数据库
})
```

```js
db.query(sqlStr,[],(err,results)=>{
	//code 
})
```



### 查询数据

```js
// 查询 users 表中所有的数据
const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
  // 查询数据失败
  if (err) return console.log(err.message)
  // 查询数据成功
  // 注意：如果执行的是 select 查询语句，则执行的结果是数组
  console.log(results)
}) 
```

- 果执行的是 **`select`** 查询语句，则**执行的结果是数组**

### 插入数据

向 users 表中新增数据， 其中 username 为 wsp，password 为 111111。示例代码如下:

```js
// 向 users 表中，新增一条数据，其中 username 的值为 wsp，password 的值为 111111
const user = { username: 'wsp', password: '111111' }
// 定义待执行的 SQL 语句
const sqlStr = 'insert into users (username, password) values (?, ?)'
// 执行 SQL 语句
//使用数组的形式 依此为?占位符指定具体的值
db.query(sqlStr, [user.username, user.password], (err, results) => {
  // 执行 SQL 语句失败了
  if (err) return console.log(err.message)
  // 成功了
  // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
  // 可以通过 affectedRows 属性，来判断是否插入数据成功
  if (results.affectedRows === 1) {
    console.log('插入数据成功!')
  }
})
```

- 可以通过 **affectedRows** 属性，来判断是否插入数据成功
- 如果执行的是 **`insert into`** 插入语句，则 **results 是一个对象**

**便捷方式**

向表中新增数据时，如果数据对象的**每个属性和数据表的字段一一对应**，则可以通过如下方式快速插入数据:

```js
// 演示插入数据的便捷方式
const user = { username: 'psw', password: '111111' }
// 定义待执行的 SQL 语句
const sqlStr = 'insert into users set ?'
// 执行 SQL 语句
//直接将数据对象当作占位符的值
db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('插入数据成功')
  }
})
```



### 更新数据

 可以通过如下方式，更新表中的数据:

```js
// 演示如何更新用户的信息
const user = { id: 6, username: 'aaa', password: '000' }
// 定义 SQL 语句
const sqlStr = 'update users set username=?, password=? where id=?'
// 执行 SQL 语句
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
  if (results.affectedRows === 1) {
    console.log('更新成功')
  }
}) 
```

- 可以通过 affectedRows 判断是否更新成功
-  update 语句之后，执行的结果，也是一个对象，

**便捷方式**

更新表数据时，如果数据对象的每个属性和数据表的字段**一一对应**，则可以通过如下方式快速更新表数据:

```js
// 演示更新数据的便捷方式
const user = { id: 6, username: 'aaaa', password: '0000' }
// 定义 SQL 语句
const sqlStr = 'update users set ? where id=?'
// 执行 SQL 语句
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('更新数据成功')
  }
})
```



### **删除数据**

在删除数据时，推荐根据 **`id`** 这样的唯一标识，来删除对应的数据。示例如下:

```js
// 删除 id 为 5 的用户
const sqlStr = 'delete from users where id=?'
db.query(sqlStr, 5, (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
  if (results.affectedRows === 1) {
    console.log('删除数据成功')
  }
})
```



### 标记删除

使用 DELETE 语句，会把真正的把数据从表中删除掉。为了保险起见，**推荐使用**标记删除的形式，来**模拟删除的动作**。 

所谓的标记删除，就是在表中设置类似于 **status** 这样的**状态字段**，来**标记**当前这条数据是否被删除。

当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，**而是执行了 UPDATE 语句，将这条数据对应 的 status 字段标记为删除即可。**

```js
// 标记删除
const sqlStr = 'update users set status=? where id=?'
db.query(sqlStr, [1, 6], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('标记删除成功')
  }
})
```

