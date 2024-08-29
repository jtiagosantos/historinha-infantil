const WORDS_PER_MINUTE = 200;

export const calculateReadingTime = (text: string[]) => {
  const words = text.join(' ').split(' ');
  const totalWords = words.length;
  const time = Math.ceil(totalWords / WORDS_PER_MINUTE);

  return time;
};
