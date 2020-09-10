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

class FriendsController {
	//
	//
	insert(req, res) {
		var newFriendsData = req.body;
		const procName = "Friends_Insert";

		sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("Title", TYPES.NVarChar, newFriendsData.Title)
					.input("Bio", TYPES.NVarChar, newFriendsData.Bio)
					.input("Summary", TYPES.NVarChar, newFriendsData.Summary)
					.input("Headline", TYPES.NVarChar, newFriendsData.Headline)
					.input("Slug", TYPES.NVarChar, newFriendsData.Slug)
					.input("StatusId", TYPES.Int, newFriendsData.StatusId)
					.input("PrimaryImage", TYPES.NVarChar, newFriendsData.PrimaryImage)
					.output("Id", sql.Int)
					.execute(procName);
			})
			.then((result) => {
				let friendId = result.output.Id;
				const itemResponse = new Responses.ItemResponse(friendId);
				res.status(201).json(itemResponse);
			})
			.catch((err) => {
				res.status(500).json(new Responses.ErrorResponse(err));
			});
	}

	update(req, res) {
		var newFriendsData = req.body;
		console.log("newFriendsData", newFriendsData);
		const procName = "Friends_Update";

		sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("Id", TYPES.Int, newFriendsData.Id)
					.input("Title", TYPES.NVarChar, newFriendsData.Title)
					.input("Bio", TYPES.NVarChar, newFriendsData.Bio)
					.input("Summary", TYPES.NVarChar, newFriendsData.Summary)
					.input("Headline", TYPES.NVarChar, newFriendsData.Headline)
					.input("Slug", TYPES.NVarChar, newFriendsData.Slug)
					.input("StatusId", TYPES.Int, newFriendsData.StatusId)
					.input("PrimaryImage", TYPES.NVarChar, newFriendsData.PrimaryImage)
					.execute(procName);
			})
			.then(() => {
				const ItemResponse = new Responses.SuccessResponse();
				res.status(200).json(ItemResponse);
			})
			.catch((err) => {
				res.status(500).json(new Responses.ErrorResponse(err));
			});
	}

	selectById(req, res) {
		var theId = req.params.id;
		const procName = "Friends_SelectById";
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
		const procName = "Friends_DeleteById";

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

	paginatedCall(req, res) {
		const pageIndex = req.body.pageIndex;
		const pageSize = req.body.pageSize;
		const procName = "Friends_SelectPaginated";
		console.log("paginatedPayload:", pageIndex, pageSize);

		sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("pageIndex", TYPES.Int, pageIndex)
					.input("pageSize", TYPES.Int, pageSize)
					.execute(procName);
			})
			.then((result) => {
				let baseResponse = null;
				let code = 200;

				if (result) {
					baseResponse = new Responses.ItemsResponse(result);
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

	search(req, res) {
		const query = req.body.query;
		console.log("queryu:", query);
		const pageIndex = req.body.pageIndex;
		const pageSize = req.body.pageSize;
		const procName = "Friends_SearchFriends";
		sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("query", TYPES.NVarChar, query)
					.input("pageIndex", TYPES.Int, pageIndex)
					.input("pageSize", TYPES.Int, pageSize)
					.execute(procName);
			})
			.then((result) => {
				let paginatedFriends = result.recordset;
				let baseResponse = null;
				let code = 200;
				if (paginatedFriends) {
					baseResponse = new Responses.ItemsResponse(paginatedFriends);
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
}

const friendsController = new FriendsController();

module.exports = friendsController;
