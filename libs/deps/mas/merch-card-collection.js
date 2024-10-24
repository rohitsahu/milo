import{html as c,LitElement as M}from"../lit-all.min.js";var m=class{constructor(e,t){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(t),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;(e=this.media)==null||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;(e=this.media)==null||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}};var f="hashchange";function S(o=window.location.hash){let e=[],t=o.replace(/^#/,"").split("&");for(let s of t){let[i,n=""]=s.split("=");i&&e.push([i,decodeURIComponent(n.replace(/\+/g," "))])}return Object.fromEntries(e)}function u(o){let e=new URLSearchParams(window.location.hash.slice(1));Object.entries(o).forEach(([i,n])=>{n?e.set(i,n):e.delete(i)}),e.sort();let t=e.toString();if(t===window.location.hash)return;let s=window.scrollY||document.documentElement.scrollTop;window.location.hash=t,window.scrollTo(0,s)}function T(o){let e=()=>{if(window.location.hash&&!window.location.hash.includes("="))return;let t=S(window.location.hash);o(t)};return e(),window.addEventListener(f,e),()=>{window.removeEventListener(f,e)}}var x="merch-card-collection:sort",g="merch-card-collection:showmore";var C=(o,e={})=>{o.querySelectorAll("span[data-placeholder]").forEach(t=>{let{placeholder:s}=t.dataset;t.innerText=e[s]??""})};var _="(max-width: 1199px)",b="(min-width: 768px)",y="(min-width: 1200px)";import{css as A,unsafeCSS as w}from"../lit-all.min.js";var R=A`
    #header,
    #resultText,
    #footer {
        grid-column: 1 / -1;
        justify-self: stretch;
        color: var(--merch-color-grey-80);
    }

    sp-theme {
        display: contents;
    }

    sp-action-menu {
      z-index: 1;
    }

    #header {
        order: -2;
        display: grid;
        justify-items: top;
        grid-template-columns: auto max-content;
        grid-template-rows: auto;
        row-gap: var(--consonant-merch-spacing-m);
        align-self: baseline;
    }

    #resultText {
        min-height: 32px;
    }

    merch-search {
        display: contents;
    }

    #searchBar {
        grid-column: 1 / -1;
        width: 100%;
        max-width: 302px;
    }

    #filtersButton {
        width: 92px;
        margin-inline-end: var(--consonant-merch-spacing-xxs);
    }

    #sortButton {
        justify-self: end;
    }

    sp-action-button {
        align-self: baseline;
    }

    sp-menu sp-action-button {
        min-width: 140px;
    }

    sp-menu {
        min-width: 180px;
    }

    #footer {
        order: 1000;
    }

    /* tablets */
    @media screen and ${w(b)} {
        #header {
            grid-template-columns: 1fr fit-content(100%) fit-content(100%);
        }

        #searchBar {
            grid-column: span 1;
        }

        #filtersButton {
            grid-column: span 1;
        }

        #sortButton {
            grid-column: span 1;
        }
    }

    /* Laptop */
    @media screen and ${w(y)} {
        #resultText {
            grid-column: span 2;
            order: -3;
        }

        #header {
            grid-column: 3 / -1;
            display: flex;
            justify-content: end;
        }
    }
