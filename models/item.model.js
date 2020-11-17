module.exports = mongoose => {
    var schema = mongoose.Schema(
            {
                
                      name: string,
                      description: string,
                      imageURL: string,
                      size: string,
                      color: string,
                      price: number,
                      starRating: number,
                      category: string,
                      colorGroup: string,
                      availableQty: number
                      
                    
                  
                  
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