export function LegalSection({ id, title, children }: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2>{title}</h2>
      {children}
    </section>
  )
}
