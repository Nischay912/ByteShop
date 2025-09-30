// step19: lets create a schema for users here below.
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    // step20: so we will have all the properties which all users will have here below.
    name: {
        type: String,
        required: [true, "Please add a name"] //can put an error message too using []
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        lowercase: true,
        trim: true // this trim true ensures that whitespace is removed from the start and end of the email
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters long"]
    },

    // step21: we will also be having a cart as a property here below, for the items added by each user in their cart.

    // step22: it will be array of objects , so lets put it as { } inside outer [ ] here below.
    cartItems:[
        {
            quantity:{
                type: Number,
                default: 1 //as once user adds something , default quantity will be 1
            },
            product:{

                // step23: so we have the type as the unique id every object of Product schema will be having , so we will be referencing to the Product schema and store that product's id in this cartItems array ; so that : we can get the details of that product using its id from the Product schema later here ; so : instead of duplicating the entire product data inside the cart, you just store the ObjectId of the product ; so we can get whole details of added product from the Product schema later using its id from there , thats why ref is used here to refer to the id in the Product schema.
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        }
    ],
    // step24: now the customer can be either admin or customer , so lets add a role property here below.
    role: {
        type: String,
        enum: ["customer", "admin"], //enum is used to give a list of possible values , so the value of role can only be "customer" or "admin"
        default: "customer"
    }
},

// step25: now we can add timestamps for each document of the collection , so that it stores the date and time when the document was created and when it was last updated as "created_at" and "updated_at" respectively.
{timestamps: true}

);

// step29: now we will have some functions on user too , like when user is created we should hash their passwords , so that we save the password as a non-readable string in the database so that : even if anyone gets the database , they won't be able to read the password ; so we will be using the package "bcryptjs" here below for that.

// step30: so we will run the below function before we save the user document ; thats why we are using "pre" here below.
userSchema.pre("save", async function(next){
    // step31: so this "pre" middleware runs like a middleware before saving a user document into the database.

    // step32: so we first check if the password is already hashed or not , else no need to hash it again ; so when a new user is created , it means password is new , isModified is used to check if the password is new or not ; so if not new just run the next function after this middleware i.e. next() , else hash it.
    if(!this.isModified("password")){
        return next();
    }

    // step33: now if its new password , then we hash it here below using "bcryptjs" package.
    try{
        // step34: bcrypt needs a salt to make the hash more secure ; 10 = salt rounds → the higher the number, the more secure (but also slower).
        const salt = await bcrypt.genSalt(10);

        // step35: this.password → refers to the password of the user document being saved ; bcrypt.hash() takes the plain password + salt and returns a hashed string ; We then overwrite the plain password with the hashed one → so MongoDB will only store the hash ; So if anyone opens the DB, they can’t see real passwords.
        this.password = await bcrypt.hash(this.password, salt);

        // step36: once hashing done , middleware ends and continue doing the next operations after it i.e. here once password is hashed, we can now save the user document into the database.
        next();
    }
    catch(error){

        // step37: If something goes wrong (like bcrypt failing), we pass the error to next(error).
        next(error);
    }
})

// step38: we also will be having a function to compare passwords and check if password is correct or not ; so we will be using the package "bcryptjs" here below for that.
userSchema.methods.comparePassword = async function(password){
    // step39: so we compare the password with the hash stored in the database ; return true if password is correct , else false ; so bcrypt extracts the salt that was used in storing the password of database and uses the same salt to hash the password entered by the user and finally if both hashes are same , then password is correct , else not.

    // step40: see the next steps now in step41.txt file now there.
    return await bcrypt.compare(password, this.password);
}

// step26: so we created a schema for users , But a schema by itself is not enough to directly interact with the database ; A Model is a constructor (class) created from a schema ; The model is what gives you the ability to interact with MongoDB like creating, reading, updating, and deleting documents ; so model is very much needed , Because without a model, you cannot perform database operations.

// step27: so now : When you write mongoose.model("User", userSchema) "User" → model name (Mongoose will create a MongoDB collection called users by default, lowercase + plural) ; userSchema → structure for documents in that collection ; Now User acts like a class. Every time you do new User(...), you create a new document following the schema rules.

// PUT THIS AT BOTTOM-MOST AS THE ABOVE FUNCTIONS ARE UPDATING THE USER-SCHEMA AND WE WILL BE CREATING THE MODEL BASED ON THAT UPDATED USER-SCHEMA ONLY HERE BELOW.
const User = mongoose.model("User", userSchema);

// step28: lets export the model so that we can use it in other files there.
export default User
