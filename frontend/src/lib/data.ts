import z from "zod";

export const MusicSchema = z.object({
  title: z.string(),
  id: z.string(),
  duration: z.number(),
  originalArtists: z.array(z.string()),
  driveID: z.string(),
  featured: z.boolean(),
  dateAdded: z.string(),
  isOriginal: z.boolean(),
});
