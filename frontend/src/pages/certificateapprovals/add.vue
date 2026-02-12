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
                                    {{ $t('addNewCertificateapproval') }}
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
                                                    {{ $t('certificateId') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlcertificate_id" v-model.trim="formData.certificate_id"  :label="$t('certificateId')" type="number" :placeholder="$t('enterCertificateId')"   step="any"    
                                                    class=" w-full" :class="getErrorClass('certificate_id')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('certificate_id')" class="p-error">{{ getFieldError('certificate_id') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('userId') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrluser_id" v-model.trim="formData.user_id"  :label="$t('userId')" type="number" :placeholder="$t('enterUserId')"   step="any"    
                                                    class=" w-full" :class="getErrorClass('user_id')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('user_id')" class="p-error">{{ getFieldError('user_id') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('decision') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrldecision" v-model.trim="formData.decision"  :label="$t('decision')" type="text" :placeholder="$t('enterDecision')"      
                                                    class=" w-full" :class="getErrorClass('decision')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('decision')" class="p-error">{{ getFieldError('decision') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('comments') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <Textarea :class="getErrorClass('comments')" class="w-full" ref="ctrlcomments" rows="5"  v-model="formData.comments" :placeholder="$t('enterComments')"    type="textarea">
                                                    </Textarea>
                                                    <small v-if="isFieldValid('comments')" class="p-error">{{ getFieldError('comments') }}</small> 
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
	import { required, numeric, } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { $t } from 'src/services/i18n';
	import { useAddPage } from 'src/composables/addpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		pageStoreKey: {
			type: String,
			default: 'CERTIFICATEAPPROVALS',
		},
		pageName : {
			type : String,
			default : 'certificateapprovals',
		},
		routeName : {
			type : String,
			default : 'certificateapprovalsadd',
		},
		apiPath : {
			type : String,
			default : 'certificateapprovals/add',
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
				certificate_id: "", user_id: "", decision: "", comments: "", 
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
			certificate_id: { required, numeric },
			user_id: { required, numeric },
			decision: { required },
			comments: {  }
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
			app.navigateTo(`/certificateapprovals`);
		}
	}
	
	const {  saving, pageReady, } = toRefs(page.state);
	
	const { submitForm, getErrorClass, getFieldError, isFieldValid,  } = page.methods;
	
	onMounted(()=>{
		const pageTitle = $t('addNewCertificateapproval');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
