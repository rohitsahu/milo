/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/*
* Notification - v1.0
*/

import { decorateBlockText, decorateBlockBg, decorateTextOverrides } from '../../utils/decorate.js';
import { createTag } from '../../utils/utils.js';

const variants = ['banner', 'ribbon', 'pill'];
const sizes = ['small', 'medium', 'large'];
const [banner, ribbon, pill] = variants;
const [small, medium, large] = sizes;
const defaultSize = medium;
const defaultVariant = banner;
const blockConfig = {
  [banner]: {
    [small]: ['s', 's'],
    [medium]: ['m', 'm'],
    [large]: ['l', 'l'],
  },
  [ribbon]: ['s', 'm'],
  [pill]: {
    [small]: ['m', 'm'],
    [medium]: ['s', 's'],
    [large]: ['l', 'm'],
  },
};

const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <g transform="translate(-10500 3403)">
                      <circle cx="10" cy="10" r="10" transform="translate(10500 -3403)" fill="#707070"></circle>
                      <line y1="8" x2="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"></line>
                      <line x1="8" y1="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"></line>
                    </g>
                  </svg>`;

function getOpts(el) {
  const optRows = [...el.querySelectorAll(':scope > div:nth-of-type(n+3)')];
  if (!optRows.length) return {};
  optRows.forEach((row) => row.remove());
  const camel = (str) => str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  const fmt = (child) => child.textContent.toLowerCase().replace('\n', '').trim();
  return optRows.reduce((a, c) => ({ ...a, [camel(fmt(c.children[0]))]: fmt(c.children[1]) }), {});
}

function getBlockData(el) {
  const variant = variants.find((varClass) => el.classList.contains(varClass)) || defaultVariant;
  const size = sizes.find((sizeClass) => el.classList.contains(sizeClass)) || defaultSize;
  const fonts = blockConfig[variant];
  return { fontSizes: !Array.isArray(fonts) ? fonts[size] : fonts, options: { ...getOpts(el) } };
}

function decorateStaticLinks(el) {
  const textLinks = el.querySelectorAll('a:not([class])');
  textLinks.forEach((link) => { link.classList.add('static'); });
}

function addCloseButton(el) {
  const closeBtn = createTag('button', { class: 'pill-close', 'aria-label': 'Close' }, closeSvg);
  el.querySelector('.foreground').appendChild(closeBtn);
  closeBtn.addEventListener('click', (e) => {
    e.target.closest('.section').classList.add('close-sticky-section');
  });
}

function combineTextBocks(textBlocks, iconArea, viewPort, variant) {
  const pillConfig = {
    default: {
      'mobile-up': ['s', 's'],
      'tablet-up': ['s', 's'],
      'desktop-up': ['m', 'l'],
    },
    popup: {
      'mobile-up': ['s', 's'],
      'tablet-up': ['l', 'm'],
      'desktop-up': ['xxl', 'xl'],
    },
  };
  const textStyle = pillConfig[variant][viewPort];
  const contentArea = createTag('p', { class: 'content-area' });
  const textArea = createTag('p', { class: 'text-area' });
  textBlocks[0].parentElement.prepend(contentArea);
  textBlocks.forEach((textBlock) => {
    textArea.appendChild(textBlock);
    if (textBlock.nodeName === 'P') {
      textBlock.classList.add(`body-${textStyle[1]}`);
    } else {
      textBlock.classList.add(`heading-${textStyle[0]}`);
    }
  });
  if (iconArea) {
    if (iconArea.innerText?.trim()) iconArea.classList.add('detail-xs');
    iconArea.classList.add('icon-area');
    contentArea.appendChild(iconArea);
  }
  contentArea.appendChild(textArea);
}

function addPill(sourceEl, parent) {
  const newPill = sourceEl.cloneNode(true);
  parent.appendChild(newPill);
}

function checkViewportPill(foreground) {
  const { children, childElementCount: childCount } = foreground;
  if (childCount < 2) addPill(children[childCount - 1], foreground);
  if (childCount < 3) addPill(children[childCount - 1], foreground);
}

function decoratePill(el) {
  const viewports = ['mobile-up', 'tablet-up', 'desktop-up'];
  const foreground = el.querySelector('.foreground');
  const variant = el.classList.contains('popup') ? 'popup' : 'default';
  if (foreground.childElementCount !== 3) checkViewportPill(foreground);
  [...foreground.children].forEach((child, index) => {
    child.className = viewports[index];
    child.classList.add('pill-text');
    const textBlocks = [...child.children];
    const iconArea = child.querySelector('picture')?.closest('p');
    const actionArea = child.querySelectorAll('em a, strong a, p > a strong');
    if (iconArea) textBlocks.shift();
    if (actionArea.length) textBlocks.pop();
    if (!(textBlocks.length || iconArea || actionArea.length)) child.classList.add('hide-block');
    else if (textBlocks.length) combineTextBocks(textBlocks, iconArea, viewports[index], variant);
  });
  if (variant === 'popup') addCloseButton(el);
  return foreground;
}

function decorateBorder(el, { borderBottom }) {
  const border = createTag('div', { style: `background: ${borderBottom};`, class: 'border' });
  el.appendChild(border);
}

function decorateLayout(el, opts = {}) {
  const elems = el.querySelectorAll(':scope > div');
  if (elems.length > 1) decorateBlockBg(el, elems[0]);
  const foreground = elems[elems.length - 1];
  foreground.classList.add('foreground', 'container');
  if (el.classList.contains(pill)) return decoratePill(el);
  const text = foreground.querySelector('h1, h2, h3, h4, h5, h6, p')?.closest('div');
  text?.classList.add('text');
  const picture = text?.querySelector('p picture');
  const iconArea = picture ? (picture.closest('p') || createTag('p', null, picture)) : null;
  iconArea?.classList.add('icon-area');
  const foregroundImage = foreground.querySelector(':scope > div:not(.text) img')?.closest('div');
  const bgImage = el.querySelector(':scope > div:not(.text):not(.foreground) img')?.closest('div');
  const foregroundMedia = foreground.querySelector(':scope > div:not(.text) video, :scope > div:not(.text) a[href*=".mp4"]')?.closest('div');
  const bgMedia = el.querySelector(':scope > div:not(.text):not(.foreground) video, :scope > div:not(.text):not(.foreground) a[href*=".mp4"]')?.closest('div');
  const image = foregroundImage ?? bgImage;
  const asideMedia = foregroundMedia ?? bgMedia ?? image;
  const isSplit = el.classList.contains('split');
  const hasMedia = foregroundImage ?? foregroundMedia ?? (isSplit && asideMedia);
  if (!hasMedia) el.classList.add('no-media');
  if (asideMedia && !asideMedia.classList.contains('text')) {
    asideMedia.classList.add('image');
  } else if (!iconArea) {
    foreground?.classList.add('no-image');
  }
  if (opts.borderBottom) decorateBorder(el, opts);
  return foreground;
}

export default function init(el) {
  el.classList.add('con-block');
  const { fontSizes, options } = getBlockData(el);
  const blockText = decorateLayout(el, options);
  decorateBlockText(blockText, fontSizes);
  decorateTextOverrides(el);
  decorateStaticLinks(el);
}
