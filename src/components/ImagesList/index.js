import React, { Component } from 'react';
import './index.sass';
import Preloader from "../Preloader";
import ImagesListItem from "../ImageListItem/ImageListItem";
import * as actions from './../../actions';
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import GoogleLoginComponent from "../GoogleLoginComponent";
import FacebookLoginComponent from "../FacebookInputComponent";

class ImagesList extends Component {

	componentDidMount() {
		this.props.loadImages(1);
		document.addEventListener('scroll', this.isScrollToBottom);
	}
	
	componentWillUnmount() {
		document.removeEventListener('scroll', this.isScrollToBottom);
	}
	
	isScrollToBottom = () => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			const {pages, currentPage} = this.props.imagesList;
			const nextPage = pages > currentPage ? currentPage + 1 : null;
			if ( nextPage !== null ) {
				this.props.loadImages(nextPage);
			}
		}
	};
	
	render() {
		const { imagesList: {loading, images}, isGoogleUserSignedIn } = this.props;
		const ImagesList = images.map( (image, idx) => (<ImagesListItem key={`${image.id}_${idx}`} image={image} />));
		
		if(loading) return <Preloader/>;
		
		return (
			<div className="container text-center">
				<div className="p-3">
					{ isGoogleUserSignedIn ? <GoogleLoginComponent/> : <FacebookLoginComponent/>}
				</div>
				<div className="row list justify-content-center">{ ImagesList }</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		imagesList: state.imagesList,
		isGoogleUserSignedIn: state.isGoogleUserSignedIn,
		isFacebookUserSignedIn: state.isFacebookUserSignedIn,
	}
};

const mapDispatchToProps = dispatch => {
	const { loadImages } = bindActionCreators(actions, dispatch);
	return {
		loadImages: page => {
			loadImages(page);
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesList);