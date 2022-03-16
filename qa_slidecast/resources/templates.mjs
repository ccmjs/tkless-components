/**
 * @overview HTML templates of ccmjs-based web component for slidecast with commentary
 * @author André Kless <andre.kless@web.de> 2021-2022
 */

import { html, render } from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} instance - ccmjs-based instance for slidecast with commentary
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main( instance, events ) {

  /**
   * slide data
   * @type {Object}
   */
  const slide_data = instance.ignore.slides[ instance.slide_nr - 1 ] || {};

  return html`
    <main>
      <header></header>
      <section id="viewer"></section>
      <section id="control" data-hidden=${ !instance.description && !slide_data.audio && !instance.comment }>
        <div title="${ instance.text.description || '' }" data-lang="description-title" ?data-hidden=${ !instance.description }>
          <i class="bi bi-sticky${ instance.open === 'description' || instance.open === 'both' ? '-fill' : '' }" ?disabled=${ !slide_data.description } @click=${ events.onDescription }></i>
        </div>
        <audio src="${ slide_data.audio || '' }" controls ?data-invisible=${ !slide_data.audio }></audio>
        <div title="${ instance.text.comments || '' }" data-lang="comments-title" ?data-hidden=${ !instance.comment }>
          <i class="bi bi-chat-square-text${ instance.open === 'comments' || instance.open === 'both' ? '-fill' : '' }" ?disabled=${ slide_data.commentary === false } @click=${ events.onComments }></i>
        </div>
      </section>
      <section id="description" ?data-hidden=${ !instance.description || !slide_data.description || instance.open !== 'description' && instance.open !== 'both' }></section>
      <section id="comments" ?data-hidden=${ !instance.comment || slide_data.commentary === false || instance.open !== 'comments' && instance.open !== 'both' }></section>
    </main>
  `;
}

/**
 * returns the HTML template for an image
 * @type {string}
 */
export const image = '<img src="%%">';

/**
 * returns the HTML template for an video
 * @type {string}
 */
export const video = '<video src="%%" controls>';
