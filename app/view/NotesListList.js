/*
 * File: app/view/NotesListList.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('ACMobileClient.view.NotesListList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.NotesListList',

    config: {
        cls: 'notesContainer',
        ui: 'round',
        disableSelection: true,
        plugins: [
            {
                autoPaging: true,
                loadMoreText: 'Mehr laden...',
                noMoreRecordsText: '',
                type: 'listpaging'
            },
            {
                refreshFn: function(plugin) {
                    ACUtils.utils.checkConnectionWithFunction(function() {
                        plugin.up().setMasked({
                            xtype: 'loadmask',
                            message: 'Refreshing...'
                        });
                        plugin.up().getStore().loadPage(1);
                    });
                },
                loadingText: 'Lade...',
                pullRefreshText: 'Zum Aktualisieren ziehen',
                releaseRefreshText: 'Zum Aktualisieren loslassen',
                type: 'pullrefresh'
            }
        ]
    }

});