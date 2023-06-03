import Container from '@/ui/layout/container'

export default function Main(props: { children: React.ReactNode }) {
  return (
    <main className="w-full mt-2 pt-[56px] md:pt-[60px] pb-[65px]">
      <Container>{props.children}</Container>
    </main>
  )
}
