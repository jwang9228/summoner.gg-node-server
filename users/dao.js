import model from "./model.js";

export const createUser = (user) => model.create(user);

export const findAllUsers = () => model.find();

export const findUserById = (userId) => model.findById(userId);

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

export const findUserByEmail = (email) => model.findOne({ email: email });

export const findUserByCredentials = (usr, pass) =>
  model.findOne({ username: usr, password: pass });

export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = async (userId) => {
  const user = await model.findById(userId);
  if (!user) {
    console.log('User not found');
    throw new Error('User not found');
  }
  const userIdToRemove = user._id;
  const usernameToRemove = user.username;
  await model.updateMany(
    { 'favoriteUsers.userId': userIdToRemove },
    { $pull: { favoriteUsers: { userId: userIdToRemove, username: usernameToRemove } } }
  );
  return model.deleteOne({ _id: userId });
};

export const addToFavoriteUsers = async (userId, favoriteUserId, favoriteUsername) => {
  const user = await model.findByIdAndUpdate(
    userId,
    { $addToSet: { favoriteUsers: {userId: favoriteUserId, username: favoriteUsername} } },
    { new: true }
  );
  return user.save();
};

export const removeFromFavoriteUsers = async (userId, favoriteUserId, favoriteUsername) => {
  const user = await model.findByIdAndUpdate(
    userId,
    { $pull: { favoriteUsers: {userId: favoriteUserId, username: favoriteUsername} } },
    { new: true }
  );
  return user.save();
};
