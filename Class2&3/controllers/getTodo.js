const Todo = require("../models/Todo");

exports.getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({
            success: true,
            data: todos,
            message: "Entire Todo data fetched",
        })
    } catch (err) {
        console.error(err);
        res.statu(500).json({
            success: false,
            error: error.message,
            message: "Some error in server",
        })
    }
}

exports.getTodoById = async (req, res)=>{
    try {
        const id = req.params.id;

        const todo = await Todo.findById({ _id: id });
        if (!todo) {
            res.status(404).json({
                success: false,
                message: "data for given id not found",
            })
        }

        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo ${id} data fetched successfully`,
        })

    } catch (err) {
        console.error(err);
        res.statu(500).json({
            success: false,
            error: err.message,
            message: "Some error in server",
        })
    }
}