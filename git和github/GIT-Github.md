# GIT

Git 是一个开源的分布式版本控制系统，是目前世界上最先进、最流行的版本控制系统。可以快速高效地处理 从很小到非常大的项目版本管理。

特点:项目越大越复杂，协同开发者越多，越能体现出 Git 的高性能和高可用性!

## 起步

###  **Git** **的特性**

Git 之所以快速和高效，主要依赖于它的如下两个特性: 

- 直接记录快照，而非差异比较
- 近乎所有操作都是本地执行

### **SVN** **的差异比较**

传统的版本控制系统(例如 SVN)是基于差异的版本控制，它们存储的是一组基本文件和每个文件随时间逐步 累积的差异。

![SVN 的差异比较](http://www.itcast.cn/files/image/202203/20220315100443158.png)

- 优点:节省磁盘空间
- 缺点:耗时、效率低

在每次切换版本的时候，都需要在基本文件的基础上，应用每个差异，从而生成目标版本对应的文件。

### **Git** **的记录快照**

Git 快照是在原有文件版本的基础上重新生成一份新的文件，类似于备份。为了效率，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。

![Git 的记录快照](http://www.itcast.cn/files/image/202203/20220315100642619.png)

缺点:占用磁盘空间较大 

优点:版本切换时非常快，因为每个版本都是完整的文件快照，切换版本时直接恢复目标版本的快照即可。 

特点:空间换时间

### **近乎所有操作都是本地执行**

在 Git 中的绝大多数操作都只需要访问本地文件和资源，一般不 需要来自网络上其它计算机的信息。

![img](http://www.itcast.cn/files/image/202203/20220315101220414.png)

特性:
 1 断网后依旧可以在本地对项目进行版本管理
 2 联网后，把本地修改的记录同步到云端服务器即可

### **GIT三个区域**

使用 Git 管理的项目，拥有三个区域，分别是工作区、暂存区、Git 仓库

### **Git** **中的三种状态**

![img](http://www.itcast.cn/files/image/202203/20220315102349352.png)

- 已修改：表示修改了文件，但还没将修改的结果放到暂存区
- 已暂存：表示对已修改文件的当前版本做了标记，使之包含 在下次提交的列表中;
- 已提交：表示文件已经安全地保存 在本地的Git 仓库中。

**注意：**

- 工作区的文件被修改了，但还没有放到暂存区，就是已修改状态。 
- 如果文件已修改并放入暂存区，就属于已暂存状态。 
- 如果Git 仓库中保存着特定版本的文件，就属于已提交状态。

### **基本的Git 工作流程**

![基本的Git 工作流程](http://www.itcast.cn/files/image/202203/20220315102538086.png)

基本的Git 工作流程如下：

1. 在工作区中修改文件
2. 将你想要下次提交的更改进行暂存
3. 提交更新，找到暂存区的文件，将快照永久性存储到Git 仓库.

## Git 的基本操作

###  **获取** **Git** 仓库的两种方式

1. 将尚未进行版本控制的本地目录**转换**为 Git 仓库 
2. 从其它服务器**克隆**一个已存在的 Git 仓库

以上两种方式都能够在自己的电脑上得到一个可用的  Git 仓库 

### 在现有目录中初始化仓库

如果自己有一个尚未进行版本控制的项目目录，想要用 Git 来控制它，需要执行如下两个步骤: 

1. 在项目目录中，通过鼠标右键打开“Git Bash”
2. 执行 git init 命令将当前的目录转化为 Git 仓库

git init 命令会创建一个名为 .git 的隐藏目录，**这个** **.git** **目录就是当前项目的** **Git** **仓库**，里面包含了初始的必要 文件，这些文件是 Git 仓库的必要组成部分。

### 工作区中文件的 4 种状态

工作区中的每一个文件可能有 4 种状态，这四种状态共分为两大类，如图所示:

![image-20220523001006051](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548097.png)

- Git 操作的目的:让工作区中的文件都处于“未修改”的状态

### 检查文件的状态

可以使用 git status 命令查看文件处于什么状态，例如

![image-20220523001107854](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548098.png)

在状态报告中可以看到新建的 index.html 文件出现在 **Untracked files(未跟踪的文件)** 下面。

**未跟踪的文件意味着 Git 在之前的快照(提交)中没有这些文件**;

Git 不会自动将之纳入跟踪范围，除非明确 地告诉它“我需要使用 Git 跟踪管理该文件”。

#### 以精简的方式显示文件状态

使用 git status 输出的状态报告很详细，但有些繁琐。如果希望以精简的方式显示文件的状态，可以使用如下 两条完全等价的命令，其中 **-s** 是 **--short** 的简写形式:

```bash
git status -s
```

### 跟踪新文件

使用命令 `git add` 开始跟踪一个文件。  所以，要跟踪 index.html 文件，运行如下的命令即可:`git add index.html`

此时再运行 git status 命令，会看到 index.html 文件在 Changes to be committed 这行的下面，说明已被 跟踪，并处于暂存状态:

<img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548099.png" alt="image-20220523001558177" style="zoom:33%;" />

#### 向暂存区中一次性添加多个文件

如果需要被暂存的文件个数比较多，可以使用**`git add .`**一次性将所有的新增和修改过的文件加入暂存区:

今后在项目开发中，会经常使用这个命令，将**新增和修改过后的文件加入暂存区。**

### 取消暂存的文件

**`git reset HEAD 被移除的文件名`**

### 提交更新

现在暂存区中有一个 index.html 文件等待被提交到 Git 仓库中进行保存。可以执行 git commit 命令进行提交, 其中 -m 选项后面是本次的提交消息，用来对提交的内容做进一步的描述:`git commit -m "新建了index.html文件"`

提交成功之后，再次检查文件的状态，得到提示如下:

<img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548100.png" alt="image-20220523001939508" style="zoom:33%;" />

证明工作区中所有的文件都处于“未修改”的状态，没有任何文件需要被提交。

![image-20220523002000871](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548101.png)

### 对已提交的文件进行修改

目前，index.html 文件已经被 Git 跟踪，并且工作区和 Git 仓库中的 index.html 文件内容保持一致。当我们 修改了工作区中 index.html 的内容之后，再次运行 git status 和 git status -s 命令，会看到如下的内容

![image-20220523002113319](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548102.png)

文件 index.html 出现在 Changes not staged for commit 这行下面，说明**已跟踪文件的内容发生了变化， 但还没有放到暂存区**。

- 修改过的、没有放入暂存区的文件前面有红色的 M 标记。

### 暂存已修改的文件

目前，工作区中的 index.html 文件已被修改，如果要暂存这次修改，需要再次运行 git add 命令，这个命令 是个多功能的命令，主要有如下 3 个功效:

1. 可以**用它开始跟踪新文件**
2. 把已跟踪的、且已修改的文件**放到暂存区** 
3. 把有冲突的文件标记为已解决状态

![image-20220523002234078](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548103.png)

### 提交已暂存的文件

再次运行 git commit -m "提交消息" 命令，即可将暂存区中记录的 index.html 的快照，提交到 Git 仓库中进 行保存:

![image-20220523002259622](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548104.png)

![image-20220523002307574](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548105.png)

### 撤销对文件的修改

撤销对文件的修改指的是:把对工作区中对应文件的修改，**还原**成 **Git 仓库**中所保存的版本。 

操作的结果:所有的修改会丢失，且无法恢复!**危险性比较高，请慎重操作!**

![image-20220523002345950](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548106.png)

- **撤销操作的本质**:用 Git 仓库中保存的文件，覆盖工作区中指定的文件。

###  跳过使用暂存区域

Git 标准的工作流程是**工作区 → 暂存区 → Git 仓库，**但有时候这么做略显繁琐，此时可以跳过暂存区，直接将 工作区中的修改提交到 Git 仓库，这时候 Git 工作的流程简化为了**工作区 → Git 仓库**。

Git 提供了一个跳过使用暂存区域的方式， 只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把 所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤:

**`git commit -a -m "描述信息"`**

### 移除文件

从 Git 仓库中移除文件的方式有两种:

1. 从 Git 仓库和工作区中同时移除对应的文件
2. 只从 Git 仓库中移除指定的文件，但保留工作区中对应的文件

```bash
# 从Git仓库和工作区中同时移除对应的文件
git rm -f index.js
# 只从 Git 仓库中移除 index.css 但保留工作区中的 index.css文件
git rm --cached index.css
```

### 忽略文件 .gitignore

一般我们总会有些文件无需纳入Git的管理，也不希望它们总出现在未跟踪文件列表。在这种情况下，我们可以创建一个名为 **.gitignore**的配置文件，列出要忽略的文件的匹配模式。

文件.gitignore的格式规范如下：

1. 以**#开头**的是注释
2. 以**/结尾**的是目录
3. 以**/开头**防止递归
4. 以**！开头**表示取反

可以使用**glob模式**进行文件和文件夹的匹配（glob指简化了正则表达式）

#### glob 模式

所谓的 glob 模式是指简化了的正则表达式:

-  **星号** ***** 匹配零个或多个任意字符
-  **[abc]** 匹配任何一个列在方括号中的字符 (此案例匹配一个 a 或匹配一个 b 或匹配一个 c)
-  **问号** **?** 只匹配一个任意字符
-  在方括号中使用**短划线**分隔两个字符， 表示所有在这两个字符范围内的都可以匹配(比如 [0-9] 表示匹配 所有 0 到 9 的数字)
-  **两个星号** ***\*** 表示匹配任意中间目录(比如 a/**/z 可以匹配 a/z 、 a/b/z 或 a/b/c/z 等)

####  .gitignore 文件的例子

![image-20220523003203269](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548107.png)

### 查看提交历史

如果希望回顾项目的提交历史，可以使用 `git log` 

```bash
# 按照时间先后顺序列出所有的提交历史，最近的提交排在最上面
git log

# 只展示最新的两条提交历史，数字可以按需进行填写
git log -2 

# 在一行上展示最近两条提交历史的信息
git log -2 --pretty=oneline

# 在一行上展示最近两条提交的历史信息，并自定义输出的格式
# %h 提交的简写哈希值 %an作者名字 %ar作者修订日期，按多久以前的方式显示，%s提交说明
git log -2 --pretty=format:"%h | %an | %ar | %s"
```

### 回退到指定的版本

```bash
# 在一行上展示所有的提交历史
git log --pretty=oneline

# 使用git reset --hard命令，根据指定的提交ID回退到指定版本
git reset --hard<CommitID>

# 在旧版中使用 git reflog --pretty=oneline 命令，查看命令操作的历史
git reflog --pretty=oneline

# 再次根据最新的提交 ID，跳转到最新的版本
git reset --hard <CommitID>
```

## **小结**

- 初始化 Git 仓库的命令 **` git init`**
- 查看文件状态的命令 **`git status` 或 `git status -s`** 
- 一次性将文件加入暂存区的命令 **` git add .`**
- 将暂存区的文件提交到 Git 仓库的命令 **`git commit -m "提交消息"`**

# Github远程仓库

**远程仓库的两种访问方式**

Github 上的远程仓库，有两种访问方式，分别是 HTTPS 和 SSH。它们的区别是:

1. **HTTPS**:零配置;但是每次访问仓库时，需要重复输入 Github 的账号和密码才能访问成功
2. **SSH**:需要进行额外的配置;但是配置成功后，每次访问仓库时，不需重复输入 Github 的账号和密码

注意:在实际开发中，推荐使用 SSH 的方式访问远程仓库。

##  基于 HTTPS

![image-20220523011002065](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548108.png)

## SSH key

SSH key 的**作用**:实现本地仓库和 Github 之间免登录的加密数据传输。 SSH key 的**好处**:免登录身份认证、数据加密传输。

SSH key 由**两部分组成**，分别是:

1. **id_rsa**(私钥文件，存放于客户端的电脑中即可)
2. **id_rsa.pub**(公钥文件，需要配置到 Github 中)

### 生成 SSH key

1. 打开 Git Bash
2. 粘贴如下的命令，并将 your_email@example.com 替换为注册 Github 账号时填写的邮箱:
   - ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
3. 连续敲击 3 次回车，即可在 C:\Users\用户名文件夹\.ssh 目录中生成 id_rsa 和 id_rsa.pub 两个文件

### 配置 SSH key

1. 使用打开 id_rsa.pub 文件，复制里面的文本内容
2. 在浏览器中登录 Github，点击 **头像 -> Settings -> SSH and GPG Keys -> New SSH key**
3. 将 id_rsa.pub 文件中的内容，粘贴到 Key 对应的文本框中
4. 在 Title 文本框中任意填写一个名称，来标识这个 Key 从何而来

### 检测是否配置成功

打开 Git Bash，输入如下的命令并回车执行

```bash
ssh -T git@github.com
```

上述的命令执行成功后，可能会看到如下的提示消息

![image-20220523011710671](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548109.png)

## 基于 SSH 将本地仓库上传到 Github

![image-20220523011548693](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548110.png)

## 将远程仓库克隆到本地

打开 Git Bash，输入如下的命令并回车执行:

```bash
git clone 仓库地址
```

# Git 分支

**分支在实际开发中的作用**

![在这里插入图片描述](https://img-blog.csdnimg.cn/b3ca88ecdee44cb7af7fb75ec51485b7.png)

##  master 主分支

在初始化本地 Git 仓库的时候，Git 默认已经帮我们创建了一个名字叫做 master 的分支。通常我们把这个 master 分支叫做主分支。

![image-20220523012118074](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548111.png)

##  功能分支

由于程序员不能直接在 master 分支上进行功能的开发，所以就有了功能分支的概念。

**功能分支**指的是专门用来开发新功能的分支，它是临时从 master 主分支上分叉出来的，当新功能开发且测试 完毕后，最终需要合并到 master 主分支上，如图所示:

![image-20220523012242073](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548112.png)

## 本地分支操作

### **查看分支列表**

 **`git branch`**

- <img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548113.png" alt="image-20220523012441334" style="zoom:33%;" />注意:分支名字前面的 ***** 号表示当前所处的分支。



### **创建新分支**

**(基于当前分支，创建一个新的分支) `git branch 分支名称`**

基于当前分支，创建一个新的分支，此时，**新分支中的代码和当前分支完全一样:**

![image-20220523012721481](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548114.png)

### 切换分支

**`git checkout 要切换到的分支`**

![image-20220523012849234](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548115.png)

### 分支的快速创建和切换

```bash
# -b 表示创建一个新分支
# checkout 表示切换到刚刚新建的分支上
git checkout -b 分支名称
```

![image-20220523013215010](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548116.png)

### 合并分支

功能分支的代码开发测试完毕之后，可以使用如下的命令，将完成后的代码合并到 master 主分支上:

```bash
# 切换到 master 分支
git checkout master
# 在master分支上运行 git merge命令 将 login分支合并到master分支
git merge login
```

![image-20220523014110212](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548117.png)

### 删除分支

当把功能分支的代码合并到 master 主分支上以后，就可以使用如下的命令，删除对应的功能分支:

**`git branch -d 分支名称`**

![image-20220523014120421](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207261548118.png)

### 遇到冲突时的分支合并

如果在两个不同的分支中，对同一个文件进行了不同的修改，Git 就没法干净的合并它们。 

此时，我们需要打开 这些包含冲突的文件然后**手动解决冲突**。

```bash
# 假设reg分支合并master期间 代码发生冲突
git checkout master
git merge reg

#打开包含冲突的文件然后手动解决冲突 再执行:
git add .
git commit -m "解决分支合并冲突"
```



## 远程分支操作

### 将本地分支推送到远程仓库

如果是**第一次**将本地分支推送到远程仓库，需要运行如下的命令:

```bash
# -u 表示将本地分支和远程分支进行关联 只在第一次推送到时候加 -u 参数
git push -u 远程仓库的别名 本地分支名称:远程分支名称

# 案例
git push -u origin payment:pay

#r如果希望远程分支的名称和本地分支保持一致,则可以对命令进行简化
git push -u origin payment
```

- 注意:第一次推送分支需要带 **-u 参数**，此后可以直接使用 **git push** 推送代码到远程分支。

### 查看远程仓库中所有的分支列表

通过如下的命令，可以查看远程仓库中，所有的分支列表的信息:

```bash
git remote show 远程仓库名称
```



### 跟踪分支

```bash
#从远程仓库中，把对应的远程分支下载到本地仓库，保持本地分支和远程分支名称相同
git checkout 远程分支的名称
#示例:
git checkout pay

#从远程仓库中，把对应的远程分支下载到本地仓库，并将下载的本地分支进行重命名
git checkout -b 本地分支名称 远程仓库名称/远程分支名称
#示例:
git checkout -b payment origin/pay
```



### 拉取远程分支的最新的代码

可以使用如下的命令，把远程分支最新的代码下载到本地对应的分支中:

```bash
#从远程仓库拉取当前分支最新的代码 保存当前分支代码和远程代码分支一致
git pull
```



### 删除远程分支

可以使用如下的命令，删除远程仓库中指定的分支:

```bash
#删除远程仓库中，指定名称的远程分支
git push远程仓库名称 --delete 远程分支名称
#示例:
git push origin --delete pay
```



# 总结



- **能够掌握 Git 中基本命令的使用**

  -  **`git init`**
  - **`git add .`**
  - **`git commit –m "提交消息"`**  
  - **`git status 和 git status -s`**

  

- **能够使用 Github 创建和维护远程仓库**

  -  能够配置 Github 的 SSH 访问
  - 能够将本地仓库上传到 Github

  

- **能够掌握 Git 分支的基本使用**

  - **`git checkout -b 新分支名称`** 新建并切换到该分支

  - **`git push -u origin 新分支名称`**   将本地分支推送到远程仓库

  - **`git checkout 分支名称`** 切换分支

  - **`git branch`** 查看分支