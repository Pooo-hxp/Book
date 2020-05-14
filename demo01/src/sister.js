import React, { Component } from 'react';
// Sister这个类，继承了Component身上的方法
class Sister extends Component {
    // 在构造函数中编写
    constructor(props) {
        super(props)
        // 数据都在state中
        this.state = {
            inputValue: '',
            list: []
        }
    }
    render() {
        return (
            <div>
                <input value={this.state.inputValue} onChange={this.inputChange.bind(this)}></input>
                <button>添加项目</button>
                <ul>
                    <li>组件引入</li>
                    <li>文档创建</li>
                    <li>代码编写</li>
                </ul>
            </div>
        )

    }
    // 使用到的方法直接在这里定义
    inputChange(e) {
        console.log(e);
        console.log(e.target.value);
        /**
         * 这里是无法直接赋值的,因为this指向为空
         * 通过在JSX中利用bind指定指向才可以
         * (我在使用Vue中在methods的方法中，this是直接指向Vue实例的)
         * this.state.inputValue=e.target.value（react不适用）
         */
        this.setState({
            inputValue:e.target.value
        })
        
    }
}

export default Sister;
//把当前组件暴露出去