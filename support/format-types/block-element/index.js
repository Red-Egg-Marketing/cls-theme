const { compose, ifCondition } = wp.compose;
const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { Fragment, Component } = wp.element;
const { withSelect } = wp.data;
const { Button } = wp.components;
const { __ } = wp.i18n;

class BlockLevelButton extends Component {

    constructor() {
        super( ...arguments );
        this.render = this.render.bind(this);
        this.saveBlockElement = this.saveBlockElement.bind( this );    
    }

   saveBlockElement() {

        this.props.onChange( toggleFormat(
            this.props.value,
            { type: 'extend-gutenberg-format/block-level' }
        ));
    }

    render(){

        const {
            isActive,
            activeAttributes,
            value,
            onChange,
            setAttributes,
        } = this.props;

        return (
            <Fragment>
                 <RichTextToolbarButton
                    icon='editor-code'
                    title='Block Level'
                    onClick={ this.saveBlockElement }
                    isActive={ isActive }
                />
            </Fragment>
        );
    }
}

 
const ConditionBlockLevelButton = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/editor' ).getSelectedBlock()
        }
    } ),
    ifCondition( function( props ) {
        return (
            props.selectedBlock
        );
    } )
)( BlockLevelButton );
 
registerFormatType(
    'extend-gutenberg-format/block-level', {
        title: 'Make Selection Display Block',
        tagName: 'block',
        className: 'block-level',
        edit: ConditionBlockLevelButton
    }
);