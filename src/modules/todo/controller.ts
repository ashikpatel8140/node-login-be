import { Request, Response } from "express";
import send from "../../utils/responseMessage";
import TodoModel from "./model";
import { checkKeys } from "../../utils/common";

export async function getTodo(req: Request, res: Response) {
  try {    
    if (req.params._id) {
      let todo = await TodoModel.findById(req.params._id)
  .populate({ path: "user_id", select: { password: 0 } });
      if (!todo) {
        return send(res, 404);
      }
      return send(res, 200, "", todo);
    } else {
      let meta: any;
      let skip = 0;
      let page: number = Number(req.query.page) || 1;
      let limit = Number(req.query.limit) || 10;
      skip = (page - 1) * limit;

      let todos = await TodoModel.find({}).skip(skip).limit(limit).populate({ path: "user_id", select: { password: 0 } });
      if (page == 1) {
        meta = {
          currentPage: page,
          recordsPerPage: limit,
          totalRecords: await TodoModel.find({}).countDocuments(),
        };
        meta.totalPages = Math.ceil(meta.totalRecords / meta.recordsPerPage);
      }
      return send(res, 200, "Fetched Successfully", todos, meta);
    }
  } catch (error) {
    return send(res, 500);
  }
}

export async function createTodo(req: Request, res: Response) {
  try {
    const requiredFields = ["title", "description"];
    let valid = await checkKeys(req.body, requiredFields);
    if (!valid) return send(res, 400);
    const { title, description } = req.body;
    let todo = await TodoModel.create({
      title,
      description,
      user_id: (req as any).user._id,
    });
    if (!todo) {
      return send(res, 500);
    }

    return send(res, 201, "Created Successfully", todo);
  } catch (error) {
    return send(res, 500);
  }
}

export async function editTodo(req: Request, res: Response) {
  try {
    console.log("in");
    
    if (!req.params._id) send(res, 400);

    let todo = await TodoModel.findByIdAndUpdate(
      { _id: req.params._id },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!todo) {
      return send(res, 500);
    }

    return send(res, 200, "Edited Successfully", todo);
  } catch (error) {
    return send(res, 500);
  }
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    if (!req.params._id) send(res, 400);

    let todo = await TodoModel.findByIdAndDelete(
      { _id: req.params._id },
      {
        $set: req.body,
      }
    );
    if (!todo) {
      return send(res, 500);
    }

    return send(res, 200, "Deleted Successfully");
  } catch (error) {
    return send(res, 500);
  }
}
