import type { NavLinks, PageMeta, } from './types';

export const SiteMeta = {
  title: "John Doe",
  description: "This is site description",
  url: "htps://example.com",
  path: "/",
  logo: "/images/avatar.png"
};

export const HeaderLinks: NavLinks = [
  { title: "Articles", url: "/articles", },
  { title: "Galleries", url: "/galleries", },
  // { title: "Notes", url: "/notes", },
  { title: "About", url: "/about", },
];

export const FooterLinks: NavLinks = [
  { title: "Home", url: "/", },
  { title: "About", url: "/about", },
];

export const SocialMedia = [
  { name: "facebook", link: "https://www.facebook.com/", icon: "fa6-brands:facebook-f" },
  { name: "twitter", link: "https://www.facebook.com/", icon: "fa6-brands:x-twitter" },
  { name: "instagram", link: "https://www.instagram.com/", icon: "fa6-brands:instagram" },
  { name: "youtube", link: "https://www.youtube.com/", icon: "fa6-brands:youtube" },
  { name: "github", link: "https://www.github.com/", icon: "fa6-brands:github" },
] as const;

export const HomeMeta: PageMeta = {
  title: "John Doe",  description: "Hi, I'm John, a solution architect with a passion for creating and exploring. This site is a blend of my travel adventures, freelance project portfolio, and programming insights. I'm always open to new opportunities and connections, so don't hesitate to get in touch!",
};

export const BlogMeta: PageMeta = {
  title: "Adventures and Travel Stories Around the World",  description: "Dive into my travel experiences, tips, and stories from my journeys around the globe.",
};

export const ProjectsMeta: PageMeta = {
  title: "Freelance Projects and Design Portfolio",  description: "A showcase of my freelance work, highlighting the diverse projects I have worked on as a solution architect",
};

export const NotesMeta: PageMeta = {
  title: "Insights on Coding and Programming",  description: "My personal collection of programming notes, tips, and insights on software development and coding practices",
};

export const GalleryMeta: PageMeta = {
  title: "Captured Moments and Snapshots",  description: "A collection of my favorite photos, showcasing beautiful landscapes, and spontaneous moments from my adventures",
};