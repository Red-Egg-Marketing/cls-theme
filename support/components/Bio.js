import React from 'react';
const { Fragment } = wp.element;
const { RichText } = wp.blockEditor;
const { Button, PanelBody } = wp.components;
const { __ } = wp.i18n;

const readMore = (e) => {
	let targ = e.currentTarget;
	let prev = targ.previousSibling;
	let next = targ.nextElementSibling;
	let less = targ.nextElementSibling.nextElementSibling;
	prev.style.display = 'none';
	next.style.display = 'block';
	less.style.display = 'block';
	targ.style.display = 'none';
}

const readLess = (e) => {
	let targ = e.currentTarget;
	let prev = targ.previousSibling;
	let more = targ.previousSibling.previousSibling;
	let text = targ.previousSibling.previousSibling.previousSibling;
	prev.style.display = 'none';
	more.style.display = 'inline-block';
	text.style.display = 'block';
	targ.style.display = 'none';
}


const Bio = (props) => {
	
	return (
		<Fragment>
			
		</Fragment>
	)

}

Bio.View = (props) => {

	const { name, image, ratingArray, text, tag } = props;

	let textWrite = text.split(" ");
	let intro = textWrite.slice(0, 25);
	intro = intro.join(" ") + '...';
	let more = textWrite.slice(0);
	more = more.join(" ");

	let style = {
		"display" : "none",
	}
	let styleLess = {
		"display" : "none",
		"color" : "#910035"
	}
	let styleColor = {
		"color" : "#910035"
	}
		
	return(
		<Fragment>
			<div className="wprevpro_t1_DIV_1 w3_wprs-col outerrevdiv bio-component alternatives">
				<div className="wrap">
				<div className="indrevdiv wprevpro_t1_DIV_2 wprev_preview_bg1_T1 wprev_preview_bradius_T1">
					<div className="wprevpro_t1_P_3 wprev_preview_tcolor1_T1">
						<span className="wprevpro_star_imgs_T1">
							<span className="starloc1 wprevpro_star_imgs wprevpro_star_imgsloc1">
							{ ratingArray.length > 0 && ratingArray.map((item, index) => {
								return(
									<span
										className="svgicons svg-wprsp-star"
									>
									</span>
								);
							})}
							</span>
						</span>
						<span className="rd_more_1">{intro}</span>
						<span className="rd_more"
							onClick={ readMore }
							style={ styleColor }
						> read more</span>
						<span className="rd_more_text" style={ style }>{ more }</span>
						<span className="rd_less" style={ styleLess }
							onClick={ readLess }
						> read less</span>
					</div>
				</div>
				{ image && (
					<span className="wprevpro_t1_A_8">
						<img loading="lazy" src={ image } alt={`${ name } Avatar`} className="wprevpro_t1_IMG_4 wprevpro_avatarimg" />
					</span>
				)}
				<div className="wprevpro_t1_SPAN_5 wprev_preview_tcolor2_T1">
					<div class="wprevpro_t1_rname wprevname">{ name }</div>
				</div>
				</div>
			</div>
		</Fragment>
	)

}

export default Bio;