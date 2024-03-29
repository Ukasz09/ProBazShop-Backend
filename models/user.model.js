module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      facebookId: String,
      name: String,
      surname: String,
      email: String,
      password: String,
      type: String,
      history: Array,
    },

    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
