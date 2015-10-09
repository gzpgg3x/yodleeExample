$(function () {

    $.clearNofications = function (element) {
        $(element).find("div.notifications").html("").hide();
    }

    $.maskLoading = function (selector, opt) {
        if (opt.showLoading) {
            $(selector).attr("disabled", "disabled").text(opt.msg).val(opt.msg);
        } else {
            $(selector).removeAttr("disabled").text(opt.msg).val(opt.msg);
        }
    }


    $.isUndefined = function (ref) {
        return typeof (ref) === 'undefined';
    }

    $.getNewTextArea = function (referenceId) {
        return CodeMirror.fromTextArea(document.getElementById(referenceId), {
            theme: "eclipse",
            lineWrapping: true,
            lineNumbers: true,
            mode: "application/json"
        });
    }


    //initialize TextArea's
    var editCobSessionToken = $.getNewTextArea("response-cobSessionToken");
    var editUserSessionToken = $.getNewTextArea("response-userSessionToken");
    var editUserSessionToken_refresh_site = $.getNewTextArea("response-userSessionToken-refresh-site");
    var editUserSessionToken_update_site = $.getNewTextArea("response-userSessionToken-update-site");
    var editUserSessionToken_delete_site = $.getNewTextArea("response-userSessionToken-delete-site");

    var editSearchSite = $.getNewTextArea("response-searchSite");
    var editGetSiteInfo = $.getNewTextArea("response-getSiteInfo");
    var editGetSiteLoginForm = $.getNewTextArea("response-getSiteLoginForm");
    var editAddSiteAccount = $.getNewTextArea("response-addSiteAccount");
    var editGetSiteRefreshInfo = $.getNewTextArea("response-getSiteRefreshInfo");
    var editGetMFAResponseForSite = $.getNewTextArea("response-getMFAResponseForSite");
    var editPutMFARequestForSite = $.getNewTextArea("response-putMFARequestForSite");
    var editGetItemSummaries = $.getNewTextArea("response-getItemSummaries");

    var editStartSiteRefresh = $.getNewTextArea("response-startSiteRefresh");
    var editGetSiteRefreshInfo_refresh_site = $.getNewTextArea("response-getSiteRefreshInfo-refresh-site");
    var editGetMFAResponseForSite_refresh_site = $.getNewTextArea("response-getMFAResponseForSite-refresh-site");
    var editPutMFARequestForSite_refresh_site = $.getNewTextArea("response-putMFARequestForSite-refresh-site");

    var editGetSiteAccounts_api_refresh = $.getNewTextArea("response-getSiteAccounts-api-refresh");
    var editGetSiteInfo_api_update_site_account = $.getNewTextArea("response-getSiteInfo-api-update-site-account");
    var editGetSiteLoginForm_api_update_site_account = $.getNewTextArea("response-getSiteLoginForm-api-update-site-account");
    var editGetSiteAccounts_api_update_site_account = $.getNewTextArea("response-getSiteAccounts-api-update-site-account");
    var editUpdateSiteAccountCredentials = $.getNewTextArea("response-updateSiteAccountCredentials-api-update-site-account");
    var editGetSiteRefreshInfo_api_update_site_account = $.getNewTextArea("response-getSiteRefreshInfo-api-update-site-account");
    var editGetMFAResponseForSite_api_update_site_account = $.getNewTextArea("response-getMFAResponseForSite-api-update-site-account");
    var editPutMFARequestForSite_api_update_site_account = $.getNewTextArea("response-putMFARequestForSite-api-update-site-account");

    var editGetSiteAccounts_api_delete_site_account = $.getNewTextArea("response-getSiteAccounts-api-delete-site-account");

    var editSearchContentServices_api_add_account = $.getNewTextArea("response-searchContentServices-api-add-account");
    var editUserSessionToken_add_account = $.getNewTextArea("response-userSessionToken-add-account");
    var editGetContentServiceInfo1_api_add_account = $.getNewTextArea("response-getContentServiceInfo1-api-add-account");
    var editGetLoginFormForContentService_api_add_account = $.getNewTextArea("response-getLoginFormForContentService-api-add-account");
    var editAddItemForContentService1_api_add_account = $.getNewTextArea("response-addItemForContentService1-api-add-account");
    var editgetRefreshInfo1_api_add_account = $.getNewTextArea("response-getRefreshInfo1-api-add-account");
    var editIsItemRefreshing_api_add_account = $.getNewTextArea("response-isItemRefreshing-api-add-account");
    var editStartRefresh7_api_add_account = $.getNewTextArea("response-startRefresh7-api-add-account");
    var editGetMFAResponse_api_add_account = $.getNewTextArea("response-getMFAResponse-api-add-account");
    var editPutMFARequest_api_add_account = $.getNewTextArea("response-putMFARequest-api-add-account");

    var editUserSessionToken_api_refresh_account = $.getNewTextArea("response-userSessionToken-refresh-account");
    var editGetItemSummariesWithoutItemData_api_refresh_account = $.getNewTextArea("response-getItemSummariesWithoutItemData-api-refresh-account");
    var editIsItemRefreshing_api_refresh_account = $.getNewTextArea("response-isItemRefreshing-api-refresh-account");
    var editGetContentServiceInfo1_api_refresh_account = $.getNewTextArea("response-getContentServiceInfo1-api-refresh-account");
    var editgetRefreshInfo1_api_refresh_account = $.getNewTextArea("response-getRefreshInfo1-api-refresh-account");
    var editGetItemSummaryForItem1_api_refresh_account = $.getNewTextArea("response-getItemSummaryForItem1-api-refresh-account");
    var editStartRefresh7_api_refresh_account = $.getNewTextArea("response-startRefresh7-api-refresh-account");
    var editGetMFAResponse_api_refresh_account = $.getNewTextArea("response-getMFAResponse-api-refresh-account");
    var editPutMFARequest_api_refresh_account = $.getNewTextArea("response-putMFARequest-api-refresh-account");

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Cobrand Session Token
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-cobSession-Token").click(function () {
        $.clearNofications("div.cobSessionToken");

        if ($("#cobrandLogin").val() == "") {
            alert("You must Enter the cobrandLogin");
            $("#cobrandLogin").focus();
            return false;
        }

        if ($("#cobrandPassword").val() == "") {
            alert("You must Enter the cobrandPassword");
            $("#cobrandPassword").focus();
            return false;
        }

        $.maskLoading(this, { showLoading: true, msg: "Loading..." });

        $.ajax({
            method: "POST",
            data: {"cobrandLogin" : $("#cobrandLogin").val(),
            "cobrandPassword" : $("#cobrandPassword").val()},
            url: "/coblogin",
            success: function(data)  {
                try {
                    var response = data;
      
                    if (!$.isUndefined(response.cobrandConversationCredentials.sessionToken)) {
                        $("#cobSessionToken, input.ref-cobSessionToken").val(response.cobrandConversationCredentials.sessionToken);
                    }
                    if (response.cobrandConversationCredentials.sessionToken != "") {
                        $(".frame-select_api").removeClass("hidden");
                    }
                    editCobSessionToken.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) { }
                $.maskLoading(".btn-cobSession-Token", { showLoading: false, msg: "Get CobSession Token" });

                $('.show-method-cobSessionToken').removeClass('hidden');
                $('.hide-method-cobSessionToken').addClass('hidden');
                $('.cobSessionToken').addClass('hidden');
                $('.btn-cobSession-Token').addClass('hidden');

                 $('.hide-method-frame-select_api').removeClass('hidden');
            }
        });
        return false;
    });

    $('.btn-select-flow').click(function (e) {
        var class_name_api = $(this).attr('flow');
        $('.api_hidden').addClass("hidden");
        $('.' + class_name_api).removeClass("hidden");

        $('.show-method-frame-select_api').removeClass('hidden');
        $('.hide-method-frame-select_api').addClass('hidden');

        $('.frame-select_api').addClass('hidden');
        $('.btn-select-flow').addClass('disabled');
        
        $('.hide-method-userSessionToken').removeClass('hidden');

    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get User Session Token
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-userSession-Token").click(function (e) {
        $.clearNofications("div.userSessionToken");

        if ($("#login").val() == "") {
            alert("You must Enter the User name");
            $("#cobrandLogin").focus();
            return false;
        }

        if ($("#password").val() == "") {
            alert("You must Enter the password");
            $("#passoword").focus();
            return false;
        }

        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token first.");
            return false;
        }      

        var api_type = $(this).attr("api_type");
        $.maskLoading(this, { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            data: {
                'login': $("#login").val(),
                'password': $("#password").val(),
                'cobSessionToken': $("#cobSessionToken").val()
            },
            url: "login",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (!$.isUndefined(response.userContext.conversationCredentials.sessionToken)) {
                        $("#userSessionToken, input.ref-userSessionToken").val(response.userContext.conversationCredentials.sessionToken);
                    }
                    if (response.userContext.cobrandId != '') {
                        $(".frame-searchSite").removeClass("hidden");                        
                    }
                    if (api_type == "refresh") {
                        $(".frame-getSiteAccounts-api-refresh").removeClass("hidden");                     

                        $('.hide-method-frame-getSiteAccounts-api-refresh').removeClass('hidden');

                    } else if (api_type == "update") {
                        $(".frame-getSiteAccounts-api-update-site-account").removeClass("hidden");
                        $('.hide-method-frame-getSiteAccounts-api-update-site-account').removeClass('hidden');
                    }
                    else if (api_type == "delete") {
                        $(".frame-getSiteAccounts-api-delete-site-account").removeClass("hidden");
                        $('.hide-method-frame-getSiteAccounts-api-delete-site-account').removeClass('hidden');
                    }
                    else if (api_type == "add_account") {
                        $(".frame-searchContentServices-api-add-account").removeClass("hidden");
                        $('.hide-method-frame-searchContentServices-api-add-account').removeClass('hidden');
                    }
                    else if (api_type == "refresh_account") {
                        $(".frame-getItemSummariesWithoutItemData-api-refresh-account").removeClass("hidden");
                        $('.hide-method-frame-getItemSummariesWithoutItemData-api-refresh-account').removeClass('hidden');
                    }
                    editUserSessionToken.setOption("value", JSON.stringify(response, null, 4));
                    editUserSessionToken_refresh_site.setOption("value", JSON.stringify(response, null, 4));
                    editUserSessionToken_update_site.setOption("value", JSON.stringify(response, null, 4));
                    editUserSessionToken_delete_site.setOption("value", JSON.stringify(response, null, 4));
                    editUserSessionToken_add_account.setOption("value", JSON.stringify(response, null, 4));
                    editUserSessionToken_api_refresh_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) { }
                $.maskLoading(".btn-userSession-Token", { showLoading: false, msg: "Get UserSession Token" });

                $('.show-method-userSessionToken').removeClass('hidden');
                $('.hide-method-userSessionToken').addClass('hidden');

                $('.userSessionToken').addClass('hidden');
                $('.btn-userSession-Token').addClass('hidden');

                $('.hide-method-frame-searchSite').removeClass('hidden');

            }                
              

        });
        

        return false;
    });


    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Search Site
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-searchSite").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        $("div.searchSite").find(".response").val("");
        $.maskLoading("button.btn-searchSite", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data:{
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'siteSearchString': $("input.ref-SearchSites-siteSearchString").val()
            },
            url: "/searchSite",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;
      
                    $(".frame-list-sites-add-account").removeClass("hidden");

                    var data = '';
                        $.each(response, function (i, item) {
                            data += '<tr>';
                                data += '<td>';
                                    data += item.siteId;
                                data += '</td>';
                                data += '<td>';
                                    data += item.defaultDisplayName;
                                    data += '<button class="btn btn-primary pull-right btn-add-site-api-add-site-account" id="btn_add_site_' + item.siteId + '" name="btn_add_site" data-siteid="' + item.siteId + '"> Add </button>';
                                data += '</td>';
                            data += '</tr>';
                    });
                    if (data != '') {
                        $('.data-list-site-add-site-account').html(data);
                    }
                   
                    editSearchSite.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editSearchSite.setOption("value", response);
                }
                $.maskLoading("button.btn-searchSite", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-searchSite').removeClass('hidden');
                $('.hide-method-frame-searchSite').addClass('hidden');

                $('.frame-searchSite').addClass('hidden');
                $('.btn-searchSite').addClass('hidden');

                $('.hide-method-frame-list-sites-add-account').removeClass('hidden');
            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Site Info
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getSiteInfo").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($(".ref-siteFilter-reqSpecifier").val() == "") {
            alert("You must get the siteFilter.reqSpecifier.");
            return false;
        }
        if ($(".ref-siteFilter-siteId").val() == "") {
            alert("You must get the ref-siteFilter-siteId.");
            return false;
        }

        $("div.getSiteInfo").find(".response").val("");
        $.maskLoading("button.btn-getSiteInfo", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'siteFilter_reqSpecifier': $("input.ref-siteFilter-reqSpecifier").val(),
                'siteFilter_siteId': $("input.ref-siteFilter-siteId").val()
            },
            url: "/getSiteInfo",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;
                    if (response.siteId != '') {
                        $(".frame-getSiteLoginForm").removeClass("hidden");
                    }
                    editGetSiteInfo.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetSiteInfo.setOption("value", response);
                }
                $.maskLoading("button.btn-getSiteInfo", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getSiteInfo').removeClass('hidden');
                $('.hide-method-frame-getSiteInfo').addClass('hidden');
                $('.frame-getSiteInfo').addClass('hidden');
                $('.btn-getSiteInfo').addClass('hidden');

                $('.hide-method-frame-getSiteLoginForm').removeClass('hidden');
            }
        });
        return false;
    });


    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Site Login Form
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getSiteLoginForm").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        $("div.getSiteLoginForm").find(".response").val("");
        $.maskLoading("button.btn-getSiteLoginForm", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'siteId': $("input.ref-getSiteLoginForm-siteId").val()
            },
            url: "/getSiteLoginForm",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response.conjunctionOp.conjuctionOp != '') {

                        $(".frame-addSiteAccount").removeClass("hidden");
                       
                        var html_data = '';
                        $.each(response.componentList, function (i, item){
                            var type = 'text';
                            var value = 'sha5.Investment1';
                            if(item.fieldType.typeName.toLowerCase() == 'if_password' ){
                                type = 'password';
                                value = 'Investment1';
                            }
                            var disabled = 'disabled';
                            if(item.isEditable == 'true'){
                                disabled = '';
                            }
                            html_data += '<label>'+item.displayName+'</label>';
                            html_data += '<input type="'+type+'" name="credentialFields['+i+'].value" class="span13 form-control '+disabled+'" value="'+value+'" placeholder="'+item.displayName+'" /></br>';
                            
                            html_data += '<label class="hidden">credentialFields['+i+'].valueIdentifier</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].valueIdentifier" class="span13 form-control '+disabled+'" value="'+item.valueIdentifier+'1" placeholder="credentialFields['+i+'].valueIdentifier" />';
                            
                            html_data += '<label class="hidden">credentialFields['+i+'].valueMask</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].valueMask" class="span13 form-control '+disabled+'" value="'+item.valueMask+'" placeholder="credentialFields['+i+'].valueMask" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].fieldType.typeName</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].fieldType.typeName" class="span13 form-control '+disabled+'" value="'+item.fieldType.typeName+'" placeholder="credentialFields['+i+'].fieldType.typeName" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].size</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].size" class="span13 form-control '+disabled+'" value="'+item.size+'" placeholder="credentialFields['+i+'].size" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].maxlength</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].maxlength" class="span13 form-control '+disabled+'" value="'+item.maxlength+'" placeholder="credentialFields['+i+'].maxlength" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].fieldInfoType</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].fieldInfoType" class="span13 form-control '+disabled+'" value="'+item.fieldInfoType+'" placeholder="credentialFields['+i+'].fieldInfoType" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].name</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].name" class="span13 form-control '+disabled+'" value="'+item.name+'1" placeholder="credentialFields['+i+'].name" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].displayName</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].displayName" class="span13 form-control '+disabled+'" value="'+item.displayName+'" placeholder="credentialFields['+i+'].displayName" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isEditable</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isEditable" class="span13 form-control '+disabled+'" value="'+item.isEditable+'" placeholder="credentialFields['+i+'].isEditable" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isOptional</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isOptional" class="span13 form-control '+disabled+'" value="'+item.isOptional+'" placeholder="credentialFields['+i+'].isOptional" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isEscaped</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isEscaped" class="span13 form-control '+disabled+'" value="'+item.isEscaped+'" placeholder="credentialFields['+i+'].isEscaped" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].helpText</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].helpText" class="span13 form-control '+disabled+'" value="'+item.helpText+'" placeholder="credentialFields['+i+'].helpText" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isOptionalMFA</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isOptionalMFA" class="span13 form-control '+disabled+'" value="'+item.isOptionalMFA+'" placeholder="credentialFields['+i+'].isOptionalMFA" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isMFA</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isMFA" class="span13 form-control '+disabled+'" value="'+item.isMFA+'" placeholder="credentialFields['+i+'].isMFA" />';                            
                        
                        })
                            html_data += '<label class="hidden">credentialFields.enclosedType</label>';
                            html_data += '<input type="hidden" name="credentialFields.enclosedType" class="span13 form-control" value="com.yodlee.common.FieldInfoSingle" placeholder="credentialFields.enclosedType" />';
                        if(html_data !=''){
                            $('.component-list').append(html_data);
                        }

                    }
                    editGetSiteLoginForm.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetSiteLoginForm.setOption("value", response);
                }
                $.maskLoading("button.btn-getSiteLoginForm", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getSiteLoginForm').removeClass('hidden');
                $('.hide-method-frame-getSiteLoginForm').addClass('hidden');
                $('.frame-getSiteLoginForm').addClass('hidden');
                $('.btn-getSiteLoginForm').addClass('hidden');

                $('.hide-method-frame-addSiteAccount').removeClass('hidden');
            }
        });
        return false;
    });


    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get addSiteAccount
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-addSiteAccount").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        var parameters = $("#IDaddSiteAccount").serialize();
        $("div.addSiteAccount").find(".response").val("");
        $.maskLoading("button.btn-addSiteAccount", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            data: {
                'parameters': parameters
            },
            url: "/addSiteAccount2",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (!$.isUndefined(response.siteAccountId)) {
                        $("#memSiteAccId, input.ref-memSiteAccId").val(response.siteAccountId);
                    }
                    if (response.siteRefreshInfo) {
                        if (response.siteRefreshInfo.siteRefreshStatus.siteRefreshStatus == "REFRESH_TRIGGERED") {
                            if (response.siteRefreshInfo.siteRefreshMode.refreshMode == "MFA") {
                                $(".frame-getMFAResponseForSite").removeClass("hidden");
                                $('.hide-method-frame-getSiteRefreshInfo-method-frame-getMFAResponseForSite').removeClass('hidden');
                            } else {
                                $(".frame-getSiteRefreshInfo").removeClass("hidden");
                                $('.hide-method-frame-getSiteRefreshInfo').removeClass('hidden');
                            }
                        }
                    }
                    
                    editAddSiteAccount.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editAddSiteAccount.setOption("value", response);
                }
                $.maskLoading("button.btn-addSiteAccount", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-addSiteAccount').removeClass('hidden');
                $('.hide-method-frame-addSiteAccount').addClass('hidden');
                $('.frame-addSiteAccount').addClass('hidden');
                $('.btn-addSiteAccount').addClass('hidden');

                
            }
        });
        return false;
    });



    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get getItemSummaries
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-getItemSummaries").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        } 

        $("div.getItemSummaries").find(".response").val("");
        $.maskLoading("button.btn-getItemSummaries", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val()
            },
            url: "/getItemSummaries",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;
                    
                    editGetItemSummaries.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetItemSummaries.setOption("value", response);
                }
                $.maskLoading("button.btn-getItemSummaries", { showLoading: false, msg: "Send data" });
                
            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Site Refresh Info
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getSiteRefreshInfo").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-memSiteAccId").val() == "") {
            alert("You must get the memSiteAccId.");
            return false;
        }

        var data = {
            'cobSessionToken': $("#cobSessionToken").val(),
            'userSessionToken': $("#userSessionToken").val(),
            'memSiteAccId': $("input.ref-memSiteAccId").val()
        };
        if ($(this).attr("api_type") == "refresh") {
            data = {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memSiteAccId': $("input.ref-memSiteAccId-site-refresh").val()
            };
        } else if ($(this).attr("api_type") == "update") {
            data = {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memSiteAccId': $("input.ref-memSiteAccId-getSiteRefreshInfo-api-update-site-account").val()
            };
        }
        $("div.getSiteRefreshInfo").find(".response").val("");
        $.maskLoading("button.btn-getSiteRefreshInfo", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            data: data,
            url: "/getSiteRefreshInfo",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;
                   
                    editGetSiteRefreshInfo.setOption("value", JSON.stringify(response, null, 4));
                    editGetSiteRefreshInfo_refresh_site.setOption("value", JSON.stringify(response, null, 4));
                    editGetSiteRefreshInfo_api_update_site_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetSiteRefreshInfo.setOption("value", response);
                    editGetSiteRefreshInfo_refresh_site.setOption("value", response);
                    editGetSiteRefreshInfo_api_update_site_account.setOption("value", response);

                }
                $.maskLoading("button.btn-getSiteRefreshInfo", { showLoading: false, msg: "Send data" });
                
                $('.btn-getSiteRefreshInfo').addClass('hidden');
             
            }
        });
        return false;
    });
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get MFA Response For Site
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-getMFAResponseForSite").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-memSiteAccId").val() == "") {
            alert("You must get the memSiteAccId.");
            return false;
        } 

        var data = {
            'cobSessionToken': $("#cobSessionToken").val(),
            'userSessionToken': $("#userSessionToken").val(),
            'memSiteAccId': $("input.ref-memSiteAccId").val()
        };
        if ($(this).attr("api_type") == "refresh") {
            data = {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memSiteAccId': $("input.ref-memSiteAccId-site-refresh").val()
            };
        } else if ($(this).attr("api_type") == "update") {
            data = {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memSiteAccId': $("input.ref-memSiteAccId-api-update-site-account").val()
            };
        }
        $("div.getMFAResponseForSite").find(".response").val("");
        $.maskLoading("button.btn-getMFAResponseForSite", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            data: data,
            url: "/getMFAResponseForSite",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (typeof(response.errorOccurred) == 'undefined') {
                        $(".frame-getSiteRefreshInfo").removeClass("hidden");
                        $(".frame-getSiteRefreshInfo-api-update-site-account ").removeClass("hidden");

                        $('.hide-method-frame-getSiteRefreshInfo').removeClass('hidden');
                        $('.hide-method-frame-getSiteRefreshInfo-api-update-site-account').removeClass('hidden');

                    } else {
                        if (response.isMessageAvailable == true) {
                            $(".frame-putMFARequestForSite").removeClass("hidden");
                            $(".frame-putMFARequestForSite-api-update-site-account").removeClass("hidden");

                            $('.hide-method-frame-putMFARequestForSite').removeClass('hidden');
                            $('.hide-method-frame-putMFARequestForSite-api-update-site-account').removeClass('hidden');

                        }
                    }                    
                    editGetMFAResponseForSite.setOption("value", JSON.stringify(response, null, 4));
                    editGetMFAResponseForSite_refresh_site.setOption("value", JSON.stringify(response, null, 4));
                    editGetMFAResponseForSite_api_update_site_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetMFAResponseForSite.setOption("value", response);
                    editGetMFAResponseForSite_refresh_site.setOption("value", response);
                    editGetMFAResponseForSite_api_update_site_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getMFAResponseForSite", { showLoading: false, msg: "Send data" });
               
                $('.show-method-frame-getMFAResponseForSite').removeClass('hidden');
                $('.hide-method-frame-getMFAResponseForSite').addClass('hidden');
                $('.frame-getMFAResponseForSite').addClass('hidden');
                $('.btn-getMFAResponseForSite').addClass('hidden');

                $('.show-method-frame-getMFAResponseForSite-api-update-site-account').removeClass('hidden');
                $('.frame-getMFAResponseForSite-api-update-site-account').addClass('hidden');

                $('.hide-method-frame-getMFAResponseForSite-api-update-site-account').addClass('hidden');
                $('.show-method-frame-getMFAResponseForSite-api-update-site-account').removeClass('hidden');

            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Put MFA Request For Site 
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-putMFARequestForSite").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-memSiteAccId-api-update-site-account").val() == "") {
            alert("You must get the memSiteAccId.");
            return false;
        }

        var parameters = $("#IDputMFARequestForSite").serialize();
        if ($(this).attr("api_type") == "refresh") {
            parameters = $("#IDputMFARequestForSite-api-refresh").serialize();
        } else if ($(this).attr("api_type") == "update") {
            parameters = $("#IDputMFARequestForSite-api-update-site-account").serialize();
        }
        $("div.putMFARequestForSite").find(".response").val("");
        $.maskLoading("button.btn-putMFARequestForSite", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            data: {
                'parameters': parameters
            },
            url: "/putMFARequestForSite",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    editPutMFARequestForSite.setOption("value", JSON.stringify(response, null, 4));
                    editPutMFARequestForSite_refresh_site.setOption("value", JSON.stringify(response, null, 4));
                    editPutMFARequestForSite_api_update_site_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editPutMFARequestForSite.setOption("value", response);
                    editPutMFARequestForSite_refresh_site.setOption("value", response);
                    editPutMFARequestForSite_api_update_site_account.setOption("value", response);
                }
                $.maskLoading("button.btn-putMFARequestForSite", { showLoading: false, msg: "Send data" });
                
                //$('.show-method-frame-putMFARequestForSite').removeClass('hidden');
                //$('.hide-method-frame-putMFARequestForSite').addClass('hidden');
                //$('.frame-putMFARequestForSite').addClass('hidden');
                $('.btn-putMFARequestForSite').addClass('hidden');

                $('.show-method-frame-putMFARequestForSite-api-update-site-account').removeClass('hidden');
                $('.frame-putMFARequestForSite-api-update-site-account').addClass('hidden');
            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Start Site Refresh
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-startSiteRefresh").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-memSiteAccIdn").val() == "") {
            alert("You must get the memSiteAccId.");
            return false;
        }

        if ($(".ref-refreshParameters-refreshPriority").val() == "") {
            alert("You must get the refreshParameters.refreshPriority.");
            return false;
        }

        if ($(".ref-refreshParameters-refreshMode-refreshModeId").val() == "") {
            alert("You must get the refreshParameters.refreshMode.refreshModeId.");
            return false;
        }

        if ($(".ref-refreshParameters-refreshMode-refreshMode").val() == "") {
            alert("You must get the refreshParameters.refreshMode.refreshMode.");
            return false;
        }

        if ($(".ref-refreshParameters-forceRefresh").val() == "") {
            alert("You must get the refreshParameters.forceRefresh.");
            return false;
        }

        $("div.startSiteRefresh").find(".response").val("");
        $.maskLoading("button.btn-startSiteRefresh", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memSiteAccId': $("input.ref-memSiteAccId-refresh-site").val(),
                'refreshParameters_refreshPriority': $("input.ref-refreshParameters-refreshPriority").val(),
                'refreshParameters_refreshMode_refreshModeId': $("input.ref-refreshParameters-refreshMode-refreshModeId").val(),
                'refreshParameters_refreshMode_refreshMode': $("input.ref-refreshParameters-refreshMode-refreshMode").val(),
                'refreshParameters_forceRefresh': $("input.ref-refreshParameters-forceRefresh").val()
            },
            url: "/startSiteRefresh",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    editStartSiteRefresh.setOption("value", JSON.stringify(response, null, 4));
                    $.maskLoading("button.btn-startSiteRefresh", { showLoading: false, msg: "Send data" });
                    if (response.siteRefreshStatus.siteRefreshStatus == "REFRESH_TRIGGERED") {
                        if (response.siteRefreshMode.refreshMode == "MFA") {
                            $(".frame-getMFAResponseForSite").removeClass("hidden");
                            $('.hide-method-frame-getMFAResponseForSite').removeClass('hidden');
                        } else {
                            $(".frame-getSiteRefreshInfo").removeClass("hidden");
                            $('.hide-method-frame-getSiteRefreshInfo').removeClass('hidden');
                        }
                        $('.show-method-frame-startSiteRefresh-api-refresh').removeClass('hidden');
                        $('.hide-method-frame-startSiteRefresh-api-refresh').addClass('hidden');
                        $('.frame-startSiteRefresh-api-refresh').addClass('hidden');
                        $('.btn-startSiteRefresh').addClass('hidden');
                    }else{

                        $('.btn-startSiteRefresh').addClass('hidden');
                    }
                    
                } catch (e) {
                    editStartSiteRefresh.setOption("value", response);
                }

                

            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Site Accounts API Refresh
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-getSiteAccounts-api-refresh").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        $("div.getSiteAccounts-api-refresh").find(".response").val("");
        $.maskLoading("button.btn-getSiteAccounts-api-refresh", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memSiteAccIds_0': $("input.ref-memSiteAccIds_0-api-refresh ").val(),
                'memSiteAccIds_1': $("input.ref-memSiteAccIds_1-api-refresh").val()
            },
            url: "/getSiteAccounts",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (!response.errorOccurred) {
                        $(".frame-list-sites-refresh-account").removeClass("hidden");
                        var data = '';
                        $.each(response, function (i, item) {
                            data += '<tr>';
                            data += '<td>';
                            data += item.siteAccountId;
                            data += '</td>';
                            data += '<td>';
                            data += item.siteInfo.defaultDisplayName;
                            data += '<button class="btn btn-primary pull-right btn-add-site-api-refresh-site-account" id="btn_add_site_' + item.siteAccountId + '" name="btn_add_site" data-siteid="' + item.siteAccountId + '"> Add </button>';
                            data += '</td>';
                            data += '</tr>';
                        });
                        if (data != '') {
                            $('.data-list-site-refresh-site-account').html(data);
                        }
                    }
                    editGetSiteAccounts_api_refresh.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetSiteAccounts_api_refresh.setOption("value", response);
                }
                $.maskLoading("button.btn-getSiteAccounts-api-refresh", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getSiteAccounts-api-refresh').removeClass('hidden');
                $('.hide-method-frame-getSiteAccounts-api-refresh').addClass('hidden');
                $('.frame-getSiteAccounts-api-refresh').addClass('hidden');
                $('.btn-getSiteAccounts-api-refresh').addClass('hidden');

                $('.hide-method-frame-getSiteAccounts-api-refresh-site-account').removeClass('hidden')
                $('.hide-method-frame-list-sites-refresh-account').removeClass('hidden');
            }
        });
        return false;
    });

     $("body").on("click", "button.btn-add-site-api-refresh-site-account", function (e) {
        $(".frame-startSiteRefresh-api-refresh").removeClass("hidden");

        $('.show-method-frame-list-sites-refresh-account').removeClass('hidden');
        $('.hide-method-frame-list-sites-refresh-account').addClass('hidden');
        $('.frame-list-sites-refresh-account').addClass('hidden');
        $('.btn-add-site-api-refresh-site-account').addClass('hidden');

        $('.hide-method-frame-startSiteRefresh-api-refresh').removeClass('hidden');
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Site Accounts API Update Site Accounts
    /************************************************************************************/
    /************************************************************************************/
    
    $(".btn-getSiteAccounts-api-update-site-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        $("div.getSiteAccounts-api-update-site-account").find(".response").val("");
        $.maskLoading("button.btn-getSiteAccounts-api-update-site-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memSiteAccIds_0': $("input.ref-memSiteAccIds_0-api-update-site-account ").val(),
                'memSiteAccIds_1': $("input.ref-memSiteAccIds_1-api-update-site-account").val()
            },
            url: "/getSiteAccounts",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (!response.errorOccurred) {
                        $(".frame-list-sites-update-site-account").removeClass("hidden");
                        var data = '';
                        $.each(response, function (i, item) {
                            data += '<tr>';
                            data += '<td>';
                            data += item.siteInfo.siteId;
                            data += '</td>';
                            data += '<td>';
                            data += item.siteInfo.defaultDisplayName;
                            data += '<button data-site-accountid= "' + item.siteAccountId + '" class="btn btn-primary pull-right btn-add-site-api-update-site-account" id="btn_add_site_' + item.siteInfo.siteId + '" name="btn_add_site" data-siteid="' + item.siteInfo.siteId + '"> Add </button>';
                            data += '</td>';
                            data += '</tr>';
                        });
                        if (data != '') {
                            $('.data-list-site-update-site-account').html(data);
                        }
                    }
                    editGetSiteAccounts_api_update_site_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetSiteAccounts_api_update_site_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getSiteAccounts-api-update-site-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getSiteAccounts-api-update-site-account').removeClass('hidden');
                $('.hide-method-frame-getSiteAccounts-api-update-site-account').addClass('hidden');

                $('.frame-getSiteAccounts-api-update-site-account').addClass('hidden');
                $('.btn-getSiteAccounts-api-update-site-account').addClass('hidden');

                $('.hide-method-frame-list-sites-update-site-account').removeClass('hidden');
            }
        });
        return false;
    });
     
     $("body").on("click", "button.btn-add-site-api-update-site-account", function (e) {
        var data_siteid = $(this).attr("data-siteid");
        $(".frame-getSiteInfo-api-update-site-account").removeClass("hidden");
        $(".ref-siteFilter-siteId-api-update-site-account").val(data_siteid);        
        $(".ref-getSiteLoginForm-siteId-api-update-site-account").val(data_siteid);

        var data_site_accountid = $(this).attr("data-site-accountid"); 
        $(".ref-updateSiteAccountCredentials-siteId").val(data_site_accountid);
        $(".ref-memSiteAccId-getSiteRefreshInfo-api-update-site-account").val(data_site_accountid);
        $(".ref-memSiteAccId-api-update-site-account").val(data_site_accountid);
        $(".ref-memSiteAccId-api-update-site-account").val(data_site_accountid);

        $('.show-method-frame-list-sites-update-site-account').removeClass('hidden');
        $('.hide-method-frame-list-sites-update-site-account').addClass('hidden');
        $('.frame-list-sites-update-site-account').addClass('hidden');
        $('.btn-add-site-api-update-site-account').addClass('hidden');

        $('.hide-method-frame-getSiteInfo-api-update-site-account').removeClass('hidden');
        
    });
   

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Site Info API update site account
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getSiteInfo-api-update-site-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($(".ref-siteFilter-reqSpecifier-api-update-site-account").val() == "") {
            alert("You must get the siteFilter.reqSpecifier.");
            return false;
        }
        if ($(".ref-siteFilter-siteId-api-update-site-account").val() == "") {
            alert("You must get the ref-siteFilter-siteId.");
            return false;
        }

        $("div.getSiteInfo-api-update-site-account").find(".response").val("");
        $.maskLoading("button.btn-getSiteInfo-api-update-site-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'siteFilter_reqSpecifier': $("input.ref-siteFilter-reqSpecifier-api-update-site-account").val(),
                'siteFilter_siteId': $("input.ref-siteFilter-siteId-api-update-site-account").val()
            },
            url: "/getSiteInfo",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;
                    if (!$.isUndefined(response)) {
                        response = (typeof (response) == "object") ? response : JSON.parse(response);
                    }
                    if (response.siteId) {
                        $(".frame-getSiteLoginForm-api-update-site-account").removeClass("hidden");
                    }
                    editGetSiteInfo_api_update_site_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetSiteInfo_api_update_site_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getSiteInfo-api-update-site-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getSiteInfo-api-update-site-account').removeClass('hidden');
                $('.hide-method-frame-getSiteInfo-api-update-site-account').addClass('hidden');
                $('.frame-getSiteInfo-api-update-site-account').addClass('hidden');
                $('.btn-getSiteInfo-api-update-site-account').addClass('hidden');

                $('.hide-method-frame-getSiteLoginForm-api-update-site-account').removeClass('hidden');
            
            }
        });
        return false;
    });


    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Site Login Form API Update Site Accounts
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getSiteLoginForm-api-update-site-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        $("div.getSiteLoginForm-api-update-site-account").find(".response").val("");
        $.maskLoading("button.btn-getSiteLoginForm-api-update-site-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'siteId': $("input.ref-getSiteLoginForm-siteId-api-update-site-account").val()
            },
            url: "/getSiteLoginForm",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;
                    if (response.conjunctionOp.conjuctionOp != '') {
                        $(".frame-updateSiteAccountCredentials-api-update-site-account").removeClass("hidden");

                        var html_data = '';
                        $.each(response.componentList, function (i, item){
                            var type = 'text';
                            var value = 'sbMemcuongle1';
                            if(item.fieldType.typeName.toLowerCase() == 'if_password' ){
                                type = 'password';
                                value = 'sbMemcuongle1#123';
                            }
                            var disabled = 'disabled';
                            if(item.isEditable == 'true'){
                                disabled = '';
                            }
                            html_data += '<label>'+item.displayName+'</label>';
                            html_data += '<input type="'+type+'" name="credentialFields['+i+'].value" class="span13 form-control '+disabled+'" value="'+value+'" placeholder="'+item.displayName+'" /></br>';
                            
                            html_data += '<label class="hidden">credentialFields['+i+'].valueIdentifier</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].valueIdentifier" class="span13 form-control '+disabled+'" value="'+item.valueIdentifier+'" placeholder="credentialFields['+i+'].valueIdentifier" />';
                            
                            html_data += '<label class="hidden">credentialFields['+i+'].valueMask</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].valueMask" class="span13 form-control '+disabled+'" value="'+item.valueMask+'" placeholder="credentialFields['+i+'].valueMask" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].fieldType.typeName</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].fieldType.typeName" class="span13 form-control '+disabled+'" value="'+item.fieldType.typeName+'" placeholder="credentialFields['+i+'].fieldType.typeName" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].size</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].size" class="span13 form-control '+disabled+'" value="'+item.size+'" placeholder="credentialFields['+i+'].size" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].maxlength</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].maxlength" class="span13 form-control '+disabled+'" value="'+item.maxlength+'" placeholder="credentialFields['+i+'].maxlength" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].fieldInfoType</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].fieldInfoType" class="span13 form-control '+disabled+'" value="'+item.fieldInfoType+'" placeholder="credentialFields['+i+'].fieldInfoType" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].name</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].name" class="span13 form-control '+disabled+'" value="'+item.name+'" placeholder="credentialFields['+i+'].name" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].displayName</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].displayName" class="span13 form-control '+disabled+'" value="'+item.displayName+'" placeholder="credentialFields['+i+'].displayName" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isEditable</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isEditable" class="span13 form-control '+disabled+'" value="'+item.isEditable+'" placeholder="credentialFields['+i+'].isEditable" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isOptional</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isOptional" class="span13 form-control '+disabled+'" value="'+item.isOptional+'" placeholder="credentialFields['+i+'].isOptional" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isEscaped</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isEscaped" class="span13 form-control '+disabled+'" value="'+item.isEscaped+'" placeholder="credentialFields['+i+'].isEscaped" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].helpText</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].helpText" class="span13 form-control '+disabled+'" value="'+item.helpText+'" placeholder="credentialFields['+i+'].helpText" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isOptionalMFA</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isOptionalMFA" class="span13 form-control '+disabled+'" value="'+item.isOptionalMFA+'" placeholder="credentialFields['+i+'].isOptionalMFA" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isMFA</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isMFA" class="span13 form-control '+disabled+'" value="'+item.isMFA+'" placeholder="credentialFields['+i+'].isMFA" />';                            
                        
                        })
                            html_data += '<label class="hidden">credentialFields.enclosedType</label>';
                            html_data += '<input type="hidden" name="credentialFields.enclosedType" class="span13 form-control" value="com.yodlee.common.FieldInfoSingle" placeholder="credentialFields.enclosedType" />';
                        if(html_data !=''){
                            $('.component-list-updateSiteAccountCredentials').append(html_data);
                        }

                    }
                    editGetSiteLoginForm_api_update_site_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetSiteLoginForm_api_update_site_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getSiteLoginForm-api-update-site-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getSiteLoginForm-api-update-site-account').removeClass('hidden');
                $('.hide-method-frame-getSiteLoginForm-api-update-site-account').addClass('hidden');
                $('.frame-getSiteLoginForm-api-update-site-account').addClass('hidden');
                $('.btn-getSiteLoginForm-api-update-site-account').addClass('hidden');

                $('.hide-method-frame-updateSiteAccountCredentials-api-update-site-account').removeClass('hidden');
            }
        });
        return false;
    });
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Update Site Account Credentials
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-updateSiteAccountCredentials-api-update-site-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        var parameters = $("#IDupdateSiteAccountCredentials-api-update-site-account").serialize();

        $("div.updateSiteAccountCredentials-api-update-site-account").find(".response").val("");
        $.maskLoading("button.btn-updateSiteAccountCredentials-api-update-site-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            data: {
                'parameters': parameters
            },
            url: "/updateSiteAccountCredentials2",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;
                   
                    if (response.siteAccountId) {
                        
                        if (response.siteRefreshInfo.siteRefreshMode.refreshMode == "MFA") {
                            $(".frame-getMFAResponseForSite-api-update-site-account").removeClass("hidden");
                            $('.hide-method-frame-getMFAResponseForSite-api-update-site-account').removeClass('hidden');
                        } else {
                            $(".frame-getSiteRefreshInfo-api-update-site-account").removeClass("hidden");
                            $('.hide-method-frame-getSiteRefreshInfo-api-update-site-account').removeClass('hidden');
                        }
                        
                    }                    
                    
                    editUpdateSiteAccountCredentials.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editUpdateSiteAccountCredentials.setOption("value", response);
                }
                $.maskLoading("button.btn-updateSiteAccountCredentials-api-update-site-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-updateSiteAccountCredentials-api-update-site-account').removeClass('hidden');
                $('.hide-method-frame-updateSiteAccountCredentials-api-update-site-account').addClass('hidden');
                $('.frame-updateSiteAccountCredentials-api-update-site-account').addClass('hidden');
                $('.btn-updateSiteAccountCredentials-api-update-site-account').addClass('hidden');

                $('.hide-method-frame-getMFAResponseForSite').removeClass('hidden');
            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Site Accounts API Delete Site Accounts
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getSiteAccounts-api-delete-site-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        $("div.getSiteAccounts-api-delete-site-account").find(".response").val("");
        $.maskLoading("button.btn-getSiteAccounts-api-update-site-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memSiteAccIds_0': $("input.ref-memSiteAccIds_0-api-delete-site-account ").val(),
                'memSiteAccIds_1': $("input.ref-memSiteAccIds_1-api-delete-site-account").val()
            },
            url: "/getSiteAccounts",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (!response.errorOccurred) {
                        $(".frame-list-sites-delete-site-account").removeClass("hidden");
                        var data = '';
                        $.each(response, function (i, item) {
                            data += '<tr class="tr_' + item.siteAccountId + '">';
                            data += '<td>';
                            data += item.siteInfo.siteId;
                            data += '</td>';
                            data += '<td>';
                            data += item.siteInfo.defaultDisplayName;
                            data += '<button data-toggle="modal" data-target="#delete-site-account-modal" data-whatever="' + item.siteAccountId + '" data-site-accountid= "' + item.siteAccountId + '" class="btn btn-danger pull-right" id="btn_add_site_' + item.siteInfo.siteId + '" name="btn_add_site" data-siteid="' + item.siteInfo.siteId + '"> Delete</button>';
                            data += '</td>';
                            data += '</tr>';
                        });
                        if (data != '') {
                            $('.data-list-site-delete-site-account').html(data);
                        }
                    }
                    editGetSiteAccounts_api_update_site_account.setOption("value", JSON.stringify(response, null, 4));
                    editGetSiteAccounts_api_delete_site_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetSiteAccounts_api_update_site_account.setOption("value", response);
                    editGetSiteAccounts_api_delete_site_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getSiteAccounts-api-delete-site-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getSiteAccounts-api-delete-site-account').removeClass('hidden');
                $('.hide-method-frame-getSiteAccounts-api-delete-site-account').addClass('hidden');
                $('.frame-getSiteAccounts-api-delete-site-account').addClass('hidden');
                $('.btn-getSiteAccounts-api-delete-site-account').addClass('hidden');

                $('.hide-method-frame-list-sites-delete-site-account').removeClass('hidden');
            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Delete Site Account
    /************************************************************************************/
    /************************************************************************************/

    $(".yes-delete-site-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }
        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }
        if ($(this).attr("data-siteid") == "") {
            alert("You must get the memSiteAccId.");
            return false;
        }
        var memSiteAccId = $(this).attr("data-siteid");

        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memSiteAccId': memSiteAccId
            },
            url: "/removeSiteAccount",
            success: function (data, textStatus, jqXHR) {
                if(data == 'true'){
                    $(".tr_" + memSiteAccId).remove();
                    $('#delete-site-account-modal').modal('hide');
                }
            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // Search Content Services
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-searchContentServices-api-add-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }
        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }
        if ($(".ref-keywords-api-add-account").val() == "") {
            alert("You must get the keywords.");
            return false;
        }
        if ($(".ref-notrim-api-add-account").val() == "") {
            alert("You must get the notrim.");
            return false;
        }
        var keywords = $(".ref-keywords-api-add-account").val();
        var notrim = $(".ref-notrim-api-add-account").val();

        $("div.searchContentServices-api-add-account").find(".response").val("");
        $.maskLoading("button.btn-searchContentServices-api-add-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'keywords': keywords,
                'notrim': notrim
            },
            url: "/searchContentServices",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response) {
                        $(".frame-list-sites-add-account").removeClass("hidden");
                        var data = '';
                        $.each(response, function (i, item) {
                            data += '<tr class="tr_' + item.contentServiceId + '">';
                            data += '<td>';
                            data += item.contentServiceId;
                            data += '</td>';
                            data += '<td>';
                            data += item.contentServiceDisplayName;
                            data += '<button class="btn btn-primary pull-right btn-add-content-services-api-add-account" id="btn_add_site_' + item.contentServiceId + '" name="btn_add_site" data-content-services-id="' + item.contentServiceId + '"> Add</button>';
                            data += '</td>';
                            var mfa = 'No';
                            var mfa_name = '';
                           if (item.mfaType) {
                               mfa = 'Yes';
                               mfa_name = item.mfaType.typeName;
                            }
                            data += '<td>';
                            data += mfa;
                            data += '</td>';
                            data += '<td>';
                            data += mfa_name;
                            data += '</td>';
                            data += '</tr>';
                        });
                        if (data != '') {
                            $('.data-list-site-add-account').html(data);
                        }
                    }
                    editSearchContentServices_api_add_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editSearchContentServices_api_add_account.setOption("value", response);
                }
                $.maskLoading("button.btn-searchContentServices-api-add-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-searchContentServices-api-add-account').removeClass('hidden');
                $('.hide-method-frame-searchContentServices-api-add-account').addClass('hidden');
                $('.frame-searchContentServices-api-add-account').addClass('hidden');
                $('.btn-searchContentServices-api-add-account').addClass('hidden');

                $('.hide-method-frame-getContentServiceInfo1-api-add-account').removeClass('hidden');
                $('.hide-method-frame-list-sites-add-account').removeClass('hidden');
            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // Get Content Service Info1
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getContentServiceInfo1-api-add-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }
        if ($(".ref-contentServiceId-api-add-account").val() == "") {
            alert("You must get the contentServiceId.");
            return false;
        }
        if ($(".ref-reqSpecifier-api-add-account").val() == "") {
            alert("You must get the reqSpecifier.");
            return false;
        }
        if ($(".ref-notrim-api-add-account").val() == "") {
            alert("You must get the notrim.");
            return false;
        }
        var reqSpecifier = $(".ref-reqSpecifier-api-add-account").val();
        var notrim = $(".ref-notrim-api-add-account").val();

        $("div.getContentServiceInfo1-api-add-account").find(".response").val("");
        $.maskLoading("button.btn-getContentServiceInfo1-api-add-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'contentServiceId': $(".ref-contentServiceId-api-add-account").val(),
                'reqSpecifier': reqSpecifier,
                'notrim': notrim
            },
            url: "/getContentServiceInfo1",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response) {
                        $(".frame-getLoginFormForContentService-api-add-account").removeClass("hidden");
                    }
                    editGetContentServiceInfo1_api_add_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetContentServiceInfo1_api_add_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getContentServiceInfo1-api-add-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getContentServiceInfo1-api-add-account').removeClass('hidden');
                $('.hide-method-frame-getContentServiceInfo1-api-add-account').addClass('hidden');
                $('.frame-getContentServiceInfo1-api-add-account').addClass('hidden');
                $('.btn-getContentServiceInfo1-api-add-account').addClass('hidden');

                $('.hide-method-frame-getLoginFormForContentService-api-add-account').removeClass('hidden');
            }
        });
        return false;
    });
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // Get Login Form For Content Service
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getLoginFormForContentService-api-add-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }        
        if ($(".ref-getLoginFormForContentService-contentServiceId-api-add-account").val() == "") {
            alert("You must get the contentServiceId.");
            return false;
        }

        var contentServiceId = $(".ref-getLoginFormForContentService-contentServiceId-api-add-account").val();        

        $("div.getLoginFormForContentService-api-add-account").find(".response").val("");
        $.maskLoading("button.btn-getLoginFormForContentService-api-add-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'contentServiceId': contentServiceId
            },
            url: "/getLoginFormForContentService",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response) {
                        $(".frame-addItemForContentService1-api-add-account").removeClass("hidden");
                        var html_data = '';
                        $.each(response.componentList, function (i, item){
                            var type = 'text';
                            var value = 'sbMemcuongle1';
                            if(item.fieldType.typeName.toLowerCase() == 'if_password' ){
                                type = 'password';
                                value = 'sbMemcuongle1#123';
                            }
                            var disabled = 'disabled';
                            if(item.isEditable == 'true'){
                                disabled = '';
                            }
                            html_data += '<label>'+item.displayName+'</label>';
                            html_data += '<input type="'+type+'" name="credentialFields['+i+'].value" class="span13 form-control '+disabled+'" value="'+value+'" placeholder="'+item.displayName+'" /></br>';
                            
                            html_data += '<label class="hidden">credentialFields['+i+'].valueIdentifier</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].valueIdentifier" class="span13 form-control '+disabled+'" value="'+item.valueIdentifier+'" placeholder="credentialFields['+i+'].valueIdentifier" />';
                            
                            html_data += '<label class="hidden">credentialFields['+i+'].valueMask</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].valueMask" class="span13 form-control '+disabled+'" value="'+item.valueMask+'" placeholder="credentialFields['+i+'].valueMask" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].fieldType.typeName</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].fieldType.typeName" class="span13 form-control '+disabled+'" value="'+item.fieldType.typeName+'" placeholder="credentialFields['+i+'].fieldType.typeName" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].size</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].size" class="span13 form-control '+disabled+'" value="'+item.size+'" placeholder="credentialFields['+i+'].size" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].maxlength</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].maxlength" class="span13 form-control '+disabled+'" value="'+item.maxlength+'" placeholder="credentialFields['+i+'].maxlength" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].fieldInfoType</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].fieldInfoType" class="span13 form-control '+disabled+'" value="'+item.fieldInfoType+'" placeholder="credentialFields['+i+'].fieldInfoType" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].name</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].name" class="span13 form-control '+disabled+'" value="'+item.name+'" placeholder="credentialFields['+i+'].name" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].displayName</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].displayName" class="span13 form-control '+disabled+'" value="'+item.displayName+'" placeholder="credentialFields['+i+'].displayName" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isEditable</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isEditable" class="span13 form-control '+disabled+'" value="'+item.isEditable+'" placeholder="credentialFields['+i+'].isEditable" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isOptional</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isOptional" class="span13 form-control '+disabled+'" value="'+item.isOptional+'" placeholder="credentialFields['+i+'].isOptional" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isEscaped</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isEscaped" class="span13 form-control '+disabled+'" value="'+item.isEscaped+'" placeholder="credentialFields['+i+'].isEscaped" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].helpText</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].helpText" class="span13 form-control '+disabled+'" value="'+item.helpText+'" placeholder="credentialFields['+i+'].helpText" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isOptionalMFA</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isOptionalMFA" class="span13 form-control '+disabled+'" value="'+item.isOptionalMFA+'" placeholder="credentialFields['+i+'].isOptionalMFA" />';

                            html_data += '<label class="hidden">credentialFields['+i+'].isMFA</label>';
                            html_data += '<input type="hidden" name="credentialFields['+i+'].isMFA" class="span13 form-control '+disabled+'" value="'+item.isMFA+'" placeholder="credentialFields['+i+'].isMFA" />';                            
                        
                        })
                            html_data += '<label class="hidden">credentialFields.enclosedType</label>';
                            html_data += '<input type="hidden" name="credentialFields.enclosedType" class="span13 form-control" value="com.yodlee.common.FieldInfoSingle" placeholder="credentialFields.enclosedType" />';

                            html_data += '<label class="hidden">startRefreshItemOnAddition</label>';
                            html_data += '<input type="hidden" name="startRefreshItemOnAddition" class="span13 form-control" value="true" placeholder="startRefreshItemOnAddition" />';

                            html_data += '<label class="hidden">shareCredentialsWithinSite</label>';
                            html_data += '<input type="hidden" name="shareCredentialsWithinSite" class="span13 form-control" value="true" placeholder="shareCredentialsWithinSite" />';
                        if(html_data !=''){
                            $('.component-addItemForContentService1-api-add-account').append(html_data);
                        }
                    }
                    editGetLoginFormForContentService_api_add_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetLoginFormForContentService_api_add_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getLoginFormForContentService-api-add-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getLoginFormForContentService-api-add-account').removeClass('hidden');
                $('.hide-method-frame-getLoginFormForContentService-api-add-account').addClass('hidden');
                $('.frame-getLoginFormForContentService-api-add-account').addClass('hidden');
                $('.btn-getLoginFormForContentService-api-add-account').addClass('hidden');

                $('.hide-method-frame-addItemForContentService1-api-add-account').removeClass('hidden');

            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Add Item For Content Service 1
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-addItemForContentService1-api-add-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-addItemForContentServices1-contentServiceId").val() == "") {
            alert("You must get the contentServiceId.");
            return false;
        }

        var parameters = $("#IDaddItemForContentService1-api-add-account").serialize();

        $("div.addItemForContentService1-api-add-account").find(".response").val("");
        $.maskLoading("button.btn-addItemForContentService1-api-add-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'parameters': parameters
            },
            url: "/addItemForContentService1",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response) {                        
                        $(".frame-startRefresh7-api-add-account").removeClass("hidden");
                        $(".ref-itemIds_0-api-add-account").val(response.primitiveObj);
                        $(".ref-itemIds_1-api-add-account").val(response.primitiveObj);
                        $(".ref-memItemId-api-add-account").val(response.primitiveObj);
                        $(".ref-startRefresh7-itemId-api-add-account").val(response.primitiveObj);
                        $(".ref-getMFAResponse-itemId-api-add-account").val(response.primitiveObj);

                    }

                    editAddItemForContentService1_api_add_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editAddItemForContentService1_api_add_account.setOption("value", response);
                }
                $.maskLoading("button.btn-addItemForContentService1-api-add-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-addItemForContentService1-api-add-account').removeClass('hidden');
                $('.hide-method-frame-startRefresh7-api-add-account').removeClass('hidden');
                $('.hide-method-frame-addItemForContentService1-api-add-account').addClass('hidden');
                $('.frame-addItemForContentService1-api-add-account').addClass('hidden');
                $('.btn-addItemForContentService1-api-add-account').addClass('hidden');
            }
        });
        return false;
    });
    
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // Start Refresh 7
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-startRefresh7-api-add-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-startRefresh7-itemId-api-add-account").val() == "") {
            alert("You must get the itemId.");
            return false;
        }

        if ($(".refreshParameters_refreshMode_refreshMode").val() == "") {
            alert("You must get the refreshParameters.refreshMode.refreshMode.");
            return false;
        }
        if ($(".refreshParameters_refreshMode_refreshModeId").val() == "") {
            alert("You must get the refreshParameters.refreshMode.refreshModeId.");
            return false;
        }
        if ($(".refreshParameters_refreshPriority").val() == "") {
            alert("You must get the refreshParameters.refreshPriority.");
            return false;
        }
        var itemId = $(".ref-startRefresh7-itemId-api-add-account").val();
        var refreshParameters_refreshMode_refreshMode = $(".refreshParameters_refreshMode_refreshMode").val();
        var refreshParameters_refreshMode_refreshModeId = $(".refreshParameters_refreshMode_refreshModeId").val();
        var refreshParameters_refreshPriority = $(".refreshParameters_refreshPriority").val();


        $("div.startRefresh7-api-add-account").find(".response").val("");

        $.maskLoading("button.btn-startRefresh7-api-add-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'itemId': itemId,
                'refreshParameters_refreshMode_refreshMode': refreshParameters_refreshMode_refreshMode,
                'refreshParameters_refreshMode_refreshModeId': refreshParameters_refreshMode_refreshModeId,
                'refreshParameters_refreshPriority': refreshParameters_refreshPriority
            },
            url: "/startRefresh7",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response) {
                        if (refreshParameters_refreshMode_refreshMode.toLowerCase() == 'normal') {
                            $(".frame-isItemRefreshing-api-add-account").removeClass("hidden");
                            $('.hide-method-frame-isItemRefreshing-api-add-account').removeClass('hidden');
                        } else {                            
                            $(".frame-getMFAResponse-api-add-account").removeClass("hidden");
                            $('.hide-method-frame-getMFAResponse-api-add-account').removeClass('hidden');
                        }
                    }
                    editStartRefresh7_api_add_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editStartRefresh7_api_add_account.setOption("value", response);
                }
                $.maskLoading("button.btn-startRefresh7-api-add-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-startRefresh7-api-add-account').removeClass('hidden');
                $('.hide-method-frame-startRefresh7-api-add-account').addClass('hidden');
                $('.frame-startRefresh7-api-add-account').addClass('hidden');
                $('.btn-startRefresh7-api-add-account').addClass('hidden');
            }
        });
        return false;
    });
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get MFA Response
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-getMFAResponse-api-add-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-getMFAResponse-itemId-api-add-account").val() == "") {
            alert("You must get the itemId.");
            return false;
        }

        var itemId = $(".ref-getMFAResponse-itemId-api-add-account").val();

        $("div.getMFAResponse-api-add-account").find(".response").val("");

        $.maskLoading("button.btn-getMFAResponse-api-add-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'itemId': itemId
            },
            url: "/getMFAResponse",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;
                    if (response.errorCode == 0){
                        $(".frame-isItemRefreshing-api-add-account").removeClass("hidden");
                        $('.hide-method-frame-isItemRefreshing-api-add-account').removeClass('hidden');
                    }
                    else
                    {
                        if (response.isMessageAvailable == true) {
                            $(".frame-putMFARequest-api-add-account").removeClass("hidden");
                            $('.hide-method-frame-putMFARequest-api-add-account').removeClass('hidden');
                        } 
                    }
                    editGetMFAResponse_api_add_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetMFAResponse_api_add_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getMFAResponse-api-add-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getMFAResponse-api-add-account').removeClass('hidden');
                $('.hide-method-frame-getMFAResponse-api-add-account').addClass('hidden');
                $('.frame-getMFAResponse-api-add-account').addClass('hidden');
                $('.btn-getMFAResponse-api-add-account').addClass('hidden');
            }
        });
        return false;
    });
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // putMFARequest
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-putMFARequest-api-add-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-itemId-api-add-account").val() == "") {
            alert("You must get the itemId.");
            return false;
        }

        if ($(".ref-userResponse_objectInstanceType-api-add-account").val() == "") {
            alert("You must get the userResponse.objectInstanceType.");
            return false;
        }

        if ($(".ref-userResponse_token-api-add-account").val() == "") {
            alert("You must get the userResponse.token.");
            return false;
        }

        var itemId = $(".ref-itemId-api-add-account").val();
        var userResponse_objectInstanceType = $(".ref-userResponse_objectInstanceType-api-add-account").val();
        var userResponse_token = $(".ref-userResponse_token-api-add-account").val();

        $("div.putMFARequest-api-add-account").find(".response").val("");

        $.maskLoading("button.btn-putMFARequest-api-add-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            type: "POST",            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'itemId': itemId,
                'userResponse_objectInstanceType': userResponse_objectInstanceType,
                'userResponse_token': userResponse_token
            },
            url: "/putMFARequest",            
            success: function (data, textStatus, jqXHR) {
                $.maskLoading("button.btn-putMFARequest-api-add-account", { showLoading: false, msg: "Send data" });
                var response = data;
                try { 
                    editPutMFARequest_api_add_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editPutMFARequest_api_add_account.setOption("value", response);
                }

                $('.show-method-frame-putMFARequest-api-add-account').removeClass('hidden');
                $('.hide-method-frame-putMFARequest-api-add-account').addClass('hidden');
                $('.frame-putMFARequest-api-add-account').addClass('hidden');
                $('.btn-putMFARequest-api-add-account').addClass('hidden');
                
            }
        });
        return false;
    });
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // Is Item Refreshing
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-isItemRefreshing-api-add-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-memItemId-api-add-account").val() == "") {
            alert("You must get the memItemId.");
            return false;
        }

        var memItemId = $(".ref-memItemId-api-add-account").val();

        $("div.isItemRefreshing-api-add-account").find(".response").val("");

        $.maskLoading("button.btn-isItemRefreshing-api-add-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memItemId': memItemId
            },
            url: "/isItemRefreshing",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;
                    if (response.primitiveObj == false) {
                        $(".frame-getRefreshInfo1-api-add-account").removeClass("hidden");

                        $('.hide-method-frame-isItemRefreshing-api-add-account').addClass('hidden');
                        $('.show-method-frame-isItemRefreshing-api-add-account').removeClass('hidden');

                        $('.btn-getRefreshInfo1-api-add-account').removeClass('hidden');

                        $('.show-method-frame-getRefreshInfo1-api-add-account').addClass('hidden');
                        $('.hide-method-frame-getRefreshInfo1-api-add-account').removeClass('hidden');
                    }
                    editIsItemRefreshing_api_add_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editIsItemRefreshing_api_add_account.setOption("value", response);
                }
                $.maskLoading("button.btn-isItemRefreshing-api-add-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-isItemRefreshing-api-add-account').removeClass('hidden');
                $('.hide-method-frame-isItemRefreshing-api-add-account').addClass('hidden');
                $('.frame-isItemRefreshing-api-add-account').addClass('hidden');
                $('.btn-isItemRefreshing-api-add-account').addClass('hidden');

                $('.hide-method-frame-getRefreshInfo1-api-add-account').removeClass('hidden');
            }
        });
        return false;
    });
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // Get Refresh Info 1
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getRefreshInfo1-api-add-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-itemIds_0-api-add-account").val() == "") {
            alert("You must get the itemIds[0].");
            return false;
        }

        if ($(".ref-itemIds_1-api-add-account").val() == "") {
            alert("You must get the itemIds[1].");
            return false;
        }

        var itemIds_0 = $(".ref-itemIds_0-api-add-account").val();

        var itemIds_1 = $(".ref-itemIds_1-api-add-account").val();

        $("div.getRefreshInfo1-api-add-account").find(".response").val("");
        $.maskLoading("button.btn-getLoginFormForContentService-api-add-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'itemIds_0': itemIds_0,
                'itemIds_1': itemIds_1
            },
            url: "/getRefreshInfo1",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response) {
                        $(".frame-isItemRefreshing-api-add-account").removeClass("hidden");

                        $('.show-method-frame-isItemRefreshing-api-add-account').addClass('hidden');
                        $('.hide-method-frame-isItemRefreshing-api-add-account').removeClass('hidden');

                        $('.btn-isItemRefreshing-api-add-account').removeClass('hidden');

                        $('.hide-method-frame-getRefreshInfo1-api-add-account').addClass('hidden');
                    }
                    editgetRefreshInfo1_api_add_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editgetRefreshInfo1_api_add_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getRefreshInfo1-api-add-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getRefreshInfo1-api-add-account').removeClass('hidden');
                $('.hide-method-frame-getRefreshInfo1-api-add-account').addClass('hidden');
                $('.frame-getRefreshInfo1-api-add-account').addClass('hidden');
                $('.btn-getRefreshInfo1-api-add-account').addClass('hidden');
            }
        });
        return false;
    });


    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get Item Summaries Without Item Data
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-getItemSummariesWithoutItemData-api-refresh-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }
               
        var itemId = $(".ref-getMFAResponse-itemId-api-add-account").val();

        $("div.getItemSummariesWithoutItemData-api-refresh-account").find(".response").val("");

        $.maskLoading("button.btn-getItemSummariesWithoutItemData-api-refresh-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val()
            },
            url: "/getItemSummariesWithoutItemData",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response) {
                        $(".frame-list-sites-refresh-account").removeClass("hidden");
                        var data = '';
                        $.each(response, function (i, item) {
                            data += '<tr class="tr_' + item.itemId + '">';
                            data += '<td>';
                            data += item.itemId;
                            data += '</td>';
                            data += '<td>';
                            data += item.itemDisplayName;
                            data += '<button class="btn btn-primary pull-right btn-item-getItemSummariesWithoutItemData-api-refresh-account" id="btn_add_site_' + item.itemId + '" name="btn_add_site" data-contentServiceId="' + item.contentServiceId + '" data-itemid="' + item.itemId + '"> Add</button>';
                            data += '</td>';
                            
                            data += '</tr>';
                        });
                        if (data != '') {
                            $('.data-list-site-api-refresh-account').html(data);
                        }
                    }
                    editGetItemSummariesWithoutItemData_api_refresh_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetItemSummariesWithoutItemData_api_refresh_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getItemSummariesWithoutItemData-api-refresh-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getItemSummariesWithoutItemData-api-refresh-account').removeClass('hidden');
                $('.hide-method-frame-getItemSummariesWithoutItemData-api-refresh-account').addClass('hidden');
                $('.frame-getItemSummariesWithoutItemData-api-refresh-account').addClass('hidden');
                $('.btn-getItemSummariesWithoutItemData-api-refresh-account').addClass('hidden');

                $('.hide-method-frame-list-sites-refresh-account').removeClass('hidden');
            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    // Is Item Refreshing
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-isItemRefreshing-api-refresh-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-memItemId-api-refresh-account").val() == "") {
            alert("You must get the memItemId.");
            return false;
        }

        var memItemId = $(".ref-memItemId-api-add-account").val();

        $("div.isItemRefreshing-api-refresh-account").find(".response").val("");

        $.maskLoading("button.btn-isItemRefreshing-api-refresh-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'memItemId': memItemId
            },
            url: "/isItemRefreshing",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response) {
                        $(".frame-getRefreshInfo1-api-refresh-account").removeClass("hidden");
                        $('.hide-method-frame-getRefreshInfo1-api-refresh-account').removeClass('hidden');
                    }
                    editIsItemRefreshing_api_refresh_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editIsItemRefreshing_api_refresh_account.setOption("value", response);
                }
                $.maskLoading("button.btn-isItemRefreshing-api-refresh-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-isItemRefreshing-api-refresh-account').removeClass('hidden');
                $('.hide-method-frame-isItemRefreshing-api-refresh-account').addClass('hidden');
                $('.frame-isItemRefreshing-api-refresh-account').addClass('hidden');
                $('.btn-isItemRefreshing-api-refresh-account').addClass('hidden');
            }
        });
        return false;
    });
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // Get Content Service Info1
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getContentServiceInfo1-api-refresh-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }
        if ($(".ref-contentServiceId-api-refresh-account").val() == "") {
            alert("You must get the contentServiceId.");
            return false;
        }
        if ($(".ref-reqSpecifier-api-refresh-account").val() == "") {
            alert("You must get the reqSpecifier.");
            return false;
        }
        if ($(".ref-notrim-api-refresh-account").val() == "") {
            alert("You must get the notrim.");
            return false;
        }
        var reqSpecifier = $(".ref-reqSpecifier-api-refresh-account").val();
        var notrim = $(".ref-notrim-api-refresh-account").val();

        $("div.getContentServiceInfo1-api-refresh-account").find(".response").val("");
        $.maskLoading("button.btn-getContentServiceInfo1-api-refresh-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'contentServiceId': $(".ref-contentServiceId-api-refresh-account").val(),
                'reqSpecifier': reqSpecifier,
                'notrim': notrim
            },
            url: "/getContentServiceInfo1",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response) {
                        $(".frame-startRefresh7-api-refresh-account").removeClass("hidden");
                    }
                    editGetContentServiceInfo1_api_refresh_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetContentServiceInfo1_api_refresh_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getContentServiceInfo1-api-refresh-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getContentServiceInfo1-api-refresh-account').removeClass('hidden');
                $('.hide-method-frame-getContentServiceInfo1-api-refresh-account').addClass('hidden');
                $('.frame-getContentServiceInfo1-api-refresh-account').addClass('hidden');
                $('.btn-getContentServiceInfo1-api-refresh-account').addClass('hidden');

                $('.hide-method-frame-startRefresh7-api-refresh-account').removeClass('hidden');
            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // Start Refresh 7
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-startRefresh7-api-refresh-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-startRefresh7-itemId-api-refresh-account").val() == "") {
            alert("You must get the itemId.");
            return false;
        }

        if ($(".refreshParameters_refreshMode_refreshMode-api-refresh-account").val() == "") {
            alert("You must get the refreshParameters.refreshMode.refreshMode.");
            return false;
        }
        if ($(".refreshParameters_refreshMode_refreshModeId-api-refresh-account").val() == "") {
            alert("You must get the refreshParameters.refreshMode.refreshModeId.");
            return false;
        }
        if ($(".refreshParameters_refreshPriority-api-refresh-account").val() == "") {
            alert("You must get the refreshParameters.refreshPriority.");
            return false;
        }
        var itemId = $(".ref-startRefresh7-itemId-api-add-account").val();
        var refreshParameters_refreshMode_refreshMode = $(".refreshParameters_refreshMode_refreshMode-api-refresh-account").val();
        var refreshParameters_refreshMode_refreshModeId = $(".refreshParameters_refreshMode_refreshModeId-api-refresh-account").val();
        var refreshParameters_refreshPriority = $(".refreshParameters_refreshPriority-api-refresh-account").val();


        $("div.startRefresh7-api-refresh-account").find(".response").val("");

        $.maskLoading("button.btn-startRefresh7-api-refresh-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'itemId': itemId,
                'refreshParameters_refreshMode_refreshMode': refreshParameters_refreshMode_refreshMode,
                'refreshParameters_refreshMode_refreshModeId': refreshParameters_refreshMode_refreshModeId,
                'refreshParameters_refreshPriority': refreshParameters_refreshPriority
            },
            url: "/startRefresh7",
            success: function (data, textStatus, jqXHR) {

                try {
                    var response = data;

                    if (response) {
                        if (refreshParameters_refreshMode_refreshMode.toLowerCase() == 'normal') {
                            $(".frame-isItemRefreshing-api-refresh-account").removeClass("hidden");
                            $('.show-method-frame-isItemRefreshing-api-refresh-account').removeClass('hidden');
                        } else {                            
                            $(".frame-getMFAResponse-api-refresh-account").removeClass("hidden");
                            $('.hide-method-frame-getMFAResponse-api-refresh-account').removeClass('hidden');
                        }
                        
                    }
                    editStartRefresh7_api_refresh_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editStartRefresh7_api_refresh_account.setOption("value", response);
                }
                $.maskLoading("button.btn-startRefresh7-api-refresh-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-startRefresh7-api-refresh-account').removeClass('hidden');
                $('.hide-method-frame-startRefresh7-api-refresh-account').addClass('hidden');
                $('.frame-startRefresh7-api-refresh-account').addClass('hidden');
                $('.btn-startRefresh7-api-refresh-account').addClass('hidden');

            }
        });
        return false;
    });
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    //Get MFA Response
    /************************************************************************************/
    /************************************************************************************/
    $(".btn-getMFAResponse-api-refresh-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-getMFAResponse-itemId-api-refresh-account").val() == "") {
            alert("You must get the itemId.");
            return false;
        }

        var itemId = $(".ref-getMFAResponse-itemId-api-refresh-account").val();

        $("div.getMFAResponse-api-refresh-account").find(".response").val("");

        $.maskLoading("button.btn-getMFAResponse-api-refresh-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'itemId': itemId
            },
            url: "/getMFAResponse",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response.errorCode == 0){
                        $(".frame-isItemRefreshing-api-add-account").removeClass("hidden");
                        $('.show-method-frame-isItemRefreshing-api-add-account').removeClass('hidden');

                        $(".frame-isItemRefreshing-api-refresh-account").removeClass("hidden");
                        $('.show-method-frame-isItemRefreshing-api-refresh-account').removeClass('hidden');
                    }
                    else
                    {
                        if (response.isMessageAvailable == true) {
                            $(".frame-putMFARequest-api-refresh-account").removeClass("hidden");
                            $('.hide-method-frame-putMFARequest-api-refresh-account').removeClass('hidden');
                        } 
                    }
                    editGetMFAResponse_api_refresh_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editGetMFAResponse_api_refresh_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getMFAResponse-api-refresh-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getMFAResponse-api-refresh-account').removeClass('hidden');
                $('.hide-method-frame-getMFAResponse-api-refresh-account').addClass('hidden');
                $('.frame-getMFAResponse-api-refresh-account').addClass('hidden');
                $('.btn-getMFAResponse-api-refresh-account').addClass('hidden');
            }
        });
        return false;
    });
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // putMFARequest
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-putMFARequest-api-refresh-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-itemId-api-refresh-account").val() == "") {
            alert("You must get the itemId.");
            return false;
        }

        if ($(".ref-userResponse_objectInstanceType-api-refresh-account").val() == "") {
            alert("You must get the userResponse.objectInstanceType.");
            return false;
        }

        if ($(".ref-userResponse_token-api-refresh-account").val() == "") {
            alert("You must get the userResponse.token.");
            return false;
        }

        var itemId = $(".ref-itemId-api-refresh-account").val();
        var userResponse_objectInstanceType = $(".ref-userResponse_objectInstanceType-api-refresh-account").val();
        var userResponse_token = $(".ref-userResponse_token-api-refresh-account").val();

        $("div.putMFARequest-api-add-account").find(".response").val("");

        $.maskLoading("button.btn-putMFARequest-api-add-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'itemId': itemId,
                'userResponse_objectInstanceType': userResponse_objectInstanceType,
                'userResponse_token': userResponse_token
            },
            url: "/putMFARequest",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;                    
                    editPutMFARequest_api_refresh_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editPutMFARequest_api_refresh_account.setOption("value", response);
                }
                $.maskLoading("button.btn-putMFARequest-api-add-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-putMFARequest-api-refresh-account').removeClass('hidden');
                $('.hide-method-frame-putMFARequest-api-refresh-account').addClass('hidden');
                $('.frame-putMFARequest-api-refresh-account').addClass('hidden');
                $('.btn-putMFARequest-api-refresh-account').addClass('hidden');

            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // Get Refresh Info 1
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getRefreshInfo1-api-refresh-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-itemIds_0-api-refresh-account").val() == "") {
            alert("You must get the itemIds[0].");
            return false;
        }

        if ($(".ref-itemIds_1-api-refresh-account").val() == "") {
            alert("You must get the itemIds[1].");
            return false;
        }

        var itemIds_0 = $(".ref-itemIds_0-api-refresh-account").val();

        var itemIds_1 = $(".ref-itemIds_1-api-refresh-account").val();

        $("div.getRefreshInfo1-api-refresh-account").find(".response").val("");
        $.maskLoading("button.btn-getLoginFormForContentService-api-refresh-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'itemIds_0': itemIds_0,
                'itemIds_1': itemIds_1
            },
            url: "/getRefreshInfo1",
            success: function (data, textStatus, jqXHR) {
                try {
                    var response = data;

                    if (response) {
                        $(".frame-getItemSummaryForItem1-api-refresh-account").removeClass("hidden");
                        $('.hide-method-frame-getItemSummaryForItem1-api-refresh-account').removeClass('hidden');
                    }
                    editgetRefreshInfo1_api_refresh_account.setOption("value", JSON.stringify(response, null, 4));
                } catch (e) {
                    editgetRefreshInfo1_api_refresh_account.setOption("value", response);
                }
                $.maskLoading("button.btn-getRefreshInfo1-api-refresh-account", { showLoading: false, msg: "Send data" });

                $('.show-method-frame-getRefreshInfo1-api-refresh-account').removeClass('hidden');
                $('.hide-method-frame-getRefreshInfo1-api-refresh-account').addClass('hidden');
                $('.frame-getRefreshInfo1-api-refresh-account').addClass('hidden');
                $('.btn-getRefreshInfo1-api-refresh-account').addClass('hidden');
            }
        });
        return false;
    });

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // Get Item Summary For Item 1
    /************************************************************************************/
    /************************************************************************************/

    $(".btn-getItemSummaryForItem1-api-refresh-account").click(function (e) {
        if ($("#cobSessionToken").val() == "") {
            alert("You must get the Cobrand session token.");
            return false;
        }

        if ($("#userSessionToken").val() == "") {
            alert("You must get the User Session Token.");
            return false;
        }

        if ($(".ref-getItemSummaryForItem1-itemId-api-refresh-account").val() == "") {
            alert("You must get the itemId.");
            return false;
        }

        if ($(".ref-dex_startLevel-api-refresh-account").val() == "") {
            alert("You must get the dex.startLevel.");
            return false;
        }

        if ($(".ref-itemIds_0-api-refresh-account").val() == "") {
            alert("You must get the dex.endLevel.");
            return false;
        }

        if ($(".ref-itemIds_1-api-refresh-account").val() == "") {
            alert("You must get the dex.extentLevels[0].");
            return false;
        }

        if ($(".ref-itemIds_0-api-refresh-account").val() == "") {
            alert("You must get the dex.extentLevels[1].");
            return false;
        }

        var itemId = $(".ref-getItemSummaryForItem1-itemId-api-refresh-account").val();
        var dex_startLevel = $(".ref-dex_startLevel-api-refresh-account").val();
        var dex_endLevel = $(".ref-dex_endLevel-api-refresh-account").val();
        var dex_extentLevels_0 = $(".ref-dex_extentLevels_0-api-refresh-account").val();
        var dex_extentLevels_1 = $(".ref-dex_extentLevels_1-api-refresh-account").val();

        $("div.getItemSummaryForItem1-api-refresh-account").find(".response").val("");
        $.maskLoading("button.btn-getItemSummaryForItem1-api-refresh-account", { showLoading: true, msg: "Loading..." });
        $.ajax({
            method: "POST",
            
            data: {
                'cobSessionToken': $("#cobSessionToken").val(),
                'userSessionToken': $("#userSessionToken").val(),
                'itemId': itemId,
                'dex_startLevel': dex_startLevel,
                'dex_endLevel': dex_endLevel,
                'dex_extentLevels_0': dex_extentLevels_0,
                'dex_extentLevels_1': dex_extentLevels_1
            },
            url: "/getItemSummaryForItem1",
            success: function (data, textStatus, jqXHR) {
                try {
                    // $('.show-method-frame-getItemSummaryForItem1-api-refresh-account').removeClass('hidden');
                    // $('.hide-method-frame-getItemSummaryForItem1-api-refresh-account').addClass('hidden');
                    // $('.frame-getItemSummaryForItem1-api-refresh-account').addClass('hidden');
                    $('.btn-getItemSummaryForItem1-api-refresh-account').addClass('hidden');

                    var response = data;

                    editGetItemSummaryForItem1_api_refresh_account.setOption("value", JSON.stringify(response, null, 4));
                    $.maskLoading("button.btn-getItemSummaryForItem1-api-refresh-account", { showLoading: false, msg: "Send data" });
                    $(".test_data").removeClass("hidden");
                    if (response.itemData.accounts[0].currentBalance.currencyCode) {
                        $(".currencyCode_data").html(response.itemData.accounts[0].currentBalance.currencyCode);
                        $(".amount_data").html(response.itemData.accounts[0].currentBalance.amount);
                    }

                   
                } catch (e) {
                    editGetItemSummaryForItem1_api_refresh_account.setOption("value", response);
                }
                
               
            }
        });
        return false;
    });


    

    $("body").on("click", "button.btn-add-site-api-refresh-site-account", function (e) {
        $(".frame-startSiteRefresh-api-refresh").removeClass("hidden");

        $('.show-method-frame-list-sites-refresh-account').removeClass('hidden');
        $('.frame-list-sites-refresh-account').addClass('hidden');
        $('.btn-add-site-api-refresh-site-account').addClass('hidden');
    });

    $("body").on("click", "button.btn-add-site-api-add-site-account", function (e) {
        var data_siteid = $(this).attr("data-siteid");

        $(".ref-siteFilter-siteId").val(data_siteid);
        $(".ref-getSiteLoginForm-siteId").val(data_siteid);
        $(".frame-getSiteInfo").removeClass("hidden");

        $('.show-method-frame-list-sites-add-account').removeClass('hidden');
        $('.hide-method-frame-list-sites-add-account').addClass('hidden');
        $('.frame-list-sites-add-account').addClass('hidden');
        $('.btn-add-site-api-add-site-account').addClass('hidden');

        $('.hide-method-frame-getSiteInfo').removeClass('hidden');
    });
   

   
    $('#delete-site-account-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);;
        var recipient = button.data('whatever');
        $(".yes-delete-site-account").attr("data-siteid", recipient);
    });

    $("body").on("click", "button.btn-add-content-services-api-add-account", function (e) {
        var data_content_services_id = $(this).attr("data-content-services-id");

        $(".ref-contentServiceId-api-add-account").val(data_content_services_id);
        $(".ref-getLoginFormForContentService-contentServiceId-api-add-account").val(data_content_services_id);
        $(".ref-addItemForContentServices1-contentServiceId").val(data_content_services_id);
        
        $(".frame-getContentServiceInfo1-api-add-account").removeClass("hidden");

        $('.show-method-frame-list-sites-add-account').removeClass('hidden');
        $('.hide-method-frame-list-sites-add-account').addClass('hidden');
        $('.frame-list-sites-add-account').addClass('hidden');
        $('.btn-add-content-services-api-add-account').addClass('hidden');

    });

    $("body").on("click", "button.btn-item-getItemSummariesWithoutItemData-api-refresh-account", function (e) {
        var data_itemid = $(this).attr("data-itemid");
        var data_contentServiceId = $(this).attr("data-contentServiceId");

        $(".ref-memItemId-api-refresh-account").val(data_itemid);

        $(".ref-contentServiceId-api-refresh-account").val(data_contentServiceId);

        $(".ref-addItemForContentServices1-contentServiceId").val(data_itemid);

        $(".ref-itemIds_0-api-refresh-account").val(data_itemid);
        $(".ref-itemIds_1-api-refresh-account").val(data_itemid);

        $(".ref-getItemSummaryForItem1-itemId-api-refresh-account").val(data_itemid);

        $(".frame-getContentServiceInfo1-api-refresh-account").removeClass("hidden");

        $('.show-method-frame-list-sites-refresh-account').removeClass('hidden');
        $('.hide-method-frame-list-sites-refresh-account').addClass('hidden');
        $('.frame-list-sites-refresh-account').addClass('hidden');
        $('.btn-item-getItemSummariesWithoutItemData-api-refresh-account').addClass('hidden');

        $('.hide-method-frame-getContentServiceInfo1-api-refresh-account').removeClass('hidden');
    });

    $("body").on("click", "button.back-to-method-select-api", function (e) {
        var method = $(this).attr('method');
        var hide_method = $(this).attr('hide-method');

        $('.'+method).removeClass('hidden');
        $('.'+hide_method).addClass('hidden');
        $('.frame-select_api').removeClass('hidden');

        $(this).addClass('hidden');
    });


    $("body").on("click", "button.btn-show-method", function (e) {
        var show_method = $(this).attr('show-method');

        $('.'+show_method).removeClass('hidden');
        $('.hide-method-'+show_method).removeClass('hidden');

        $(this).addClass('hidden');
    });

    $("body").on("click", "button.btn-hide-method", function (e) {
        var hide_method = $(this).attr('hide-method');

        $('.'+hide_method).addClass('hidden');
        $('.show-method-'+hide_method).removeClass('hidden');        

        $(this).addClass('hidden');
    });

});