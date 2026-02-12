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
                                    {{ $t('userDetails') }}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="col comp-grid" >
                            <div >
                                <div class="mb-3 grid ">
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('userId') }}</div>
                                                <div class="font-bold">{{ item.user_id }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('userAccount') }}</div>
                                                <div class="font-bold">{{ item.user_account }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('userName') }}</div>
                                                <div class="font-bold">{{ item.user_name }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('email') }}</div>
                                                <div class="font-bold">{{ item.email }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('telephone') }}</div>
                                                <div class="font-bold">{{ item.telephone }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('userRoleId') }}</div>
                                                <div class="font-bold">{{ item.user_role_id }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('createTime') }}</div>
                                                <div class="font-bold">{{ item.create_time }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('photo') }}</div>
                                                <div class="font-bold">
                                                    <image-viewer image-size="medium" image-preview-size="" :src="item.photo" width="auto" height="auto" class="img-fluid" :num-display="1">
                                                    </image-viewer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- action buttons -->
                                <div  class=" flex gap-3 justify-content-start">
                                    <Menubar class="p-0 inline-menu" ref="actionMenu" :model="getActionMenuModel(item)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <template v-if="loading">
            <div style="min-height:200px" class="flex gap-3 justify-content-center align-items-center p-3">
                <div><ProgressSpinner style="width:50px;height:50px" /> </div>
                <div class="text-500">{{ $t('loading') }} </div>
            </div>
        </template>
    </main>
</template>
<script setup>
	import {   toRefs, onMounted } from 'vue';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { usePageStore } from 'src/store/page';
	import { useViewPage } from 'src/composables/viewpage.js';
	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'user_id',
		},
		pageStoreKey: {
			type: String,
			default: 'USERS',
		},
		pageName: {
			type: String,
			default: 'users',
		},
		routeName: {
			type: String,
			default: 'usersview',
		},
		apiPath: {
			type: String,
			default: 'users/view',
		},
		autoLoad: {
			type: Boolean,
			default: true,
		},
		titleBeforeDelete: {
			type: String,
			default: $t('deleteRecord'),
		},
		msgBeforeDelete: {
			type: String,
			default: () => $t('promptDeleteRecord'),
		},
		msgAfterDelete: {
			type: String,
			default: () => $t('recordDeletedSuccessfully'),
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		}
	});
	
	const store = usePageStore(props.pageStoreKey);
	const app = useApp(props);
	const auth = useAuth();
	
	const page = useViewPage({ store, props }); // where page logics resides
	
	const {  currentRecord } = toRefs(store.state);
	const { loading, pageReady } = toRefs(page.state);
	const item = currentRecord;
	
	const  { load, deleteItem, exportPage,   } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('edit'),
			command: (event) => { app.openPageDialog({ page:'users/edit', url: `/users/edit/${data.user_id}`, closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: auth.canView('users/edit')
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.user_id) },
			icon: "pi pi-trash",
			visible: auth.canView('users/delete')
		}
	]
	}
	
	onMounted(()=>{ 
		const pageTitle = $t('userDetails');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
</script>
<style scoped>
</style>
