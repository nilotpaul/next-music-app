import * as z from "zod";

export const songUpload = z.object({
  artistName: z.string().min(1, { message: "Atleast 4 characters required" }),
  title: z
    .string()
    .min(4, { message: "Atleast 4 characters required" })
    .max(30, { message: "Max length is 30 characters" }),
  image: z.unknown(),
  file: z.unknown(),
});

export type SongUploadZodType = z.infer<typeof songUpload>;

export type SongUploadBackend = Pick<
  SongUploadZodType,
  "artistName" | "title"
> & {
  image: FileList[0];
  file: FileList[0];
};

export type SongUploadClient = Pick<
  SongUploadZodType,
  "artistName" | "title"
> & {
  image: FileList;
  file: FileList;
};

export type TypedFormData = FormData & {
  set(name: "artistName"): string;
  set(name: "title"): string;
  set(name: "image"): FileList[0];
  set(name: "file"): FileList[0];
};

export type TypedFormDataBackend = FormData & {
  get(name: "artistName"): string;
  get(name: "title"): string;
  get(name: "image"): FileList[0];
  get(name: "file"): FileList[0];
};
