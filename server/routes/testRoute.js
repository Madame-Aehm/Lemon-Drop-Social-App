import express from "express";

const router = express.Router()

router.get("/app/testing", (req, res) => {
  res.send({cars: ["car one", "car two"]})
})

export default router