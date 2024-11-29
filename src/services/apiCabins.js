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
  let query = supabase.from("cabins");
  //insert
  //A create
  if (!editId) {
    query = query
      .insert([{ ...newCabin, image: ImgPath }])
      .select()
      .single();
  }
  // await supabase
  //     .from("cabins")
  //b edit
  if (editId) {
    query = await supabase
      .from("cabins")
      .update({ ...newCabin, image: ImgPath })
      .eq("id", editId);
  }

  const { data, error } = await query;
  // upload img to bucket
  // let store = supabase.storage;
  // if (typeof newCabin.image !== "string")
  //   store = await store
  //     .from("Cabins-img")
  //     .upload(newImg, newCabin.image || newCabin.image[0]);
  // const { error: errorImg } = store;
  // console.log(typeof newCabin.image !== "string");
  //error handling
  // if (errorImg) {
  //   await supabase.from("cabins").delete().eq("id", data?.id);
  //   throw new Error("img is not uploaded");
  // }
  // console.log(data.image);
  let store = await supabase.storage;
  if (typeof newCabin.image !== "string")
    store = store
      .from("Cabins-img")
      .upload(newImg, newCabin.image[0] || newCabin.image);
  const { error: storeError } = await store;
  console.log(newCabin.image);
  if (storeError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    throw new Error("img is not uploaded");
  }
  if (error) {
    throw new Error("can't Insert");
  }
  return data;
}
export async function deleteCabin(id) {
  console.log(id);
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("can't delete");
  }
  return data;
}
export default apiCabins;
