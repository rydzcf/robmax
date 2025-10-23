import { getDictionary } from '@/dictionaries'
import React from 'react'
import data from "@/public/data/mask.json";
import CardList from '@/components/CardList';

export type Mask = {
   id : number,
  modele: string[],
  h: string,
  w: string,
  w_elem: string,
  fi: string,
  typ: string,
  image: string,
}


const page = async ({params} : {params : Promise<{lang: string}>}) => {
   const { lang } = await params
  const dict = getDictionary(lang)
  return (
      <>
    <div className='pt-[90px] max-w-7xl mx-auto text-3xl'>{dict.menu.mask}
     <div className='text-base mb-16'>
     <div className='my-10'>{dict.mask.about}</div>
       <CardList data={data} lang={lang}/>
      </div> 
      </div>
      </>
  )
}

export default page
