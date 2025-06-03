[
    {
        name: "Ravi Kumar",
        gender: "Male",
        age: 28,
        city: "Delhi",
        signupDate: ISODate("2023-01-15T10:30:00Z"),
        interests: ["Cricket", "Technology", "Travel"],
        isActive: true,
    },
    {
        name: "Priya Sharma",
        gender: "Female",
        age: 24,
        city: "Mumbai",
        signupDate: ISODate("2023-03-10T14:20:00Z"),
        interests: ["Movies", "Music", "Art"],
        isActive: true,
    },
    {
        name: "Amit Verma",
        gender: "Male",
        age: 35,
        city: "Bangalore",
        signupDate: ISODate("2022-11-05T09:45:00Z"),
        interests: ["Startups", "Fitness"],
        isActive: false,
    },
    {
        name: "Sneha Reddy",
        gender: "Female",
        age: 30,
        city: "Hyderabad",
        signupDate: ISODate("2023-05-22T11:00:00Z"),
        interests: ["Cooking", "Books", "Yoga"],
        isActive: true,
    },
    {
        name: "Rajesh Gupta",
        gender: "Male",
        age: 40,
        city: "Chennai",
        signupDate: ISODate("2021-09-01T08:00:00Z"),
        interests: ["Politics", "Gardening"],
        isActive: false,
    },
    {
        name: "Meena Joshi",
        gender: "Female",
        age: 27,
        city: "Ahmedabad",
        signupDate: ISODate("2023-07-18T13:15:00Z"),
        interests: ["Fashion", "Photography"],
        isActive: true,
    },
    {
        name: "Deepak Nair",
        gender: "Male",
        age: 32,
        city: "Kochi",
        signupDate: ISODate("2022-10-12T17:25:00Z"),
        interests: ["Food", "Movies"],
        isActive: true,
    },
    {
        name: "Neha Patil",
        gender: "Female",
        age: 29,
        city: "Pune",
        signupDate: ISODate("2022-12-30T15:00:00Z"),
        interests: ["Technology", "Blogging", "Travel"],
        isActive: true,
    },
    {
        name: "Manish Tiwari",
        gender: "Male",
        age: 22,
        city: "Lucknow",
        signupDate: ISODate("2023-04-05T16:10:00Z"),
        interests: ["Gaming", "YouTube"],
        isActive: false,
    },
    {
        name: "Anjali Deshmukh",
        gender: "Female",
        age: 26,
        city: "Nagpur",
        signupDate: ISODate("2023-08-01T12:45:00Z"),
        interests: ["Dance", "Fitness", "Travel"],
        isActive: true,
    },
];

// const users=User.findMany({gender:"female",city:"mohali"});
//10 female-> mohali-3(18,22,20), pune-4,delhi-2, patna-1

const users = User.aggregate([{ $match: { gender: "female" } }, {
    $group: {
        _id: "$city",
        name: "abc",
        totalAge: { $sum: "$age" },
        avgAge: { $avg: "$age" },
        totalCount:{$sum:1}
    }},

    {
     $sort: {
      totalCount: -1
    },
    },
    { $skip: 1 }, {
    $project: {
      totalAge: 0,
      name: 1,
      city: 1
    }}
    
])




[{ _id: "delhi", name: "abc", totalAge: 70, avgAge: 20,totalCount:4 },{ _id: "mohali", name: "abc", totalAge: 60, avgAge: 20 ,totalCount:3}, 
 { _id: "pune", name: "abc", totalAge: 50, avgAge: 20,totalCount:2 }
, { _id: "patna", name: "abc", totalAge: 20, avgAge: 20,totalCount:1 }]










User.findMany({ gender: "female" }); //

User.aggregate([
    { $match: { gender: "female" } },
    {
        $group: {
            _id: "$city",
            totalAge: { $sum: "$age" },
            totalCount: { $sum: 1 },
            avgAge: { $avg: "$age" },
        },
    },
]);

[
    { _id: "delhi", totalAge: 63, totalCount: 3, avgAge: 21 },
    { _id: "pune", totalAge: 52, totalCount: 2, avgAge: 26 },
    { _id: "patna", totalAge: 100, totalCount: 3, avgAge: 33.3 },
    { _id: "mohali", totalAge: 24, totalCount: 1, avgAge: 24 },
];