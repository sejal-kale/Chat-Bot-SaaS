import express from "express";
const app = express();
// midddleware
app.use(express.json());
app.get('/', (req, res) => {
    console.log("i got youu");
    res.send("Hii i am get");
});
export default app;
//# sourceMappingURL=app.js.map