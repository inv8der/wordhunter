'use client'

import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import type { FieldProps } from 'formik'
import {
  Center,
  HStack,
  Square,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/react'
import { useAppState } from '@/lib/context/app-state'

const validationSchema = yup.object({
  letterBank: yup
    .string()
    .required('I think you forgot something...')
    .matches(/^[a-zA-Z]+$/, 'No numbers or special characters allowed!')
    .min(5, 'Must be between 5 and 7 letters')
    .max(7, 'Must be between 5 and 7 letters'),
})

export default function LetterBank() {
  const { letterBank, updateLetterBank } = useAppState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Center
      className="letter-bank"
      position="sticky"
      bottom={0}
      w="100%"
      bgColor="white"
      zIndex={1000}
    >
      <HStack
        spacing={3}
        onClick={onOpen}
        justify="center"
        p={3}
        cursor="pointer"
        borderRadius="0.375rem"
        _hover={{
          bgColor: 'gray.100',
        }}
        _active={{
          bgColor: 'gray.200',
        }}
      >
        {letterBank.map((letter, i) => (
          <Square
            key={`${letter}-${i}`}
            size={10}
            textTransform="uppercase"
            border="2px solid black"
            borderRadius={4}
            backgroundColor="metallicYellow.500"
            fontWeight={600}
          >
            {letter}
          </Square>
        ))}
      </HStack>

      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Formik
            initialValues={{ letterBank: letterBank.join('') }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              updateLetterBank(values.letterBank)
              onClose()
            }}
          >
            {() => (
              <Form>
                <DrawerHeader>What letters are available?</DrawerHeader>
                <DrawerBody>
                  <Field name="letterBank">
                    {({ field, meta }: FieldProps) => (
                      <FormControl isInvalid={!!meta.error && meta.touched}>
                        <Input {...field} placeholder="" />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </DrawerBody>
                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" colorScheme="seaGreen">
                    Update
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
