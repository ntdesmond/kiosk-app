import { useToast, Icon, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MdUpdate } from 'react-icons/md';

const Version = () => {
  const toast = useToast();

  const [appVersion, setAppVersion] = useState<string>();
  const [newVersion, setNewVersion] = useState<string>();

  useEffect(() => {
    window.electronAPI.appVersion.then((result) => {
      if (!result.ok) {
        return;
      }
      setAppVersion(result.data);
    });

    window.electronAPI.onUpdateAvailable((_, version) => setNewVersion(version));
  }, []);

  useEffect(() => {
    if (!newVersion) {
      return () => {};
    }

    const id = toast({
      description: `An update is available: ${newVersion}`,
      colorScheme: 'teal',
      duration: null,
      position: 'bottom',
      icon: <Icon as={MdUpdate} boxSize="6" />,
      variant: 'subtle',
    });
    return () => toast.close(id);
  }, [toast, newVersion]);

  return <Text>v{appVersion}</Text>;
};

export default Version;
