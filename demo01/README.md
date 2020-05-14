

## 运行项目 `yarn/npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
### JSX
   *** 由react发明的，它是由JavaScript和xml组成，例见App.js中render
   *** 里面元素定义类名不可只使用class,必须小驼峰className 
   *** 里面可镶嵌JS代码以{}包裹 
### 在JSX中使用一些方法，须使用bind指定指向

    *在方法中是无法直接赋值的,因为this指向为空
    *** 通过在JSX的方法中利用bind指定指向才可以
    *** (我在使用Vue中在methods的方法中，this是直接指向Vue实例的)
    *** this.state.inputValue=e.target.value（Vue适用）
    *** this.setState({inputValue:e.target.value})（react适用）

### 在JSX中使用数据管理
    *** this.state = {
    ***  inputValue: '',
    ***  list: []
    ***   }
        
### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
