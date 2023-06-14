import { useEffect } from 'react';
import { Card, CardBody } from '@chakra-ui/react';
import { getErrorMessage } from '../../../store/apiSlice';
import useFileDownloader from '../../../store/fileDownloader';

interface FileRowProps {
  id: string;
  description: string;
  onFileLoading: () => void;
  onFileLoaded: (file: File) => void;
  onError: (error: string) => void;
}

const FileRow = ({ id, description, onFileLoading, onFileLoaded, onError }: FileRowProps) => {
  const [getFile, { isLoading, file, error }] = useFileDownloader();

  useEffect(() => {
    if (isLoading) {
      onFileLoading();
    }
  }, [isLoading, onFileLoading]);

  useEffect(() => {
    if (file) {
      onFileLoaded(file);
    }
  }, [file, onFileLoaded]);

  useEffect(() => {
    if (error) {
      onError(getErrorMessage(error));
    }
  }, [error, onError]);

  return (
    <Card
      key={id}
      variant="filled"
      bgColor="green.main"
      color="white"
      cursor="pointer"
      onClick={() => getFile(id, description)}
    >
      <CardBody>{description}</CardBody>
    </Card>
  );
};

export default FileRow;
