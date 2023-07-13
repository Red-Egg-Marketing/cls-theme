const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from "./edit";
import save from "./save";

registerBlockType("cls-blocks/faq", {
	title: __("FAQ", "cls-blocks"),
	description: __("Block for displaying FAQ."),
	parent: ['cls-blocks/faq'],
	apiVersion: 2,
	icon: "info",
	category: "layout",
	attributes: {
		title: {
			type: "string",
			source: "text",
			selector: ".header-title",
			default: "",
		},
		content: {
			type: "string",
			source: "html",
			selector: ".content",
			default: "",
		},
		open: {
			type: "boolean",
			default: false		
		}
	},
	edit: edit,
	save: save,
});
