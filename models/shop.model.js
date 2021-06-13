module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      id: Number,
      latitude: Number,
      longitude: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const shop = mongoose.model("shop", schema);
  return shop;
};
