import React, { useState } from 'react'
import { Sparkles, Hash, Image } from 'lucide-react'


const Generateimages = () => {

  const ImageStyle = [ 'Realistic style', 'Ghibli style', 'Cartoon style', 'Anime style', 'Pixel Art', '3D Render', 'Watercolor', 'Oil Painting', 'Digital Art', 'Fantasy', 'Sci-Fi', 'Cyberpunk', 'Steampunk', 'Surrealism', 'Pop Art', 'Minimalist', 'Abstract', 'Concept Art', 'Character Design', 'Landscape', 'Architecture' ]
    
        const [selectedStyle, setSelectedStyle] = useState('Realistic style')
        const [articleTopic, setArticleTopic] = useState('')
        const [publish, setPublish] = useState(false)
        
    
        const onSubmitHandler = async (e) => {
            e.preventDefault()
            console.log('Article Topic:', articleTopic)
            console.log('Selected Style:', selectedStyle)
        }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
            {/* Left column - Form */}
            <form onSubmit={onSubmitHandler} className='w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Sparkles className='w-6 text-[#00ad25]' />
                    <h1 className='text-xl font-semibold'>AI Image Generator</h1>
                </div>
                
                <p className='mt-6 text-sm font-medium'>Describe your Image</p>
                <textarea
                    rows={4}
                    placeholder='Describe the image you want to generate...'
                    className='w-full mt-2 p-2 px-3 outline-none text-sm border border-gray-300 rounded-md'
                    required
                    value={articleTopic}
                    onChange={(e) => setArticleTopic(e.target.value)}
                />

                <p className='mt-4 text-sm font-medium'>Style</p>
                <select
                    className='w-full mt-2 p-2 px-3 outline-none text-sm border border-gray-300 rounded-md bg-green-50 text-green-700'
                    required
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}     
                >
                    {ImageStyle.map((style) => (
                        <option key={style} value={style}>
                            {style}
                        </option>
                    ))}
                </select>

                <div className='my-6 flex items-center gap-2'>
                  <label className='relative cursor-pointer'>
                    <input type='checkbox'onChange={(e)=>setPublish(e.target.checked)}
                    checked={publish} className='sr-only peer' />

                    <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'>
                    </div>
                    <span className='absolute left-1 top-1 w-3 h-3 rounded-full bg-white
                    transition peer-checked:translate-x-4'></span>
                  </label>
                  <p className='text-sm '>Make This Image Public</p>
                </div>

                <button type="submit" className='mt-6 w-full bg-gradient-to-r from-[#4a7aff] to-[#9234EA] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer'>
                    <Image className='w-5' />
                    Generate Image
                </button>
            </form>

            {/* Right column - Output Preview */}
            <div className='w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200 flex flex-col min-h-96 '>
                <div className='flex items-center gap-3'>
                    <Image className='w-5 h-5 text-[#00ad25]' />
                    <h1 className='text-xl font-semibold'>Generated Images</h1>
                </div>
                
                <div className='flex-1 flex justify-center items-center'>
                    {/* Added items-center here so the icon aligns with the text */}
                    <div className='text-sm text-gray-400 text-center gap-5 flex flex-col items-center'>
                        <Image className='w-9 h-9 text-[#8d3ce3]' />
                        <p>Click on "Generate Image" to create your images.</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Generateimages
