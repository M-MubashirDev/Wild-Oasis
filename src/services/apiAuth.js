import supabase, { supabaseUrl } from "./supabase";
export async function apiUpdate({ password, name, imgFile }) {
  console.log(password, name, imgFile);
  let updateData;
  if (password) updateData = { password };
  if (name) updateData = { data: { name } };
  const { error, data } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!imgFile) return { data, error };

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatar-images")
    .upload(fileName, imgFile);
  if (storageError) throw new Error(storageError.message);
  const { data: updatedData, error: updatedError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatar-images/${fileName}`,
      },
    });
  if (updatedError) throw new Error(updatedError.message);

  return { updateData, updatedError };
}
export async function apiSignUp({ email, password, name }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}
// to import the user
export async function apiAuth({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}
// to check the current session as well fetch
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data } = await supabase.auth.getUser();
  return data?.user;
}
export async function getLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("error ha na");
}
