/*
 * File: app/view/ContentContainer.js
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

Ext.define('ACMobileClient.view.ContentContainer', {
    extend: 'Ext.Container',
    alias: 'widget.contentContainer',

    requires: [
        'ACMobileClient.view.ContentContainerBar'
    ],

    config: {
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'contentContainerBar',
                itemId: 'titleBar'
            }
        ],
        listeners: [
            {
                fn: 'onContainerInitialize',
                event: 'initialize'
            },
            {
                fn: 'onContainerPainted',
                event: 'painted'
            }
        ]
    },

    onContainerInitialize: function(component, eOpts) {

    },

    onContainerPainted: function(component, eOpts) {
        if (!this.loaded) {
            if (this.hasPrevious) {
                this.down('#titleBar').down('#backButton').show();
                console.log("nav: "+this.navTitle);

                if (!this.navTitle || this.navTitle == "Start") {
                    this.down('#titleBar').down('#backButton').setText("");
                    this.down('#titleBar').down('#backButton').setIconCls("gohome");
                }
                else {
                    this.down('#titleBar').down('#backButton').setText(this.navTitle);
                    this.down('#titleBar').down('#backButton').setIconCls(null);

                }
            }
            else {
                this.down('#titleBar').down('#backButton').hide();
            }
            this.loaded = true;
        }
    },

    doRepaint: function() {
        this.down('#titleBar').doRepaint();
    }

});