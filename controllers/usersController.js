const { connect } = require("../app");
const sql = require("mssql");
const { TYPES } = require("mssql");
const Responses = require("../web-models").Responses;
const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_DATABASE,
	multipleStatements: true,
};
//                                          --Bcrypt
const bcrypt = require("bcrypt");
//                                          --Sendgrid
const sgMail = require("@sendgrid/mail");
const sendGridKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendGridKey);

class UsersController {
	insert(req, res) {
		let newUser = req.body;
		console.log();
		if (newUser.Password === newUser.PasswordConfirm) {
			bcrypt.hash(newUser.Password, 3, function (err, hash) {
				newUser.Password = hash;
				newUser.PasswordConfirm = hash;
				console.log(newUser);

				const procName = "Users_Insert";

				sql
					.connect(config)
					.then((pool) => {
						return pool
							.request()
							.input("FirstName", TYPES.NVarChar, newUser.FirstName)
							.input("LastName", TYPES.NVarChar, newUser.LastName)
							.input("Email", TYPES.NVarChar, newUser.Email)
							.input("Password", TYPES.NVarChar, newUser.Password)
							.input("PasswordConfirm", TYPES.NVarChar, newUser.PasswordConfirm)
							.input("AvatarUrl", TYPES.Bit, newUser.AvatarUrl)
							.input("TenantId", TYPES.Float, newUser.TenantId)
							.output("Id", sql.Int)
							.execute(procName);
					})
					.then((result) => {
						let newUserId = result.output.Id;
						const itemResponse = new Responses.ItemResponse(newUserId);
						res.status(201).json(itemResponse);
					})
					.then(() => {
						const msg = {
							to: newUser.Email,
							from: "sendgridemail@gmail.com",
							subject: "Thankyou for Subscribing",
							text: "Thankyou for Subscribing",
							html: "<strong> Sending message through SENDGRID </strong>",
						};

						sgMail.send(msg).then(
							() => {},
							(error) => {
								console.log(error);

								if (error.response) {
									console.log(error.response.body);
								}
							}
						);
					})
					.catch((err) => {
						res.status(500).json(new Responses.ErrorResponse(err));
					});
			});
		}
	}

	update(req, res) {
		let updatedUserData = req.body;
		console.log();
		if (updatedUserData.Password === updatedUserData.PasswordConfirm) {
			bcrypt.hash(updatedUserData.Password, 3, function (err, hash) {
				updatedUserData.Password = hash;
				updatedUserData.PasswordConfirm = hash;
				console.log(updatedUserData);

				const procName = "Users_Update";

				sql
					.connect(config)
					.then((pool) => {
						return pool
							.request()
							.input("Id", TYPES.Int, updatedUserData.Id)
							.input("FirstName", TYPES.NVarChar, updatedUserData.FirstName)
							.input("LastName", TYPES.NVarChar, updatedUserData.LastName)
							.input("Email", TYPES.NVarChar, updatedUserData.Email)
							.input("Password", TYPES.NVarChar, updatedUserData.Password)
							.input("PasswordConfirm", TYPES.NVarChar, updatedUserData.PasswordConfirm)
							.input("AvatarUrl", TYPES.Bit, updatedUserData.AvatarUrl)
							.input("TenantId", TYPES.Float, updatedUserData.TenantId)
							.execute(procName);
					})
					.then(() => {
						const ItemResponse = new Responses.SuccessResponse();
						res.status(200).json(ItemResponse);
					})
					.then(() => {
						const msg = {
							to: updatedUserData.Email,
							from: "sendgridemail@gmail.com",
							subject: "Account Update",
							text: "Your user account information has been updated",
							html: "<strong> Sending message through SENDGRID </strong>",
						};

						sgMail.send(msg).then(
							() => {},
							(error) => {
								console.log(error);

								if (error.response) {
									console.log(error.response.body);
								}
							}
						);
					})
					.catch((err) => {
						res.status(500).json(new Responses.ErrorResponse(err));
					});
			});
		}
	}

	selectById(req, res) {
		var theId = req.params.id;
		const procName = "Users_SelectById";
		let address = null;

		sql
			.connect(config)
			.then((pool) => {
				return pool.request().input("Id", sql.Int, theId).execute(procName);
			})
			.then((result) => {
				address = result.recordset;
				let baseResponse = null;
				let code = 200;
				if (address) {
					baseResponse = new Responses.ItemResponse(address);
				} else {
					code = 404;
					baseResponse = new Responses.ErrorResponse("Records not found");
				}
				res.status(code).json(baseResponse);
			})
			.catch((err) => {
				res.status(500).json(new Responses.ErrorResponse(err));
			});
	}

	delete(req, res) {
		var theId = req.params.id;
		const procName = "Users_DeleteById";

		sql
			.connect(config)
			.then((pool) => {
				return pool.request().input("Id", sql.Int, theId).execute(procName);
			})
			.then(() => {
				const itemResponse = new Responses.SuccessResponse(true);
				res.status(200).json(itemResponse);
			})
			.catch((err) => {
				res.status(500).json(new Responses.ErrorResponse(err));
			});
	}
}

const usersController = new UsersController();

module.exports = usersController;
