// const express=require('express');
// const {verifyUser} from '
const express =require('express');
const {verifyUser} =require('../Middleware/verifyUser');
const {accessChats ,fetchChats ,createGroupChats ,renameGroup}=require('../Controllers/chatController');
const router=express.Router();

router.post("/",verifyUser,accessChats);
router.get("/",verifyUser,fetchChats);
router.post("/createGroup",verifyUser,createGroupChats);
router.put("/rename",verifyUser,renameGroup);
// router.put("/groupremove",verifyUser,removeFromGroup); 
// router.put("/groupadd",verifyUser,addToGroup); 

module.exports=router;