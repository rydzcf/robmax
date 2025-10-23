import ContentImage from '@/components/ContentImage'
import { getDictionary } from '@/dictionaries'
import React from 'react'

const page = async ({params} : {params : Promise<{lang: string}>}) => {
   const { lang } = await params
  const dict = getDictionary(lang)
    return (
    <div className='pt-[90px] max-w-7xl mx-auto text-3xl font-semibold'>{dict.menu.glass}
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
