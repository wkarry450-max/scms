
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Certificates extends BaseModel {
	static init() {
		return super.init(
			{
				
				certificate_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				ceruser_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				category_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				certificate_name: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				file_path: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				approvals_status: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				uploaded_at: { type:Sequelize.DATE   },
				approvals_comment: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				blocknum: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				tx_hash: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "certificates",
				modelName: "certificates",
			}
		);
	}
	
	static listFields() {
		return [
			Sequelize.literal('certificates.certificate_name AS certificate_name'), 
			Sequelize.literal('certificates.file_path AS file_path'), 
			Sequelize.literal('certificates.approvals_status AS approvals_status'), 
			Sequelize.literal('certificates.uploaded_at AS uploaded_at'), 
			Sequelize.literal("users.user_name AS users_user_name"), 
			Sequelize.literal('certificates.blocknum AS blocknum'), 
			Sequelize.literal('certificates.tx_hash AS tx_hash'), 
			Sequelize.literal("users.user_id AS users_user_id"), 
			Sequelize.literal("certificatecategories.category_id AS certificatecategories_category_id"), 
			Sequelize.literal("appstatus.id AS appstatus_id"), 
			Sequelize.literal('certificates.certificate_id AS certificate_id')
		];
	}

	static viewFields() {
		return [
			Sequelize.literal('certificates.certificate_id AS certificate_id'), 
			Sequelize.literal('certificates.ceruser_id AS ceruser_id'), 
			Sequelize.literal('certificates.category_id AS category_id'), 
			Sequelize.literal('certificates.certificate_name AS certificate_name'), 
			Sequelize.literal('certificates.file_path AS file_path'), 
			Sequelize.literal('certificates.approvals_status AS approvals_status'), 
			Sequelize.literal('certificates.uploaded_at AS uploaded_at'), 
			Sequelize.literal('certificates.approvals_comment AS approvals_comment'), 
			Sequelize.literal("users.user_id AS users_user_id"), 
			Sequelize.literal("users.user_account AS users_user_account"), 
			Sequelize.literal("users.user_name AS users_user_name"), 
			Sequelize.literal("users.email AS users_email"), 
			Sequelize.literal("users.telephone AS users_telephone"), 
			Sequelize.literal("users.photo AS users_photo"), 
			Sequelize.literal("users.user_role_id AS users_user_role_id"), 
			Sequelize.literal("users.create_time AS users_create_time"), 
			Sequelize.literal("certificatecategories.category_id AS certificatecategories_category_id"), 
			Sequelize.literal("certificatecategories.category_name AS certificatecategories_category_name"), 
			Sequelize.literal("certificatecategories.description AS certificatecategories_description"), 
			Sequelize.literal("certificatecategories.created_at AS certificatecategories_created_at"), 
			Sequelize.literal("appstatus.id AS appstatus_id"), 
			Sequelize.literal("appstatus.app_status AS appstatus_app_status"), 
			Sequelize.literal('certificates.blocknum AS blocknum'), 
			Sequelize.literal('certificates.tx_hash AS tx_hash')
		];
	}

	static editFields() {
		return [
			'approvals_status', 
			'approvals_comment', 
			'certificate_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("certificates.certificate_name LIKE :search"), 
			Sequelize.literal("certificates.approvals_status LIKE :search"), 
			Sequelize.literal("users.user_name LIKE :search"), 
			Sequelize.literal("certificates.tx_hash LIKE :search"), 
			Sequelize.literal("certificates.approvals_comment LIKE :search"), 
			Sequelize.literal("users.user_id LIKE :search"), 
			Sequelize.literal("users.user_account LIKE :search"), 
			Sequelize.literal("users.email LIKE :search"), 
			Sequelize.literal("users.telephone LIKE :search"), 
			Sequelize.literal("certificatecategories.category_id LIKE :search"), 
			Sequelize.literal("certificatecategories.category_name LIKE :search"), 
			Sequelize.literal("certificatecategories.description LIKE :search"), 
			Sequelize.literal("appstatus.id LIKE :search"), 
			Sequelize.literal("appstatus.app_status LIKE :search"), 
			Sequelize.literal("users.password LIKE :search"),
		];
	}

	
	
}
Certificates.init();
export default Certificates;
