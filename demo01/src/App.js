import React from 'react';
const Component=React.Component;

class App extends Component{
  render(){
    return(
      <div>
        hello React!
        {/* JSX 语法*/}
        {/* 这里的类名不可只使用class,必须小驼峰className */}
        <ul className='ulName'>
    <li>{true?'JSX':'txt'}初次相识</li>
          <li>同Vue相似</li>
          <li>组件化开发</li>
        </ul>
      </div>
    )
  }
}
export default App;
