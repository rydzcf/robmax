import Hero from '@/components/Hero'
import { getDictionary } from '@/dictionaries'
import Link from 'next/link'

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

  return (
    <Hero lang={lang} />
  )
}