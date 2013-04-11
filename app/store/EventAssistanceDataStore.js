/*
 * File: app/store/EventAssistanceDataStore.js
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

Ext.define('ACMobileClient.store.EventAssistanceDataStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ACMobileClient.model.EventAssistanceDataModel'
    ],

    config: {
        autoLoad: false,
        model: 'ACMobileClient.model.EventAssistanceDataModel',
        storeId: 'EventAssistanceDataStore',
        proxy: {
            type: 'rest',
            extraParams: {
                provider: 'ea',
                parameters: Ext.encode({
                    accessibleonly: true,
                    updatelastaccesstime: true
                }),
                properties: [
                    'id',
                    'name',
                    'classname',
                    'mainobj.name',
                    'displayname',
                    'mainobj.displayname',
                    '<noteobject>content',
                    'lastmodifydate',
                    'lastmodifier.fullname',
                    'mainobj.classname',
                    'mainobj.id',
                    'read',
                    'mainobj.previewable',
                    'mainobj.textavailable',
                    'mainobj.<mailobject>senderorreceiver',
                    'mainobj.<mailobject>maildirection',
                    'mainobj.<mailobject>hasattachments',
                    'mainobj.isfolder'
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
        listeners: [
            {
                fn: 'onJsonstoreBeforeLoad',
                event: 'beforeload'
            }
        ]
    },

    onJsonstoreBeforeLoad: function(store, operation, eOpts) {
        addSessionIdToParams(operation);

    }

});