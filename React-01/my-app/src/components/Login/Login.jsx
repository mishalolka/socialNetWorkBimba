import classes from "./Login.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Navigate} from "react-router-dom";
import React from "react";

const LoginForm = ({handleSubmit,error}) =>
{
    return (
          <form onSubmit={handleSubmit}>
              <div>
                  <Field placeholder={"email"} name={"email"} component={Input} validate={[required]}/>
              </div>
              <div>
                  <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} type="password"/>
              </div>
              <div>
                  <Field type={"checkbox"} name={"rememberMe"} component={Input}/> Remember me
              </div>
              {error && <div className={classes.formSummaryError}>
                  Error
              </div>}
              <div>
                  <button>Login</button>
              </div>
          </form>
    );

}

const LoginReduxForm = reduxForm({
    //unique name u form
    form: "login"
})(LoginForm)



const Login = (props) =>
{
    const onSubmit = (formData) =>
    {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth)
    {
        return <Navigate to={"/profile"} replace={true} />
    }


    return (
      <div>
          <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
      </div>

    );

}

const mapStateToProps = (state) =>
({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)