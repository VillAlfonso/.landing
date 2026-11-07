export const profile = {
  name: "Quert Alfonso M. Villafuerte",
  born: 2004,
  tagline: "web apps, local AI & creative tools",
  status: "open to a 400-hour WMAD internship",
  email: "quertgamer@gmail.com",
  location: "San Pablo City, Laguna · open to onsite work outside Laguna",
  aboutTitle: "building, experimenting, learning",
  about:
    "i'm a fourth-year BSIT student at LSPU San Pablo, specializing in web and mobile application development. i build full-stack applications, local AI workflows, and tools that make creative work easier to repeat.",
  experiments:
    "i've also dabbled in creating LoRA adapters for local LLMs. it's hands-on experimentation with fine-tuning, alongside my work integrating local models into applications and media pipelines.",
  // rows render on the contact page only when href is filled in
  socials: [
    { label: "github", href: "https://github.com/VillAlfonso" },
    { label: "youtube", href: "" },
    {
      label: "credly",
      href: "https://www.credly.com/users/quert-alfonso-villafuerte.55a8c95e",
    },
  ] as { label: string; href: string }[],
};
