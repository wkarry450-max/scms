import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list certificates records
 * @GET /certificates/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		const query = {};
		let queryFilters = [];
		let where = {};
		let replacements = {};
		let fieldName = req.params.fieldname;
		let fieldValue = req.params.fieldvalue;
		
		if (fieldName){
			queryFilters.push(DB.filterBy(fieldName, fieldValue));
		}
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Users,
			required: true,
			as: 'users',
			attributes: [], //already set via model class
		})
		joinTables.push({
			model: DB.Certificatecategories,
			required: true,
			as: 'certificatecategories',
			attributes: [], //already set via model class
		})
		joinTables.push({
			model: DB.Appstatus,
			required: false,
			as: 'appstatus',
			attributes: [], //already set via model class
		})
		query.include = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = DB.Certificates.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'certificate_id', 'desc');
		query.attributes = DB.Certificates.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Certificates.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Certificates record
 * @GET /certificates/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Users,
			required: true,
			as: 'users',
			attributes: [], //already set via model class
		})
		joinTables.push({
			model: DB.Certificatecategories,
			required: true,
			as: 'certificatecategories',
			attributes: [], //already set via model class
		})
		joinTables.push({
			model: DB.Appstatus,
			required: false,
			as: 'appstatus',
			attributes: [], //already set via model class
		})
		query.include = joinTables;
		where[DB.op.and] = DB.raw('certificates.certificate_id = :recid');
		query.replacements = {
			recid
		}
		query.raw = true;
		query.where = where;
		query.attributes = DB.Certificates.viewFields();
		let record = await DB.Certificates.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert Certificates record
 * @POST /certificates/add
 */
router.post('/add/', 
	[
		body('ceruser_id').not().isEmpty(),
		body('category_id').not().isEmpty(),
		body('certificate_name').not().isEmpty(),
		body('file_path').not().isEmpty(),
		body('approvals_status').optional({nullable: true, checkFalsy: true}),
		body('approvals_comment').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.file_path !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.file_path, 'file_path');
			modeldata.file_path = fileInfo.filepath;
		}
		
		//save Certificates record
		let record = await DB.Certificates.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['certificate_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Certificates record for edit
 * @GET /certificates/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['certificate_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Certificates.editFields();
		let record = await DB.Certificates.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  Certificates record
 * @POST /certificates/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('approvals_status').optional({nullable: true, checkFalsy: true}),
		body('approvals_comment').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['certificate_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Certificates.editFields();
		let record = await DB.Certificates.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Certificates.update(modeldata, {where: where});
		record = await DB.Certificates.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Certificates record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /certificates/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['certificate_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Certificates.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['certificate_id'], oldValues });
		});
		await DB.Certificates.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
