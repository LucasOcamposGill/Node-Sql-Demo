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

class AddressesController {
	insert(req, res) {
		var newAddressData = req.body;
		const procName = "Addresses_Insert";

		sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("LineOne", TYPES.NVarChar, newAddressData.LineOne)
					.input("SuiteNumber", TYPES.NVarChar, newAddressData.SuiteNumber)
					.input("City", TYPES.NVarChar, newAddressData.City)
					.input("State", TYPES.NVarChar, newAddressData.State)
					.input("PostalCode", TYPES.NVarChar, newAddressData.PostalCode)
					.input("IsActive", TYPES.Bit, newAddressData.IsActive)
					.input("Lat", TYPES.Float, newAddressData.Lat)
					.input("Long", TYPES.Float, newAddressData.Long)
					.output("Id", sql.Int)
					.execute(procName);
			})
			.then((result) => {
				let addressId = result.output.Id;
				const itemResponse = new Responses.ItemResponse(addressId);
				res.status(201).json(itemResponse);
			})
			.catch((err) => {
				res.status(500).json(new Responses.ErrorResponse(err));
			});
	}

	update(req, res) {
		var newAddressData = req.body;
		const procName = "Addresses_Update";

		sql
			.connect(config)
			.then((pool) => {
				return pool
					.request()
					.input("Id", TYPES.Int, newAddressData.Id)
					.input("LineOne", TYPES.NVarChar, newAddressData.LineOne)
					.input("SuiteNumber", TYPES.NVarChar, newAddressData.SuiteNumber)
					.input("City", TYPES.NVarChar, newAddressData.City)
					.input("State", TYPES.NVarChar, newAddressData.State)
					.input("PostalCode", TYPES.NVarChar, newAddressData.PostalCode)
					.input("IsActive", TYPES.Bit, newAddressData.IsActive)
					.input("Lat", TYPES.Float, newAddressData.Lat)
					.input("Long", TYPES.Float, newAddressData.Long)
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
		const procName = "Addresses_SelectById";
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

	selectRandom5(req, res) {
		const procName = "Addresses_SelectRandom5";
		let address = null;

		sql
			.connect(config)
			.then((pool) => {
				return pool.request().execute(procName);
			})
			.then((result) => {
				address = result.recordset;
				console.log("then_result", address);
				let baseResponse = null;
				let code = 200;
				console.log("then_result", address);
				if (address) {
					baseResponse = new Responses.ItemsResponse(address);
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
		var theId = JSON.parse(req.params.id);
		const procName = "Addresses_DeleteById";

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

const addressesController = new AddressesController();

module.exports = addressesController;
