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

  const { taxonomies, currentFilter, currentTax, filterCats, filterMin, filterMax, searchFilter, orderFilter, selectedValues } = props;
  return (
      <Fragment>
          <div className="search-cont">
            <input 
              type="search" 
              placeholder="Search Our Inventory" 
              onChange={ (input) => { 
                let value = input.currentTarget.value;
                searchFilter(value);
                }
              }
            />

            <select
              onChange={ (input) => { 
                let value = input.currentTarget.value;
                orderFilter(value);
                }
              }
            >
              <option value="" disabled selected>Order By</option>
              <option value="price">Price low to high</option>
              <option value="price-high">Price high to low</option>
              <option value="miles">Miles low to high</option>
              <option value="miles-high">Miles high to low</option>
              <option value="year">Year low to high</option>
              <option value="year-high">Year high to low</option>
            </select>
            <div className="wp-block-buttons">
              <input 
                type="submit"
                className="wp-button"
                value="Submit"
               />
             </div>
          </div>
          <div className="wrapper filter-items">
          <div className="container">
          { taxonomies && Object.entries(taxonomies).map(([key, value]) => {
                let tax = key;
                let taxItem = value;
                let isActive = '';
                let place = '';
                let place_max = '';
                if (currentFilter.key == key && currentFilter.active == true) {
                  isActive = ' active';
                } else {
                  isActive = '';
                }
                if (tax == 'Year') {
                  place = selectedValues['year_min'] ? selectedValues['year_min'][0] : 'Min';
                  place_max = selectedValues['year_max'] ? selectedValues['year_max'][0] : 'Max';
                }
                else if (tax == 'Price') {
                  place = selectedValues['price_min'] ? selectedValues['price_min'][0] : 'Min';
                  place_max = selectedValues['price_max'] ? selectedValues['price_max'][0] : 'Max';
                }
                else if (tax == 'Miles') {
                  place = selectedValues['miles_min'] ? selectedValues['miles_min'][0] : 'Min';
                  place_max = selectedValues['miles_max'] ? selectedValues['miles_max'][0] : 'Max';
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
            
                          { (tax != 'Year' && tax != 'Price' && tax != 'Miles') && (
                            <ul className="tax-list">
                            { Object.entries(taxItem).map(([intKey, intValue]) => {
                                let taxName = intKey;
                                let taxSelect = intValue.taxonomy;
                                let valueArray = selectedValues[taxSelect];
                                let checked = false;
                                let count = intValue.count;
                                if (selectedValues[taxSelect]) {
                                  checked = valueArray.includes(intValue.tax_slug);
                                }
                                return (
                                  <Fragment>
                                    <li className="tax-item">
                                      <div className="tax-wrap">
                                        <input 
                                          id={ `inspector-control-box-${ intValue.tax_slug }` }
                                          value={ intValue.tax_slug }
                                          type="checkbox"
                                          className="checkbox-component"
                                          checked={ checked }
                                          onChange={ (box) => {
                                              let value = intValue.tax_slug;
                                              let check = box.target.checked;
                                              box.currentTarget.checked =  !!box.currentTarget.checked;
                                              filterCats(check, value, intValue.taxonomy);
                                              // checked = false;
                                            }
                                          }
                                        />
                                        <label
                                          for={ `inspector-control-box-${ intValue.tax_slug }` }
                                        >
                                          { taxName + " (" + count + ")" }
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
                                    placeholder={ place }
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
                                    placeholder={ place_max }
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
          { taxonomies.length == 0 && (
            <Fragment>
              <div class="loading-filters"></div>
            </Fragment>
          )}
          <div className="wp-block-buttons">
            <input 
              type="submit"
              className="wp-button"
              value="Submit"
             />
          </div>
          </div>
          </div>
      </Fragment>
  );
};

export default ResourceFilters;

let grid = document.getElementById('ResourcesGrid');
if (grid) {
  render(<ResourceLoader />, grid);
}




