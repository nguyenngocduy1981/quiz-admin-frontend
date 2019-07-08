import toast from 'toasted-notes';
import React from 'react';

// https://toasted-notes.netlify.com/
export default function notify(msg, dur) {
  toast.notify(<span dangerouslySetInnerHTML={{__html: msg}}/>,
    {
      type: 'success',
      position: 'top-right',
      duration: dur || 2000
    }
  );
}
