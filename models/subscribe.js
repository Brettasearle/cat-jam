const mongoose = require('mongoose');

// define our schema
// reference: https://mongoosejs.com/docs/guide.html
/*
"Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection."
*/
const SubscribeSchema = new mongoose.Schema(
  {
    name:        String,
    email:       String,
    }
);

// Compile and export our model using the above Schema.
// See: https://mongoosejs.com/docs/models.html 

const Subscribe = mongoose.model("Subscribe", SubscribeSchema);
module.exports = Subscribe;



//using above for the moment 
// module.exports = mongoose.model('Subscriber', gallerySchema);


// Important: The first argument of mongoose.model() is the singular name of the collection your model is for. 
// ** Mongoose automatically looks for the plural, lowercased version of your model name. **"
// In our example, we name our model 'Definition' and mongoose will automatically look for the collection 'definitions' 