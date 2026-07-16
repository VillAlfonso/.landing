/**
 * Education rows and Credly badges for the credentials page.
 * For badges: paste the badge image url (right-click the badge on credly →
 * copy image address, usually images.credly.com/...) into `image`, and the
 * public badge url into `href`. Cards without an image show a doodle shield.
 */
export type Education = {
  years: string;
  school: string;
  program: string;
  note?: string;
};

export type Badge = {
  name: string;
  issuer: string;
  href?: string;
  image?: string;
};

export const education: Education[] = [
  {
    years: "20XX — 20XX",
    school: "your school here",
    program: "your program — edit src/data/credentials.ts",
    note: "swap this row for your real education background.",
  },
];

export const badges: Badge[] = [
  { name: "your credly badge", issuer: "issuer", href: "", image: "" },
  { name: "another badge", issuer: "issuer", href: "", image: "" },
];
