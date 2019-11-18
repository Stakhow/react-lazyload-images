const reducer = (state = [], action) => {
	switch (action.type) {
		case "LOAD_IMAGES": {
			const { images } = state.imagesList;
			const res = {
				images: [...images, ...action.images],
				loading: action.loading,
				pages: action.pages,
				currentPage: action.currentPage,
			};
			state.imagesList = Object.assign({}, state.imagesList, res);
			return {...state};
		}
			
		case "CHECK_IS_GOOGLE_USER_SIGNED_IN":
			state.isGoogleUserSignedIn = action.isGoogleUserSignedIn;
			state.isLoading = action.isLoading;
			return {...state};
			
		case "CHECK_IS_FACEBOOK_USER_SIGNED_IN":
			state.isFacebookUserSignedIn = action.isFacebookUserSignedIn;
			state.isLoading = action.isLoading;
			return {...state};
			
		case "FACEBOOK_USER_LOGOUT":
			state.isFacebookUserSignedIn = action.isFacebookUserSignedIn;
			state.isLoading = action.isLoading;
			return {...state};
			
		case "CLEAR_IMAGE_LIST":
			const { imagesList } = state;
			imagesList.loading = action.loading;
			imagesList.images = action.images;
			imagesList.pages = action.pages;
			imagesList.currentPage = action.currentPage;
			return {...state};
		
		case "LOADING":
			state.isLoading = action.isLoading;
			return {...state};
		
		default: return {...state}
	}
};

export default reducer;