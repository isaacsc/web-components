export default class MyButton extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});

    this._text = null;
    
    shadowRoot.innerHTML = `
    <style>
    :host {
      --color1: #e67e22;
      --color2: #fff;
      --space: 1.5em;
    }
    button{
      background:var(--color1);
      border: 0;
      color:var(--color2);
      position:relative;
      font-size:1.2em;
      padding:1em 2em;
      cursor:pointer;
      transition:800ms ease all;
      outline: none;
    }
    button:hover{
      background:var(--color2);
      color:var(--color1);
    }
    button:before,button:after{
      content:'';
      position:absolute;
      top:0;
      right:0;
      height:2px;
      width: 100%;
      transform:scaleX(0);
      background: var(--color1);
      transition:400ms ease all;
      transform-origin: 100% 0;
      outline: none;
    }
    button:after{
      right:inherit;
      top:inherit;
      left:0;
      bottom:0;
      transform-origin: 0 0;
    }
    button:hover:before,button:hover:after{
      transform:scaleX(1);
      transition:800ms ease all;
    }
    </style>
    <button><slot>My Button</slot></button>`;
  }

  connectedCallback () {
    this.addEventListener('click', this._dispatchClickEvent);
  } 
  
  disconnectedCallback() {
    this.removeEventListener('click', this._dispatchClickEvent);
  }

  static get observedAttributes () {
    return ['text'];
  }  

  attributeChangedCallback (name, oldValue, newValue) {
    this.textContent = newValue;
  }  
  
  get text () {
    return this.getAttribute('text');
  }

  set text (val) {
    this._text = val;
    this.setAttribute('text', val);
  }

  _dispatchClickEvent () {
    this.dispatchEvent(new CustomEvent('my-button-clicked', {
      detail: {
        username: 'Yo'
      }
    }));
  }

}
