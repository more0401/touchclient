/*
 * File: app/view/MainPanel.js
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

Ext.define('ACMobileClient.view.MainPanel', {
    extend: 'Ext.Panel',

    config: {
        cls: 'page',
        padding: 0,
        style: '',
        styleHtmlContent: true,
        ui: 'light',
        hideOnMaskTap: false,
        layout: {
            type: 'card'
        },
        tpl: [
            '<h2>Test</h2>',
            'blablabla'
        ],
        listeners: [
            {
                fn: 'onPanelShow',
                event: 'show'
            },
            {
                fn: 'onContentContainerAdd',
                event: 'add',
                delegate: '#contentContainer'
            }
        ],
        items: [
            {
                xtype: 'container',
                itemId: 'contentContainer',
                style: 'font-size:1.25em',
                ui: 'light',
                layout: {
                    type: 'fit'
                },
                items: [
                    {
                        xtype: 'container',
                        itemId: 'content',
                        layout: {
                            animation: 'slide',
                            type: 'card'
                        }
                    }
                ]
            }
        ]
    },

    onPanelShow: function(component, eOpts) {
        var me = this;

        MyGlobals.mainPanel = me;

        //create the menu panel
        var men = null;
        if (MyGlobals.isPhone) {
            men = Ext.create("ACMobileClient.view.MenuPanel", {});
        }
        else {
            men = Ext.create("ACMobileClient.view.MenuPanel", {
                modal: true,
                hideOnMaskTap: true
            });
        }
        men.internInit();

        //remember the panel in the globals to reuse it on another place
        MyGlobals.menuPanel = men;    
        me.add(men);

        men.navigateToFolder('', "Start", true, this.down('#documentsBar'));

        if (MyGlobals.isPhone) {
            men.setStyle("font-size:1.25em");
            me.setActiveItem(men);
        }

        //register event for orientation change
        Ext.Viewport.on('orientationchange', 'handleOrientationChange', me,  {buffer: 50 });

        //get the preview container
        var contentContainer = me.down('#contentContainer');
        MyGlobals.contentContainer = contentContainer;

        if (!MyGlobals.isPhone) {
            var logoContainer = Ext.create("ACMobileClient.view.LogoContainer", {});
            logoContainer.persistent = true;
            MyGlobals.lastObjectInContentContainer = logoContainer;
            me.loadContentContainer(logoContainer, true, false, "Start");
            //contentContainer.down('#content').add(logoContainer);
        }

        //end preview module init

        //init the view
        me.handleOrientationChange();

        me.showMenuPanel();

        MyGlobals.menuPanel.loadEventAssistanceCount();

        me.loadQuickSearchAreas();

    },

    onContentContainerAdd: function(container, item, index, eOpts) {
        this.down('#contentContainer').setMasked(false);
    },

    handleOrientationChange: function() {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            //alert("Orient change: "+Ext.Viewport.getOrientation());

            var men = MyGlobals.menuPanel;
            //var listButton = me.down('#listButton');
            //var backButton = me.down('#backButton');
            //men.hide();
            var isAndroidTablet = false;
            if (Ext.os.deviceType === 'Tablet' && !Ext.os.is.iOS) {
                isAndroidTablet = true;
            }


            if (MyGlobals.isPhone) {
                //men.show();
                //backButton.show();
                //listButton.hide();
                MyGlobals.showListButton = false;
            }
            else if ((Ext.Viewport.getOrientation() == 'portrait' && !isAndroidTablet) || (Ext.Viewport.getOrientation() != 'portrait' && isAndroidTablet)) {
                var height=me.element.getHeight();
                men.setDocked(null);
                men.setTop(5);
                men.setLeft(5);
                men.setHeight(height-70);
                men.setWidth(315);
                //men.setStyle(null);
                men.removeCls("MenuBorder");
                men.hide();

                //this.down("#toolbarRight").setStyle("font-size: 1.25em;");

                //listButton.show();
                MyGlobals.showListButton = true;
                //backButton.hide();
            }
            else {
                men.setDocked("left");
                men.setTop(null);
                men.setLeft(null);
                //men.setStyle("border-right: 1px solid #000 !important;");
                men.setCls("MenuBorder");
                men.setHeight(null);
                men.setWidth(315);

                //this.down("#toolbarRight").setStyle("font-size: 1.25em;");
                men.show();
                //listButton.hide();
                MyGlobals.showListButton = false;
                //backButton.hide();
            }

            if (MyGlobals.imageViewer) {
                MyGlobals.imageViewer.reloadViewer();
            }

            //reload content elements
            var cont = me.down('#content');
            var items = cont.items;
            var itemLen = items.length;
            for (var i=0;i<itemLen;i++) {
                var el = cont.getAt(i);
                if (el.doRepaint) {
                    el.doRepaint();
                }
            }

            me.restoreSidePanel();


            Ext.repaint();
        });
    },

    showInfoPanel: function(button) {
        var iPanel = Ext.create('ACMobileClient.view.InfoPanel', {});
        this.add(iPanel);
        iPanel.hide();

        if (MyGlobals.isPhone) {
            this.getLayout().setAnimation({
                type: 'slide',
                direction: 'left'
            });
            this.setActiveItem(iPanel);    
        }
        else {
            var height=this.element.getHeight();
            iPanel.setDocked(null);
            iPanel.setTop(5);
            iPanel.setLeft(5);
            iPanel.setHeight(height-80);
            iPanel.setWidth(315);

            iPanel.showBy(button);
        }

        MyGlobals.infoPanel = iPanel;

    },

    hideInfoPanel: function() {
        this.getLayout().setAnimation({
            type: 'slide',
            direction: 'right'
        });

        var items = this.getInnerItems();

        this.setActiveItem(items.length-2);
        //is remove, when info is shown next time
        //this.remove(MyGlobals.infoPanel, true);    

    },

    showInfoPanelSlided: function(objectId, noteId, className) {
        if (MyGlobals.infoPanel) {
            //MyGlobals.infoPanel.hide();
            this.remove(MyGlobals.infoPanel, true);
            MyGlobals.infoPanel = null;
        }

        var iPanel = Ext.create('ACMobileClient.view.InfoPanel', {});
        iPanel.load(objectId);


        if (className && className == 'noteobject') {
            //switch not note view
            iPanel.showNote(noteId);
        }

        this.add(iPanel);
        iPanel.hide();
        var me = this;

        iPanel.loadCallback = function() {
            if (MyGlobals.isPhone) {
                me.getLayout().setAnimation({
                    type: 'slide',
                    direction: 'left'
                });
                me.setActiveItem(iPanel);    
            }
            else {
                var height=me.element.getHeight();
                var width = me.down('#contentContainer').element.getWidth();
                iPanel.setDocked(null);
                iPanel.setShowAnimation("slideIn");
                iPanel.setHideAnimation({
                    type: 'slideOut',
                    direction: 'right'
                });
                iPanel.setTop(0);
                iPanel.setLeft(width-320);
                iPanel.setHeight(height);
                iPanel.setWidth(320);
                iPanel.addCls('shadowPanel');

                //iPanel.showBy(button);
                iPanel.show();
            }
        }

        MyGlobals.infoPanel = iPanel;

    },

    restoreSidePanel: function() {
        if (MyGlobals.infoPanel) {
            if (!MyGlobals.isPhone) {
                var iPanel = MyGlobals.infoPanel;
                var height=this.element.getHeight();
                var width = this.down('#contentContainer').element.getWidth();
                iPanel.setDocked(null);
                iPanel.setShowAnimation("slideIn");
                iPanel.setHideAnimation({
                    type: 'slideOut',
                    direction: 'right'
                });
                iPanel.setTop(0);
                iPanel.setLeft(width-320);
                iPanel.setHeight(height);
                iPanel.setWidth(320);

                //iPanel.showBy(button);
            }
        }


    },

    loadQuickSearchAreas: function() {
        MyGlobals.areaIds = "";
        var theOr = "";

        Ext.Ajax.request({
            url: '/api/rest/object.json',
            method: 'get',
            params: { 
                sessionId: MyGlobals.sessionId,
                provider: 'area',
                source: 'MAIN_MODULE_MANAGEMENT/mobileclient/control/areas',
                page: 1,
                start: 0,
                limit: 2000,
                noCache: new Date().getTime()
            },
            success: function(response) {
                var jsonResp = Ext.decode(response.responseText);
                var areas = jsonResp.data;
                for (var i=0;i<areas.length;i++) {
                    MyGlobals.areaIds += theOr+"inpath:"+areas[i].id;
                    theOr = " OR ";
                }
            },
            failure: function() {
            },
            scope: this
        });

    },

    showMenuPanel: function() {
        if (MyGlobals.isPhone) {
            //MyGlobals.menuPanel.down("#documentList").deselectAll();

            //Reverse the slide direction before using setActiveItem()
            this.getLayout().setAnimation({
                type: 'slide',
                direction: 'right'
            });
            this.setActiveItem(MyGlobals.menuPanel);
        }
    },

    showInContentContainer: function() {
        if (MyGlobals.isPhone) {

            //MyGlobals.contentContainer.setShowAnimation("slideIn");
            this.getLayout().setAnimation({
                type: 'slide',
                direction: 'left'
            });

            this.setActiveItem(MyGlobals.contentContainer);
        }
    },

    loadLanguage: function() {

    },

    showLoader: function() {
        this.down('#contentContainer').setMasked({ 
            xtype: 'loadmask', 
            message: 'loading' 
        });
    },

    hideLoader: function() {
        this.down('#contentContainer').setMasked(false);
    },

    loadPrevPage: function() {
        if (MyGlobals.imageViewer.pageNumber > 1)
        this.showPreview(MyGlobals.imageViewer.objectId,  MyGlobals.imageViewer.pageNumber-1);

    },

    loadNextPage: function() {
        if (MyGlobals.imageViewer.pageCount > MyGlobals.imageViewer.pageNumber)
        this.showPreview(MyGlobals.imageViewer.objectId,  MyGlobals.imageViewer.pageNumber+1);

    },

    loadContentContainer: function(container, persistent, hasPrevious, navTitle) {
        var cont = MyGlobals.contentContainer.down('#content');
        var lastObj = MyGlobals.lastObjectInContentContainer;

        var items = cont.items;
        var itemLen = items.length;

        if (!persistent && lastObj != null && !lastObj.persistent) {
            itemLen--;
            setTimeout(function() {
                console.log("removing last: "+lastObj);
                cont.remove(lastObj, true);
            }, 1000);
        }

        if (cont.getLayout && cont.getLayout().setAnimation) {
            cont.getLayout().setAnimation({
                type: 'slide',
                direction: 'left'
            });
        }

        var contCon = Ext.create('ACMobileClient.view.ContentContainer', {});
        contCon.hasPrevious = hasPrevious;
        if (hasPrevious) {
            if (itemLen > 0) {
                contCon.navTitle =  cont.getAt(itemLen-1).prevNavTitle;
            }
        }

        contCon.persistent = container.persistent;
        contCon.add(container);


        //MyGlobals.contentContainer.remove(MyGlobals.lastObjectInContentContainer, false);
        cont.add(contCon);
        cont.setActiveItem(contCon);
        contCon.prevNavTitle = navTitle;
        MyGlobals.lastObjectInContentContainer = contCon;
        this.showInContentContainer();

        //hide menu panel when showing something in container
        setTimeout(function() {
            if (MyGlobals.showListButton)  {
                var men = MyGlobals.menuPanel;
                men.deselectAllLists();
                men.hide();
            }
        }, 20);

    },

    showPreview: function(objectId, page, persistent) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            //precreate a preview container
            var previewContainer = Ext.create("ACMobileClient.view.PreviewContainer", {});
            MyGlobals.previewContrainer = previewContainer;
            previewContainer.down('#previewCarousel').loadPreview(objectId, page, previewContainer);

            me.loadContentContainer(previewContainer,persistent,true,"Document");
        });
    },

    showText: function(objectId, persistent) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            var textView = Ext.create("ACMobileClient.view.TextViewContainer", {});
            textView.load(objectId);
            me.loadContentContainer(textView,persistent,true,"Document");
        });
    },

    switchToRoot: function(obj) {
        console.log("switch to root");

        //reset to root
        //remove all other items
        obj.getLayout().setAnimation({
            type: 'slide',
            direction: 'right'
        });


        var items = obj.getInnerItems();
        var itArr = new Array();
        var len = items.length;
        for (var i=0;i<len-1;i++) {
            itArr[i] = items[i+1];
        }

        obj.setActiveItem(0);
        var me = obj;
        setTimeout(function() {
            var len = itArr.length;
            for (var i=0;i<len;i++) {
                me.remove(itArr[i], true);
            }
        },500);

    },

    showMail: function(objectId, persistent) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            var mailView = Ext.create("ACMobileClient.view.MailViewContainer", {});
            mailView.load(objectId);
            me.loadContentContainer(mailView,persistent,true,"Mail");
        });
    },

    handleObject: function(classObject, objectId, name, persistent, record) {
        var me = this;
        ACUtils.utils.checkConnectionWithFunction(function() {
            var previewAble = record.get("previewable");
            var textAvailable = record.get("textavailable");
            var isFolder = record.get("isfolder");

            if (classObject==="mailobject") {
                me.showMail(objectId, persistent);
            }
            else if (previewAble) {
                me.showPreview(objectId,1,persistent);
            }
            else if (textAvailable) {
                me.showText(objectId,persistent);
            }
            else if (isFolder) {
                var tab = MyGlobals.menuPanel.down('#tabPanel').getActiveItem();
                //MyGlobals.menuPanel.down('#tabPanel').setActiveItem(me.down('#documentsBar'));

                MyGlobals.menuPanel.navigateToFolder(objectId, name, false, tab);
            }
            else {
                Ext.Msg.alert('Error', 'Für dieses Objekt ist derzeit noch keine Anzeige erstellt: '+classObject, Ext.emptyFn);   
            }

        });
    },

    contentContainerBack: function() {
        var cont = MyGlobals.contentContainer.down('#content');

        var lastObj = MyGlobals.lastObjectInContentContainer;

        //MyGlobals.contentContainer.remove(MyGlobals.lastObjectInContentContainer, false);

        cont.getLayout().setAnimation({
            type: 'slide',
            direction: 'right'
        });


        var items = cont.items;
        MyGlobals.lastObjectInContentContainer = cont.getAt(items.length - 2);

        if (items.length == 1 && MyGlobals.isPhone) {
            this.showMenuPanel();

            setTimeout(function() {
                cont.remove(cont.getActiveItem(), true);
            }, 1000);    


            MyGlobals.menuPanel.deselectAllLists();
        }
        else {
            cont.remove(cont.getActiveItem(), true);
            if (items.length > 1) {
                if (items.length == 2) {
                    if (MyGlobals.menuPanel) {
                        MyGlobals.menuPanel.deselectAllLists();
                    }
                }
                cont.setActiveItem(items.length-2);
            }
        }
    }

});