import React from 'react'
import { useState } from 'react'
import { Sparkles,Edit, Hash } from 'lucide-react'


const BlogTitles = () => {

  const blogCategories = [ 'General', 'Technology', 'Business', 'Health', 'Travel', 'Food', 'Lifestyle', 'Education',  ]
  
      const [selectedCategory, setSelectedCategory] = useState(blogCategories[0])
      const [articleTopic, setArticleTopic] = useState('')
  
      const onSubmitHandler = async (e) => {
          e.preventDefault()
          console.log('Article Topic:', articleTopic)
          console.log('Selected Category:', selectedCategory)
      }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
            {/* Left column - Form */}
            <form onSubmit={onSubmitHandler} className='w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Sparkles className='w-6 text-[#8e37eb]' />
                    <h1 className='text-xl font-semibold'>AI Title Generator</h1>
                </div>
                
                <p className='mt-6 text-sm font-medium'>Keyword</p>
                <input
                    type="text"
                    placeholder='The future of artificial intelligence is...'
                    className='w-full mt-2 p-2 px-3 outline-none text-sm border border-gray-300 rounded-md'
                    required
                    value={articleTopic}
                    onChange={(e) => setArticleTopic(e.target.value)}
                />

                <p className='mt-4 text-sm font-medium'>Category</p>
                <select
                    className='w-full mt-2 p-2 px-3 outline-none text-sm border border-gray-300 rounded-md bg-purple-100 text-purple-700'
                    required
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}     
                >
                    {blogCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <button type="submit" className='mt-6 w-full bg-gradient-to-r from-[#4a7aff] to-[#9234EA] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer'>
                    <Hash className='w-5' />
                    Generate title
                </button>
            </form>

            {/* Right column - Output Preview */}
            <div className='w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200 flex flex-col min-h-96 '>
                <div className='flex items-center gap-3'>
                    <Hash className='w-5 h-5 text-[#9349e2]' />
                    <h1 className='text-xl font-semibold'>Generated Titles</h1>
                </div>
                
                <div className='flex-1 flex justify-center items-center'>
                    {/* Added items-center here so the icon aligns with the text */}
                    <div className='text-sm text-gray-400 text-center gap-5 flex flex-col items-center'>
                        <Hash className='w-9 h-9 text-[#7c2dd1]' />
                        <p>Click on "Generate Title" to create your titles.</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default BlogTitles
