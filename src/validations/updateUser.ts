import * as z from "zod";

export const updateUser = z.object({
  name: z.string().optional(),
  image: z.unknown().optional(),
});

export type UpdateUser = z.infer<typeof updateUser>;

export type UpdateUserBackend = Pick<UpdateUser, "name"> & {
  image: FileList[0];
};

export type UpdateUserClient = Pick<UpdateUser, "name"> & {
  image: FileList;
};

export type FormUpdateUser = FormData & {
  set(name: "name"): string;
  set(name: "image"): FileList[0] | null;
};

export type FormUpdateUserBackend = FormData & {
  get(name: "name"): string;
  get(name: "image"): FileList[0] | null;
};
