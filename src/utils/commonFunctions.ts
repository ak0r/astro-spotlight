import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function getFormattedDate( date: string | number | Date ) {
  const dateFormat: Intl.DateTimeFormatOptions = { 
    day: "2-digit", 
    month: "long", 
    year: "numeric" 
  };
	return new Date(date).toLocaleDateString(undefined, dateFormat);
}

export function getShortDate( date: string | number | Date ) {
  const dateFormat: Intl.DateTimeFormatOptions = { 
    day: "2-digit", 
    month: "short",
  };
	return new Date(date).toLocaleDateString(undefined, dateFormat);
}

export function getShortDate1( date: string | number | Date ) {
  const dateFormat: Intl.DateTimeFormatOptions = { 
    day: "2-digit", 
    month: "long",
  };
	return new Date(date).toLocaleDateString('en-US', dateFormat);
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} mins read`;
}