import { getDictionary } from '@/dictionaries'
import React from 'react'

const page = async ({params} : {params : Promise<{lang: string}>}) => {
   const { lang } = await params
  const dict = getDictionary(lang)
    return (
    <div className='pt-[90px] max-w-7xl mx-auto text-3xl'>{dict.menu.cnc}</div>
  )
}

export default page
