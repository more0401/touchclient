/*
 * File: app/model/FolderObjectDataModel.js
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

Ext.define('ACMobileClient.model.FolderObjectDataModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                convert: function(v, rec) {
                    var objTextKey = rec.get('objecttextkey');
                    if (objTextKey && objTextKey != "") {
                        var trans = ACMobileClient.Messages[objTextKey];
                        if (trans) {
                            return trans;
                        }
                        else {
                            return v;
                        }
                    }
                    else {
                        return v;
                    }
                },
                mapping: 'displayname',
                name: 'name',
                type: 'string'
            },
            {
                name: 'objecttextkey',
                type: 'string'
            },
            {
                name: 'id',
                type: 'int'
            },
            {
                convert: function(v, rec) {
                    if (v) {
                        return v.toLowerCase();
                    }
                    else {
                        return v;
                    }
                },
                name: 'classname'
            },
            {
                name: 'read',
                type: 'boolean'
            },
            {
                name: 'previewable',
                type: 'boolean'
            },
            {
                name: 'textavailable',
                type: 'boolean'
            },
            {
                name: 'isfolder',
                type: 'boolean'
            }
        ]
    }
});