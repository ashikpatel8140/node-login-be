import { Router } from "express";
import { createTodo, deleteTodo, editTodo, getTodo } from "./controller";

const todoRouter = Router();

todoRouter.get("/:_id?", getTodo);
todoRouter.post("/", createTodo);
todoRouter.put("/:_id", editTodo);
todoRouter.delete("/:_id", deleteTodo);

export default todoRouter;
