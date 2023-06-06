import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  FormHelperText,
  Textarea,
  InputLeftElement,
} from '@chakra-ui/react';
import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface FormInputProps {
  i18nPrefix: string;
  isMultiline?: boolean;
  leftElement?: ReactNode;
}

const FormInput = ({ i18nPrefix, isMultiline, leftElement }: FormInputProps) => {
  const { t } = useTranslation();

  const label = useMemo(() => t(`${i18nPrefix}Input`), [i18nPrefix, t]);
  const hint = useMemo(() => t(`${i18nPrefix}InputHint`), [i18nPrefix, t]);
  const placeholder = useMemo(() => t(`${i18nPrefix}InputPlaceholder`), [i18nPrefix, t]);

  const TargetElement = useMemo(() => (isMultiline ? Textarea : Input), [isMultiline]);

  return (
    <FormControl>
      <FormLabel fontSize={['md', null, null, '2xl', '4xl']}>{label}</FormLabel>
      <InputGroup>
        {leftElement && (
          <InputLeftElement
            height="100%"
            justifyContent="end"
            alignItems="center"
            width={['8', null, null, null, '10']}
            fontSize={['sm', null, null, 'xl', '2xl']}
            pointerEvents="none"
            color="gray"
          >
            {leftElement}
          </InputLeftElement>
        )}
        <TargetElement
          paddingLeft={leftElement ? ['8', '8', null, null, '10'] : undefined}
          borderWidth="0.1em"
          fontSize={['sm', null, null, 'xl', '2xl']}
          size={['md', null, null, 'lg']}
          placeholder={placeholder}
          resize="none"
          isRequired
        />
      </InputGroup>
      <FormHelperText fontSize={['sm', null, null, 'xl', '2xl']}>{hint}</FormHelperText>
    </FormControl>
  );
};

export default FormInput;
