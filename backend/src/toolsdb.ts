import { CreateUserDto } from "./middleware/user";
import UserModel from "./models/user";


 const checkAdminUserExists = async () => {
	const userCount = await UserModel.countDocuments();
	return userCount > 0;
};

// Function to create a default admin user
 const createDefaultAdminUser = async () => {
	const adminUser: CreateUserDto = {
		name: "Admin",
		email: "admin@voting.com",
		num_vote: "123456",
		role: "admin",
	};

	const user = new UserModel(adminUser);
	await user.save();
};


export const initializeAdminUser = async () => {
   
     try {
       const adminUserExists = await checkAdminUserExists();
       if (!adminUserExists) {
         await createDefaultAdminUser();
         console.log("Default admin user created.");
       }
     } catch (error) {
       console.error("Error initializing admin user:", error);
     }
   };