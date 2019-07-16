import React from 'react';
import {ToastsStore} from 'react-toasts';
// https://www.npmjs.com/package/react-toasts
export default function notify(msg, dur) {
  ToastsStore.error(<span dangerouslySetInnerHTML={{__html: msg}}/>, dur || 2000);
}
