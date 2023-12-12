import * as dao from "./dao.js";
function UserRoutes(app) {
  const createUser = async (req, res) => {
    try {
      const emailUser = await dao.findUserByEmail(req.body.email);
      if (emailUser) {
        res.status(400).json({ message: "Email already taken" });
        return;
      }
      const usernameUser = await dao.findUserByUsername(req.body.username);
      if (usernameUser) {
        res.status(400).json({ message: "Username already taken" });
        return;
      }
      const newUser = await dao.createUser(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(400).json({ message: "All fields required" });
      return;
    }
  };

  const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    const status = await dao.deleteUser(userId);
    const currentUser = await dao.findUserById(req.session["currentUser"]._id);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
    }
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: "User not found" });
      return;
    }
  };

  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const status = await dao.updateUser(userId, req.body);
      const updatedUser = await dao.findUserById(userId);
      const currentUser = req.session["currentUser"];
      // check if the updated user is the current user
      if (currentUser._id.toString() === updatedUser._id.toString()) {
        req.session["currentUser"] = updatedUser;
      }
      // req.session["currentUser"] = currentUser;
      res.json(status);
    } catch (err) {
      res.status(400).json({ message: "Username and email must be unique" });
      return;
    }
  };

  const signup = async (req, res) => {
    try {
      const emailUser = await dao.findUserByEmail(req.body.email);
      if (emailUser) {
        res.status(400).json({ message: "Email already taken" });
        return;
      }
      const usernameUser = await dao.findUserByUsername(req.body.username);
      if (usernameUser) {
        res.status(400).json({ message: "Username already taken" });
        return;
      }
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (err) {
      res.status(400).json({ message: "All fields required" });
      return;
    }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (!currentUser) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session["currentUser"] = null;
    req.session.destroy();
    res.json(200);
  };

  const account = async (req, res) => {
    res.json(req.session["currentUser"]);
  };

  const addToFavoriteUsers = async (req, res) => {
    try {
      const userId = req.params.userId;
      const favoriteUserId = req.params.favoriteUserId;
      const favoriteUser = await dao.findUserById(favoriteUserId);
      const favoriteUsername = favoriteUser.username;
      const currentUser = await dao.addToFavoriteUsers(userId, favoriteUserId, favoriteUsername);
      req.session["currentUser"] = currentUser;
      res.json(currentUser.favoriteUsers);
    } catch (err) {
      // console.error(err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };

  const removeFromFavoriteUsers = async (req, res) => {
    try {
      const userId = req.params.userId;
      const favoriteUserId = req.params.favoriteUserId;
      const favoriteUser = await dao.findUserById(favoriteUserId);
      const favoriteUsername = favoriteUser.username;
      const currentUser = await dao.removeFromFavoriteUsers(userId, favoriteUserId, favoriteUsername);
      req.session["currentUser"] = currentUser;
      res.json(currentUser.favoriteUsers);
    } catch (err) {
      // console.error(err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/:userId/add-to-favorites/:favoriteUserId", addToFavoriteUsers);
  app.post("/api/users/:userId/remove-from-favorites/:favoriteUserId", removeFromFavoriteUsers);
}
export default UserRoutes;
