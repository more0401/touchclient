/*
 * File: app/store/QuickSearchDataStore.js
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

Ext.define('ACMobileClient.store.QuickSearchDataStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ACMobileClient.model.QuickSearchDataModel'
    ],

    config: {
        autoLoad: false,
        model: 'ACMobileClient.model.QuickSearchDataModel',
        storeId: 'QuickSearchDataStore',
        proxy: {
            type: 'rest',
            extraParams: {
                provider: 'quicksearch',
                source: 'MAIN_MODULE_MANAGEMENT/mobileclient/control/quicksearch'
            },
            url: '/api/rest/object',
            format: 'json',
            reader: {
                type: 'json',
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