import React,{ Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class Hello extends Component {
  render(){
    return(
      <MuiThemeProvider muiTheme ={getMuiTheme()}>
        <RaisedButton label='material-ui' primary={true} />
      </MuiThemeProvider>  
    );
  }
}

// import 用于载入其他模块 {加载的方法} from ‘从那个模块中’
// export 用于规定模块对外的接口，可以理解为导出
// const ES6声明一个只读的常量，其值不能改变。

export default Hello;