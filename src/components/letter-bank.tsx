'use client'

import { useRef } from 'react'
import * as yup from 'yup'
import { Field, Form, Formik, type FieldProps } from 'formik'
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
  useColorModeValue,
} from '@chakra-ui/react'
import { useAppState } from '@/lib/context/app-state'

const validationSchema = yup.object({
  letterBank: yup
    .string()
    .required('I think you forgot something...')
    .matches(/^\s*[a-zA-Z]+\s*$/, 'No numbers or special characters allowed!')
    .min(5, 'Must be between 5 and 7 letters')
    .max(7, 'Must be between 5 and 7 letters'),
})

export default function LetterBank() {
  const inputRef = useRef<HTMLInputElement | null>()
  const { letterBank, updateLetterBank } = useAppState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue('white', 'gray.800')
  const hoverBgColor = useColorModeValue('gray.100', 'whiteAlpha.200')
  const activeBgColor = useColorModeValue('gray.200', 'whiteAlpha.300')
  const letterBgColor = useColorModeValue(
    'metallicYellow.500',
    'metallicYellow.200'
  )
  const letterBorderColor = useColorModeValue('gray.200', 'whiteAlpha.300')
  const letterColor = useColorModeValue('white', 'gray.800')

  return (
    <Center
      className="letter-bank"
      position="fixed"
      bottom={0}
      w="100%"
      bgColor={bgColor}
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
          bgColor: hoverBgColor,
        }}
        _active={{
          bgColor: activeBgColor,
        }}
      >
        {letterBank.map((letter, i) => (
          <Square
            key={`${letter}-${i}`}
            size={10}
            textTransform="uppercase"
            border="2px solid"
            borderColor={letterBorderColor}
            borderRadius={4}
            bgColor={letterBgColor}
            color={letterColor}
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
                          ref={(ref) => (inputRef.current = ref)}
                        />
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
