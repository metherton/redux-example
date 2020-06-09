import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';

import { createStore } from 'redux'
import todoApp from './reducers'

import store from './store/configureStore';
import {
  addTodo,
  setInitialTodos,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions'

export class ReduxExample extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }

      main {
        flex-grow: 1;
      }

      .logo > svg {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();

  }

  addToDo() {
    store.dispatch(addTodo("text 1"));
  }

  showCompleted() {
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));
    console.log(store.getState());
  }

  showActive() {
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE));
    console.log(store.getState());
  }

  resetTodos() {
    store.subscribe(() => console.log(store.getState()));

    store.dispatch(setInitialTodos([{text: "first", completed: false}]));

    console.log(store.getState());
    // Every time the state changes, log it
    // Note that subscribe() returns a function for unregistering the listener

  }

  render() {
    return html`
      <main>

        <h1>Using Redux example</h1>
        <button @click=${this.resetTodos}>
          Reset Initial Todos
        </button>

        <button @click=${this.addToDo}>
          Add ToDo
        </button>

        <button @click=${this.showCompleted}>
          Show Completed
        </button>

        <button @click=${this.showActive}>
          Show Active
        </button>

      </main>


    `;
  }
}
