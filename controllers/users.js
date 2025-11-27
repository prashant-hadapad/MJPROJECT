
const User = require("../models/user");
module.exports.renderSignupform = (req, res) => {
    res.render("user/signup.ejs");
}


module.exports.signup = async (req, res,next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "welcome to wanderlust");
            return res.redirect("/listings");
        })

    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
};


module.exports.renderLoginform = (req, res) => {
    res.render("user/login.ejs");
}


module.exports.Login = async (req, res) => {
    req.flash("success", "Welcome to Wonderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    return res.redirect(redirectUrl);
}


module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out");
        return res.redirect("/listings");
    });
}