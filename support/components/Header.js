import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks } = wp.blockEditor;
const { Button, PanelBody } = wp.components;
const { __ } = wp.i18n;


const Header = (props) => {

	const { tag, title, allowedFormats, placeholder, classProp, updateProp, setAttributes } = props;

	const updateClass = classProp == undefined ? 'header-title' : classProp;

	const place = placeholder != undefined ? placeholder : 'Header Title...';

	const onChangeHeader = (value) => {

		var prop = updateProp == undefined ? "title" : updateProp;

		var update = {};

		update[prop] = value;

		props.setAttributes(update);

	}


	return (
		<Fragment>
			<RichText
				tagName={ tag }
				className={ updateClass }
				value={ title }
				placeholder={ __(place, 'latitude') }
				onChange={ onChangeHeader }
				allowedFormats={ allowedFormats }
			/>
		</Fragment>
	)
}

Header.View = (props) => {

	const { tag, title, allowedFormats, placeholder, classProp } = props;

	const updateClass = classProp == undefined ? 'header-title' : classProp;

	return(
		<Fragment>
			{ props.title != '' && (
				<RichText.Content
					tagName={ props.tag }
					className={ updateClass }
					value={ props.title }
					origValue={ props.title }
				/>
			)}
		</Fragment>
	)
}

export default Header;