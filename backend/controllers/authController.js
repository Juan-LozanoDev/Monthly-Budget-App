const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, verifyEmail, requestAccount, updateConnection, requestInfo } = require("../models/User");

// Create token with JWT
const createToken = (id) => {
    let token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    return token;
};

// Register user
const registerUser = async (req, res) => {
    const { Fullname, Email, Password } = req.body || {};

    if (!Fullname || !Email || !Password) {
        return res.status(400).json({ ok: false, errors: "All fields are required" });
    }

    try {
        // Verify the email doesn't exist on database
        const exists = await verifyEmail(Email);

        if (exists) {
            return res.status(409).json({ message: "This email already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        // Create the user in the database

        let date = new Date().toISOString();

        let user = {
            full_name: Fullname,
            email: Email,
            hash: hashedPassword,
            last_connection: date,
        };

        createUser(user, (err, result) => {
            if (err) return res.status(400).json({ error: err });

            let token = createToken(result.user_id);
            const { user_id, full_name, email, profile_image, last_connection } = result;

            return res
                .cookie("token", token, {
                    httpOnly: true, // Cookie can only be accessed from the server
                    secure: process.env.NODE_ENV === "production", // Cookie can only be accessed from https
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Cookie can't be accessed from different domains
                    maxAge: 1000 * 60 * 60 * 2, // Cookie has 2 valid hours, same as token
                })
                .send({
                    user: {
                        id: user_id,
                        name: full_name,
                        email: email,
                        profile_url: profile_image,
                        last_connection: last_connection,
                    },
                    authenticated: true,
                });
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering the user", error: err });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { Email, Password } = req.body || {};

    if (!Email || !Password) {
        return res.status(400).json({ errors: "All fields are required" });
    }

    try {
        requestAccount(Email, (err, user) => {
            if (err) return res.status(400).json({ message: "Something happened on the database, please try later" });
            if (!user) return res.status(404).json({ message: "Not account is register with this email" });

            bcrypt.compare(Password, user.hash, (err, result) => {
                if (err)
                    return res
                        .status(404)
                        .json({ message: "There has been an error validating the password, try later" });

                if (!result) return res.status(401).json({ message: "The password is invalid, please, try again" });

                const { user_id, full_name, email, profile_image, last_connection } = user;
                let token = createToken(user_id);

                // Updating the last connection
                updateConnection(user_id);

                return res
                    .cookie("token", token, {
                        httpOnly: true, // Cookie can only be accessed from the server
                        secure: process.env.NODE_ENV === "production", // Cookie can only be accessed from https
                        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Cookie can't be accessed from different domains
                        maxAge: 1000 * 60 * 60 * 2, // Cookie has 2 valid hours, same as token
                    })
                    .json({
                        user: {
                            id: user_id,
                            name: full_name,
                            email: email,
                            profile_url: profile_image,
                            last_connection: last_connection,
                        },
                        authenticated: true,
                    });
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Error accessing to the account, try later" });
    }
};

// Get information of the user
const getUserInfo = async (req, res) => {
    try {
        requestInfo(req.user.id, (err, result) => {
            if (err) return res.status(400).json({ message: "Something happened on the database, please try later" });
            if (!result) return res.status(404).json({ message: "User not found" });

            return res.status(200).json(result);
        });
    } catch (err) {
        res.status(500).json({ message: "Error getting the user info, try later"});
    }
};

module.exports = { registerUser, loginUser, getUserInfo };
