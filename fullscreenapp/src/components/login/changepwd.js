import React, { Component } from 'react';
import { Field, reduxForm, Form,   } from 'redux-form';
import { connect } from 'react-redux';
import {changepwd_request} from '../../actions';
// import NavBar from '../tools/nav.js';
import { withRouter } from 'react-router-dom';
import { set_weui } from '../../actions';
import './login.css';
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

const required = value => value ? undefined : '必填项';
//input表单验证
let InputValidation = (props) => {
	const {onError,input, placeholder, type, meta: { touched, error, warning }} = props;
	let err1 = (touched && error);
	let err2 = (touched && warning);
	let style = "formvalidation form_input";
	style = err1||err2?"formvalidation form_input warning":"formvalidation form_input";
	return (
	  	<div className={style}>
		    <input {...input} placeholder={placeholder} type={type}/>
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
//二次密码验证
let password = '';
export const passwordA = value => {password = value; return undefined};
export const passwordB = value => value && value !== password? "两次密码输入不一致":  undefined;
//最短输入长度
export const minLength = min => value => value && value.length < min ? `少于最小输入长度${min}` : undefined;
export const minLength6 = minLength(6)
// import {
//     required,
//     // phone,
//     InputValidation,
//     // length4,
//     passwordA,
//     passwordB,
//     minLength6
// } from "../tools/formvalidation-material-ui"
// import Loginbg from "../../img/1.png";

export class PageForm extends Component {
    render(){
        const { handleSubmit,onClickchange,pristine,submitting } = this.props;

        return (
            <Form
                className="changepwdForm"
                onSubmit={handleSubmit(onClickchange)}
                >
                <div className="li" >
                    <span>当前密码</span>
                    <Field
                        name="password"
                        id="password"
                        placeholder="请输入原始密码"
                        type="password"
                        component={ InputValidation }
                        validate={[ required ]}
                    />
                </div>
                <div className="li">
                    <span>新的密码</span>
                    <Field
                        name="passwordA"
                        id="passwordA"
                        placeholder="请输入您的新密码"
                        type="password"
                        component={ InputValidation }
                        validate={[ required, passwordA, minLength6 ]}
                    />
                </div>
                <div className="li">
                    <span>确认密码</span>
                    <Field
                        name="passwordB"
                        id="passwordB"
                        placeholder="请重复输入您的新密码"
                        type="password"
                        component={ InputValidation }
                        validate={[ required, passwordB, minLength6 ]}
                    />
                </div>

                <br/>
                <br/>

                <div className="submitBtn">
                    <span
                        className="btn Default"
                        disabled={pristine || submitting}
                        onClick={handleSubmit(onClickchange)}
                        >
                        确定
                    </span>


                </div>
            </Form>
        )
    }
}

PageForm = reduxForm({
    form: 'changepwdPageForm'
})(PageForm);

PageForm = withRouter(PageForm);

export class Page extends Component {
    componentWillReceiveProps (nextProps) {

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

    onClickchange = (values)=>{

        let payload = {
            password:values.password,
            passwordA:values.passwordA,
        };

        console.log("修改密码::::"+JSON.stringify(payload));
        debugger
        this.props.dispatch(changepwd_request(payload));
        // this.props.history.push("./");
        //调用修改密码后台接口


    }
    render(){
        return (
            <div className="changepwdPage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    height : `${window.innerHeight}px`
                }}>
                <div className="navhead">
                    <div onClick={()=>{this.props.history.goBack()}} className="back"></div>
                    <span className="title" style={{paddingRight : "30px"}}>修改密码</span>
                </div>

                <div className="content">
                    <PageForm onClickchange={this.onClickchange}/>
                </div>
            </div>
        )
    }
}

const data = ({userlogin}) => { return userlogin; }
Page = connect(data)(Page);

export default Page;
