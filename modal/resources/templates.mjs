/**
 * @overview HTML templates of ccmjs-based web component for a modal dialog
 * @author André Kless <andre.kless@web.de> 2021
 */

/**
 * main HTML template
 * @returns {string}
 */
export const main = `
  <div id="modal">
    <div id="backdrop"></div>
    <div id="dialog" class="show">
      <div id="content">
        <header>
          <h5 id="title">%%</h5>
          <button type="button" id="close" data-close>
            <span>×</span>
          </button>
        </header>
        <main></main>
        <footer></footer>
      </div>
    </div>
  </div>
`;