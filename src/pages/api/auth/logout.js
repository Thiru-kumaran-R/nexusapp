export default function handler(req, res) {
    res.setHeader('Set-Cookie', [
        `accessToken=; Max-Age=0; path=/;`,
        // Add any other cookies that need to be cleared
    ]);
    res.status(200).json({ message: 'Logged out successfully' });
}