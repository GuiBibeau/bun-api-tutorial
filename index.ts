import Elysia from "elysia";
import { cat } from "./controllers/cat.controller";

export const app = new Elysia().get("/", () => "hi").use(cat);

app.listen(3000);


