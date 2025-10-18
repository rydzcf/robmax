import ContentImage from '@/components/ContentImage'
import { getDictionary } from '@/dictionaries'
import React from 'react'

const page = async ({params} : {params : Promise<{lang: string}>}) => {
   const { lang } = await params
  const dict = getDictionary(lang)
    return (
    <div className='pt-[90px] max-w-7xl mx-auto text-3xl'>
    <ContentImage 
    lang={lang}
    imagePosition='right'
    sectionKey='cnc'
    imageSrc='/hero.jpg'
    imageAlt='foto cnc'
    />  
    </div>
  )
}

export default page
