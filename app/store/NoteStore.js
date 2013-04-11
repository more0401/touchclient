/*
 * File: app/store/NoteStore.js
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

Ext.define('ACMobileClient.store.NoteStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ACMobileClient.model.NoteModel'
    ],

    config: {
        model: 'ACMobileClient.model.NoteModel',
        remoteSort: true,
        storeId: 'NoteStore',
        proxy: {
            type: 'rest',
            extraParams: {
                provider: 'note',
                properties: [
                    'id',
                    'creator.fullname',
                    'content',
                    'createdate'
                ]
            },
            url: '/api/rest/object',
            format: 'json',
            reader: {
                type: 'json',
                idProperty: 'id',
                rootProperty: 'data'
            }
        },
        sorters: {
            direction: 'DESC',
            property: 'createdate',
            root: 'data'
        },
        listeners: [
            {
                fn: 'onStoreBeforeLoad',
                event: 'beforeload'
            }
        ]
    },

    onStoreBeforeLoad: function(store, operation, eOpts) {
        operation.setParams({source: store.objectId});
        addSessionIdToParams(operation);

    }

});