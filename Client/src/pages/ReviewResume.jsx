import { FileText, Sparkles } from 'lucide-react';
import {React, useState }from 'react'

const ReviewResume = () => {

  const [resume, setResume] = useState('');
    
      const onSubmitHandler = async (e) => {
        e.preventDefault();
    
        console.log("Selected PDF:", resume);
    
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
          <Sparkles className="w-6 text-[#00da83]" />
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Resume</p>

        <input
          type="file"
          accept="application/pdf,"
          className="w-full mt-2 p-2 px-3 outline-none text-sm border border-gray-300 rounded-md"
          required
          onChange={(e) => setResume(e.target.files[0])} />

        <p className='mt-1 text-xs text-gray-500 font-light'>
          Supports PDF files only</p>

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-[#00da83] to-[#009bb3] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer" >
          <FileText className="w-5" />
          Review Resume
        </button>
      </form>

      {/* Right column - Output Preview */}
      <div className="w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#00da83]" />
          <h1 className="text-xl font-semibold">Analysis Results</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm text-gray-400 text-center gap-5 flex flex-col items-center">
            <FileText className="w-9 h-9 text-[#00da83]" />
            <p>Click on "Review Resume" to process your PDF.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewResume
