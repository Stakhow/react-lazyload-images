import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import * as actions from './../../actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

class GoogleLoginComponent extends Component{
	
	onFailure (response) {
		console.log('onFailure', response);
	};
	
	onSuccess = () => {
		this.props.checkIsGoogleUserSignedIn();
	};
	
	render() {
		
		const { userSignedIn, clearImageList, checkIsGoogleUserSignedIn } = this.props;
		const onLogOut = () => {
			clearImageList();
			checkIsGoogleUserSignedIn();
		};
		
		return (
			<React.Fragment>
				{ userSignedIn ?
					<GoogleLogout
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						buttonText="Logout"
						onLogoutSuccess={onLogOut}
					/>
					:
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						buttonText="Login"
						onSuccess={this.onSuccess}
						onFailure={this.onFailure}
						cookiePolicy={'single_host_origin'}
					/>
				}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		userSignedIn: state.isGoogleUserSignedIn,
	}
};

const mapDispatchToProps = dispatch => {
	const { checkIsGoogleUserSignedIn, clearImageList } = bindActionCreators( actions, dispatch );
	return {
		checkIsGoogleUserSignedIn: ()=> {
			checkIsGoogleUserSignedIn();
		},
		clearImageList: ()=> {
			clearImageList();
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLoginComponent);