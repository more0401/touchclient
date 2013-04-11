/*
 * File: app/model/MailAttachmentModel.js
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

Ext.define('ACMobileClient.model.MailAttachmentModel', {
    extend: 'Ext.data.Model',
    alias: 'model.MailAttachmentModel',

    config: {
        fields: [
            {
                mapping: 'id',
                name: 'objectId',
                type: 'string'
            },
            {
                mapping: 'displayname',
                name: 'name',
                type: 'string'
            },
            {
                name: 'size',
                type: 'int'
            },
            {
                convert: function(v, rec) {
                    return v != null;
                },
                mapping: '["<mailobject>id"]',
                name: 'isMailObject',
                type: 'boolean'
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
                mapping: 'classname',
                name: 'className',
                type: 'string'
            },
            {
                name: 'extension',
                type: 'string'
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
                convert: function(v, rec) {
                    return false;
                },
                name: 'isfolder',
                type: 'boolean'
            }
        ]
    }
});