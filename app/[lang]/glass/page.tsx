import ContentImage from '@/components/ContentImage'
import { getDictionary } from '@/dictionaries'
import React from 'react'

const page = async ({params} : {params : Promise<{lang: string}>}) => {
   const { lang } = await params
  const dict = getDictionary(lang)
    return (
    <div className='pt-[90px] max-w-7xl mx-auto font-semibold'>
      <h1>
        {dict.menu.glass}
        </h1>
     <ContentImage 
        lang={lang}
        imagePosition='right'
        sectionKey='glass'
        imageSrc='/hero2.jpeg'
        imageAlt='foto glass'
        button = {false}
        />  
    </div>
  )
}

export default page
