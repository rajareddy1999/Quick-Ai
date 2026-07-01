import React, { useState } from 'react'
import { Sparkles, Edit } from 'lucide-react'

const WriteArticle = () => {
    const articleLengthOptions = [
        { value: 'short', label: 'Short (500-800 words)' },
        { value: 'medium', label: 'Medium (800-1200 words)' },
        { value: 'long', label: 'Long (1200+ words)' },
    ]

    const [selectedLength, setSelectedLength] = useState(articleLengthOptions[0].value)
    const [articleTopic, setArticleTopic] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        console.log('Article Topic:', articleTopic)
        console.log('Selected Length:', selectedLength)
    }

    return (
        <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
            {/* Left column - Form */}
            <form onSubmit={onSubmitHandler} className='w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Sparkles className='w-6 text-[#4a7aff]' />
                    <h1 className='text-xl font-semibold'>AI Article Writer</h1>
                </div>
                
                <p className='mt-6 text-sm font-medium'>Article Topic</p>
                <input
                    type="text"
                    placeholder='The future of artificial intelligence is...'
                    className='w-full mt-2 p-2 px-3 outline-none text-sm border border-gray-300 rounded-md'
                    required
                    value={articleTopic}
                    onChange={(e) => setArticleTopic(e.target.value)}
                />

                <p className='mt-4 text-sm font-medium'>Article Length</p>
                <select
                    className='w-full mt-2 p-2 px-3 outline-none text-sm border border-gray-300 rounded-md'
                    required
                    value={selectedLength}
                    onChange={(e) => setSelectedLength(e.target.value)}     
                >
                    {articleLengthOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <button type="submit" className='mt-6 w-full bg-gradient-to-r from-[#4a7aff] to-[#9234EA] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer'>
                    <Edit className='w-5' />
                    Generate Article
                </button>
            </form>

            {/* Right column - Output Preview */}
            <div className='w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]'>
                <div className='flex items-center gap-3'>
                    <Edit className='w-5 h-5 text-[#4a7aff]' />
                    <h1 className='text-xl font-semibold'>Generated Article</h1>
                </div>
                
                <div className='flex-1 flex justify-center items-center'>
                    {/* Added items-center here so the icon aligns with the text */}
                    <div className='text-sm text-gray-400 text-center gap-5 flex flex-col items-center'>
                        <Edit className='w-9 h-9 text-[#4a7aff]' />
                        <p>Click on "Generate Article" to create your content.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WriteArticle