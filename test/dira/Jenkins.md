
# Jenkins 快速集成测试
> ### 移动端基于Jenkins自动化测试集成分享

>> 为什么要进行快速集成测试发布
>>1. swift 编译时间长 
>>2. 签名—>打包—>上传 
>>3. 重复性流程优先考虑自动化
>>4. 组内成员都可进行发布操作


主要内容：
* Jenkins的安装
* 插件的安装
* 项目的下载
* 打包环境的配置
* 发布环境（第三方、邮件）
* 可做优化项

## 1. Jenkins 的安装
> 官方提供两种方式任君选择：</br>
* 可以选择安装工具 下载地址：https://jenkins.io/<br/>
* 可以使用命令行进行：brew install jenkins
    >有可能需要安装Java运行环境下载地址：http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

* 成功后通过浏览器进行访问内置管理页面：localhost:8080 
   端口默认8080 可修改
    * 启动Jenkins服务，可在命令行中输入 jenkins

<ul>
        <li>首先进入修改密码页面,原密码存储路径已给出，按照提示操作即可</li>
    </ul>
    <div>            <img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/45FBA620-812B-4610-A24A-D6B963C6D0CD.png" height="361" width="356" /><br/></div>
    <ul>
        <li>进入安装插件界面</li>
    </ul>
    <div>           选择跳过，后面可在配置选项中操作， 部分插件可能需要翻墙</div>
    <div>        <img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/9EC81A12-1C44-4D98-9CC3-BECEFDFED20C.png" height="364" width="575" /><br/></div>
    <ul>
        <li>创建管理账号</li>
    </ul>
    <div>                <img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/557FDE16-7F32-4DD5-840C-D8DBDE585F55.png" height="591" width="687" /><br/></div>
    <hr/>
    <div><br/></div>
    <ul>
        <li>配置完成后，进入管理界面</li>
        <li><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/43F93CCC-BFD5-443A-8E0F-434FC61C5877.png" height="644" width="1432" /><br/></li>
    </ul>



## 2.插件的安装
<div>点击导航区系统管理，进入插件管理页面</div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/DD15B29E-B30A-42AF-A412-1E81B192EB61.png" height="287" width="1049" /><br/></div>
    <div>选择配置，移动端打包发布所需要的插件，可直接搜索安装</div>
    <ul>
        <li>Git , Gitlab,SVN , SSH Credentials用于授权后拉取远程库的代码</li>
        <li>Keychains and Provisioning Profiles Management: 证书与描述文件的管理</li>
        <li>Xcode integration Xcode打包的插件,所以iOS的打包只能部署在Mac系统</li>
        <li>Cocoapods 如果项目使用了cocoapod插件 来获取依赖库</li>
        <li>Mailer Plugin 用来发送通知邮件</li>
        <li>使用蒲公英,官方提供集成方案（iOS和Android） <a href="https://www.pgyer.com/doc/view/jenkins_ios">https://www.pgyer.com/doc/view/jenkins_ios</a></li>
        <li>Post-Build Script Plug-in 脚本插件</li>
    </ul>
    <hr/>
## 3.工程项目下载
<div>首先在导航区 点击新建任务，创建需要进行自动化集成的项目，创建成功后进入项目管理</div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/CDB5A126-FDDF-4140-A0A8-68F2D6BC809B.png" height="321" width="248" /><br/></div>
    <div><br/></div>
    <div>点击配置</div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/9C0549AB-15F2-43FC-9A98-E6792D95EF3E.png" height="61" width="608" /><br/></div>
    <div>依次进行配置</div>
    <div><br/></div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/6FDAC053-ABEA-47C5-AAC6-09B7742AE547.png" height="450" width="944" /><br/></div>
    <div><br/></div>
    <div>默认只需要选择描述，其他的选项根据自己需求进行配置</div>
    <div><br/></div>
    <div><br/></div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/25284180-B21B-4D98-9829-E46F5CA11296.png" height="418" width="944" /><br/></div>
    <div>需要添加ssh 私钥,项目的git下载地址</div>
    <div><br/></div>
    <hr/>

## 4. 构建环境的配置
<div><br/></div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/15C6C2ED-F552-4BF7-A969-A1E60450D298.png" height="400" width="938" /><br/></div>
    <div>构建环境 iOS需要配置xcode 编译代码证书，管理员秘钥添加路径</div>
    <h1 style="text-align: start;">首页—&gt;系统管理 ---&gt;Keychains and Provisioning Profiles Management</h1>
    <div>上传钥匙串的 login.keychain , mac地址~/Library/Keychains/</div>
    <div><br/></div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/4DA785AD-E8AD-42B5-A8CE-0313C36F1986.png" height="547" width="1068" /><br/></div>
    <div><br/></div>
    <div><br/></div>
    <hr/>
    <div>增加构建步骤，iOS通过选择xcode</div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/7FAB08DB-0C24-4452-8670-6337F571E942.png" height="459" width="532" /><br/></div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/83956D63-8C92-4117-98DF-45BE31AF716B.png" height="543" width="1011" /><br/></div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/F3C5996B-E702-4C14-871E-58A6EA13EDDD.png" height="353" width="919" /><br/></div>
    <div><br/></div>
    <div><br/></div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/DE305947-5CA7-40D5-8244-97F97112F465.png" height="559" width="914" /><br/></div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/A96F4DF7-FD32-4891-8624-CEBFC2B3579B.png" height="544" width="997" /><br/></div>
    <div><br/></div>
    <div>构建后操作</div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/8A2DA79C-682D-4304-BE4F-184EE387D55E.png" height="546" width="927" /><br/></div>
    <div><br/></div>
    <div>运行构建</div>
    <div>成功后会收到蒲公英更新提醒</div>
    <div><img src="Jenkins%20%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.resources/877ED314-671E-47E2-AA6C-95A47CEF29B9.png" height="740" width="438" /><br/></div>
    <div>也可以 配置邮件提醒</div>
    <div><br/></div>
    <div><br/></div>
    <div><br/></div>
    <hr/>
    <div>可单独的把打包，运行环境搭建到一台电脑中，可以分担编译主机的内存消耗</div>
    <div><br/></div>
    <div><br/></div>


