import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

const { default: init } = await import('../../../libs/blocks/aside/aside.js');
const standardBody = await readFile({ path: './mocks/standard.html' });
const splitBody = await readFile({ path: './mocks/split.html' });

describe('aside', () => {
  describe('standard', () => {
    document.body.innerHTML = standardBody;
    const blocks = document.querySelectorAll('.aside');
    blocks.forEach((el) => init(el));

    describe('default', () => {
      const el = document.querySelector('#test-default');
      const el2 = document.querySelector('#test-default-2');

      it('allows a background color', () => {
        expect(window.getComputedStyle(el)?.backgroundColor).to.equal('rgb(238, 238, 238)');
      });

      it('allows a background image', () => {
        expect(el2.querySelector('.background img')).to.exist;
      });

      it('allows an icon image', () => {
        expect(el.querySelector('.icon-area img')).to.exist;
      });

      it('has a medium detail', () => {
        expect(el.querySelector('.detail-m')).to.exist;
      });

      it('has a xl heading', () => {
        expect(el.querySelector('.heading-xl')).to.exist;
      });

      it('has a small body', () => {
        expect(el.querySelector('p.body-s')).to.exist;
      });

      it('has a cta', () => {
        expect(el.querySelector('.action-area .con-button')).to.exist;
      });

      it('allows supplemental text', () => {
        expect(el.querySelector('.supplemental-text')).to.exist;
      });

      it('allows a foreground image', () => {
        expect(el.querySelector('.foreground .image img')).to.exist;
      });
    });

    it('allows text overrides', () => {
      const el = document.querySelector('#test-text-overrides');
      expect(el.querySelector('.detail-l')).to.exist;
      expect(el.querySelector('.heading-l')).to.exist;
      expect(el.querySelector('p.body-m')).to.exist;
    });

    it('allows large title', () => {
      const el = document.querySelector('#test-title');
      expect(el.querySelector('.title-l')).to.exist;
    });

    it('allows an avatar', () => {
      const el = document.querySelector('#test-avatar');
      expect(el.querySelector('.avatar-area img')).to.exist;
    });

    // it('has a product lockup'); // To Do
  });

  // describe('split', () => {
  //   document.body.innerHTML = splitBody;
  //   const blocks = document.querySelectorAll('.aside');
  //   blocks.forEach((el) => init(el));

  //   describe('default', () => {
  //     const el = document.querySelector('#test-default');
  //     const el2 = document.querySelector('#test-default-2');

  //     it('allows a background color', () => {
  //       expect(el.style.backroundColor).to.equal('#1e1e1e');
  //     });

  //     // it('allows a background image', () => {
  //     //   expect(el2.querySelector('.background img')).to.exist;
  //     // });

  //     it('allows an icon image', () => {
  //       expect(el.querySelector('.icon-area img')).to.exist;
  //     });

  //     it('has a medium detail', () => {
  //       expect(el.querySelector('.detail-m')).to.exist;
  //     });

  //     it('has a xl heading', () => {
  //       expect(el.querySelector('.heading-xl')).to.exist;
  //     });

  //     it('has a small body', () => {
  //       expect(el.querySelector('p.body-s')).to.exist;
  //     });

  //     it('has a cta', () => {
  //       expect(el.querySelector('.action-area .con-button')).to.exist;
  //     });

  //     it('allows supplemental text', () => {
  //       expect(el.querySelector('.supplemental-text')).to.exist;
  //     });

  //     // it('allows a foreground image', () => {
  //     //   expect(el.querySelector('.foreground .image img')).to.exist;
  //     // });

  //     it('allows icon stack');
  //   });
  // });
});
