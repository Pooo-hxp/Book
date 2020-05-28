# React
使用Vue也一段时间了，想了解比较相似的react，更容易熟悉Vue特性
----
###### 本地连接远程仓库测试
* （此处省略Node和Npm相关安装和配置）
* 在新建的文件夹内create-react-app demo01 创建一个项目
* 安装完成后 cd demo01
* 然后 npm start既可启动(VS code里启动可能需要先CD进项目)
## 运行项目 `yarn/npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
### JSX
    - 由react发明的，它是由JavaScript和xml组成，例见App.js中render
    - 里面元素定义类名不可只使用class,必须小驼峰className 
    - 里面可镶嵌JS代码以{}包裹 
### 在JSX中使用一些方法，须使用bind指定指向
    - 在方法中是无法直接赋值的,因为this指向为空
    - 通过在JSX的方法中利用bind指定指向才可以
    - (我在使用Vue中在methods的方法中，this是直接指向Vue实例的)
    - this.state.inputValue=e.target.value（Vue适用）
    - this.setState({inputValue:e.targ et.value})（react适用）

### 在JSX中使用数据管理
    - this.state = {
    -  inputValue: '',
    -  list: []
    -   }
        
### `yarn eject`

