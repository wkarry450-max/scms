import { Router } from 'express';
import DB from '../models/db.js';


const router = Router();


 /**
 * Route to get ceruser_id_option_list records
 * @GET /components_data/ceruser_id_option_list
 */
router.get('/ceruser_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT user_id AS value,user_name AS label FROM users` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get category_id_option_list records
 * @GET /components_data/category_id_option_list
 */
router.get('/category_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT category_id AS value,category_name AS label FROM certificatecategories` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get approvals_status_option_list records
 * @GET /components_data/approvals_status_option_list
 */
router.get('/approvals_status_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT app_status AS value,app_status AS label FROM appstatus` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get role_id_option_list records
 * @GET /components_data/role_id_option_list
 */
router.get('/role_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT role_id as value, role_name as label FROM roles` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @GET /components_data/users_user_name_exist/{fieldvalue}
 */
router.get('/users_user_name_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Users.count({ where:{ 'user_name': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @GET /components_data/users_email_exist/{fieldvalue}
 */
router.get('/users_email_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Users.count({ where:{ 'email': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_ records
 * @GET /components_data/barchart_
 */
router.get('/barchart_',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT
    r.role_name  AS label,
    COUNT(u.user_id) AS value
FROM users u
JOIN roles r ON u.user_role_id = r.role_id
GROUP BY r.role_name
ORDER BY value DESC;` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.label });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.value) }),
			label: "",
			backgroundColor: "rgba(128 , 255 , 255, 0.5)", 
			borderColor: "rgba(255 , 128 , 128, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get piechart_ records
 * @GET /components_data/piechart_
 */
router.get('/piechart_',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT
    approvals_status  AS label,
    COUNT(*)          AS value
FROM certificates
GROUP BY approvals_status
ORDER BY value DESC;` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.label });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.value) }),
			label: "",
			backgroundColor: "rgba(255 , 255 , 128, 0.5)", 
			borderColor: "rgba(255 , 128 , 0, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});
export default router;
