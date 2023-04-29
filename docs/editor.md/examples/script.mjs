/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { fileOpen, directoryOpen, fileSave, supported } from '../src/index.js';

import { imageToBlob } from './image-to-blob.mjs';

(async () => {
  const saveResponseButton = document.querySelector('#export-md');
  const supportedParagraph = document.querySelector('.supported');

  const ABORT_MESSAGE = 'The user aborted a request.';

  if (supported) {
    supportedParagraph.textContent = 'Using the File System Access API. @pandao';
  } else {
    supportedParagraph.textContent = 'Using the fallback implementation.  @pandao';
  }

  const appendImage = (blob) => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(blob);
    document.body.append(img);
    img.onload = img.onerror = () => URL.revokeObjectURL(img.src);
  };

  const listDirectory = (blobs) => {
    let fileStructure = '';
    if (blobs.length && !(blobs[0] instanceof File)) {
      return (pre.textContent += 'No files in directory.\n');
    }
    blobs
      .sort((a, b) => a.webkitRelativePath.localeCompare(b))
      .forEach((blob) => {
        // The File System Access API currently reports the `webkitRelativePath`
        // as empty string `''`.
        fileStructure += `${blob.webkitRelativePath}\n`;
      });
    pre.textContent += fileStructure;

    blobs
      .filter((blob) => {
        return blob.type.startsWith('image/');
      })
      .forEach((blob) => {
        appendImage(blob);
      });
  };
 
  saveResponseButton.addEventListener('click', async () => {
    const response = await fetch('./blank.md');
    try {
      await fileSave(response, {
        fileName: 'new_file.md',
        extensions: ['.md'],
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        return console.error(err);
      }
      console.log(ABORT_MESSAGE);
    }
  });
 
  saveResponseButton.disabled = false;
})();

if (window.self !== window.top) {
  document.querySelector('.iframes').remove();
}
