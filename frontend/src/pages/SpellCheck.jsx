import  { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import SuggestionsTable from '../components/home/SuggestionsTable';

const SpellCheck = () => {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveWord = () => {
    const data = {
      word,
    };
    setLoading(true);
    axios
      .post('http://localhost:31337/spell', data)
      .then((res) => {
        setLoading(false);
        setSuggestions(res.data.suggestions);
        if(res.data.isCorrect){
          enqueueSnackbar('The word is correct', { variant: 'success' });
        }else{
          enqueueSnackbar('The word is misspelled but here are some suggestions', { variant: 'error' });
        }
        console.log(res);
        // navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Spell Check</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Word</label>
          <input
            type='text'
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveWord}>
          Save
        </button>
      </div>

      <div className='flex justify-center items-center gap-x-4 my-5'>
        <SuggestionsTable suggestions={suggestions} />
      </div>
    </div>
  );
}

export default SpellCheck