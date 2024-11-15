export const metadata = {
  title: 'Back end',
  description: 'Manage content with Sanity',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <main lang='en'>
      <body>{children}</body>
    </main>
  )
}
