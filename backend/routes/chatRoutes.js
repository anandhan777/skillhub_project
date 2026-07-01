const express=require("express");
const router=express.Router();
const  protect  = require("../middleware/verifytoken");
const {getMessage,deleteMessage}=require("../controllers/chatcontroller");



router.get("/:user1/:user2",protect,getMessage);
router.delete("/msgdelete/:msg_id",deleteMessage);
module.exports=router;