import { Webhook } from "svix";
import User from "../models/User.js";


// Api controllerFunction to manage Clerk User With database
export const clerkWebHooks = async (req, res) => {
  try {
    // CREATE a svix instance with clrek webhook secret
    const wHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    // verify headers 
    await wHook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    })
    //geting data from reqbody
    const { data, type } = req.body

    //Switch case for diffrent events
    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ''
        }
        await User.create(userData)
        res.json({})
        break;
      }
      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,

        }
        await User.findByIdAndUpdate(data.id, userData)
        res.json({})
        break;
      }
      case 'user.deleted': {
        await User.findOneAndDelete(data.id)
        res.json({})
        break;
      }
      default: {
        break;
      }
    }

  } catch (error) {
    console.log(error.message);
    res.json({success:false, message:'Webhook error'})

  }
}