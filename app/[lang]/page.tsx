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
      image: '/hero1.jpeg',
      title: dict.hero.title,
      subtitle: dict.hero.subtitle,
    },
    {
      id: 2,
      image: '/hero2.jpeg',
       title: dict.hero.title2,
      subtitle: dict.hero.subtitle2,
    },
    {
      id: 3,
      image: '/hero3.jpeg',
       title: dict.hero.title3,
      subtitle: dict.hero.subtitle3,
    },
  ];



  return (
    <>

    <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-white to-transparent z-10" />
    <HeroSlider slides={Slides}/>
    {/* <Hero lang={lang} /> */}
    <p className="px-3 pb-32 pt-20 mx-auto max-w-7xl">
      {dict.aboutus1}
    </p>
    <h1 className='max-w-7xl mx-auto text-3xl font-semibold py-4'>
      {dict.aboutus2}
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl pt-20 pb-32 px-3">
  <Card
    title={dict.aboutuspoint[1]}
    description={dict.aboutuspoint['1.1']}
    imageSrc="/hero3.jpeg"
    imageAlt="CNC"
    link={`/${lang}/mask`}
    buttonText="Dowiedz się więcej"
    index={0}
  />
  <Card
    title={dict.aboutuspoint[2]}
    description={dict.aboutuspoint['2.1']}
    imageSrc="/hero1.jpeg"
    imageAlt="cnc"
     link={`/${lang}/cnc`}
    buttonText="Zobacz ofertę"
    index={1}
  />
  <Card
    title={dict.aboutuspoint[3]}
    description={dict.aboutuspoint['3.1']}
    imageSrc="/hero2.jpeg"
    imageAlt="glass"
    link={`/${lang}/glass`}
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
          imageSrc='/hero1.jpeg'
          imageAlt='foto cnc'
          />  
        
      <h1 className="font-semibold py-4">{dict.whyus}</h1>
      {Object.values(dict.aboutuspoint).map((item, index) => (
  <div key={index} className='flex items-center gap-2 mb-2'>
    <Image src="/b.svg" width={12} height={12} alt="point"/>
    {item}
    </div>
))}
    </div>
      <ContentImage 
          lang={lang}
          imagePosition='left'
          sectionKey='glass'
          imageSrc='/hero2.jpeg'
          imageAlt='foto glass'
          />  
    </>
  )
}