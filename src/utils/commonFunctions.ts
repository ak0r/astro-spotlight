export function slugify(inputText?: string) {

  if (!inputText) return '';
  var slug = inputText.toLowerCase().trim();

  return slug
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: "UTC",
  })
}