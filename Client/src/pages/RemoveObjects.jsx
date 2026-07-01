import { Scissors, Sparkles } from 'lucide-react';
import {React ,useState} from 'react'

const Removeobjects = () => {

  const [image, setImage] = useState('');
  const [object, setObject] = useState(null);
  
    const onSubmitHandler = async (e) => {
      e.preventDefault();
  
      console.log("Selected Image:", image);
  
      // API call for background removal goes here
    };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left column - Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>

        <input
          type="file"
          accept="image/*"
          className="w-full mt-2 p-2 px-3 outline-none text-sm border border-gray-300 rounded-md"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />

        <p className='mt-6 text-sm font-medium'>Describe object you want to remove</p>
                <textarea
                    rows={4}
                    placeholder='Describe the object you want to remove...'
                    className='w-full mt-2 p-2 px-3 outline-none text-sm border border-gray-300 rounded-md'
                    required
                    value={object}
                    onChange={(e) => setObjectc(e.target.value)}
                />

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-[#417df6] to-[#8e37eb] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer" >
          <Scissors className="w-5" />
          Remove Object
        </button>
      </form>

      {/* Right column - Output Preview */}
      <div className="w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200 flex flex-col min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#ff4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm text-gray-400 text-center gap-5 flex flex-col items-center">
            <Scissors className="w-9 h-9 text-[#ff4938]" />
            <p>Click on "Remove Object" to process your image.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Removeobjects

