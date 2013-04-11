/*
 * File: app/model/EventAssistanceDataModel.js
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

Ext.define('ACMobileClient.model.EventAssistanceDataModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                mapping: 'name',
                name: 'name'
            },
            {
                mapping: 'displayname',
                name: 'displayname'
            },
            {
                mapping: '["mainobject.id"]',
                name: 'id',
                type: 'int'
            },
            {
                mapping: 'id',
                name: 'eaId',
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
                mapping: 'classname',
                name: 'classname',
                type: 'string'
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
                mapping: '["mainobj.classname"]',
                name: 'mainobject_classname',
                type: 'string'
            },
            {
                mapping: '["mainobj.name"]',
                name: 'mainobject_name',
                type: 'string'
            },
            {
                mapping: '["mainobj.displayname"]',
                name: 'mainobject_displayname',
                type: 'string'
            },
            {
                mapping: '["mainobj.id"]',
                name: 'mainobject_id',
                type: 'string'
            },
            {
                mapping: '["<noteobject>content"]',
                name: 'noteobject_content',
                type: 'string'
            },
            {
                name: 'lastmodifydate',
                type: 'date'
            },
            {
                name: 'read',
                type: 'boolean'
            },
            {
                mapping: '["lastmodifier.fullname"]',
                name: 'lastmodifier_fullname',
                type: 'string'
            },
            {
                mapping: '["mainobj.<mailobject>senderorreceiver"]',
                name: 'mail_senderorreceiver',
                type: 'string'
            },
            {
                mapping: '["mainobj.<mailobject>maildirection"]',
                name: 'mail_direction',
                type: 'string'
            },
            {
                mapping: '["mainobj.<mailobject>hasattachments"]',
                name: 'mail_hasattachments',
                type: 'string'
            },
            {
                mapping: '["mainobj.previewable"]',
                name: 'previewable',
                type: 'boolean'
            },
            {
                mapping: '["mainobj.textavailable"]',
                name: 'textavailable',
                type: 'boolean'
            },
            {
                mapping: '["mainobj.isfolder"]',
                name: 'isfolder',
                type: 'boolean'
            }
        ]
    }
});