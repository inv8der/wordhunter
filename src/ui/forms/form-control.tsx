import { createContext, useContext, useMemo } from 'react'

interface FormControlContextValue {
  isDisabled: boolean
  isInvalid: boolean
  isReadOnly: boolean
  isRequired: boolean
}

const FormControlContext = createContext<FormControlContextValue>({
  isDisabled: false,
  isInvalid: false,
  isReadOnly: false,
  isRequired: false,
})

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  isDisabled?: boolean
  isInvalid?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
}

export default function FormControl({
  children,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  ...props
}: React.PropsWithChildren<FormControlProps>) {
  const contextValue = useMemo(
    () => ({
      isDisabled,
      isInvalid,
      isReadOnly,
      isRequired,
    }),
    [isDisabled, isInvalid, isReadOnly, isRequired]
  )

  return (
    <FormControlContext.Provider value={contextValue}>
      <div role="group" {...props}>
        {children}
      </div>
    </FormControlContext.Provider>
  )
}

export function useFormControl() {
  return useContext(FormControlContext)
}
