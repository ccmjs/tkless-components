/**
 * @overview HTML templates of ccmjs-based web component for table
 * @author Tea Kless <tea.kless@web.de> 2022
 */

import { html, render, repeat } from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export { render };

/**
 * Returns the main HTML template.
 * @param {Object} app - ccmjs-based app instance for table.
 * @returns {TemplateResult} Main HTML template
 */
export function main( app ) {
  const values = app.getValue()?.values;
  console.log( values );
  return html`
    <form @submit=${ app.events.onSubmit }>
      <div id="container">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead ?data-hidden=${ !app.table_head }>
              <tr>
                ${ app.table_head?.map( title => html`<th scope="col">${ title }</th>` ) }
                ${ app.deletable ? html`<th scope="col"></th>` : '' }
              </tr>
            </thead>
            <tbody ?data-hidden=${ !values }>
              ${ values?.map( ( row, i ) => html`
                <tr>
                  ${ row.map( ( cell, j ) => html`<td>${ ( () => {
                    const col = app.col_settings[ j ];
                    const value = values[ i ][ j ] || '';
                    switch ( col.type || 'none' ) {
                      case 'select':
                        return html`
                          <select name="${ i+1 }-${ j+1 }" ?disabled=${ col.disabled } @change=${ app.events.onChange }>
                            ${ col.options.map( option => html`
                              <option .selected=${ value === option }>
                                ${ option }
                              </option>
                            ` ) }
                          </select>
                        `;
                      case 'textarea':
                        return html`
                          <textarea name="${ i+1 }-${ j+1 }" placeholder="${ col.placeholder || '' }" ?disabled=${ col.disabled } @change=${ app.events.onChange }>${ value }</textarea>
                        `;
                      case 'none':
                        return cell;
                      default:
                        return html`<input type="${ col.type }" name="${ i+1 }-${ j+1 }" value="${ value }" placeholder="${ col.placeholder || '' }" ?disabled=${ col.disabled } @change=${ app.events.onChange }>`
                    }
                  } )() }</td>` ) }
                  ${ app.deletable ? html`
                    <td>
                      <svg width="16" height="16" fill="red" viewBox="0 0 16 16" role="button" @click=${ () => app.events.onDeleteRow( i ) }>
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                    </td>
                  ` : '' }
                </tr>
              ` ) }
            </tbody>
          </table>
        </div>
      </div>
    </form>
 `;
}
