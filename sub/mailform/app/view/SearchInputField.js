/*
 * File: app/view/SearchInputField.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
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

Ext.define('ACMobile.view.SearchInputField', {
    extend: 'Ext.Container',
    alias: 'widget.SearchInputField',

    config: {
        padding: '',
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'container',
                cls: [
                    'addressContainer'
                ],
                padding: 5,
                layout: {
                    type: 'hbox'
                },
                flex: 0,
                items: [
                    {
                        xtype: 'label',
                        html: 'An:',
                        margin: '0 10 0 0',
                        style: 'display:block',
                        flex: 0
                    },
                    {
                        xtype: 'container',
                        itemId: 'inputContainer',
                        margin: '0 5 0 0',
                        padding: '',
                        ui: '',
                        layout: {
                            type: 'hbox'
                        },
                        flex: 1,
                        items: [
                            {
                                xtype: 'container',
                                itemId: 'searchContainer',
                                style: 'display:inline-block;',
                                flex: 0,
                                items: [
                                    {
                                        xtype: 'textareafield',
                                        height: 25,
                                        itemId: 'inputField',
                                        labelWidth: 0
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        height: 22,
                        hidden: true,
                        ui: 'small',
                        width: 25,
                        iconMask: true,
                        text: '+',
                        flex: 0
                    }
                ]
            },
            {
                xtype: 'container',
                itemId: 'selectContainer',
                ui: '',
                flex: 0,
                items: [
                    {
                        xtype: 'list',
                        cls: [
                            'mailSearchList'
                        ],
                        height: 0,
                        itemId: 'searchList',
                        scrollable: false,
                        itemTpl: [
                            '<div class="mailSearchListEntry">{text}</div>'
                        ],
                        loadingText: ' ',
                        store: 'MailSearchStore'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onInputFieldKeyup',
                event: 'keyup',
                delegate: '#inputField'
            },
            {
                fn: 'onInputFieldAction',
                event: 'action',
                delegate: '#inputField'
            },
            {
                fn: 'onInputFieldClearicontap',
                event: 'clearicontap',
                delegate: '#inputField'
            },
            {
                fn: 'onInputFieldBlur',
                event: 'blur',
                delegate: '#inputField'
            },
            {
                fn: 'onInputContainerTap',
                event: 'tap',
                delegate: '#inputContainer'
            },
            {
                fn: 'onSearchListSelect',
                event: 'select',
                delegate: '#searchList'
            },
            {
                fn: 'onContainerInitialize',
                event: 'initialize'
            }
        ]
    },

    onInputFieldKeyup: function(textfield, e, options) {
        this.theTextField = textfield;
        console.log(e.browserEvent.keyCode);

        if (textfield.getValue().length == 0) {
            if (e.browserEvent.keyCode == 8 && this.lastInputValue.length == 0) {
                //backspace on empty field
                if (!this.selectedItem) {
                    //first time, select last item
                    console.log("sel");
                    this.selectLastField();
                    this.deleteField();
                }
                else {
                    //delete last item
                    console.log("del");
                    this.deleteField();
                }
            }
            else {
                this.deselectField();
            }
        }
        else if (e.browserEvent.keyCode == 13) {
            var eml = textfield.getValue();
            if (Ext.util.Format.trim(eml).length>0) {
                textfield.setValue('');
                this.search(true);
                this.addField(eml, eml);
            }
            else {
                textfield.setValue('');
                return false;
            }
        }
        else {
            this.deselectField();
        }

        this.search();


    },

    onInputFieldAction: function(textfield, e, options) {

    },

    onInputFieldClearicontap: function(text, e, options) {
        var me = this;
        setTimeout(function() {
            me.search(true);
        }, 200);
    },

    onInputFieldBlur: function(textfield, e, options) {
        //textfield.focus();
        //textfield.focus();
        /*
        var theInpId = this.down('#inputField').element.down('input').id;
        document.getElementById(theInpId).focus();
        */
    },

    onInputContainerTap: function(container) {
        alert('tap');
    },

    onSearchListSelect: function(dataview, record, options) {
        var eml = record.get("value");
        this.addField(eml, eml);
        this.down('#inputField').setValue('');
        this.search(true);


    },

    onContainerInitialize: function(component, options) {
        this.inputEmptyCounter = 0;
        this.lastInputValue = "";
        this.inputItems = new Array();
        this.selectedItem = null;
        this.theTextField = null;
        this.hasSearchResults = false;

        var me = this;
        var store = this.down('#searchList').getStore();

        store.on('load', function(store, records) {
            me.inSearch = false;
            var amnt = records.length;
            setTimeout(function() {
                me.down('#searchList').setHeight(amnt*30);
            },200);
        });

        this.handleInpField();

        this.down('#inputContainer').element.on('tap', function() {
            var theInpId = me.down('#inputField').element.down('textarea').id;
            document.getElementById(theInpId).focus();
        });
    },

    search: function(force) {
        if (!this.inSearch || force) {

            var store = this.down('#searchList').getStore();
            this.handleInpField();
            var value = this.down('#inputField').getValue();
            this.lastInputValue = value;

            if (value.length == 0) {
                var me = this;
                setTimeout(function() {
                    me.down('#searchList').setHeight(0);
                },200);
            }
            else {
                this.inSearch = true;
                store.load({
                    params: {    
                        query: value
                    }
                });
            }
        }
    },

    focusField: function() {
        var me = this;
        var theInpId = me.down('#inputField').element.down('textarea').id;
        document.getElementById(theInpId).focus();

    },

    handleInpField: function() {
        var value = this.down('#inputField').getValue();

        if (value.length > 7 || this.inputItems.length == 0) {
            //resize the input field
            this.down('#inputField').removeCls('searchInpFieldSmall');
            this.down('#inputField').addCls('searchInpFieldLarge');
        }
        else {
            this.down('#inputField').removeCls('searchInpFieldLarge');
            this.down('#inputField').addCls('searchInpFieldSmall');
        }

    },

    addField: function(text, value) {
        var inpC = this.down('#inputContainer');

        var selField = Ext.create('ACMobile.view.SelectedField', {
            html: text
        });
        selField.theParent = this;

        inpC.insert(this.inputItems.length, selField);
        this.inputItems[this.inputItems.length] = selField;

        var me = this;
        me.theTextField.focus();

    },

    selectField: function(field) {
        if (this.selectedItem) {
            this.deselectField();
        }
        field.addCls('inputFieldSelected');
        this.selectedItem = field;
        this.focusField();
    },

    deselectField: function() {
        if (this.selectedItem != null) {
            this.selectedItem.removeCls('inputFieldSelected');
            this.selectedItem = null;
        }
    },

    selectLastField: function() {
        if (this.inputItems.length > 0) {
            var lastItem = this.inputItems[this.inputItems.length-1];
            this.selectField(lastItem);
        }
    },

    deleteField: function() {
        var inpC = this.down('#inputContainer');
        inpC.remove(this.selectedItem, true);
        var numb = -1;
        for (var i=0;i<this.inputItems.length;i++) {
            if (this.inputItems[i] == this.selectedItem) {
                numb = i;
                break;
            }
        }

        if (numb >= 0) {
            this.inputItems.splice(numb, 1);
        }
        this.selectedItem = null;

    }

});