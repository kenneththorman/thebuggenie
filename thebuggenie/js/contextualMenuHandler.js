TIC._run_jQuery_style(function($){
    TIC.classes.ContextualMenu = function(){
        
    }

    TIC.classes.ContextualMenuHandler = function(){
        var _this = this,
            menus = {},
            items_for_mass_assign = false;
        
        /*
        *   Creates the menu for mass assignment if it dose not exist
        */
        var createMenuForMassAssign = function(){
            if( ('mass_assign' in menus) && menus.mass_assign ) return false;
            
            menus['mass_assign'] = true;
            $.contextMenu({
                selector: '.results_container td', 
                callback: function(key, options) {
                    var clicked = key.split('|');
                    if(clicked[0]){
                        $('#bulk_action_selector_bottom').val(clicked[0]).trigger('onchange');
                        $('#bulk_action_selector_top').val(clicked[0]).trigger('onchange');
                    }
                    if(clicked[1]){
                        $('#bulk_action_subcontainer_'+clicked[0]+'_top select').val(clicked[1]).trigger('onchange');
                        $('#bulk_action_subcontainer_'+clicked[0]+'_bottom select').val(clicked[1]).trigger('onchange');
                    }
                    if($('#bulk_action_form_top').submit().length == 0) $('#bulk_action_form_bottom').submit()
                },
                events:{
                    show:function(opt){
                        var el = this.closest('tr').find('input[type=checkbox]').attr('checked',true);
                        TBG.Search.toggleCheckbox(el.get(0));
                    }
                },
                items:getContextMenuItemsForMassAssign()
            });
            
            return true;
        }
        /*
        * 
        */
        var getContextMenuItemsForMassAssign = function(){
            if(!items_for_mass_assign){
                items_for_mass_assign = {};
                $('select#bulk_action_selector_bottom option').each(function(i,el){
                    if(el.value){
                        items_for_mass_assign[el.value] = {
                            name:el.innerHTML,
                            icon:''
                        };
                        var items = getContextMenuSubItemsForMassAssignForItem(el.value);
                        if(items)
                            items_for_mass_assign[el.value].items = items;
                    }
                });
            }
            return items_for_mass_assign;
        }
        /*
        * 
        */
        var getContextMenuSubItemsForMassAssignForItem = function(item_id){
            var container = $('#bulk_action_subcontainer_'+item_id+'_top');
            if(container.length==0) container = $('#bulk_action_subcontainer_'+item_id+'_bottom');
            if(container.length==0) return false;
            var items = {},ret = false;
            container.find('option').each(function(i,el){
                if(el.value){
                    ret = true;
                    items[item_id+'|'+el.value] = {
                        name:el.innerHTML,
                        icon:''
                    };
                }
            });
            return ret ? items : false;
        };
        /*
        *   Iitialize the handler
        */
        this.init = function(){
            createMenuForMassAssign();
        }
    }

    TIC.objects.push(new TIC.classes.ContextualMenuHandler());
});
