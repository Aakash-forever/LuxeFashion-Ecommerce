export default async function dummyData(category) {
  let data = null;
  const Url = `https://dummyjson.com/products/category/${category}`;
  try {
    let res = await fetch(Url);
    if (res.ok) {
      data = await res.json();
    } else {
      console.log("Request failed with status: ", res.status);
    }
  } catch (error) {
    console.log("an error occured!", error);
  }
  return data;
}
