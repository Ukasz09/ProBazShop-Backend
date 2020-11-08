module.exports = mongoose => {
    var schema = mongoose.Schema(
            {
                title: String,
                description: String,
                category: String,
                price: Number,
                color: String,
                size: String,
                img: String
            },
             { timestamps: true }


            )
    
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
    const Item = mongoose.model("item", schema);

    return Item;
}