export type Video = {
  id: string;
  title: string;
  description: string;
};

// Static selection of lessons from the "Topnotch Online TV" YouTube channel.
// Replace or extend these IDs with your preferred videos from the channel.
export const videos: Video[] = [
  {
    id: "VIDEO_ID_1",
    title: "KCSE Mathematics Revision – Quadratic Equations (Topnotch Online TV)",
    description:
      "A clear breakdown of quadratic equations with exam-style examples and quick checks for common mistakes.",
  },
  {
    id: "VIDEO_ID_2",
    title: "KCSE Chemistry – Titration Basics (Topnotch Online TV)",
    description:
      "Understand the titration setup, calculations, and how to present working the KCSE way.",
  },
  {
    id: "VIDEO_ID_3",
    title: "KCSE Biology – Transport in Plants (Topnotch Online TV)",
    description:
      "Key processes, diagrams, and the exact language examiners reward in transport questions.",
  },
  {
    id: "VIDEO_ID_4",
    title: "KCSE English – Comprehension Strategies (Topnotch Online TV)",
    description:
      "A practical approach to comprehension: reading, annotation, and answering for marks—not guesses.",
  },
];


