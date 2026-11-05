import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/great-vibes/400.css';
import '@fontsource/cinzel/400.css';
import './globals.css';
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://mayerlyn-miguel-boda-git-main-dangeles-projects.vercel.app';
export const metadata={metadataBase:new URL(siteUrl),title:'Mayerlyn & Miguel | Nuestra boda',description:'Con la bendición de Dios · 29 de diciembre de 2026 · Nuestra invitación de boda',openGraph:{title:'Mayerlyn & Miguel | Nuestra boda',description:'Con la bendición de Dios · 29 de diciembre de 2026 · Nuestra invitación de boda',type:'website',locale:'es_ES',images:[{url:'/assets/pareja-jardin.jpg',width:1200,height:630,alt:'Mayerlyn y Miguel'}]},twitter:{card:'summary_large_image',title:'Mayerlyn & Miguel | Nuestra boda',images:['/assets/pareja-jardin.jpg']}};
export const viewport={width:'device-width',initialScale:1,themeColor:'#59634F'};
export default function RootLayout({children}){return <html lang="es"><head><link rel="preload" href="/assets/great-vibes.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/assets/pareja-banner-blanco.jpg" as="image"/><link rel="preload" href="/assets/envelope-photographic.png" as="image"/><link rel="preload" href="/assets/wax-seal-mm-cursive.png" as="image"/></head><body>{children}</body></html>}
