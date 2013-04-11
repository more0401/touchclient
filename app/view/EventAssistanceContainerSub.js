/*
 * File: app/view/EventAssistanceContainerSub.js
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

Ext.define('ACMobileClient.view.EventAssistanceContainerSub', {
    extend: 'Ext.Container',
    alias: 'widget.EventAssistanceContainerSub',

    config: {
        itemId: '',
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                itemId: 'eventAssistanceToolbar',
                title: 'Mitteilungen',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        itemId: 'editButton',
                        iconCls: 'list',
                        iconMask: true
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                hidden: true,
                itemId: 'editTools',
                ui: 'light',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'readButton',
                        ui: 'action',
                        iconCls: 'check_black2',
                        iconMask: true,
                        text: 'Gelesen'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        hidden: true,
                        itemId: 'deleteButton',
                        ui: 'decline',
                        text: 'Löschen'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onEditButtonTap',
                event: 'tap',
                delegate: '#editButton'
            },
            {
                fn: 'onReadButtonTap',
                event: 'tap',
                delegate: '#readButton'
            },
            {
                fn: 'onContainerInitialize',
                event: 'initialize'
            },
            {
                fn: 'onContainerDeactivate',
                event: 'deactivate'
            },
            {
                fn: 'onContainerActivate',
                event: 'activate'
            },
            {
                fn: 'onContainerShow',
                event: 'show'
            }
        ]
    },

    onEditButtonTap: function(button, e, eOpts) {
        if (!this.inEditMode) {
            this.switchEditMode(true);
        }
        else {
            this.switchEditMode(false);
        }
    },

    onReadButtonTap: function(button, e, eOpts) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            if (me.selectedItems && me.selectedItems.length > 0) {
                //send ids to server
                me.setMasked({
                    xtype: 'loadmask',
                    message: 'Setting read state'
                });


                Ext.Ajax.request({
                    url: '/api/rest/eventAssistance/remove.json', 
                    method: 'post',
                    params: { 
                        sessionId: MyGlobals.sessionId,
                        eaIdList: me.selectedItems,
                        noCache: new Date().getTime()
                    },
                    success: function(response) {
                        me.setMasked(false);
                        me.loadEA();
                        me.switchEditMode(false);
                    },
                    failure: function() {
                        me.setMasked(false);
                        Ext.Msg.alert('Error', 'Something went wrong!', Ext.emptyFn);
                        me.loadEA();
                        me.switchEditMode(false);
                    },
                    scope: me
                });

                // objectIds
            }
            else {
                me.switchEditMode(false);
            }
        });
    },

    onContainerInitialize: function(component, eOpts) {
        myTpl = new Ext.XTemplate(
        '<div id="eaitem_{id}" class="list_style list_read_{read} list_editmode">',
        '<div class="list_editcircle"></div>',
        '<div class="list_read"></div>',
        '<div class="list_icons">',

        //main-icon, mail-direction-icon, if present
        '	<tpl if="mail_direction != null">	',
        '		<div class="list_icon list_icon_{mainobject_classname}{mail_direction}"></div>',
        '	</tpl>',
        '	<tpl if="mail_direction == null">	',
        '		<div class="list_icon list_icon_{mainobject_classname}"></div>',
        '	</tpl>',

        //sub-icon
        '	<tpl if="classname != null">	',
        '		<div class="list_icon_{classname}"></div>',
        '	</tpl>',

        '</div>',

        //date
        '<div class="list_date">{lastmodifydate:date("d.m.y")}<br>{lastmodifydate:date("H:i")}</div>',

        //name of object    
        '<div class="list_headline"><nobr>{mainobject_displayname}</nobr></div>',

        //sub-line (lastModifier, sender, receiver)
        '<tpl if="mail_senderorreceiver != null">	',
        '<div class="list_subline"><nobr>{[Ext.util.Format.htmlEncode(values.mail_senderorreceiver)]}</nobr></div>',
        '</tpl>',
        '<tpl if="mail_senderorreceiver == null">	',
        '<div class="list_subline"><nobr>{lastmodifier_fullname}</nobr></div>',
        '</tpl>',

        '<tpl if="noteobject_content != null">',
        '	<div class="list_content">{noteobject_content:ellipsis(200)}</div>',
        '</tpl>',
        '</div>',
        {
            // XTemplate configuration:
            disableFormats: false,
            // just a sample
            testing: function(){
                return '';
            }
        }
        );
        var list = Ext.create('ACMobileClient.view.EventAssistanceListList', {
            itemId : 'eventAssistanceList',
            itemTpl: myTpl,
            flex: 1
        });
        list.parentClass = this;
        this.add(list);
        this.titleName = "Mitteilungen";

        console.log("added ea list");
    },

    onContainerDeactivate: function(container, newActiveItem, oldActiveItem, eOpts) {
        this.deactivateCallback();
    },

    onContainerActivate: function(container, newActiveItem, oldActiveItem, eOpts) {
        //prevent loading the first time
        if (this.isLoaded) {
            this.activateCallback();
        }
        this.isLoaded = true;
    },

    onContainerShow: function(component, eOpts) {
        console.log("EA show");
    },

    deactivateCallback: function() {
        this.down('#eventAssistanceList').deselectAll();
    },

    loadEA: function() {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            MyGlobals.menuPanel.down('#tabPanel').getTabBar().getComponent(2).setBadgeText('');

            console.log('load EA store');
            me.down('#eventAssistanceList').getStore().load();
        });


    },

    switchEditMode: function(editMode) {
        var eaList = this.down('#eventAssistanceList');
        if (editMode) {
            //this.down('#editButton').setText('Abbrechen');
            this.down('#editButton').setIconCls('delete1');
            this.down('#editTools').show();
            this.inEditMode = true;

            eaList.deselectAll();
            eaList.addCls('listEditMode');
            eaList.setMode('MULTI');
            this.savedSelectedCls = eaList.getSelectedCls();
            eaList.setSelectedCls('multi_select_list');
        }
        else {
            eaList.deselectAll();
            //this.down('#editButton').setText('Aktion');
            this.down('#editButton').setIconCls('list');
            this.down('#editTools').hide();
            this.inEditMode = false;

            eaList.removeCls('listEditMode');
            eaList.setMode('SINGLE');

            eaList.setSelectedCls(this.savedSelectedCls);
        }
    },

    activateCallback: function() {
        //this.down('#eventAssistanceContainer').setBadgeText("4");
        this.loadEA();
        console.log("activated ea");
    }

});