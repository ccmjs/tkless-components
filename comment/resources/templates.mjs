/**
 * @overview HTML templates of ccmjs-based web component for commentary
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, repeat } from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} app - ccmjs-based app instance for commentary
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main( app, events ) {

  /**
   * data of comments and answers
   * @type {Object}
   */
  const comments_answers = app.getValue();

  /**
   * data of comments
   * @type {Object[]}
   */
  const comments = Object.values( comments_answers.comments );

  /**
   * data of answers
   * @type {Object[]}
   */
  const answers = Object.values( comments_answers.answers );

  // sort comments
  if ( typeof app.sort === 'boolean' ) comments.sort( ( comment, other ) => {

    // sort by date
    if ( app.sort ) return dayjs( comment.created_at ).isBefore( dayjs( other.created_at ) ) ? 1 : -1;

    // sort by rating (likes - dislikes + hearts)
    return Object.keys( comment.rating.like ).length - Object.keys( comment.rating.dislike ).length + Object.keys( comment.rating.heart ).length > Object.keys( other.rating.like ).length - Object.keys( other.rating.dislike ).length + Object.keys( other.rating.heart ).length ? -1 : 1;

  } );

  /**
   * user data
   * @type {Object}
   */
  const user = app.user && app.user.getValue() || {};

  // no user picture => use default picture
  if ( !user.picture ) user.picture = app.picture;

  return html`
    <main>
      <div>
        <header>
          <section>
            
            <!-- Number of Comments -->
            <span>${ app.text.comments.replace( '%d', comments.length + answers.length ) }</span>
            
            <!-- Sorting of Comments -->
            <button type="button" class="btn btn-sm btn-light" @click=${ events.onSort } ?data-hidden=${ !app.controls.sort || comments.length < 2 }>
              <i class="bi bi-filter-left"></i>
              <span>${ app.text[ 'sort_by_' + ( app.sort ? 'date' : 'rating' ) ] }</span>
            </button>
            
          </section>
          <section></section>
        </header>
        
        <!-- Add Comment -->
        ${ addCommentTemplate() }
        
        <!-- Comments -->
        <section>
          ${ repeat( comments, comment => comment.key, commentTemplate ) }
        </section>
      </div>
    </main>
  `;

  /**
   * returns the HTML template for a comment
   * @param {Object} comment - comment data
   * @returns {TemplateResult} HTML template for a comment
   */
  function commentTemplate( comment ) {
    const comment_answers = comment.answer && [] || answers.filter( answer => answer.comment === comment.comment && answer.answer );
    const is_creator = comment._ && user.key === comment._.creator;
    return html `
      <article data-key=${ comment.key.join( ',' ) }>

        <!-- User Picture -->
        <div class="picture" ?data-hidden=${ !app.picture }>
          <img src="${ comment.picture || app.picture }" alt="${ app.text.picture }">
        </div>

        <div>

          <!-- Username and Timestamp -->
          <div ?data-report=${ Object.values( comment.rating.report ).find( report => report ) }>
            <b>${ comment.user }</b> <!-- is Creator? -->
            <small>
              <span title="${ dayjs( comment.created_at ).format() }">${ dayjs( comment.created_at ).fromNow() }</span>
              <span>
                <i class="bi bi-recycle" title="${ app.text.recycle }" @click=${ events.onRecycle } ?data-hidden=${ !app.controls.recycle || !comment.deleted || !is_creator }></i>
              </span>
            </small>
          </div>

          <!-- Comment Text -->
          <div ?data-report=${ Object.values( comment.rating.report ).find( report => report ) }>
            <span class="text">${ comment.deleted ? app.text.deleted : comment.text }</span>
            <small ?data-hidden=${ comment.deleted }>
              <span title="${ dayjs( comment.updated_at ).format() }" ?data-hidden=${ comment.created_at === comment.updated_at }>${ app.text.updated }</span>
              <span>
                <i class="bi bi-pencil" title="${ app.text.edit }" @click=${ events.onEdit } ?data-hidden=${ !app.controls.edit || !is_creator }></i>
                <i class="bi bi-trash" title="${ app.text.delete }" @click=${ events.onDelete } ?data-hidden=${ !app.controls.delete || comment.deleted || !is_creator }></i>
              </span>
            </small>
          </div>

          <!-- Controls -->
          <div class="d-flex" ?data-hidden=${ comment.deleted }>
            <div class="me-2">

              <!-- Likes -->
              <button type="button" class="btn btn-sm btn-light" title="${ app.text.like }" @click=${ events.onLike } ?disabled=${ is_creator } ?data-hidden=${ !app.controls.like }>
                <i class="bi bi-hand-thumbs-up${ comment.rating.like[ user.key ] ? '-fill' : '' }"></i>
                ${ Object.keys( comment.rating.like ).length }
              </button>

              <!-- Dislikes -->
              <button type="button" class="btn btn-sm btn-light" title="${ app.text.dislike }" @click=${ events.onDislike } ?disabled=${ is_creator } ?data-hidden=${ !app.controls.dislike }>
                <i class="bi bi-hand-thumbs-down${ comment.rating.dislike[ user.key ] ? '-fill' : '' }"></i>
                ${ Object.keys( comment.rating.dislike ).length }
              </button>

              <!-- Hearts -->
              <button type="button" class="btn btn-sm btn-light" title="${ app.text.heart }" @click=${ events.onHeart } ?disabled=${ is_creator } ?data-hidden=${ !app.controls.heart }>
                <i class="bi bi-heart${ comment.rating.heart[ user.key ] ? '-fill' : '' }"></i>
                ${ Object.keys( comment.rating.heart ).length }
              </button>

              <!-- Reports -->
              <button type="button" class="btn btn-sm btn-light" title="${ app.text.report }" @click=${ events.onReport } ?disabled=${ is_creator } ?data-hidden=${ !app.controls.report }>
                <i class="bi bi-flag${ comment.rating.report[ user.key ] ? '-fill' : '' }"></i>
                ${ Object.keys( comment.rating.report ).length }
              </button>

            </div>
            <div>

              <!-- ANSWER -->
              <a class="btn btn-sm btn-light" role="button" @click=${ events.onAnswerButton } ?data-hidden=${ !app.controls.answer || !app.user }>${ app.text.answer }</a>
              
            </div>
          </div>
          <div ?data-hidden=${ !comment.open_answer }>
            ${ addCommentTemplate( comment ) }
          </div>

          <!-- Answers Thread -->
          <div ?data-hidden=${ !app.controls.answer || !comment_answers.length }>
            <button type="button" class="btn btn-sm btn-link" @click=${ events.onThread }>
              <i class="bi bi-caret-${ comment.open_thread ? 'down' : 'up' }-fill"></i>
              &nbsp;${ app.text.answers.replace( '%d', comment_answers.length ) }
            </button>
            <div ?data-hidden=${ !comment.open_thread }>
              ${ repeat( comment_answers, answer => answer.key, commentTemplate ) }
            </div>
          </div>

        </div>
      </article>
    `;
  }

  /**
   * returns the HTML template for adding a comment
   * @param {Object} [comment] - data of the comment that will be answered
   * @returns {TemplateResult} HTML template for adding a comment
   */
  function addCommentTemplate( comment ) {
    return html`
      <article ?data-hidden=${ !app.user }>
        <div class="picture" ?data-hidden=${ !app.picture }>
          <img src="${ user.picture }" alt="${ app.text.picture }">
        </div>
        <div>
          <textarea class="form-control" rows="2" placeholder="${ app.text[ 'write_' + ( comment ? 'answer' : 'comment' ) ] }" @change=${ events.onAnswerInputChange }>${ comment && ( comment.answer_input || comment.answer && ( '@' + comment.user + ': ' ) ) }</textarea>
          <div>
            <button type="button" class="btn btn-sm btn-primary" @click=${ events.onAddComment }>${ app.text.submit }</button>
          </div>
        </div>
      </article>
    `;
  }

}