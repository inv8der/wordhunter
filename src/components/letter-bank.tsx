'use client'

import { useRef } from 'react'
import * as yup from 'yup'
import { Field, Form, Formik, type FieldProps } from 'formik'
import { useAppState } from '@/lib/context/app-state'
import useDisclosure from '@/lib/hooks/use-disclosure'
import Button from '@/ui/forms/button'
import Input from '@/ui/forms/input'
import FormControl from '@/ui/forms/form-control'
import FormErrorMessage from '@/ui/forms/form-error'
import Stack from '@/ui/layout/stack'
import Center from '@/ui/layout/center'
import Square from '@/ui/layout/square'
import Drawer from '@/ui/overlay/drawer'
import DrawerOverlay from '@/ui/overlay/drawer-overlay'
import DrawerContent from '@/ui/overlay/drawer-content'
import DrawerHeader from '@/ui/overlay/drawer-header'
import DrawerBody from '@/ui/overlay/drawer-body'
import DrawerFooter from '@/ui/overlay/drawer-footer'

const validationSchema = yup.object({
  letterBank: yup
    .string()
    .required('I think you forgot something...')
    .matches(/^\s*[a-zA-Z]+\s*$/, 'No numbers or special characters allowed!')
    .min(5, 'Must be between 5 and 7 letters')
    .max(7, 'Must be between 5 and 7 letters'),
})

export default function LetterBank() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { letterBank, updateLetterBank } = useAppState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Center className="fixed bottom-0 w-full bg-white dark:bg-gray-800 z-[1000]">
      <Stack
        className="justify-center p-3 rounded-md cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-whiteAlpha-200 dark:active-whiteAlpha-300"
        direction="horizontal"
        spacing={3}
        onClick={onOpen}
      >
        {letterBank.map((letter, i) => (
          <Square
            key={`${letter}-${i}`}
            size={10}
            className="uppercase border-2 border-solid border-black dark:border-gray-800 rounded-[4px] bg-metallicYellow-500 dark:bg-metallicYellow-200 text-black dark:text-gray-800 font-semibold"
          >
            {letter}
          </Square>
        ))}
      </Stack>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Formik
            initialValues={{ letterBank: letterBank.join('') }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              updateLetterBank(values.letterBank.trim())
              onClose()
            }}
          >
            {() => (
              <Form>
                <DrawerHeader>Update letter bank</DrawerHeader>
                <DrawerBody>
                  <Field name="letterBank">
                    {({ field, meta }: FieldProps) => (
                      <FormControl isInvalid={!!meta.error && meta.touched}>
                        <Input
                          {...field}
                          placeholder=""
                          autoComplete="off"
                          autoCorrect="off"
                          onFocus={() => {
                            inputRef.current?.select()
                          }}
                          onChange={(e) => {
                            e.target.value = e.target.value.toLowerCase()
                            field.onChange(e)
                          }}
                          ref={inputRef}
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </DrawerBody>
                <DrawerFooter>
                  <Button className="mr-3" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" color="seaGreen">
                    Confirm
                  </Button>
                </DrawerFooter>
              </Form>
            )}
          </Formik>
        </DrawerContent>
      </Drawer>
    </Center>
  )
}
