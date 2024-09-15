const express = require("express");
const cors = require("cors");
const storage = require("node-persist");

// middleware start from
const app = express();
app.use(cors());
app.use(express.json());

//initializing node-persist storage
storage.init();

//Adding Post here by using POST method
// Method - POST
// access - http://localhost:5500/AddTask
app.post("/AddTask", async (req, res) => {
    const tasks = req.body;
    if (tasks) {
        await storage.setItem("tasks", tasks);
        res.json({ success: "Tasks added Successfully" });
    } else {
        res.status(401).json({ error: "Tasks Not Added" });
    }
});

// By using GET Method We get data
// access - http://localhost:5500/GetTask
app.get("/GetTask", async (req, res) => {
    const tasks = await storage.getItem("tasks");
    res.json({ tasks });
});

// Now we remove data from here by DELETE Method
app.delete("/DeleteTask/:id", async (req, res) => {
    const index = req.params.id;
    const tasks = await storage.getItem("tasks");
    if (tasks && tasks.length > index) {
        tasks.splice(index, 1);
        await storage.setItem("tasks", tasks);
        res.send("Task Deleted");
    } else {
        res.status(404).send("Task not found");
    }
});

app.listen(5500, () => {
    console.log(`Server started at 5500`);
});