`;var d=(o,e)=>o.querySelector(`[slot="${e}"]`).textContent.trim();var N="merch-card-collection",a={alphabetical:"alphabetical",authored:"authored"},O={filters:["noResultText","resultText","resultsText"],mobile:["noSearchResultsMobileText","searchResultMobileText","searchResultsMobileText"],desktop:["noSearchResultsText","searchResultText","searchResultsText"]},v=(o,{filter:e})=>o.filter(t=>t.filters.hasOwnProperty(e)),L=(o,{types:e})=>e?(e=e.split(","),o.filter(t=>e.some(s=>t.types.includes(s)))):o,D=o=>o.sort((e,t)=>(e.title??"").localeCompare(t.title??"","en",{sensitivity:"base"})),k=(o,{filter:e})=>o.sort((t,s)=>s.filters[e]?.order==null||isNaN(s.filters[e]?.order)?-1:t.filters[e]?.order==null||isNaN(t.filters[e]?.order)?1:t.filters[e].order-s.filters[e].order),B=(o,{search:e})=>e?.length?(e=e.toLowerCase(),o.filter(t=>(t.title??"").toLowerCase().includes(e))):o,E=class extends M{static properties={filter:{type:String,attribute:"filter",reflect:!0},filtered:{type:String,attribute:"filtered"},search:{type:String,attribute:"search",reflect:!0},sort:{type:String,attribute:"sort",default:a.authored,reflect:!0},types:{type:String,attribute:"types",reflect:!0},limit:{type:Number,attribute:"limit"},page:{type:Number,attribute:"page",reflect:!0},singleApp:{type:String,attribute:"single-app",reflect:!0},hasMore:{type:Boolean},displayResult:{type:Boolean,attribute:"display-result"},resultCount:{type:Number},sidenav:{type:Object}};mobileAndTablet=new m(this,_);constructor(){super(),this.filter="all",this.hasMore=!1,this.resultCount=void 0,this.displayResult=!1}render(){return c`${this.header}
            <slot></slot>
            ${this.footer}`}updated(e){if(!this.querySelector("merch-card"))return;let t=window.scrollY||document.documentElement.scrollTop,s=[...this.children].filter(r=>r.tagName==="MERCH-CARD");if(s.length===0)return;e.has("singleApp")&&this.singleApp&&s.forEach(r=>{r.updateFilters(r.name===this.singleApp)});let i=this.sort===a.alphabetical?D:k,h=[v,L,B,i].reduce((r,l)=>l(r,this),s).map((r,l)=>[r,l]);if(this.resultCount=h.length,this.page&&this.limit){let r=this.page*this.limit;this.hasMore=h.length>r,h=h.filter(([,l])=>l<r)}let p=new Map(h);s.forEach(r=>{if(p.has(r)){let l=p.get(r);r.style.order=l,r.setAttribute("tabindex",l+1),r.size=r.filters[this.filter]?.size,r.style.removeProperty("display"),r.requestUpdate()}else r.style.display="none",r.size=void 0,r.style.removeProperty("order")}),window.scrollTo(0,t),this.updateComplete.then(()=>{let r=this.shadowRoot.getElementById("resultText")?.firstElementChild?.assignedElements?.()?.[0];r&&C(r,{resultCount:this.resultCount,searchTerm:this.search,filter:this.sidenav?.filters.selectedText})})}connectedCallback(){super.connectedCallback(),this.filtered?(this.filter=this.filtered,this.page=1):this.startDeeplink(),this.sidenav=document.querySelector("merch-sidenav")}disconnectedCallback(){super.disconnectedCallback(),this.stopDeeplink?.()}get header(){if(!this.filtered)return c`<div id="header">
                <sp-theme theme="spectrum" color="light" scale="medium">
                    ${this.searchBar} ${this.filtersButton} ${this.sortButton}
                </sp-theme>
            </div>
            <div id="resultText">
                ${this.displayResult?c`<slot name="${this.resultTextSlotName}"></slot>`:""}
            </div>`}get footer(){if(!this.filtered)return c`<div id="footer">
            <sp-theme theme="spectrum" color="light" scale="medium">
                ${this.showMoreButton}
            </sp-theme>
        </div>`}get resultTextSlotName(){return O[this.search?this.mobileAndTablet.matches?"mobile":"desktop":"filters"][Math.min(this.resultCount,2)]}get showMoreButton(){if(this.hasMore)return c`<sp-button
            variant="secondary"
            treatment="outline"
            style="order: 1000;"
            @click="${this.showMore}"
        >
            <slot name="showMoreText"></slot>
        </sp-button>`}get filtersButton(){return this.mobileAndTablet.matches?c`<sp-action-button
                  id="filtersButton"
                  variant="secondary"
                  treatment="outline"
                  @click="${this.openFilters}"
                  ><slot name="filtersText"></slot
              ></sp-action-button>`:""}get searchBar(){let e=d(this,"searchText");return this.mobileAndTablet.matches?c`<merch-search deeplink="search">
                  <sp-search
                      id="searchBar"
                      @submit="${this.searchSubmit}"
                      placeholder="${e}"
                  ></sp-search>
              </merch-search>`:""}get sortButton(){let e=d(this,"sortText"),t=d(this,"popularityText"),s=d(this,"alphabeticallyText");if(!(e&&t&&s))return;let i=this.sort===a.alphabetical;return c`
            <sp-action-menu
                id="sortButton"
                size="m"
                @change="${this.sortChanged}"
                selects="single"
                value="${i?a.alphabetical:a.authored}"
                aria-activedescendant="${i?"sp-menu-item-alphabetical":"sp-menu-item-authored"}"
                @keydown="${this.onMenuKeydown}"
            >
                <span slot="label-only">${e}: ${i?s:t}</span>
                <sp-menu-item id="sp-menu-item-authored" value="${a.authored}" role="menuitemradio" aria-checked="${!i}">
                    ${t}
                </sp-menu-item>
                <sp-menu-item id="sp-menu-item-alphabetical" value="${a.alphabetical}" role="menuitemradio" aria-checked="${i}">
                    ${s}
                </sp-menu-item>
            </sp-action-menu>
        `}onMenuKeydown(e){let t=this.shadowRoot.querySelector("#sortButton"),s=Array.from(t.querySelectorAll("sp-menu-item")),i=s.findIndex(n=>n.id===t.getAttribute("aria-activedescendant"));switch(e.key){case"ArrowDown":case"Down":i=(i+1)%s.length,this.setFocusToMenuitem(s[i]),e.preventDefault();break;case"ArrowUp":case"Up":i=(i-1+s.length)%s.length,this.setFocusToMenuitem(s[i]),e.preventDefault();break;case"Enter":case" ":s[i].click(),e.preventDefault();break;default:break}}setFocusToMenuitem(e){this.shadowRoot.querySelector("#sortButton").setAttribute("aria-activedescendant",e.id),e.focus()}sortChanged(e){e.target.value===a.authored?u({sort:void 0}):u({sort:e.target.value}),this.dispatchEvent(new CustomEvent(x,{bubbles:!0,composed:!0,detail:{value:e.target.value}}))}async showMore(){this.dispatchEvent(new CustomEvent(g,{bubbles:!0,composed:!0}));let e=this.page+1;u({page:e}),this.page=e,await this.updateComplete}startDeeplink(){this.stopDeeplink=T(({category:e,filter:t,types:s,sort:i,search:n,single_app:h,page:p})=>{t=t||e,!this.filtered&&t&&t!==this.filter&&setTimeout(()=>{u({page:void 0}),this.page=1},1),this.filtered||(this.filter=t??this.filter),this.types=s??"",this.search=n??"",this.singleApp=h,this.sort=i,this.page=Number(p)||1})}openFilters(e){this.sidenav?.showModal(e)}static styles=[R]};E.SortOrder=a;customElements.define(N,E);export{E as MerchCardCollection};
