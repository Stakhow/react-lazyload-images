import React from "react";
import GoogleLoginComponent from "../GoogleLoginComponent";
import FacebookLoginComponent from "../FacebookInputComponent";

const LoginForm = props => {
	
	return (
		<div className="container">
			<div className="row p-5">
				<div className="col-12 text-center mb-3">
					<h1>Login to see images!</h1>
				</div>
				<div className="col-12 text-center">
				<span className="p-2">
					<GoogleLoginComponent/>
				</span>
					<span className="p-2">
					<FacebookLoginComponent/>
				</span>
				</div>
			</div>
		</div>
	)
};
export default LoginForm;