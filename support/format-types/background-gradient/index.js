const { compose, ifCondition } = wp.compose;
const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { Fragment, Component } = wp.element;
const { withSelect } = wp.data;
const { Button } = wp.components;
const { __ } = wp.i18n;

class HighLightButton extends Component {

    constructor() {
        super( ...arguments );
        this.render = this.render.bind(this);
        this.saveHighlight = this.saveHighlight.bind( this );    
    }

   saveHighlight() {

        this.props.onChange( toggleFormat(
            this.props.value,
            { type: 'extend-gutenberg-format/background-gradient' }
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
                    icon='admin-customizer'
                    title='Background Gradient'
                    onClick={ this.saveHighlight }
                    isActive={ isActive }
                />
            </Fragment>
        );
    }
}

 
const ConditionHighlightButton = compose(
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
)( HighLightButton );
 
registerFormatType(
    'extend-gutenberg-format/background-gradient', {
        title: 'Background Gradient',
        tagName: 'background',
        className: 'bg-gradient',
        edit: ConditionHighlightButton
    }
);