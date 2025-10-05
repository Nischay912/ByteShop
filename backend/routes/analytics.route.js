// step347: lets now create the route to get the analytics graph for the admin here below.
import express from "express"
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js"
import { getAnalayticsData, getDailySalesData } from "../controllers/analytics.controller.js"

const router = express.Router()

// step348: we will have th ebelow route to see the analytics there ; and it can only be used and seen by admins so , we will add middlewares here below like done earlier too.
router.get("/", protectRoute, adminRoute, async(req,res) => {
    try{
        // step349: now lets get the analytics data from the function here below.

        // step350: see the next steps in analytics.controller.js file now there.

        // step363: so we will be getting the object that the function returned there , here below.

        // step364: so we got the data for the analytics screen to be shown in values there at the top there.
        const analyticsData = await getAnalayticsData();

        // step365: now lets fetch the data for the analytics graph there.\

        // step366: we can see the attached image of analytics graph in the file here ; there we see that : on x-axis we have the 7 days of the week there ; on left side y-axis , we have : the total number of sales done there ; like in image its at 1 ; means only 1 sale occured in the week on that specific day of x-axis ; and on right side ka y-axis , we have the values for the total revenue generated for that sale there.

        // step367: now lets try to get that data here for the graph here below.

        // step368: the analytics graph will show data of last week , so start date should be 7 days before today , and end date should be today.
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7*24*60*60*1000);

        // step369: now lets call a function to get the daily sales data for the analytics graph here below.
        const dailySalesData = await getDailySalesData(startDate, endDate);

        // step370: and finally return in response both the data here below.

        // step371: see the next steps in analytics.controller.js file now there.
        res.status(200).json({analyticsData, dailySalesData})

    }
    catch(error){
        console.log("Error getting analytics : " , error.message);
        res.status(500).json({message:"Something went wrong in getting analytics : " + error.message})
    }
})

export default router