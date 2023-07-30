import { useToast, Icon, Text, ToastId, Progress } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { MdUpdate } from 'react-icons/md';

const Version = () => {
  const toast = useToast({
    colorScheme: 'teal',
    duration: null,
    position: 'bottom',
    variant: 'subtle',
  });

  const [appVersion, setAppVersion] = useState<string>();
  const [newVersion, setNewVersion] = useState<string>();
  const [updateProgress, setUpdateProgress] = useState<number>();

  const toastId = useRef<ToastId>();

  useEffect(() => {
    window.electronAPI.appVersion.then((result) => {
      if (!result.ok) {
        return;
      }
      setAppVersion(result.data);
    });

    window.electronAPI.onUpdateAvailable((_, version) => setNewVersion(version));
    window.electronAPI.onUpdateDownloading((_, percent) => setUpdateProgress(percent));
  }, []);

  useEffect(() => {
    if (!newVersion || toastId.current) {
      return;
    }

    toastId.current = toast({
      description: `An update is available: ${newVersion}`,
      icon: <Icon as={MdUpdate} boxSize="6" />,
    });
  }, [toast, newVersion]);

  useEffect(() => {
    if (!updateProgress) {
      return;
    }
    const description = (
      <>
        <Text>Downloading an update: {updateProgress}%</Text>
        <Progress colorScheme="teal" size="sm" borderRadius="md" value={updateProgress} />
      </>
    );

    if (!toastId.current) {
      toastId.current = toast({
        description,
        status: 'loading',
      });
      return;
    }
    toast.update(toastId.current, {
      description,
      status: 'loading',
    });
  }, [toast, updateProgress]);

  return <Text>v{appVersion}</Text>;
};

export default Version;
