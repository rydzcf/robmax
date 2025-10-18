import Card from '@/components/Card'
import ContentImage from '@/components/ContentImage'
import Cta from '@/components/Cta'
import Hero from '@/components/Hero'
import HeroSlider, { Slide } from '@/components/HeroSlider'
import { getDictionary } from '@/dictionaries'
import Image from 'next/image'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pl' }]
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ lang: 'en' | 'pl' }> 
}) {
  const { lang } = await params
  const dict = getDictionary(lang)


  const Slides: Slide[] = [
    {
      id: 1,
      image: '/hero.jpg',
      title: dict.hero.title,
      subtitle: dict.hero.subtitle,
    },
    {
      id: 2,
      image: '/hero.jpg',
       title: dict.hero.title2,
      subtitle: dict.hero.subtitle2,
    },
    {
      id: 3,
      image: '/hero.jpg',
       title: dict.hero.title3,
      subtitle: dict.hero.subtitle3,
    },
  ];



  return (
    <>

    <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-white to-transparent z-10" />
    <HeroSlider slides={Slides}/>
    {/* <Hero lang={lang} /> */}
    <div className="px-3 pb-32 pt-20 mx-auto max-w-7xl">
      {dict.aboutus1}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl pt-20 pb-32 px-3">
  <Card
    title="Obróbka CNC"
    description="Precyzyjna obróbka materiałów"
    imageSrc="/cnc.jpg"
    imageAlt="CNC"
    link="/pl/cnc"
    buttonText="Dowiedz się więcej"
    index={0}
  />
  <Card
    title="Cięcie szkła"
    description="Profesjonalne cięcie szkła"
    imageSrc="/glass.jpg"
    imageAlt="Glass"
    link="/pl/glass"
    buttonText="Zobacz ofertę"
    index={1}
  />
  <Card
    title="Maskownice"
    description="Profesjonalne cięcie szkła"
    imageSrc="/glass.jpg"
    imageAlt="Glass"
    link="/pl/glass"
    buttonText="Zobacz ofertę"
    index={2}
  />
</div>
    <Cta lang={lang} />
     <div className="px-3 pb-32 pt-20 mx-auto max-w-7xl">
      
          <ContentImage 
          lang={lang}
          imagePosition='right'
          sectionKey='cnc'
          imageSrc='/hero.jpg'
          imageAlt='foto cnc'
          />  
        
      <div className="text-2xl font-semibold py-4">{dict.whyus}</div>
      {Object.values(dict.aboutuspoint).map((item, index) => (
  <div key={index} className='flex items-center gap-2 mb-2'>
    <Image src="/b.svg" width={12} height={12} alt="point"/>
    {item}
    </div>
))}
    </div>
    </>
  )
}