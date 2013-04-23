/*
 * File: app/controller/UploadController.js
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

Ext.define('ACMobileClient.controller.UploadController', {
    extend: 'Ext.app.Controller',

    config: {
    },

    checkAccessLevel: function(items, accessLevel, grantCallback, denyCallback, failedCallback) {
        var me = this,
            ids = [];

        if (items && (Ext.isNumber(items) || Ext.isArray(items))) {

            if (Ext.isArray(items)) {
                items.forEach(function(el) {
                    ids.push(el.get('id'));
                });
            } else {
                ids = [items];
            }

            Ext.Ajax.request({
                method: 'GET',
                url: '/api/rest/dataspace/hasAccessLevel.json',
                params: {
                    objectIds: ids,
                    accessLevel: accessLevel
                },
                success: function (response) {
                    var ok = Ext.decode(response.responseText).hasAccessLevel;
                    if (ok) {
                        grantCallback();
                    } else {
                        if (denyCallback) {
                            denyCallback();
                        }
                    }
                },
                failure: function(response) { 
                    if (failedCallback) {
                        failedCallback(Ext.decode(response.responseText));
                    }
                }
            });

        } else {
            if (!Ext.isEmpty(items)) {
                if (failedCallback) {
                    failedCallback("invalid argument");
                }
            }
        }
    },

    launch: function() {
        MyGlobals.uploadController = this;

    }

});