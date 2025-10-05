import Order from "../models/order.model.js";
import User from "../models/user.model.js"
import Product from "../models/product.model.js"

// step351: now lets define the getAnalayticsData function here below.
export const getAnalayticsData = async () => {
    // step352: lets try to get the total users here below ; using the number of documents in the User schema.
    const totalUsers = await User.countDocuments();

    // step353: now same way get the total products now here below.
    const totalProducts = await Product.countDocuments();

    // step354: now lets try to get the salesData using aggregate pipeline here below.
    const salesData = await Order.aggregate([
        {
            // step355: group is used to aggregate documents and combine them into a single result
            $group: {

                // step356: _id: null means all documents are grouped together into a single group ; So you will get one object with total sales and total revenue here below.
                _id: null, 

                // step357: sum: 1 increments 1 for each document in the collection ; so you will get the total number of sales here below.
                totalSales: { $sum: 1 },

                // step358: sum: "$totalAmount" adds up the value of the totalAmount field for each order , that we had in the Order model ; so you will get the total revenue here below.
                totalRevenue: {$sum: "$totalAmount"}
            }
        }
    ])

    // step359: now we can get the totalSales and totalRevenue from the salesData array we created above ; and return them here below ; Since your $group used _id: null, the array will have one object if there are orders ; so : To access the totals, you look at the first element: salesData[0].

    // step360: if some error was there we can manually set to 0 each here below to prevent crashing of the function thus here below.
    const {totalSales, totalRevenue} = salesData[0] || {totalSales: 0, totalRevenue: 0};

    // step361: now lets return the data here below ; so lets return an object in order to : send back multiple values (users, products, totalSales, totalRevenue) from this function ; so that we can still access them separately later.

    // step362: see the next steps now in analytics.route.js file now there.
    return {
        users: totalUsers,
        products: totalProducts,
        totalSales: totalSales,
        totalRevenue: totalRevenue
    }
}

// step372: now lets create the getDailySalesData function here below.
export const getDailySalesData = async (startDate, endDate) => {
    try{
        // step373: we will try to aggregate the orders from the order model here below.
        const dailySalesData = await Order.aggregate([
            {
                // step374: we will use the match stage to filter the orders based on the date range ; so that we only get the documents that were created between the start date and end date.
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    },
                },
            },
            {
                // step375: we will use the group stage to group the orders by date and calculate the total sales and total revenue for each date.
                $group: {
                    // step376: Converts the createdAt date into a string formatted like "2025-10-03".
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },

                    // step377: Adds 1 for each order → counts how many orders on that day.
                    totalSales: { $sum: 1 },

                    // step378: Adds the totalAmount from each order → gives revenue for that day.
                    totalRevenue: { $sum: "$totalAmount" },
                },
            },
            {
                // step379: we will use the sort stage to sort the data by date in ascending order ; 1 means ascending order (oldest → newest).
                $sort: {
                    _id: 1,
                },
            },
            // step380: if we conosle log this dailySalesData here below , we will see that we have the data for the analytics graph here below , example: 
            /* [
                // for monday
                {
                    _id: "2025-10-03",
                    sales: 1,
                    revenue: 100
                },
                // for tuesday
                {
                    _id: "2025-10-04",
                    sales: 2,
                    revenue: 200
                },
                // for wednesday
                {
                    _id: "2025-10-18",
                    sales: 12,
                    revenue: 1450.75
                }. 
                // so on.... upto sunday
            ]
            */
        ]); 
        // step390: now lets get the dates from last week upto today here below.
        const dateArray = getDatesInRange(startDate, endDate);
        
        // step391: now lets return the aggregated result here below.
        return dateArray.map(date => {

            // step392: in dailySalesData we have id as the date of the week there , so if a day of week matches there ; it means there was a sale on that day , so we will return the data for that day here below.
            const foundData = dailySalesData.find(item => item._id === date)

            return{

                // step393: so we get all the data when sales happened in the foundData array above ; and then extract the date and other things from there and return it here below.
                date,

                // step394: if foundData is null , doing .sales on it could crash the program , so put ?. there which will not proceed to the next line if foundData is null ; and also put || 0 so that sales will be 0 if foundData is null.
                sales: foundData?.totalSales || 0, 

                // step395: now lets get the revenue here below.
                revenue: foundData?.totalRevenue || 0
            }
        })
    }

    // step396: so we throw any error if comes here below and it will be catched in the catch block in the analytics.route.js file ka catch block that is written after this function call there.

    // step397: see the next steps now in auth.route.js file now there.
    catch(error){
        throw error;
    }
}

// step381: now we will have to get the dates of the sales as well here below ; like the below given example we want to get the dates of the sales for the analytics graph for each day of the week ; so lets create a function to do so in the next steps here below.

// const dateArray = ["2025-10-03", "2025-10-04", "2025-10-05", "2025-10-06", "2025-10-07", "2025-10-08", "2025-10-09"];

// step382: so lets create define a function that will provide us the data for the dates of sales here below.

function getDatesInRange(startDate, endDate){
    // step383: so we will be writing a function to give us all the dates in the above mentioned format for a week inside an array thus here below.

    // step384: now lets create an empty array to store the dates here below.
    const dates = []

    // step385: now lets create a variable to store the current date here below.
    let currentDate = new Date(startDate)

    // step386: now lets use a loop to add the dates to the array here below.
    while(currentDate <= endDate){
        // step387: so this loop converts currentDate (a JavaScript Date object) into a string in ISO format like : "2025-10-03T12:34:56.789Z" and then Splits the string at "T" : example : "2025-10-03T12:34:56.789Z".split("T") will give -> ["2025-10-03", "12:34:56.789Z"] ; and so Taking [0] gives you only the date part : "2025-10-03" ; and then it adds the formatted date (like "2025-10-03") into the dates array.
        dates.push(currentDate.toISOString().split("T")[0])

        // step388: now : the below code moves the currentDate forward by 1 day ; so that in next iteration of the loop , the date will be 1 day ahead of the previous date.
        currentDate.setDate(currentDate.getDate() + 1)
    }
    // step389: in this way we generate an array of dates from startDate to endDate and return it here below.
    return dates;
}