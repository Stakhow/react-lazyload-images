import React, { Component } from 'react';
import './App.sass';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import ImagesList from "./components/ImagesList";
import * as actions from './actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Preloader from "./components/Preloader";
import LoginForm from "./components/LoginForm";


class App extends Component{
	
	 componentDidMount() {
		this.props.checkIsGoogleUserSignedIn();
		this.props.checkIsFacebookUserSignedIn();
	}
	
	render () {
		
		const { isGoogleUserSignedIn, isFacebookUserSignedIn, isPageLoading } = this.props;
		const isUserSignedIn = isGoogleUserSignedIn || isFacebookUserSignedIn;
		
		if (isPageLoading) return <Preloader/>;
		
		return (
			<div className="App">
				<BrowserRouter>
					<Route exact={true} path='/' render={() => (
						<React.Fragment>
							{ isUserSignedIn ? <Redirect to='/images'/> : <LoginForm/> }
						</React.Fragment>
					)}/>
					<Route exact={true} path='/images' render={() => (
						<React.Fragment>
							{ isUserSignedIn ? <ImagesList/> : <Redirect to='/'/> }
						</React.Fragment>
					)}/>
				</BrowserRouter>
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		isGoogleUserSignedIn: state.isGoogleUserSignedIn,
		isFacebookUserSignedIn: state.isFacebookUserSignedIn,
		isPageLoading: state.isLoading
	}
};

const mapDispatchToProps = dispatch => {
	const { checkIsGoogleUserSignedIn, checkIsFacebookUserSignedIn, isLoading } = bindActionCreators( actions, dispatch );
	return {
		checkIsGoogleUserSignedIn: ()=> {
			checkIsGoogleUserSignedIn();
		},
		checkIsFacebookUserSignedIn: ()=> {
			checkIsFacebookUserSignedIn();
		},
		isLoading: value => {
			isLoading(value);
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
