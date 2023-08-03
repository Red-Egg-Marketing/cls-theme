const { render, useState, Fragment } = wp.element;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button, CheckboxControl } = wp.components;
const apiUrl = '/wp-json/v2/resources';
import Header from './Header.js';
import ResourceCard from './ResourceCard.js';

const ResourceLoader = () => {

  const grid = document.getElementById('ResourcesGrid');
  const sectTitle =  grid.getAttribute('data-title');
  const archiveId = grid.hasAttribute('data-tax') ? parseInt(grid.getAttribute('data-tax')) : false;
  const [resources, selectResources] = useState(false);
  const [taxonomy, setTaxes] = useState([]);
  const [selectTax, setSelectTaxes] = useState([]);
  const [toggleFilters, setToggleFilters] = useState({key: '', active: false});


  document.addEventListener('click', function(event) {
    let target = event.target;
    let nodeName = target.nodeName.toLowerCase();

    if ((target.closest('.filter-items') == null)) {
        let buttons =  document.querySelectorAll('.tax-filter-button');

        buttons.forEach( (button) => {
            let par = button.parentElement;
            par.classList.remove('active');
        }); 
    }

  }, false);


   const actionFilterPosts = (post) => {
      let postTax = Object.keys(post.taxonomies);
      let postTaxes = Object.entries(post.taxonomies);
      let postTruthy = [];
      let sizeTaxes = selectTax.length;

      // loop over all selected taxonomies
      selectTax.forEach((taxItem) => {
            // loop over each posts' taxonomies
            postTaxes.forEach((postTitem) => {
              let indTax = postTitem[1];

              indTax.forEach((anotherItem) => {
                  let aTerm_id = anotherItem.term_id;
                  if (aTerm_id == taxItem) {
                    postTruthy.push(true);
                  }
              });

            });
      });
          
      return postTruthy.length == sizeTaxes ? true : false;
  }

  const toggleCats = (key, item) => {
    // toggle state and index to determine what is active
    // setToggleFilters({key: key, active: !toggleFilters.active });
    let allFilt = document.querySelectorAll('.filter-block');
    let parent = item.parentElement;

    allFilt.forEach( (filt) => {
        if (parent != filt) {
          filt.classList.remove('active');
        }
    });
    
    
    parent.classList.toggle('active');
  }

  if (resources === false) {
    wp.apiRequest({
        url: apiUrl
    }).then(resourcelist => {
        let posts = resourcelist[0].resources;
        let taxes = resourcelist[1];

        // load archive id if it exits
        if (archiveId != false) {
          selectTax.push(archiveId);
          setSelectTaxes(selectTax);

          let filterPosts = posts.filter(actionFilterPosts ,this);

          selectResources(filterPosts);

        } else {
          selectResources(posts);
        }

        setTaxes(taxes);
        
    });

  }

  return (
    <Fragment>
      <ResourceFilters 
        filterCats={ filterCats }
        taxonomies={ taxonomy }
        toggleCats={ toggleCats }
        currentFilter={ toggleFilters }
        currentTax={ selectTax }
      />
      <header
        className="section-header"
      >
        <Header
          tag="h3"
          title={ sectTitle }
        />
      </header>
      <div className="block-wrapper">
      { resources.length > 0 && resources.map((resource, index) => {
          return (
            <Fragment>
              <ResourceCard.View
                ResourceIndex={ index }
                resourceImg={ resource.media_url }
                resourceURL={ resource.link }
                resourceTitle={ resource.post_title }
                resourceExcerpt={ resource.post_excerpt }
                resourceType={ resource.label }
              />
            </Fragment>
          );
        })
      }

      { resources.length == 0 && (
          <Fragment>
            <h2 class="no-success-header">No resources found. Try different filters</h2>
          </Fragment>
      )}
      </div>
    </Fragment>
  );
};

const ResourceFilters = (props) => {

  const { taxonomies, currentFilter, currentTax, filterCats, filterMin, filterMax } = props;
  
  return (
      <Fragment>
        <form 
          className="form-filters"
          onChange={ props.testingFilter }
        >
          <div className="wrapper filter-items">


          { taxonomies && Object.entries(taxonomies).map(([key, value]) => {
                let tax = key;
                let taxItem = value;
                let isActive = '';
                if (currentFilter.key == key && currentFilter.active == true) {
                  isActive = ' active';
                } else {
                  isActive = '';
                }
                return (
                    <Fragment>
                      <div className={`col-6${ isActive } filter-block`}>
                        <Button
                          className="tax-filter-button"
                          onClick={ (event) => { 
                              props.toggleCats(key, event.currentTarget);
                            }
                          }
                        >
                          <span className="filt-icon"></span>{ key }
                        </Button>
                        <div className="tax-cont">
                          <div class="tax-wrapper">
                          <Button
                            className="tax-close"
                            onClick={ (event) => {
                                  props.toggleCats(key, event.currentTarget);
                                }
                            }
                          >
                            X
                          </Button>
                          { (tax != 'Year' && tax != 'Price' && tax != 'Miles') && (
                            <ul className="tax-list">
                            { Object.entries(taxItem).map(([intKey, intValue]) => {
                                let taxName = intKey;
                                {/*let checked = (currentTax != undefined && currentTax.includes(intValue.tax_id) == true) ? true : false;*/}
                                return (
                                  <Fragment>
                                    <li className="tax-item">
                                      <div className="tax-wrap">
                                        <input 
                                          id={ `inspector-control-box-${ intValue.tax_id }` }
                                          value={ intValue.tax_id }
                                          type="checkbox"
                                          // checked={ checked }
                                          className="checkbox-component"
                                          onChange={ (box) => { 
                                              let value = intValue.tax_id;
                                              let check = box.target.checked;
                                              filterCats(check, value, intValue.taxonomy);
                                            }
                                          }
                                        />
                                        <label
                                          for={ `inspector-control-box-${ intValue.tax_id }` }
                                        >
                                          { taxName }
                                        </label>
                                      </div>
                                    </li>
                                  </Fragment>
                                );
                              })
                            }
                            </ul>
                          )}
                          { (tax == 'Year' || tax == 'Price' || tax == 'Miles') && (
                            <ul className="tax-inputs">
                              <li className="tax-input">
                                  <input 
                                    id={ `inspector-control-box-min` }
                                    type="number"
                                    className="number-component"
                                    placeholder="Min"
                                    min="1000"
                                    onChange={ (box) => { 
                                        let tax_value = tax.toLowerCase();
                                        let value = box.target.value;
                                        let check = box.target.value != '' ? true : false;
                                        filterMin(check, value, tax_value);
                                      }
                                    }
                                  />
                                  <input 
                                    id={ `inspector-control-box-max` }
                                    type="number"
                                    className="number-component"
                                    placeholder="Max"
                                    min="1000"
                                    onChange={ (box) => { 
                                        let tax_value = tax.toLowerCase();
                                        let value = box.target.value;
                                        let check = box.target.value != '' ? true : false;
                                        filterMax(check, value, tax_value);
                                      }
                                    }
                                  />
                              </li>
                            </ul>
                          )}
                          </div>
                        </div>
                      </div>
                    </Fragment>
                );
              })
          }
          </div>
        </form>
      </Fragment>
  );
};

export default ResourceFilters;

let grid = document.getElementById('ResourcesGrid');
if (grid) {
  render(<ResourceLoader />, grid);
}




