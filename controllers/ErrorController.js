
const error = (req, res, next) => {
    console.error("*****************************************************************************************************************");
    console.error("Request-METHOD : " + req.method);
    console.error("Request-RUI : " + req.url);
    console.error("User-Platform : " + req.header("sec-ch-ua-platform"));
    console.error("User-Agent : " + req.header('User-Agent'));
    console.error("*****************************************************************************************************************");
    
    res.status(404).json({message : "Bad-Request-URL"});
}

module.exports = { error }