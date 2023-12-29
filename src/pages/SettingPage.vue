<template>
<a-layout-content style="padding: 28px;">
    <div class="con-box">
        <div class="setting-item">
            <div class="setting-label">
                Auto launch
            </div>
            <a-switch />
        </div>
        <div class="setting-item">
            <div class="setting-label">
                History auto save
            </div>
            <a-switch />
        </div>
        <div class="setting-label">
            <div class="setting-label">
                {{ folderPath }}
            </div>
            <a-button>
                Folder select
            </a-button>
        </div>
    </div>
</a-layout-content>  
</template>

<script>
export default {
name: 'SettingPage',
data: () => ({
    darkMode: false,
    authLaunch: false,
    autoSave: false,
    folderPath: ''
})
}
</script>

<style>
    .setting-label:not(:first-of-type) {
        margin-bottom: 10px;
    }
</style>