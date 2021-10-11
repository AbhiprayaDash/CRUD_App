import { Crudcontrollers_User } from "../util/crudcontroller_user.mjs";
import User from "../models/User_model.mjs";

export const crudcontroller_user = Crudcontrollers_User(User)

