import React from "react";
import LazyLoad from "react-lazy-load";

const ImagesListItem = props => {
	
	const {urls, description, alt_description} = props.image;
	const imageDescr = description ? description : alt_description;
	
	return (
		<LazyLoad
			className="list-item col-lg-7 py-3 shadow mb-5 bg-white rounded"
			offsetVertical={300}>
			<div>
				<img src={urls.regular} alt={imageDescr}/>
				{imageDescr !== null ? <p className='pt-3 m-0'>Image Description: <strong>{imageDescr}</strong></p> : null }
			</div>
		</LazyLoad>
	)
};

export default ImagesListItem;