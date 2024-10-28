import supabase, { supabaseUrl } from "./supabase";

async function apiCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("can update cabin");
  }
  return data;
}

export async function insertCabin(newCabin) {
  const { id: editId } = newCabin;
  const newImg =
    typeof newCabin.image === "string"
      ? newCabin.image
      : `${Math.random()}-${
          newCabin.image.name || newCabin.image[0].name
        }`.replaceAll("/", "");

  const ImgPath = newImg.startsWith(supabaseUrl)
    ? newImg
    : `${supabaseUrl}/storage/v1/object/public/Cabins-img/${newImg}`;
  let query = await supabase.from("cabins");
  //insert
  //A create
  if (!editId)
    query = query
      .insert([{ ...newCabin, image: ImgPath }])
      .select()
      .single();
  //b edit
  if (editId)
    query = await supabase
      .from("cabins")
      .update({ ...newCabin, image: ImgPath })
      .eq("id", editId);
  const { data, error } = await query;
  //...upload img to bucket
  const { error: errorImg } = await supabase.storage
    .from("Cabins-img")
    .upload(newImg, newCabin.image[0] || newCabin.image);
  //error handling
  if (errorImg) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("img is not uploaded");
  }
  if (error) {
    throw new Error("can't Insert");
  }
  return data;
}
export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("can't delete");
  }
  return data;
}
export default apiCabins;
