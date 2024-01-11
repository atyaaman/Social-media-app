var express = require('express');
var router = express.Router();
var User = require('../models/user');
const _ = require("lodash");
const homeStartingContent = "Code Buddy is website to prepare you for placement preparation for MNC's.In this site you also solve a placement sheets and grow your skill and prepare for FAANG like companies.In the code buddy you also read articles about data structure and algorithms and we can provide you code also in two language c++ and java.So grow your coding skill here and placed in any MNC's.";
const Discuss = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const placementSheets = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let postGlobal = [];

router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});


router.post('/', function (req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }, function (err, data) {
				if (!data) {
					var c;
					User.findOne({}, function (err, data) {

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						} else {
							c = 1;
						}

						var newPerson = new User({
							unique_id: c,
							email: personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function (err, Person) {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		if (data) {

			if (data.password == req.body.password) {
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({ "Success": "Success!" });

			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			// return res.render('data.ejs', {"name":data.username,"email":data.email});
			return res.render('home.ejs', { StartingContent: homeStartingContent });

		}
	});
})

router.get("/home", function (req, res) {
	res.render("home", {
		StartingContent: homeStartingContent


	});


});
router.get("/Arrays", function (req, res) {
	res.render("Arrays");
});
router.get("/linked_list", function (req, res) {
	res.render("linked_list");
});
router.get("/stack", function (req, res) {
	res.render("stack");
});
router.get("/Queue", function (req, res) {
	res.render("Queue");
});
router.get("/searching", function (req, res) {
	res.render("searching");
});
router.get("/Sorting", function (req, res) {
	res.render("Sorting");
});
router.get("/Selection_sort", function (req, res) {
	res.render("Selection_sort");
});
router.get("/Insertion_sort", function (req, res) {
	res.render("Insertion_sort");
});
router.get("/Merge_sort", function (req, res) {
	res.render("Merge_sort");
});
router.get("/Quick_sort", function (req, res) {
	res.render("Quick_sort");
});
router.get("/Recursion", function (req, res) {
	res.render("Recursion");
});
router.get("/DP", function (req, res) {
	res.render("DP");
});
router.get("/Overlapping", function (req, res) {
	res.render("Overlapping");
});
router.get("/Tabulation", function (req, res) {
	res.render("Tabulation");
});
router.get("/PLACEMENT_SHEET", function (req, res) {
	res.render("PLACEMENT_SHEETS", { PlacementSheets: placementSheets });

});
router.get("/Discuss", function (req, res) {
	res.render("Discuss", { discuss: Discuss, postArray: postGlobal });
});

router.get("/compose", function (req, res) {
	res.render("compose");
});

router.post("/compose", function (req, res) {
	const FullPost = {
		postTitle: req.body.postTitle,
		postContent: req.body.mainPost
	};
	postGlobal.push(FullPost);
	res.redirect("Discuss");
});

router.get("/post", function (req, res) {
	res.render("post");

});
router.get("/post/:postName/", function (req, res) {
	const requestedTitle = _.lowerCase(req.params.postName);

	postGlobal.forEach(function (post) {
		const storedTitle = _.lowerCase(post.postTitle);



		if (storedTitle == requestedTitle) {
			res.render("post", {
				title: post.postTitle,
				content: post.postContent
			});

			return;
		}


	});
});

router.get('/data', function (req, res, next) {
	console.log("data");
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('data.ejs', { "name": data.username, "email": data.email });
			// return res.render('home.ejs',{StartingContent : homeStartingContent});

		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});


router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		console.log(data);
		if (!data) {
			res.send({ "Success": "This Email Is not regestered!" });
		} else {
			// res.send({"Success":"Success!"});
			if (req.body.password == req.body.passwordConf) {
				data.password = req.body.password;
				data.passwordConf = req.body.passwordConf;

				data.save(function (err, Person) {
					if (err)
						console.log(err);
					else
						console.log('Success');
					res.send({ "Success": "Password changed!" });
				});
			} else {
				res.send({ "Success": "Password does not matched! Both Password should be same." });
			}
		}
	});

});

module.exports = router;