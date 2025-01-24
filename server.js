const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// GitHub OAuth 登录路由
app.get('/auth/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`);
});

// GitHub OAuth 回调路由
app.get('/auth/github/callback', async (req, res) => {
    const code = req.query.code;
    try {
        // 获取访问令牌
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code
        }, {
            headers: {
                Accept: 'application/json'
            }
        });

        const accessToken = tokenResponse.data.access_token;

        // 获取用户信息
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // 在这里处理用户登录逻辑
        // 可以创建 JWT token 或者 session

        // 重定向到前端，带上用户信息
        res.redirect(`/login-success?user=${encodeURIComponent(JSON.stringify(userResponse.data))}`);
    } catch (error) {
        console.error('GitHub OAuth Error:', error);
        res.redirect('/login-error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 