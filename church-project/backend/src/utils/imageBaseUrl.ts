export const formatImageUrl = (imagePath?: string | null): string | null => {
  if (!imagePath) return null;
  return `${process.env.BASE_URL}/${imagePath}`;
};
