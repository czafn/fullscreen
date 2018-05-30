import React, { Component } from 'react';
import { Field, reduxForm, Form,   } from 'redux-form';
import { connect } from 'react-redux';
import { login_request } from '../../actions';
import TextField from 'material-ui/TextField';
// import { withRouter } from 'react-router-dom';
import { set_weui } from '../../actions';
import '../../css/login.css';
import RaisedButton from 'material-ui/RaisedButton';
import Loginbg from "../../img/9.png";
import Loginlogo from "../../img/10.png";
import Config from "../../env/config";

const inputData = (state) => { return state; };
const inputDispatchToProps = (dispatch) => {
  	return {
	    onError:(err)=>{
	      	let toast = {
			    show : true,
			    text : err,
			    type : "warning"
			}
			dispatch(set_weui({ toast }));
	    },
	}
};
export const required = value => value ? undefined : '必填项'
//input表单验证
let InputValidation = (props) => {
	const {onError,input, placeholder, type, meta: { touched, error, warning }} = props;
	let err1 = (touched && error);
	let err2 = (touched && warning);
	let style = "formvalidation form_input";
	style = err1||err2?"formvalidation form_input warning":"formvalidation form_input";
	return (
	  	<div className={style}>
	  		<TextField
	  			hintText = {placeholder}
	  			inputStyle = {{width: "100%"}}
	  			underlineStyle = {{bottom: "0px"}}
	  			style={{width: "100%"}}
	  			{...input}
	  			type={type}
	  			/>
		    {	touched &&
		    	((error &&
		    		<span
		    			className="warningtext"
		    			onClick={()=>{onError(error)}}
		    			>!</span>
		    		)
		    		|| (warning &&
		    			<span
			    			className="warningtext"
			    			onClick={()=>{onError(warning)}}
			    			>!</span>
		    		))
		    }
	  	</div>
	);
}

InputValidation = connect(inputData,inputDispatchToProps)(InputValidation);



 class PageForm extends Component {
    render(){
        const { handleSubmit,onClickLogin,pristine,submitting } = this.props;

        return (
            <Form
                className="loginForm formStyle1"
                onSubmit={handleSubmit(onClickLogin)}
                >

                <div className="li" >
                    <Field
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="请输入您的账号"
                        type="text"
                        component={ InputValidation }
                        validate={[ required ]}
                    />
                </div>
                <div className="li">
                    <Field
                        name="password"
                        id="password"
                        placeholder="请输入密码"
                        type="password"
                        component={ InputValidation }
                        validate={[ required ]}
                    />

                </div>

                <div className="submitBtn">
                    <RaisedButton
                        label="登录"
                        fullWidth={true}
                        primary={true}
                        disabled={pristine || submitting}
                        onClick={handleSubmit(onClickLogin)}
                    />
                </div>

                <div style={{textAlign: "center",lineHeight: "30px", color: "#FFF"}}>当前版本：{Config.appversion}</div>
            </Form>
        )
    }
}

PageForm = reduxForm({
    form: 'LoginPageForm'
})(PageForm);

// const inputconnect = formValueSelector('LoginPageForm');
// PageForm = connect(
//     state => {
//         const phonenumber = inputconnect(state, 'phonenumber');
//         return {
//             phonenumber
//         }
//     }
// )(PageForm)
// PageForm = withRouter(PageForm);
export class Page extends Component {
    componentWillReceiveProps (nextProps) {

        if(nextProps.loginsuccess && !this.props.loginsuccess){
          //search:?next=/devicelist
            var fdStart = this.props.location.search.indexOf("?next=");
            if(fdStart === 0){
                const redirectRoute = this.props.location.search.substring(6);
                this.props.history.replace(redirectRoute);
            }
            else{
                this.props.history.replace('/');
            }
            return;
        }
    }
    onClickReturn =()=>{
        this.props.history.goBack();
    }

    componentWillUnmount(){
        this.props.dispatch(set_weui({
            loading : {
                show : false
            },
        }));
    }

    onClickLogin = (values)=>{
        let payload = {
            username:values.phonenumber,
            password:values.password,
        };
        //console.log(`onClickLogin:${JSON.stringify(payload)}`);
        this.props.dispatch(login_request(payload));
    }
    render(){
        return (
            <div className="loginPage AppPage">
                <img src={Loginbg} className="bg" alt=""/>
                <div className="content">
                    <div className="head">
                        <img src={Loginlogo} className="logo" alt=""/>
                    </div>
                    <PageForm onClickLogin={this.onClickLogin}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({userlogin}) => {
  return {...userlogin};
}
Page = connect(mapStateToProps)(Page);

export default Page;
