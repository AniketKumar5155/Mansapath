const { employeeLogin } = require("../services/authService");
const { loginSchema } = require("../validator/loginSchema");

const loginController = async (req, res) => {
    try {
        const validatedLoginData = loginSchema.parse(req.body)

        const { user, accessToken, refreshToken } = await employeeLogin(validatedLoginData.email, validatedLoginData.password)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user,
        });
    } catch (error) {
        console.error('Login error', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

module.exports = {
    loginController,
};