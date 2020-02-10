import React, {Component} from "react";
import {TextInput, Text, Button, View} from 'react-native'
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import {connect} from 'react-redux'
import {login, loginWithEmail, loginWithGoogle, logout} from '../actions'


class Login extends Component{

state = {
  email: '',
  pass: '',
  isSigninIngProgress: this.props.user.loading
}

  loginWithEmailHandler = ()=>{
    if(this.state.email && this.state.pass){
      this.props.loginWithEmail(this.state.email, this.state.pass)
    }
  }

  loginWithGoogleHandler = ()=>{
  this.setState({
    isSigninIngProgress: true
  })
    this.props.loginWithGoogle()
  }




  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return(
      <>
        {
          !this.props.user.auth
            ? <>
            <View>
              <Text>mail</Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderWidth:1,
                  borderStyle: 'solid',
                  borderColor: '#e2e2e2',
                  margin: 10,
                  padding: 5
                }}
                onChangeText={(text)=>{this.setState({email: text})}}
                value={this.state.email}
              />
              <Text>Pass</Text>
              <TextInput
                onChangeText={(pass => this.setState({pass: pass}))}
                value={this.state.pass}
                secureTextEntry={true}
                style={{ backgroundColor: '#fff',
                  borderWidth:1,
                  borderStyle: 'solid',
                  borderColor: '#e2e2e2',
                  margin: 10,
                  padding: 5}}
              />
              <Button
                title={'login'}
                onPress={()=>this.loginWithEmailHandler()}
                disabled={this.state.isSigninIngProgress}
              />

            </View>
             <View style={{paddingTop: 30}}>
               <GoogleSigninButton
                 style={{ width: 192, height: 48 }}
                 size={GoogleSigninButton.Size.Wide}
                 color={GoogleSigninButton.Color.Dark}
                 onPress={()=>this.loginWithGoogleHandler()}
                 disabled={this.state.isSigninIngProgress} />
             </View>

              </>
            : <>
            <Button
              title={'Logout'}
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
    loginWithEmail: (email, pass)=>dispatch(loginWithEmail({email, pass})),
    loginWithGoogle: ()=>dispatch(loginWithGoogle()),
    logout: ()=>dispatch(logout())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
