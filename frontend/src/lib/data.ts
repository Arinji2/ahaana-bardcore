import z from "zod";

export const MusicSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    duration: z.number(),
    artists: z.string(),
    driveID: z.string(),
    featured: z.boolean(),
    pinned: z.boolean(),
    releasedOn: z.string().transform((date) => new Date(date)),
    isOriginal: z.boolean().optional(),
  })
  .transform((data) => {
    const trimmedArtists = data.artists
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    return {
      ...data,
      artists: trimmedArtists,
      isOriginal: data.isOriginal ?? trimmedArtists.length === 0,
    };
  });

export type MusicSchemaType = z.infer<typeof MusicSchema>;
