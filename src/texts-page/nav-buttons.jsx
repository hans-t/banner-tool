import React from 'react';
import { prevBtnFactory, nextBtnFactory } from '../common/nav-btn';


function validator({ textsByCountry }) {
  return Object.keys(textsByCountry)
    .every(country => {
      const texts = textsByCountry[country];
      return Object.keys(texts)
        .every(key => texts[key]);
    });
}


const PrevBtn = prevBtnFactory({ label: 'Edit Global Texts' });
const NextBtn = nextBtnFactory({
  label: 'Results',
  recombineOnClick: true,
  validator,
});


export default {
  prevBtn: <PrevBtn />,
  nextBtn: <NextBtn />,
};
