import Navbar from '@/components/Navbar'
import '../globals.css'
import Footer from '@/components/Footer'
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pl' }]
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  
  return (
    <html lang={lang}>
      <body className='relative'>
      <Navbar lang={lang} />
        {children}
      <Footer lang={lang} />
        </body>
    </html>
  )
}