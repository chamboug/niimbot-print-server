import { z } from "zod";

const labelSchema = z.object({
  content: z.string(),
  font: z.string(),
  x: z.union([z.literal("center"), z.number()]),
  y: z.union([z.literal("center"), z.number()]),
});

const templateSchema = z.object({
  width: z.number(),
  height: z.number(),
  labels: z.array(labelSchema),
});

export const parseTemplate = (data: unknown) => {
  return templateSchema.parse(data);
};

export type Template = z.infer<typeof templateSchema>;
