/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.2.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

//@require @packageOverrides
Ext.Loader.setConfig({

});

Ext.application({
    models: [
        'FolderObjectDataModel',
        'QuickSearchDataModel',
        'SearchDataModel',
        'EventAssistanceDataModel',
        'MailViewModel',
        'MailAttachmentModel',
        'LoginModel',
        'PreviewModel',
        'AreaDataModel',
        'ObjectInfoModel',
        'NoteModel',
        'UserGroupSearchModel',
        'TextViewModel',
        'PrivateGlobalFolders',
        'SharedGlobalFolders'
    ],
    stores: [
        'FolderObjectDataStore',
        'QuickSearchDataStore',
        'SearchDataStore',
        'EventAssistanceDataStore',
        'MailViewStore',
        'FolderObjectTreeStore',
        'PreviewStore',
        'MailAttachmentStore',
        'AreaDataStore',
        'ObjectInfoStore',
        'NoteStore',
        'UserGroupSearchStore',
        'TextViewStore',
        'PrivateGlobalFoldersStore',
        'SharedGlobalFoldersStore'
    ],
    views: [
        'MainPanel',
        'MenuPanel',
        'LoginPanel',
        'PreviewContainer',
        'LogoContainer',
        'PreviewCarousel',
        'ImageViewerContainer',
        'MailViewContainer',
        'MailButton',
        'EventAssistanceContainerSub',
        'SearchContainerSub',
        'FolderListList',
        'InfoPanel',
        'FolderListContainer',
        'ContentContainerBar',
        'ContentContainer',
        'EventAssistanceListList',
        'EventAssistanceContainer',
        'NoteEntry',
        'NotesWriteContainer',
        'ReceiverInputField',
        'ReceiverField',
        'NotesListList',
        'ReceiverList',
        'TextViewContainer',
        'SettingsContainer',
        'SearchContainer'
    ],
    controllers: [
        'MyController',
        'UploadController'
    ],
    name: 'ACMobileClient'
});
