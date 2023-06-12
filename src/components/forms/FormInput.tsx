import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  FormHelperText,
  InputLeftElement,
  InputProps,
  FormErrorMessage,
  TypographyProps,
  VStack,
  forwardRef,
} from '@chakra-ui/react';
import { ReactNode, memo, useRef } from 'react';
import Keyboard from './keyboard/Keyboard';

export interface FormInputProps {
  label: string;
  hint: string;
  error?: string;
  placeholder: string;
  leftElement?: ReactNode;
  onDone: () => void;
  isInvalid: boolean;
  onInputChange: (value: string) => void;
}

const inputFontSize: TypographyProps['fontSize'] = ['sm', null, null, '2xl', '3xl'];

const FormInput = memo(
  forwardRef<InputProps & FormInputProps, 'input'>(
    (
      { label, error, hint, leftElement, onDone, isInvalid, onChange, onInputChange, ...props },
      ref,
    ) => {
      const inputRef = useRef<HTMLInputElement | null>(null);
      return (
        <VStack spacing="10" align="stretch" overflow="visible" marginX="-10">
          <FormControl isInvalid={isInvalid} isRequired paddingX="16">
            <FormLabel fontSize={['md', null, null, '3xl', '5xl']}>{label}</FormLabel>
            <InputGroup>
              {leftElement && (
                <InputLeftElement
                  height="100%"
                  justifyContent="end"
                  alignItems="center"
                  width={['8', null, null, null, '10']}
                  fontSize={inputFontSize}
                  pointerEvents="none"
                  color="gray"
                >
                  {leftElement}
                </InputLeftElement>
              )}
              <Input
                ref={(element) => {
                  inputRef.current = element;
                  if (ref === null) {
                    return;
                  }
                  if (typeof ref === 'function') {
                    ref(element);
                    return;
                  }
                  // eslint-disable-next-line no-param-reassign
                  ref.current = element;
                }}
                paddingLeft={leftElement ? ['8', '8', null, null, '10'] : undefined}
                borderWidth="0.1em"
                fontSize={inputFontSize}
                size={['md', null, null, 'lg']}
                resize="none"
                autoFocus
                onChange={onChange}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
              />
            </InputGroup>
            {isInvalid ? (
              <FormErrorMessage fontSize={inputFontSize}>{error}</FormErrorMessage>
            ) : (
              <FormHelperText fontSize={inputFontSize}>{hint}</FormHelperText>
            )}
          </FormControl>
          <Keyboard onDone={onDone} inputRef={inputRef} onInputChange={onInputChange} />
        </VStack>
      );
    },
  ),
);

export default FormInput;
