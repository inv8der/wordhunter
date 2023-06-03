import NextLink from 'next/link'
import Button from '@/ui/forms/button'
import Heading from '@/ui/typography/heading'
import Stack from '@/ui/layout/stack'

export default function App() {
  return (
    <div className="text-center">
      <Heading size="lg" className="mb-6">
        Hey there! 👋
      </Heading>
      <p className="mb-6">
        Stuck on a Wordscapes<sup>TM</sup> puzzle? I can help with that. Just
        add your letters to the bank below and select one of the following
        options.
      </p>
      <Stack direction="vertical" spacing={3}>
        <NextLink href="/solve-word" passHref legacyBehavior>
          <Button variant="solid" color="spiroDiscoBall">
            I&apos;m stuck on a word
          </Button>
        </NextLink>
        <NextLink href="/solve-puzzle" passHref legacyBehavior>
          <Button variant="solid" color="spiroDiscoBall">
            Gimme all solutions
          </Button>
        </NextLink>
      </Stack>
    </div>
  )
}
