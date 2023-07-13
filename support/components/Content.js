import React from 'react';
const { Fragment } = wp.element;
const { RichText } = wp.blockEditor;
const { Button, PanelBody } = wp.components;
const { __ } = wp.i18n;


const Content = (props) => {

	const { placeholder, content, classProp, multiline, tag, updateProp } = props;

	const updateClass = classProp == undefined ? 'description' : classProp;

	const place = placeholder != '' ? placeholder : 'Content...';

	const onChangeContent = (value) => {
		
		var prop = updateProp == undefined ? "content" : updateProp;

		var update = {};

		update[prop] = value;

		props.setAttributes(update);

	}
	
	return (
		<Fragment>
			<RichText
				tagName={ tag }
				className={ updateClass }
				value={ content }
				placeholder={ place }
				multiline={ multiline }
				onChange={ onChangeContent }
			/>
		</Fragment>
	)
}

Content.View = (props) => {

	const { placeholder, content, classProp, multiline, tag } = props;
		
	const updateClass = classProp == undefined ? 'description' : classProp;

	return(
		<Fragment>
			{ props.content != '' && (
				<RichText.Content
					tagName={ props.tag }
					className={ updateClass }
					value={ props.content }
					multiline={ props.multiline }
				/>
			)}
		</Fragment>
	)
}

export default Content;