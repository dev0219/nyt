let Moderator=require('../models/Users');
const bcrypt = require('bcryptjs');
const passport = require('passport');



exports.create = function(req, res, next) {
    if(req.isAuthenticated()){
        return  res.redirect('/moderator/index');
    }
    res.render('moderator/register', { title: 'Moderator'});
};
exports.login = function(req, res, next) {
    if(req.isAuthenticated()){
        return res.redirect('/moderator/index');
    }
    res.render('moderator/login', { title: 'Moderator'});
};


///login process
exports.login_post = function(req, res, next){
    passport.authenticate('moderator-local', {
        successRedirect:'/moderator/global',
        failureRedirect:'/moderator',
        failureFlash: true
    })(req, res, next);
};

//logout
exports.logout = function(req, res){
    req.logout();
    return res.redirect('/moderator');
};

exports.store = async function(req, res, next) {
    
    let newModerator = new Moderator({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,        
    });

    await bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newModerator.password, salt, function(err, hash){
            if(err)    console.log(err);
            newModerator.password = hash;
            newModerator.save(function(err){
                if(err){
                    console.log(err);   res.send({ status: 1, message: "Fail" });
                } else {
                    req.flash('success','You are now registered and can log in');
                    res.send({ status: 0, message: "OK" });
                }
            });
        });
    });

};



///profiles
exports.profile = async function(req, res, next) { 
    let curmoderator=req.user;
    let moderator_data=await Moderator.findOne({_id:curmoderator.id});
    res.render('moderator/profile', { title: 'Moderator', moderator:moderator_data, curmoderator:curmoderator}); 
};

///update profiles
exports.profile_update = async function(req, res, next) {
    let curmoderator=req.user;  
    let moderator={};
    moderator.phone_number=req.body.phone;
    moderator.introduce=req.body.introduce_text;
    moderator.location=req.body.location;
    moderator.nickname=req.body.nickname;
    let query={_id:curmoderator.id};
    await Moderator.update(query, moderator);

    //...
    req.session.passport.user = await Moderator.findOne({_id:curmoderator.id});

    return res.redirect('/moderator/profile');
    
};
  
///settings
exports.settings = async function(req, res, next) {
    let curmoderator=req.user;
    res.render('moderator/settings', { title: 'Moderator', moderator_id:curmoderator.id, moderator_password:curmoderator.password, 
    moderator_name:curmoderator.name, curmoderator:curmoderator});  
};

//index
exports.index = function(req, res, next) {
    let curmoderator=req.user;
    res.render('moderator/index', { title: 'moderator', moderator_name:curmoderator.name,curmoderator:curmoderator });   
};

exports.re_password = async function(req, res, next) {
    let curmoderator=req.user;  

    let new_password = req.body.new_password;
    let old_password = req.body.old_password;

    req.checkBody('old_password', 'Old Password is required').notEmpty();
    req.checkBody('new_password', 'Password is required').notEmpty();
    req.checkBody('new_password_confirm', 'Passwords do not match').equals(new_password);
    let errors = req.validationErrors();
    if (errors){
        res.render('moderator/settings',{ errors:errors, curmoderator:curmoderator});
        return;
    } 
    let moderator=curmoderator;

    let issame = await bcrypt.compare(old_password, moderator.password);
    if(issame){
        console.log("Old Password is same");
    }else{
        console.log("Old Password is not correct!");        
        res.render('moderator/settings', {errors: [{'msg':'Old Password is not correct!'}], curmoderator:curmoderator});
        return;
    }

    bcrypt.genSalt(10, async function (err, salt) {
        bcrypt.hash(new_password, salt, async function (err, hash) {
            if(err) {
                console.log(err); return;
            }          
            moderator.password = hash;          
            let query={_id:curmoderator.id};                        
            await Moderator.update(query,moderator);
            req.flash('success', 'Change your password successfully');
            return res.redirect('/moderator/logout');
        });
    });
  
   
};

