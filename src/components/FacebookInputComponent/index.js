import React from 'react';
import FacebookLogin from 'react-facebook-login';
import * as actions from './../../actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';


const FacebookLoginComponent = props => {
	
	const { isFacebookUserSignedIn } = props;
	const textButton = isFacebookUserSignedIn ? "Logout with Facebook" : 'Login with Facebook';
	
	const onLogout = () => {
		props.facebookLogout();
		props.clearImageList();
	};
	
	const responseFacebook = () => {
		props.checkIsFacebookUserSignedIn();
	};
	
	const loginButton =	<FacebookLogin
			appId={process.env.REACT_APP_FACEBOOK_APP_ID}
			textButton={textButton}
			callback={responseFacebook} />;
	
	const logoutButton = <button type='button' onClick={onLogout} className='kep-login-facebook'>{textButton}</button>;
	
	return isFacebookUserSignedIn ? logoutButton : loginButton;
};

const mapStateToProps = state => {
	return {
		isFacebookUserSignedIn: state.isFacebookUserSignedIn,
	}
};

const mapDispatchToProps = dispatch => {
	const { checkIsFacebookUserSignedIn, clearImageList, facebookLogout } = bindActionCreators( actions, dispatch );
	return {
		checkIsFacebookUserSignedIn: ()=> {
			checkIsFacebookUserSignedIn();
		},
		clearImageList: ()=> {
			clearImageList();
		},
		facebookLogout: ()=> {
			facebookLogout();
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLoginComponent);
