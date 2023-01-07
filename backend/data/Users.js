import bcrypt from "bcryptjs";

const Users = [
    {
        name: "Dhana Admin",
        password: bcrypt.hashSync("123456", 10),
        email: "dhananjeyan28@gmail.com",
        phone: "6379078290",
        ageCategory: "middle aged",
        isAdmin: true,
        isVerified: true,
    },
    {
        name: "Dhana College",
        password: bcrypt.hashSync("123456", 10),
        email: "dhananjeyan.rm.2019.cse@rajalakshmi.edu.in",
        phone: "9841044809",
        ageCategory: "old aged",
        isVerified: true,
    },
    {
        name: "Dhana Personal",
        password: bcrypt.hashSync("123456", 10),
        email: "dhananjeyanramkumar@gmail.com",
        phone: "9841047455",
        ageCategory: "teen",
        isVerified: false,
    },
];

export default Users;
