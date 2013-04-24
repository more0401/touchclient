/*
 * File: app/view/PreviewCarousel.js
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

Ext.define('ACMobileClient.view.PreviewCarousel', {
    extend: 'Ext.carousel.Carousel',
    alias: 'widget.mycarousel',

    requires: [
        'ACMobileClient.view.ImageViewer'
    ],

    config: {
        itemId: 'mycarousel',
        listeners: [
            {
                fn: 'onMycarouselActiveItemChange',
                event: 'activeitemchange'
            },
            {
                fn: 'onMycarouselRemove',
                event: 'remove'
            }
        ]
    },

    onMycarouselActiveItemChange: function(container, value, oldValue, eOpts) {
        var me = this;
        if (!this.isBeingRemoved) {
            ACUtils.utils.checkConnectionWithFunction(function() {
                if (oldValue) {
                    oldValue.viewerHidden();
                }
                if (value) {
                    console.log("itemChange 1");
                    if (me.secondTime) {
                        value.viewerShown();
                    }
                    me.secondTime = true;
                    console.log("itemChange 2");
                }
            });
        }
    },

    onMycarouselRemove: function(container, item, index, eOpts) {
        console.log("removing");
        this.isBeingRemoved = true;
    },

    initialize: function() {
        this.locked = true;
        this.onDragOrig = this.onDrag;
        this.onDrag = function (e) { 
            if(!this.locked) {
                this.onDragOrig(e);  
            } 
        };
    },

    loadPreview: function(objectId, page, parentContainer) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            var imageViewerContainer,
                imageViewer,
                pageCount = 0,
                imageCarousel = me,
                previewStore;

            me.enableWipe(true);
            me.removeAll(true, false);

            //put in there the ImageViewer-Preview-Module
            imageViewerContainer = Ext.create("ACMobileClient.view.ImageViewerContainer", {});
            imageViewer = Ext.create("ACMobileClient.view.ImageViewer", {});

            imageViewer.caller = me;
            imageViewer.parentContainer = parentContainer;
            imageViewer.imageViewerContainer = imageViewerContainer;
            imageViewer.loadNext = true;

            imageViewerContainer.imageViewer = imageViewer;
            imageViewerContainer.add(imageViewer);
            me.add(imageViewerContainer);
            me.setActiveItem(imageViewerContainer);

            me.on('activeitemchange', me.onMycarouselActiveItemChange, me, {});
            imageViewerContainer.showLoader();

            //load first image
            console.log('load preview 1: '+objectId+", "+page);


            previewStore = Ext.create('ACMobileClient.store.PreviewStore', {});
            previewStore.source = objectId;
            previewStore.page = page;

            previewStore.on('load', function() {
                var mdl = previewStore.getAt(0),
                    ticket, pageCount, lastImageViewer, i, imageViewerContainer2, imageViewer2;

                if (!mdl) {
                    console.log("preview 1 failed");
                    return;
                }
                ticket = mdl.get('ticket');
                pageCount = previewStore.getTotalCount();
                lastImageViewer = imageViewer;

                console.log("preview 1 finished");
                console.log('ticket: ' + ticket + ', ' + pageCount);

                parentContainer.setPageLabel(page, pageCount);

                //all other images
                for (i = 1; i < pageCount; ++i) {
                    console.log("init next page: ", i);

                    imageViewerContainer2 = Ext.create("ACMobileClient.view.ImageViewerContainer", {});
                    imageViewer2 = Ext.create("ACMobileClient.view.ImageViewer", {});

                    imageViewerContainer2.imageViewer = imageViewer2;
                    imageViewer2.imageViewerContainer = imageViewerContainer2;
                    imageViewer2.caller = imageCarousel;
                    lastImageViewer.nextImageViewer = imageViewer2;
                    lastImageViewer = imageViewer2;
                    imageViewer2.page = i+1;
                    imageViewer2.pageCount = pageCount;
                    imageViewer2.objectId = objectId;
                    imageViewerContainer2.showLoader();
                    imageViewer2.parentContainer = parentContainer;
                    imageViewerContainer2.add(imageViewer2);
                    imageCarousel.add(imageViewerContainer2);        
                }

                imageViewer.loadImageFromServer(ticket, pageCount, page, objectId);

            });

            //now load the preview
            previewStore.load();

        });
    },

    enableWipe: function(enabled) {
        this.locked = !enabled;
    }

});