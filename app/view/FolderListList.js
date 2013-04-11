/*
 * File: app/view/FolderListList.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
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

Ext.define('ACMobileClient.view.FolderListList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.folderlistlist',

    config: {
        itemCls: 'documentList',
        onItemDisclosure: true,
        listeners: [
            {
                fn: 'onDocumentListSelect',
                event: 'select'
            },
            {
                fn: 'onDocumentListRefresh',
                event: 'refresh'
            },
            {
                fn: 'onDocumentListDisclose',
                event: 'disclose'
            }
        ],
        plugins: [
            {
                autoPaging: true,
                loadMoreText: 'Mehr laden...',
                noMoreRecordsText: ' ',
                type: 'listpaging'
            },
            {
                refreshFn: function(plugin) {
                    var me = this;
                    ACUtils.utils.checkConnectionWithFunction(function() {
                        plugin.up().setMasked({
                            xtype: 'loadmask',
                            message: 'Refreshing...'
                        });
                        plugin.up().getStore().loadPage(1);
                    });

                },
                loadingText: 'Lade...',
                pullRefreshText: 'Zum Aktualisieren ziehen',
                releaseRefreshText: 'Zum Aktualisieren loslassen',
                type: 'pullrefresh'
            }
        ]
    },

    onDocumentListSelect: function(dataview, record, eOpts) {
        var classObject = record.get("classname");
        var objectId = record.get("id");
        var name = record.get("name");
        MyGlobals.mainPanel.handleObject(classObject, objectId, name, false, record);
        MyGlobals.currentDocumentList = this;
    },

    onDocumentListRefresh: function(dataview, eOpts) {
        this.deselectAll();
    },

    onDocumentListDisclose: function(list, record, target, index, e, eOpts) {
        MyGlobals.mainPanel.showInfoPanelSlided(record.get('id'));
    }

});