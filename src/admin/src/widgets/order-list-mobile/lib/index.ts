import toast from 'react-hot-toast';

export const useClipboard = () => {
  return {
    write: async (text: string) => {
      const clipboard = navigator.clipboard;

      await clipboard
        .writeText(text)
        .then(() => toast.success('Успешно скопировано!'));
    },
  };
};
