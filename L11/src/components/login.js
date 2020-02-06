import React, {Component} from "react";
import {TextInput, Text, Button} from 'react-native'
import {connect} from 'react-redux'
import {login, logout} from '../actions'


class Login extends Component{
state = {
  email: '',
  pass: ''
}

  loginHandler = ()=>{
    if(this.state.email && this.state.pass){
      this.props.login(this.state)
    }
  }


  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return(
      <>
        {
          this.props.user.auth ?
            <>
              <Text>mail</Text>
              <TextInput

              />
              <Text>Pass</Text>
              <TextInput
              />
              <Button
                onPress={()=>this.loginHandler()}
              />
              </>
            : <>
            <Button
            onPress={()=>this.props.logout}/>
            </>
        }

      </>
    )
  }


}




const mapStateToProps = (store)=>{
  return({
    user: store.user
  })

}
const mapDispatchToProps = (dispatch)=>{
  return({
    login: ({email, pass})=>dispatch(login),
    logout: ()=>dispatch(logout())
  })
}

export default connect(mapStateToProps, {})(Login);
