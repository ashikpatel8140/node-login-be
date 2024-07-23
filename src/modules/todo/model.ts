import { model, Schema, Types } from "mongoose";

const Model = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  user_id: {
    type: Types.ObjectId,
    require: true,
    ref: "user"
  }
},
{ versionKey: false });

const TodoModel =  model("todo", Model);

export default TodoModel;