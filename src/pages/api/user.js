import User from "@/users/UserModel";
export default async function handler(req, res) {
    const { id, userType } = req.query;

    console.log("id", id)
    console.log("userType", userType)

    try {
        // Find by ID
        if (id) {
            const user = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        }

        // Find by User Type
        else if (userType) {
            const users = await User.findAll({
                where: { userType },
                attributes: { exclude: ['password'] }
            });
            return res.status(200).json(users);
        }

        // Find All Users
        else {
            const users = await User.findAll({
                attributes: { exclude: ['password'] }
            });
            return res.status(200).json(users);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
