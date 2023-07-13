const { compose, ifCondition } = wp.compose;
const { registerFormatType, toggleFormat, applyFormat, removeFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { Fragment, Component, useState } = wp.element;
const { withSelect } = wp.data;
const { Button, Modal, TextareaControl } = wp.components;
const { __ } = wp.i18n;


const listStyle = {
    "list-style-type" : "none",
    "display" : "grid",
    "grid-template-columns" : "repeat(6, 1fr)",
    "grid-column-gap": "5px",
    "grid-row-gap" : "5px"
}

const wordStyle = {
    "display" : "block",
    "width" : "100%"
}


const buttonStyle = {
    "display" : "inline-block",
    "margin-left" : "5px"
}

class RotateWordsList extends Component {

    constructor() {
        super( ...arguments );
        this.render = this.render.bind(this);
        this.openModal = this.openModal.bind( this ); 
        this.closeModal = this.closeModal.bind( this ); 
        this.updateWords = this.updateWords.bind( this ); 
        this.removeWord = this.removeWord.bind( this );
        this.removeWordWrap = this.removeWordWrap.bind( this );
        this.applyWordWrap = this.applyWordWrap.bind( this );
        this.state = {
            activeModal: false,
            words : '',
            wordsArray : []
        } 

    }


    openModal() { 
        if (this.props.value.activeFormats && this.props.value.activeFormats.length > 0) {
            if (Object.keys(this.props.value.activeFormats[0].attributes).length != 0) {
                var currentWords = this.props.value.activeFormats[0].attributes.words;
            } else if(Object.keys(this.props.value.activeFormats[0].unregisteredAttributes).length != 0) {
                var currentWords = this.props.value.activeFormats[0].unregisteredAttributes.words;
            } else {
                var currentWords = '';
            }
            // var currentWords = this.props.value.activeFormats[0].unregisteredAttributes.words;

        } else {
            var currentWords = '';
            
        }
        // let currentWords = (this.props.value.activeFormats.length >= 1 && (this.props.value.activeFormats[0].unregisteredAttributes.words != undefined || this.props.value.activeFormats[0].attributes.words) )? (this.props.value.activeFormats[0].unregisteredAttributes.words || this.props.value.activeFormats[0].attributes.words) : '';
        this.setState({ words: currentWords });
        this.setState( { activeModal : true } );
        if (currentWords.length > 0)  {
            let tempArray = currentWords.split(",");
            this.setState({ wordsArray : tempArray});
        }

    }


    closeModal() {
        this.setState( { activeModal : false });
    }


    removeWord(index) {
        let tempArray = this.state.wordsArray;
        tempArray.splice(index, 1);
        let wordToString = tempArray.toString();
        this.setState({ wordsArray: tempArray });
        this.setState({ words: wordToString });
        this.props.onChange( applyFormat(
            this.props.value,
            {   type: 'extend-gutenberg-format/words',
                attributes: { words: wordToString }
            }
        ));
    }

    removeWordWrap() {
        let activeFormat = this.props.value.activeFormats[0].type;
        this.props.onChange( removeFormat(
            this.props.value,
            activeFormat
        ));
        this.setState({ words: '' });
        this.setState({ wordsArray : []});
        this.setState( { activeModal : false });
    }

    applyWordWrap() {
        let tempArray = this.state.wordsArray;
        let activeFormat = this.props.value.activeFormats[0];
        console.log('active format is:');
        console.log(this.props.value);
        let wordToString = tempArray.toString();
        this.props.onChange( applyFormat(
            this.props.value,
            {   type: 'extend-gutenberg-format/words',
                attributes: { words: wordToString }
            }
        ));
        this.setState( { activeModal : false });
    }


    updateWords(value) {
        let tempArray = value.split(",");
        this.setState({ words: value });
        this.setState({ wordsArray : tempArray});

    }

    render(){

        const {
            isActive,
            activeAttributes,
            value,
            onChange,
            setAttributes,
            modalActive
        } = this.props;

        const {
            activeModal,
            words,
            wordsArray
        } = this.state;

        return (
            <Fragment>
                 <RichTextToolbarButton
                    icon='welcome-write-blog'
                    title='Word Swap'
                    onClick={ this.openModal }
                    isActive={ isActive }
                />
                { activeModal == true && (
                    <Modal
                        onRequestClose={ this.closeModal }
                        title={__('Word Swap')}
                        description={__('List words seperated by commas(,) for swapping with selected text')}
                        isActive={isActive}
                        className="tooltip-modal"
                        focusOnMount={true}
                    >
                        <TextareaControl
                            label={__('Enter list of words')}
                            help={__('List words seperated by commas(,) for swapping with selected text')}
                            value={ words }
                            onChange={ this.updateWords }
                        />
                        <ul 
                            className="word-list"
                            style={ listStyle }
                        >
                        {wordsArray.length > 0 &&  wordsArray.map((word, wIndex) => {

                                return (
                                    <Fragment>
                                    {word.length > 0 && (
                                    <li>
                                        <Button 
                                            key={wIndex}
                                            isDestructive
                                            isSmall
                                            style={ wordStyle }
                                            onClick={ () => { 
                                                this.removeWord(wIndex);
                                            }}
                                        >
                                            { word }
                                        </Button>
                                    </li>
                                    )}
                                    </Fragment>
                                );
                            })
                        }
                        </ul>
                        { wordsArray.length > 0 && words.length > 0 && (
                            <div className="controls">
                                <Button
                                    isDestructive
                                    onClick={ this.removeWordWrap }
                                >
                                    Remove Word Wrap
                                </Button>
                                <Button
                                    isPrimary
                                    style={ buttonStyle }
                                    onClick={ this.applyWordWrap }
                                >
                                Apply Word Wrap
                                </Button>
                            </div>
                        )}
                    </Modal>
                )}
            </Fragment>
        );
    }
}

 
const ConditionRotateWordsList = compose(
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
)( RotateWordsList );
 
registerFormatType(
    'extend-gutenberg-format/words', {
        title: 'Highlight',
        tagName: 'words',
        className: 'rotate-words',
        attributes: {
            words: ''
        },
        edit: ConditionRotateWordsList
    }
);