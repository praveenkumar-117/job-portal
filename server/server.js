// import './config/instrument.js'
// import * as Sentry from "@sentry/node";
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from'./config/db.js'
import { clerkWebHooks } from './controllers/webhooks.js'



const app = express()

//middleware
app.use(cors())
app.use(express.json())

// Route
app.get('/', (req, res) => res.send('API Working'))
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });
app.post('/webhooks',clerkWebHooks)



const PORT = process.env.PORT || 9000;




connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
  })
})

