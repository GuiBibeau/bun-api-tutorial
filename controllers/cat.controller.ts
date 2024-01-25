import Elysia from "elysia";
import { getCats } from "../services/cat.service";

export const cat = new Elysia<"/cat">();

cat.get("/cats", () => {
  const allCats = getCats();
  return allCats;
});
