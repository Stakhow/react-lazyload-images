const initialState = {
	isLoading: true,
	imagesList: {
		loading: true,
		images: [],
		pages: [],
		currentPage: 1
	},
	someData: {
		foo: 'bar'
	},
	isGoogleUserSignedIn: false,
	isFacebookUserSignedIn: false
	
};

export default initialState;