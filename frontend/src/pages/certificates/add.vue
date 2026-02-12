<template>
    <main class="main-page"  id="">
        <template v-if="pageReady">
            <template v-if="showHeader">
                <section class="page-section mb-3" >
                    <div class="container">
                        <div class="grid justify-content-between align-items-center">
                            <div  v-if="!isSubPage"  class="col-fixed " >
                                <Button @click="$router.go(-1)"   class="p-button p-button-text " icon="pi pi-arrow-left"  />
                            </div>
                            <div  class="col " >
                                <div class=" text-2xl text-primary font-bold" >
                                    {{ $t('addNewCertificate') }}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="md:col-9 sm:col-12 comp-grid" >
                            <div >
                                <form ref="observer" tag="form" @submit.prevent="submitForm()" :class="{ 'card ': !isSubPage }" class=" ">
                                    <div class="grid">
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('ceruserId') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <api-data-source :enable-cache="true"   api-path="components_data/ceruser_id_option_list" >
                                                        <template v-slot="req">
                                                            <Dropdown  class="w-full" :class="getErrorClass('ceruser_id')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrlceruser_id"  v-model="formData.ceruser_id" :options="req.response" :label="$t('ceruserId')"  :placeholder="$t('selectAValue')" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('ceruser_id')" class="p-error">{{ getFieldError('ceruser_id') }}</small> 
                                                        </template>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('categoryId') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <api-data-source :enable-cache="true"   api-path="components_data/category_id_option_list" >
                                                        <template v-slot="req">
                                                            <Dropdown  class="w-full" :class="getErrorClass('category_id')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrlcategory_id"  v-model="formData.category_id" :options="req.response" :label="$t('categoryId')"  :placeholder="$t('selectAValue')" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('category_id')" class="p-error">{{ getFieldError('category_id') }}</small> 
                                                        </template>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('certificateName') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlcertificate_name" v-model.trim="formData.certificate_name"  :label="$t('certificateName')" type="text" :placeholder="$t('enterCertificateName')"      
                                                    class=" w-full" :class="getErrorClass('certificate_name')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('certificate_name')" class="p-error">{{ getFieldError('certificate_name') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('filePath') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <div class="mb-3">
                                                        <Uploader @uploadError="(msg)=>app.flashMsg('File Upload', msg, 'error')" :class="getErrorClass('file_path')" upload-path="fileuploader/upload/file_path" v-model="formData.file_path" :fileLimit="1" :maxFileSize="3000000" accept=".jpg,.png,.gif,.jpeg" :multiple="false" :label="$t('chooseFilesOrDropFilesHere')" />
                                                    </div>
                                                    <small v-if="isFieldValid('file_path')" class="p-error">{{ getFieldError('file_path') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('approvalsStatus') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <api-data-source :enable-cache="true"   api-path="components_data/approvals_status_option_list" >
                                                        <template v-slot="req">
                                                            <Dropdown  class="w-full" :class="getErrorClass('approvals_status')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrlapprovals_status"  v-model="formData.approvals_status" :options="req.response" :label="$t('approvalsStatus')"  :placeholder="$t('selectAValue')" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('approvals_status')" class="p-error">{{ getFieldError('approvals_status') }}</small> 
                                                        </template>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('approvalsComment') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlapprovals_comment" v-model.trim="formData.approvals_comment"  :label="$t('approvalsComment')" type="text" :placeholder="$t('enterApprovalsComment')"      
                                                    class=" w-full" :class="getErrorClass('approvals_comment')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('approvals_comment')" class="p-error">{{ getFieldError('approvals_comment') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="showSubmitButton" class="text-center my-3">
                                        <Button class="p-button-primary" type="submit" :label="$t('submit')" icon="pi pi-send" :loading="saving" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </main>
</template>
<script setup>
	import {  computed,  reactive, toRefs, onMounted } from 'vue';
	import { required } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { $t } from 'src/services/i18n';
	import { useAddPage } from 'src/composables/addpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		pageStoreKey: {
			type: String,
			default: 'CERTIFICATES',
		},
		pageName : {
			type : String,
			default : 'certificates',
		},
		routeName : {
			type : String,
			default : 'certificatesadd',
		},
		apiPath : {
			type : String,
			default : 'certificates/add',
		},
		submitButtonLabel: {
			type: String,
			default: () => $t('submit'),
		},
		formValidationError: {
			type: String,
			default: $t('formIsInvalid'),
		},
		formValidationMsg: {
			type: String,
			default: $t('pleaseCompleteTheForm'),
		},
		msgTitle: {
			type: String,
			default: $t('createRecord'),
		},
		msgAfterSave: {
			type: String,
			default: () => $t('recordAddedSuccessfully'),
		},
		msgBeforeSave: {
			type: String,
			default: () => $t(''),
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showSubmitButton: {
			type: Boolean,
			default: true,
		},
		redirect: {
			type : Boolean,
			default : true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
		pageData: { // use to set formData default values from another page
			type: Object,
			default: () => ({
				ceruser_id: "", category_id: "", certificate_name: "", file_path: "", approvals_status: "", approvals_comment: "", 
			})
		},
	});
	//lines
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();
	
	const formData = reactive({ ...props.pageData });
	
	//vuelidate form validation rules
	const rules = computed(() => {
		return {
			ceruser_id: { required },
			category_id: { required },
			certificate_name: { required },
			file_path: { required },
			approvals_status: {  },
			approvals_comment: {  }
		}
	});
	
	const page = useAddPage({ store, props, formData, rules, beforeSubmit, afterSubmit });
	
	// event raised before submit form
	function beforeSubmit(){
		return true;
	}
	
	// event raised after form submited
	function afterSubmit(response) { 
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		page.setFormDefaultValues(); //reset form data
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigateTo(`/certificates`);
		}
	}
	
	const {  saving, pageReady, } = toRefs(page.state);
	
	const { submitForm, getErrorClass, getFieldError, isFieldValid,  } = page.methods;
	
	onMounted(()=>{
		const pageTitle = $t('addNewCertificate');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
