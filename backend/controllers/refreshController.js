export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing"
            });
        }

        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);

        const newAccessToken = jwt.sign({id: decoded.id,role: decoded.role},process.env.JWT_SECRET,{ expiresIn: "15m" });

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Access token refreshed"
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Refresh token expired or invalid"
        });
    }
};