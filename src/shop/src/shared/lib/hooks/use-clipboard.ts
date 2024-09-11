import toast from 'react-hot-toast';

export const useClipboard = () => {
  const clipboard = navigator.clipboard;

  return {
    write: (text: string) =>
      clipboard
        .writeText(text)
        .then(() => toast.success('Успешно скопировано!')),
  };
};
