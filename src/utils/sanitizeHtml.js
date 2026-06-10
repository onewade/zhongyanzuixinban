import DOMPurify from 'dompurify';

const sanitizeOptions = {
  ADD_ATTR: ['target', 'rel', 'style', 'class'],
};

export const sanitizeHtml = (html) => {
  if (!html) return '';
  return DOMPurify.sanitize(String(html), sanitizeOptions);
};
