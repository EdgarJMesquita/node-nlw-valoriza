import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendedComplimentsController } from "./controllers/ListUserSendedComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";
import { ListUserSendedComplimentsService } from "./services/ListUserSendedComplimentsService";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listTagsController = new ListTagsController();
const listUserSendedComplimentsController =
  new ListUserSendedComplimentsController();
const listUserReceivedComplimentsController =
  new ListUserReceivedComplimentsController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);
router.get("/users", listUsersController.handle);
router.post("/login", authenticateUserController.handle);

router.use(ensureAuthenticate);

router.post("/tags", ensureAdmin, createTagController.handle);

router.get(
  "/received-compliments",
  listUserReceivedComplimentsController.handle
);
router.get("/sended-compliments", listUserSendedComplimentsController.handle);

router.post("/compliments", createComplimentController.handle);
router.get("/tags", listTagsController.handle);

export { router };
