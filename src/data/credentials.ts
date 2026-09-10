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
    years: "2023 — 2027",
    school: "Laguna State Polytechnic University",
    program: "higher education",
  },
  {
    years: "2017 — 2022",
    school: "Liceo De San Pablo",
    program: "secondary education",
    note: "consistent honors",
  },
];

export const badges: Badge[] = [
  {
    name: "Operating Systems Basics",
    issuer: "Cisco",
    href: "https://www.credly.com/badges/30d9b948-3cdd-4040-a055-b6ff53f15925/public_url",
    image: "https://images.credly.com/images/dcdf1a3c-2594-4f4c-a33a-050b4bca58b5/image.png",
  },
  {
    name: "IT Specialist - Cloud Computing",
    issuer: "Certiport, a Pearson VUE business",
    href: "https://www.credly.com/badges/ae3dc87c-0657-4b18-a6a6-115edda95dac/public_url",
    image: "https://images.credly.com/images/86bff777-939c-42c5-9a09-44b9bf635eba/_ITS-Badges-Cloud-Comput.png",
  },
  {
    name: "Introduction to Data Science",
    issuer: "Cisco",
    href: "https://www.credly.com/badges/cac72864-d3db-4f7a-8e0c-de48a11943f4/public_url",
    image: "https://images.credly.com/images/b38a42e0-dc58-4ce2-b6c0-28d978e8aaad/image.png",
  },
  {
    name: "Python Essentials 1",
    issuer: "Cisco",
    href: "https://www.credly.com/badges/ddf3415f-0415-41fd-bf5d-6be5b5e50252/public_url",
    image: "https://images.credly.com/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png",
  },
  {
    name: "Web Development Fundamentals",
    issuer: "IBM-SkillsBuild",
    href: "https://www.credly.com/badges/02c5572c-6506-4110-bd16-08263f87970f/public_url",
    image: "https://images.credly.com/images/0c1c6eed-818c-4f78-bfaa-7ea8704c863a/image.png",
  },
  {
    name: "User Experience Design Fundamentals",
    issuer: "IBM SkillsBuild",
    href: "https://www.credly.com/badges/ab3891fd-48f4-4153-80f6-fa5dc74b73e4/public_url",
    image: "https://images.credly.com/images/255f1178-a3ba-4738-a494-02b046fbec10/image.png",
  },
  {
    name: "Digital Literacy",
    issuer: "IBM-SkillsBuild",
    href: "https://www.credly.com/badges/d820d217-ef82-4452-8716-c9015e5c5013/public_url",
    image: "https://images.credly.com/images/4a2ec756-53d8-465e-9706-26d00f4c587f/BadgeEmblem_DigitalLiteracy.png",
  },
  {
    name: "Enterprise Design Thinking Practitioner",
    issuer: "IBM-SkillsBuild",
    href: "https://www.credly.com/badges/d5045dad-01cb-4a41-9532-53feef36a36d/public_url",
    image: "https://images.credly.com/images/520b12b6-dac0-4731-a4f6-e41427201422/BadgeEmblem_EnterpriseDesignThinkingPractitioner.png",
  },
  {
    name: "Network Addressing and Basic Troubleshooting",
    issuer: "Cisco",
    href: "https://www.credly.com/badges/1023ee9e-b19c-49cf-8274-7b3edbe2f444/public_url",
    image: "https://images.credly.com/images/49c099bd-8542-4f48-8c03-f21799dcaf51/image.png",
  },
  {
    name: "Cybersecurity Fundamentals",
    issuer: "IBM-SkillsBuild",
    href: "https://www.credly.com/badges/031bef6d-2d92-47c9-9506-ff8db79eae3a/public_url",
    image: "https://images.credly.com/images/50b96632-6cbb-40b7-ac0e-b83f49ff7f94/image.png",
  },
  {
    name: "Artificial Intelligence Fundamentals",
    issuer: "IBM-SkillsBuild",
    href: "https://www.credly.com/badges/62046138-497a-4f82-a9b7-3088e291876d/public_url",
    image: "https://images.credly.com/images/82b908e1-fdcd-4785-9d32-97f11ccbcf08/image.png",
  },
  {
    name: "Explore Emerging Tech",
    issuer: "IBM-SkillsBuild",
    href: "https://www.credly.com/badges/feb237aa-e81c-4b2c-a9c5-dbb51bb04b3f/public_url",
    image: "https://images.credly.com/images/c6f4a830-11d9-46ba-a061-8ac2e5a099e9/Explore_Emerging_Tech.png",
  },
  {
    name: "Cloud Computing Fundamentals",
    issuer: "IBM-SkillsBuild",
    href: "https://www.credly.com/badges/bd50c32f-0ddb-439a-a75d-f6d77b37664a/public_url",
    image: "https://images.credly.com/images/5624b38a-5471-4d5c-a2bd-f4575babaa61/image.png",
  },
  {
    name: "Fundamentals of Sustainability and Technology",
    issuer: "IBM",
    href: "https://www.credly.com/badges/72507006-117b-4fa3-8429-474c8272043e/public_url",
    image: "https://images.credly.com/images/cef0e894-8024-4a89-8337-c7ee295aef19/image.png",
  },
];
