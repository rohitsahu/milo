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
  [ribbon]: ['m', 'm'],
  [pill]: {
    [small]: ['m', 'm'],
    [medium]: ['s', 's'],
    [large]: ['l', 'm'],
  },
};

// const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
//                     <g transform="translate(-10500 3403)">
//                       <circle cx="10" cy="10" r="10" transform="translate(10500 -3403)" fill="#707070"></circle>
//                       <line y1="8" x2="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"></line>
//                       <line x1="8" y1="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"></line>
//                     </g>
//                   </svg>`;

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

function decorateBorder(el, { borderBottom }) {
  const border = createTag('div', { style: `background: ${borderBottom};`, class: 'border' });
  el.appendChild(border);
}

function decorateRibbon(foreground) {
  const text = foreground.querySelector('.text');
  if (!text) return;
  const heading = text?.querySelector('h1, h2, h3, h4, h5, h6');
  const icon = heading.previousElementSibling;
  const body = heading?.nextElementSibling?.classList.contains('action-area') ? '' : heading.nextElementSibling;
  const copy = createTag('div', { class: 'ribbon-copy' }, [heading, body]);
  text?.insertBefore(copy, icon?.nextSibling || text.children[0]);
}

function decorateLayout(el) {
  const elems = el.querySelectorAll(':scope > div');
  if (elems.length > 1) decorateBlockBg(el, elems[0]);
  const foreground = elems[elems.length - 1];
  foreground.classList.add('foreground', 'container');
  const text = foreground.querySelector('h1, h2, h3, h4, h5, h6, p')?.closest('div');
  text?.classList.add('text');
  const picture = text?.querySelector('p picture');
  const iconArea = picture ? (picture.closest('p') || createTag('p', null, picture)) : null;
  iconArea?.classList.add('icon-area');
  const fgMedia = foreground.querySelector(':scope > div:not(.text) :is(img, video, a[href*=".mp4"])')?.closest('div');
  const bgMedia = el.querySelector(':scope > div:not(.foreground) :is(img, video, a[href*=".mp4"])')?.closest('div');
  const media = fgMedia ?? bgMedia;
  el.classList.toggle('no-media', !media);
  media?.classList.toggle('image', (media && !media.classList.contains('text')));
  foreground?.classList.toggle('no-image', (!media && !iconArea));
  return foreground;
}

export default function init(el) {
  el.classList.add('con-block');
  const { fontSizes, options } = getBlockData(el);
  const blockText = decorateLayout(el);
  decorateBlockText(blockText, fontSizes);
  if (options.borderBottom) decorateBorder(el, options);
  decorateTextOverrides(el);
  decorateStaticLinks(el);
  if (el.classList.contains(ribbon)) decorateRibbon(blockText);
}
