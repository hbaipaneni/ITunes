import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import  useConstant  from 'use-constant'
import axios from 'axios';

import AwesomeDebouncePromise from 'awesome-debounce-promise';

const searchArtist = (text) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://itunes.apple.com/search?term=${text}`).then((res) => {
            resolve(res.data.results)
        }, (err) => {
            reject(err)
        })
    })
}
export const useSearchArtist = () => {
    const [inputText, setInputText] = useState('');
    const debouncedSearchArtist= useConstant(() =>
      AwesomeDebouncePromise(searchArtist, 300)
    );
  
    const search = useAsync(
      async text => {
        if (text.length === 0) {
          return [];
        } else {
          return debouncedSearchArtist(text);
        }
      },
      [inputText]
    );
    return {
      inputText,
      setInputText,
      search,
    };
  };

