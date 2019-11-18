import Unsplash, {toJson} from 'unsplash-js';

const unsplash = new Unsplash({
	accessKey: "b6a795786aaf4455f6eb08150e414cfb12bc9fc0761b438cee5a38865a610afc",
	secret: "1ab6f3737ae0386985964d96149d23aeca10395a8ab45186ebc363708883fbc0"
});

export const isLoading = value => ({
	type: 'LOADING',
	isLoading: value,
});

export const loadImages = page => async dispatch => {
	const response = await unsplash.search.photos("dogs", page, 5, { orientation: "portrait" })
		.then(toJson)
		.then(json => { return json });
	dispatch({
		type: 'LOAD_IMAGES',
		images: response.results,
		pages: response.total_pages,
		currentPage: page,
		loading: false
	});
};

export const checkIsGoogleUserSignedIn = () => async dispatch => {
	try {
		window.gapi.load('auth2', await function(){
			window.gapi.auth2.init({
				client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
			}).then(
				(success)=>{
					dispatch({
						type: 'CHECK_IS_GOOGLE_USER_SIGNED_IN',
						isGoogleUserSignedIn: success.currentUser.get().isSignedIn(),
						isLoading: false
					});
					return success;
				},
				(err)=>{
					console.error('err', err)
				}
			);
		})
	} catch (err) {
		console.error('checkIsGoogleUserSignedIn Error', err);
	}
};

export const clearImageList = () => ({
	type: 'CLEAR_IMAGE_LIST',
	images: [],
	pages: null,
	currentPage: 1,
	loading: false
	
});

export const checkIsFacebookUserSignedIn = () => async dispatch => {
	try {
		if (window.FB !== undefined) {
			faceBookGetLoginStatus(dispatch);
		} else {
			window.fbAsyncInit = async function() {
				await window.FB.init({
					appId      : process.env.REACT_APP_FACEBOOK_APP_ID,
					cookie     : true,
					xfbml      : true,
					version    : 'v5.0'
				});
				
				window.FB.AppEvents.logPageView();
				faceBookGetLoginStatus(dispatch);
			};
			(function(d, s, id){
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement(s); js.id = id;
				js.src = "https://connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		}
	} catch (err) {
		console.error('checkIsFacebookUserSignedIn Error', err)
	}
};

export const facebookLogout = () => async dispatch => {
	window.FB.logout();
	dispatch({
		type: 'FACEBOOK_USER_LOGOUT',
		isFacebookUserSignedIn: false,
		isLoading: false
	});
};


function faceBookGetLoginStatus (dispatch) {
	window.FB.getLoginStatus( response => {
		const _obj = {
			type: 'CHECK_IS_FACEBOOK_USER_SIGNED_IN',
			isFacebookUserSignedIn: false,
			isLoading: false
		};
		response.status === 'connected' ? _obj.isFacebookUserSignedIn = true : _obj.isFacebookUserSignedIn = false;
		return  dispatch(_obj)
	});
}